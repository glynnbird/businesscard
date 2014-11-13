/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db = null;

var addNewCard = function() {
  log("New pressed");
  var obj = {
    firstname: $('#firstname').val(),
    lastname: $('#lastname').val(),
    companyname: $('#companyname').val(),
    email:  $('#email').val(),
    twitter:  $('#email').val(),
    url: $('#url').val(),
    
  };
  db.post( obj, function(err,data) {
    log(err);
    renderCardList();
      $('#addmodal').modal('hide');
  });

}

var renderCard = function(doc) {
  var html = "";
  html += "<div class='row'>";
  html += "<div class='col-md-12'>";
  html += "<div class='alert alert-warning'>"
  html += "<h4>" + doc.lastname + ", "  + doc.firstname + "</h4>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  return html;
}

var showAddModal = function() {
  // show the modal
  $('#firstname').val("");
  $('#lastname').val("");
  $('#companyname').val("");
  $('#email').val("");
  $('#twitter').val("");
  $('#url').val();
  $('#addmodal').modal('show');
}

// map function
var orderByLastName = function(doc) {
  emit(doc.lastname,null);
}

var renderCardList = function() {
  
//  db.query( { map: orderByLastName }, {include_docs:true}, function(err, data) {
  db.allDocs( {include_docs:true}, function(err, data) {
    var html = "";
    console.log("QUERY",err,data);
    if(data.rows) {
      for(var i in data.rows) {
        var doc = data.rows[i].doc;
         log(JSON.stringify(doc));
        html += renderCard(doc);
      }
      $('#cardlist').html(html);
    }

  })
}

var log = function(str) {
  var now = new Date()
  $('#log').html(now.getTime() + " " + str);
}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        console.log("Creating database");
        db = new PouchDB('businesscards');
        renderCardList();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

