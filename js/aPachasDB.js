'use strict';

var databaseConfig = {
  dbName: 'apachasdb',
  dbVersion: 1,
  dbObjects: [
    {
      name: 'pay',
      key: { autoIncrement: true },
      index: [
        {
          name: grp,
          keyPath: grp,
          params: { unique: false, multiEntry: true }
        }
      ]
    },
    {
      name: 'grp',
      key: { keyPath: 'name' }
    }
  ]
};

var APachasDB = (function(){

  // Support different versions of IndexedDB
  var database = null;


  var DB_VERSION = 1;

  function openDB(success, error) {
    var idb = window.indexedDB || window.webkitIndexedDB ||
                window.mozIndexedDB || window.msIndexedDB;

    if (!idb) {
      error('Indexed DB is not available!!!');
      return;
    }

    var request;
    var emptyDB = false;

    try{
      request = idb.open(databaseConfig.dbName, databaseConfig.dbVersion);
    } catch (e) {
      error(e.message);
    }

    request.onsuccess = function(evt) {
      database = evt.target.result;
      success(emptyDB);
    }

    request.onerror = function(evt) {
      error('Database error: ' + evt.target.errorCode);
    };

    request.upgradeneeded = function(evt) {
      var db = evt.target.result;
      emptyDB = true;
      databaseConfig.dbObjects.forEach(function(table) {
        var store = db.createObjectStore(table.name, table.key);
        table.index && table.index.forEach(function (ind) {
          store.createIndex(ind.name, ind.keyPath, ind.params);
        });
        store.clear();
      });
    }
  };

  function read(objName, mode) {

  }

  function write(objName, elems, success, failure) {
    if (!database || !objName || !elems){
      return;
    }

    var txn = database.transaction(objName, "readwrite");
    txn.oncomplete = function(evt) {
      success && success(evt);
    }

    txn.onerror = function(evt) {
      var target = event.target;
      console.warn('Caught error on transaction: ' + target.error.name);

      failure && failure(target.errorCode);
    };

    var store = txn.objectStore(objName);
    for (var i in elems) {
      store.put(elems[i]);
    }
  }

  openDB();

  return {
    write: write,
    read: read
  }
})();
