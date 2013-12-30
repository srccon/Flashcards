;(function(window, undefined){"use strict";var idbModules={};"use strict";(function(e){function t(e,t,n,r){n.target=t;typeof t[e]==="function"&&t[e].apply(t,[n]);typeof r==="function"&&r()}function n(t,n,r){var i=new DOMException.constructor(0,n);i.name=t;i.message=n;if(e.DEBUG){console.log(t,n,r,i);console.trace&&console.trace()}throw i}var r=function(){this.length=0;this._items=[];if(Object.defineProperty){Object.defineProperty(this,"_items",{enumerable:false})}};r.prototype={contains:function(e){return-1!==this._items.indexOf(e)},item:function(e){return this._items[e]},indexOf:function(e){return this._items.indexOf(e)},push:function(e){this._items.push(e);this.length+=1;for(var t=0;t<this._items.length;t++){this[t]=this._items[t]}},splice:function(){this._items.splice.apply(this._items,arguments);this.length=this._items.length;for(var e in this){if(e===String(parseInt(e,10))){delete this[e]}}for(e=0;e<this._items.length;e++){this[e]=this._items[e]}}};if(Object.defineProperty){for(var i in{indexOf:false,push:false,splice:false}){Object.defineProperty(r.prototype,i,{enumerable:false})}}e.util={throwDOMException:n,callback:t,quote:function(e){return"'"+e+"'"},StringList:r}})(idbModules);"use strict";(function(idbModules){var Sca=function(){return{decycle:function(object,callback){function checkForCompletion(){if(queuedObjects.length===0){returnCallback(derezObj)}}function readBlobAsDataURL(e,t){var n=new FileReader;n.onloadend=function(n){var r=n.target.result;var i="blob";if(e instanceof File){}updateEncodedBlob(r,t,i)};n.readAsDataURL(e)}function updateEncodedBlob(dataURL,path,blobtype){var encoded=queuedObjects.indexOf(path);path=path.replace("$","derezObj");eval(path+'.$enc="'+dataURL+'"');eval(path+'.$type="'+blobtype+'"');queuedObjects.splice(encoded,1);checkForCompletion()}function derez(e,t){var n,r,i;if(typeof e==="object"&&e!==null&&!(e instanceof Boolean)&&!(e instanceof Date)&&!(e instanceof Number)&&!(e instanceof RegExp)&&!(e instanceof Blob)&&!(e instanceof String)){for(n=0;n<objects.length;n+=1){if(objects[n]===e){return{$ref:paths[n]}}}objects.push(e);paths.push(t);if(Object.prototype.toString.apply(e)==="[object Array]"){i=[];for(n=0;n<e.length;n+=1){i[n]=derez(e[n],t+"["+n+"]")}}else{i={};for(r in e){if(Object.prototype.hasOwnProperty.call(e,r)){i[r]=derez(e[r],t+"["+JSON.stringify(r)+"]")}}}return i}else if(e instanceof Blob){queuedObjects.push(t);readBlobAsDataURL(e,t)}else if(e instanceof Boolean){e={$type:"bool",$enc:e.toString()}}else if(e instanceof Date){e={$type:"date",$enc:e.getTime()}}else if(e instanceof Number){e={$type:"num",$enc:e.toString()}}else if(e instanceof RegExp){e={$type:"regex",$enc:e.toString()}}return e}var objects=[],paths=[],queuedObjects=[],returnCallback=callback;var derezObj=derez(object,"$");checkForCompletion()},retrocycle:function retrocycle($){function dataURLToBlob(e){var t=";base64,",n,r,i;if(e.indexOf(t)===-1){r=e.split(",");n=r[0].split(":")[1];i=r[1];return new Blob([i],{type:n})}r=e.split(t);n=r[0].split(":")[1];i=window.atob(r[1]);var s=i.length;var o=new Uint8Array(s);for(var u=0;u<s;++u){o[u]=i.charCodeAt(u)}return new Blob([o.buffer],{type:n})}function rez(value){var i,item,name,path;if(value&&typeof value==="object"){if(Object.prototype.toString.apply(value)==="[object Array]"){for(i=0;i<value.length;i+=1){item=value[i];if(item&&typeof item==="object"){path=item.$ref;if(typeof path==="string"&&px.test(path)){value[i]=eval(path)}else{value[i]=rez(item)}}}}else{if(value.$type!==undefined){switch(value.$type){case"blob":case"file":value=dataURLToBlob(value.$enc);break;case"bool":value=Boolean(value.$enc==="true");break;case"date":value=new Date(value.$enc);break;case"num":value=Number(value.$enc);break;case"regex":value=eval(value.$enc);break}}else{for(name in value){if(typeof value[name]==="object"){item=value[name];if(item){path=item.$ref;if(typeof path==="string"&&px.test(path)){value[name]=eval(path)}else{value[name]=rez(item)}}}}}}}return value}var px=/^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;rez($);return $},encode:function(e,t){function n(e){t(JSON.stringify(e))}this.decycle(e,n)},decode:function(e){return this.retrocycle(JSON.parse(e))}}}();idbModules.Sca=Sca})(idbModules);"use strict";(function(e){var t=["","number","string","boolean","object","undefined"];var n=function(){return{encode:function(e){return t.indexOf(typeof e)+"-"+JSON.stringify(e)},decode:function(e){if(typeof e==="undefined"){return undefined}else{return JSON.parse(e.substring(2))}}}};var r={number:n("number"),"boolean":n(),object:n(),string:{encode:function(e){return t.indexOf("string")+"-"+e},decode:function(e){return""+e.substring(2)}},"undefined":{encode:function(e){return t.indexOf("undefined")+"-undefined"},decode:function(e){return undefined}}};var i=function(){return{encode:function(e){return r[typeof e].encode(e)},decode:function(e){return r[t[e.substring(0,1)]].decode(e)}}}();e.Key=i})(idbModules);"use strict";(function(e,t){var n=function(e,t){return{type:e,debug:t,bubbles:false,cancelable:false,eventPhase:0,timeStamp:new Date}};e.Event=n})(idbModules);"use strict";(function(e){var t=function(){this.onsuccess=this.onerror=this.result=this.error=this.source=this.transaction=null;this.readyState="pending"};var n=function(){this.onblocked=this.onupgradeneeded=null};n.prototype=t;e.IDBRequest=t;e.IDBOpenRequest=n})(idbModules);"use strict";(function(e,t){var n=function(e,t,n,r){this.lower=e;this.upper=t;this.lowerOpen=n;this.upperOpen=r};n.only=function(e){return new n(e,e,true,true)};n.lowerBound=function(e,r){return new n(e,t,r,t)};n.upperBound=function(e){return new n(t,e,t,open)};n.bound=function(e,t,r,i){return new n(e,t,r,i)};e.IDBKeyRange=n})(idbModules);"use strict";(function(e,t){function n(n,r,i,s,o,u){this.__range=n;this.source=this.__idbObjectStore=i;this.__req=s;this.key=t;this.direction=r;this.__keyColumnName=o;this.__valueColumnName=u;if(!this.source.transaction.__active){e.util.throwDOMException("TransactionInactiveError - The transaction this IDBObjectStore belongs to is not active.")}this.__offset=-1;this.__lastKeyContinued=t;this["continue"]()}n.prototype.__find=function(n,r,i,s){var o=this;var u=["SELECT * FROM ",e.util.quote(o.__idbObjectStore.name)];var a=[];u.push("WHERE ",o.__keyColumnName," NOT NULL");if(o.__range&&(o.__range.lower!==t||o.__range.upper!==t)){u.push("AND");if(o.__range.lower==o.__range.upper&&o.__range.lower!==t){u.push(o.__keyColumnName+" = ?");a.push(e.Key.encode(o.__range.lower))}else{if(o.__range.lower!==t){u.push(o.__keyColumnName+(o.__range.lowerOpen?" >":" >= ")+" ?");a.push(e.Key.encode(o.__range.lower))}o.__range.lower!==t&&o.__range.upper!==t&&u.push("AND");if(o.__range.upper!==t){u.push(o.__keyColumnName+(o.__range.upperOpen?" < ":" <= ")+" ?");a.push(e.Key.encode(o.__range.upper))}}}if(typeof n!=="undefined"){o.__lastKeyContinued=n;o.__offset=0}if(o.__lastKeyContinued!==t){u.push("AND "+o.__keyColumnName+" >= ?");a.push(e.Key.encode(o.__lastKeyContinued))}u.push("ORDER BY ",o.__keyColumnName);u.push("LIMIT 1 OFFSET "+o.__offset);e.DEBUG&&console.log(u.join(" "),a);r.executeSql(u.join(" "),a,function(n,r){if(r.rows.length===1){var s=e.Key.decode(r.rows.item(0)[o.__keyColumnName]);var u=e.Key.decode(r.rows.item(0).key);var a=o.__valueColumnName==="value"?e.Sca.decode(r.rows.item(0)[o.__valueColumnName]):e.Key.decode(r.rows.item(0)[o.__valueColumnName]);i(s,a,u)}else{e.DEBUG&&console.log("Reached end of cursors");i(t,t)}},function(t,n){e.DEBUG&&console.log("Could not execute Cursor.continue");s(n)})};n.prototype["continue"]=function(e){var n=this;this.__idbObjectStore.transaction.__addToTransactionQueue(function(r,i,s,o){n.__offset++;n.__find(e,r,function(e,r,i){n.key=e;n.value=r;n.primaryKey=i;s(typeof n.key!=="undefined"?n:t,n.__req)},function(e){o(e)})})};n.prototype.advance=function(n){if(n<=0){e.util.throwDOMException("Type Error - Count is invalid - 0 or negative",n)}var r=this;this.__idbObjectStore.transaction.__addToTransactionQueue(function(e,i,s,o){r.__offset+=n;r.__find(t,e,function(e,n){r.key=e;r.value=n;s(typeof r.key!=="undefined"?r:t,r.__req)},function(e){o(e)})})};n.prototype.update=function(n){var r=this,i=this.__idbObjectStore.transaction.__createRequest(function(){});e.Sca.encode(n,function(n){r.__idbObjectStore.transaction.__pushToQueue(i,function(i,s,o,u){r.__find(t,i,function(t,s,a){var f="UPDATE "+e.util.quote(r.__idbObjectStore.name)+" SET value = ? WHERE key = ?";e.DEBUG&&console.log(f,n,a);i.executeSql(f,[n,e.Key.encode(a)],function(e,n){if(n.rowsAffected===1){o(a)}else{u("No rowns with key found"+t)}},function(e,t){u(t)})},function(e){u(e)})})});return i};n.prototype["delete"]=function(){var n=this;return this.__idbObjectStore.transaction.__addToTransactionQueue(function(r,i,s,o){n.__find(t,r,function(i,u){var a="DELETE FROM  "+e.util.quote(n.__idbObjectStore.name)+" WHERE key = ?";e.DEBUG&&console.log(a,i);r.executeSql(a,[e.Key.encode(i)],function(e,n){if(n.rowsAffected===1){s(t)}else{o("No rowns with key found"+i)}},function(e,t){o(t)})},function(e){o(e)})})};e.IDBCursor=n})(idbModules);"use strict";(function(idbModules,undefined){function IDBIndex(e,t){this.indexName=this.name=e;this.__idbObjectStore=this.objectStore=this.source=t;var n=t.__storeProps&&t.__storeProps.indexList;n&&(n=JSON.parse(n));this.keyPath=n&&n[e]&&n[e].keyPath||e;["multiEntry","unique"].forEach(function(t){this[t]=!!n&&!!n[e]&&!!n[e].optionalParams&&!!n[e].optionalParams[t]},this)}IDBIndex.prototype.__createIndex=function(indexName,keyPath,optionalParameters){var me=this;var transaction=me.__idbObjectStore.transaction;transaction.__addToTransactionQueue(function(tx,args,success,failure){me.__idbObjectStore.__getStoreProps(tx,function(){function error(){idbModules.util.throwDOMException(0,"Could not create new index",arguments)}if(transaction.mode!==2){idbModules.util.throwDOMException(0,"Invalid State error, not a version transaction",me.transaction)}var idxList=JSON.parse(me.__idbObjectStore.__storeProps.indexList);if(typeof idxList[indexName]!=="undefined"){idbModules.util.throwDOMException(0,"Index already exists on store",idxList)}var columnName=indexName;idxList[indexName]={columnName:columnName,keyPath:keyPath,optionalParams:optionalParameters};me.__idbObjectStore.__storeProps.indexList=JSON.stringify(idxList);var sql=["ALTER TABLE",idbModules.util.quote(me.__idbObjectStore.name),"ADD",columnName,"BLOB"].join(" ");idbModules.DEBUG&&console.log(sql);tx.executeSql(sql,[],function(tx,data){tx.executeSql("SELECT * FROM "+idbModules.util.quote(me.__idbObjectStore.name),[],function(tx,data){(function initIndexForRow(i){if(i<data.rows.length){try{var value=idbModules.Sca.decode(data.rows.item(i).value);var indexKey=eval("value['"+keyPath+"']");tx.executeSql("UPDATE "+idbModules.util.quote(me.__idbObjectStore.name)+" set "+columnName+" = ? where key = ?",[idbModules.Key.encode(indexKey),data.rows.item(i).key],function(e,t){initIndexForRow(i+1)},error)}catch(e){initIndexForRow(i+1)}}else{idbModules.DEBUG&&console.log("Updating the indexes in table",me.__idbObjectStore.__storeProps);tx.executeSql("UPDATE __sys__ set indexList = ? where name = ?",[me.__idbObjectStore.__storeProps.indexList,me.__idbObjectStore.name],function(){me.__idbObjectStore.__setReadyState("createIndex",true);success(me)},error)}})(0)},error)},error)},"createObjectStore")})};IDBIndex.prototype.openCursor=function(e,t){var n=new idbModules.IDBRequest;var r=new idbModules.IDBCursor(e,t,this.source,n,this.indexName,"value");return n};IDBIndex.prototype.openKeyCursor=function(e,t){var n=new idbModules.IDBRequest;var r=new idbModules.IDBCursor(e,t,this.source,n,this.indexName,"key");return n};IDBIndex.prototype.__fetchIndexData=function(e,t){var n=this;return n.__idbObjectStore.transaction.__addToTransactionQueue(function(r,i,s,o){var u=["SELECT * FROM ",idbModules.util.quote(n.__idbObjectStore.name)," WHERE",n.indexName,"NOT NULL"];var a=[];if(typeof e!=="undefined"&&(e.lower!==undefined||e.upper!==undefined)){u.push("AND");if(e.lower===e.upper&&e.lower!==undefined){u.push(n.indexName+" = ?");a.push(idbModules.Key.encode(e.lower))}else{if(e.lower!==undefined){u.push(n.indexName+(e.lowerOpen?" >":" >= ")+" ?");a.push(idbModules.Key.encode(e.lower))}e.lower!==undefined&&e.upper!==undefined&&u.push("AND");if(e.upper!==undefined){u.push(n.indexName+(e.upperOpen?" < ":" <= ")+" ?");a.push(idbModules.Key.encode(e.upper))}}}idbModules.DEBUG&&console.log("Trying to fetch data for Index",u.join(" "),a);r.executeSql(u.join(" "),a,function(e,n){var r;if(t==="count"){r=n.rows.length}else if(n.rows.length===0){r=undefined}else if(t==="key"){r=idbModules.Key.decode(n.rows.item(0).key)}else{r=idbModules.Sca.decode(n.rows.item(0).value)}s(r)},o)})};IDBIndex.prototype.get=function(e){return this.__fetchIndexData(e,"value")};IDBIndex.prototype.getKey=function(e){return this.__fetchIndexData(e,"key")};IDBIndex.prototype.count=function(e){return this.__fetchIndexData(e,"count")};idbModules.IDBIndex=IDBIndex})(idbModules);"use strict";(function(idbModules){var IDBObjectStore=function(e,t,n){this.name=e;this.transaction=t;this.__ready={};this.__setReadyState("createObjectStore",typeof n==="undefined"?true:n);this.indexNames=new idbModules.util.StringList};IDBObjectStore.prototype.__setReadyState=function(e,t){this.__ready[e]=t};IDBObjectStore.prototype.__waitForReady=function(e,t){var n=true;if(typeof t!=="undefined"){n=typeof this.__ready[t]==="undefined"?true:this.__ready[t]}else{for(var r in this.__ready){if(!this.__ready[r]){n=false}}}if(n){e()}else{idbModules.DEBUG&&console.log("Waiting for to be ready",t);var i=this;window.setTimeout(function(){i.__waitForReady(e,t)},100)}};IDBObjectStore.prototype.__getStoreProps=function(e,t,n){var r=this;this.__waitForReady(function(){if(r.__storeProps){idbModules.DEBUG&&console.log("Store properties - cached",r.__storeProps);t(r.__storeProps)}else{e.executeSql("SELECT * FROM __sys__ where name = ?",[r.name],function(e,n){if(n.rows.length!==1){t()}else{r.__storeProps={name:n.rows.item(0).name,indexList:n.rows.item(0).indexList,autoInc:n.rows.item(0).autoInc,keyPath:n.rows.item(0).keyPath};idbModules.DEBUG&&console.log("Store properties",r.__storeProps);t(r.__storeProps)}},function(){t()})}},n)};IDBObjectStore.prototype.__deriveKey=function(tx,value,key,callback){function getNextAutoIncKey(){tx.executeSql("SELECT * FROM sqlite_sequence where name like ?",[me.name],function(e,t){if(t.rows.length!==1){callback(0)}else{callback(t.rows.item(0).seq)}},function(e,t){idbModules.util.throwDOMException(0,"Data Error - Could not get the auto increment value for key",t)})}var me=this;me.__getStoreProps(tx,function(props){if(!props){idbModules.util.throwDOMException(0,"Data Error - Could not locate defination for this table",props)}if(props.keyPath){if(typeof key!=="undefined"){idbModules.util.throwDOMException(0,"Data Error - The object store uses in-line keys and the key parameter was provided",props)}if(value){try{var primaryKey=eval("value['"+props.keyPath+"']");if(!primaryKey){if(props.autoInc==="true"){getNextAutoIncKey()}else{idbModules.util.throwDOMException(0,"Data Error - Could not eval key from keyPath")}}else{callback(primaryKey)}}catch(e){idbModules.util.throwDOMException(0,"Data Error - Could not eval key from keyPath",e)}}else{idbModules.util.throwDOMException(0,"Data Error - KeyPath was specified, but value was not")}}else{if(typeof key!=="undefined"){callback(key)}else{if(props.autoInc==="false"){idbModules.util.throwDOMException(0,"Data Error - The object store uses out-of-line keys and has no key generator and the key parameter was not provided. ",props)}else{getNextAutoIncKey()}}}})};IDBObjectStore.prototype.__insertData=function(tx,value,primaryKey,success,error){var paramMap={};if(typeof primaryKey!=="undefined"){paramMap.key=idbModules.Key.encode(primaryKey)}var indexes=JSON.parse(this.__storeProps.indexList);for(var key in indexes){try{paramMap[indexes[key].columnName]=idbModules.Key.encode(eval("("+value+")."+indexes[key].keyPath))}catch(e){error(e)}}var sqlStart=["INSERT INTO ",idbModules.util.quote(this.name),"("];var sqlEnd=[" VALUES ("];var sqlValues=[];for(key in paramMap){sqlStart.push(key+",");sqlEnd.push("?,");sqlValues.push(paramMap[key])}sqlStart.push("value )");sqlEnd.push("?)");sqlValues.push(value);var sql=sqlStart.join(" ")+sqlEnd.join(" ");idbModules.DEBUG&&console.log("SQL for adding",sql,sqlValues);tx.executeSql(sql,sqlValues,function(e,t){success(primaryKey)},function(e,t){error(t)})};IDBObjectStore.prototype.add=function(e,t){var n=this,r=n.transaction.__createRequest(function(){});idbModules.Sca.encode(e,function(i){n.transaction.__pushToQueue(r,function(r,s,o,u){n.__deriveKey(r,e,t,function(e){n.__insertData(r,i,e,o,u)})})});return r};IDBObjectStore.prototype.put=function(e,t){var n=this,r=n.transaction.__createRequest(function(){});idbModules.Sca.encode(e,function(i){n.transaction.__pushToQueue(r,function(r,s,o,u){n.__deriveKey(r,e,t,function(e){var t="DELETE FROM "+idbModules.util.quote(n.name)+" where key = ?";r.executeSql(t,[idbModules.Key.encode(e)],function(t,r){idbModules.DEBUG&&console.log("Did the row with the",e,"exist? ",r.rowsAffected);n.__insertData(t,i,e,o,u)},function(e,t){u(t)})})})});return r};IDBObjectStore.prototype.get=function(e){var t=this;return t.transaction.__addToTransactionQueue(function(n,r,i,s){t.__waitForReady(function(){var r=idbModules.Key.encode(e);idbModules.DEBUG&&console.log("Fetching",t.name,r);n.executeSql("SELECT * FROM "+idbModules.util.quote(t.name)+" where key = ?",[r],function(e,t){idbModules.DEBUG&&console.log("Fetched data",t);try{if(0===t.rows.length){return i()}i(idbModules.Sca.decode(t.rows.item(0).value))}catch(n){idbModules.DEBUG&&console.log(n);i(undefined)}},function(e,t){s(t)})})})};IDBObjectStore.prototype["delete"]=function(e){var t=this;return t.transaction.__addToTransactionQueue(function(n,r,i,s){t.__waitForReady(function(){var r=idbModules.Key.encode(e);idbModules.DEBUG&&console.log("Fetching",t.name,r);n.executeSql("DELETE FROM "+idbModules.util.quote(t.name)+" where key = ?",[r],function(e,t){idbModules.DEBUG&&console.log("Deleted from database",t.rowsAffected);i()},function(e,t){s(t)})})})};IDBObjectStore.prototype.clear=function(){var e=this;return e.transaction.__addToTransactionQueue(function(t,n,r,i){e.__waitForReady(function(){t.executeSql("DELETE FROM "+idbModules.util.quote(e.name),[],function(e,t){idbModules.DEBUG&&console.log("Cleared all records from database",t.rowsAffected);r()},function(e,t){i(t)})})})};IDBObjectStore.prototype.count=function(e){var t=this;return t.transaction.__addToTransactionQueue(function(n,r,i,s){t.__waitForReady(function(){var r="SELECT * FROM "+idbModules.util.quote(t.name)+(typeof e!=="undefined"?" WHERE key = ?":"");var o=[];typeof e!=="undefined"&&o.push(idbModules.Key.encode(e));n.executeSql(r,o,function(e,t){i(t.rows.length)},function(e,t){s(t)})})})};IDBObjectStore.prototype.openCursor=function(e,t){var n=new idbModules.IDBRequest;var r=new idbModules.IDBCursor(e,t,this,n,"key","value");return n};IDBObjectStore.prototype.index=function(e){var t=new idbModules.IDBIndex(e,this);return t};IDBObjectStore.prototype.createIndex=function(e,t,n){var r=this;n=n||{};r.__setReadyState("createIndex",false);var i=new idbModules.IDBIndex(e,r);r.__waitForReady(function(){i.__createIndex(e,t,n)},"createObjectStore");r.indexNames.push(e);return i};IDBObjectStore.prototype.deleteIndex=function(e){var t=new idbModules.IDBIndex(e,this,false);t.__deleteIndex(e);return t};idbModules.IDBObjectStore=IDBObjectStore})(idbModules);"use strict";(function(e){var t=0;var n=1;var r=2;var i=function(r,i,s){if(typeof i==="number"){this.mode=i;i!==2&&e.DEBUG&&console.log("Mode should be a string, but was specified as ",i)}else if(typeof i==="string"){switch(i){case"readwrite":this.mode=n;break;case"readonly":this.mode=t;break;default:this.mode=t;break}}this.storeNames=typeof r==="string"?[r]:r;for(var o=0;o<this.storeNames.length;o++){if(!s.objectStoreNames.contains(this.storeNames[o])){e.util.throwDOMException(0,"The operation failed because the requested database object could not be found. For example, an object store did not exist but was being opened.",this.storeNames[o])}}this.__active=true;this.__running=false;this.__requests=[];this.__aborted=false;this.db=s;this.error=null;this.onabort=this.onerror=this.oncomplete=null;var u=this};i.prototype.__executeRequests=function(){if(this.__running&&this.mode!==r){e.DEBUG&&console.log("Looks like the request set is already running",this.mode);return}this.__running=true;var t=this;window.setTimeout(function(){if(t.mode!==2&&!t.__active){e.util.throwDOMException(0,"A request was placed against a transaction which is currently not active, or which is finished",t.__active)}t.db.__db.transaction(function(n){function s(t,n){if(n){r.req=n}r.req.readyState="done";r.req.result=t;delete r.req.error;var s=e.Event("success");e.util.callback("onsuccess",r.req,s);i++;u()}function o(t){r.req.readyState="done";r.req.error="DOMError";var n=e.Event("error",arguments);e.util.callback("onerror",r.req,n);i++;u()}function u(){if(i>=t.__requests.length){t.__active=false;t.__requests=[];return}r=t.__requests[i];r.op(n,r.args,s,o)}t.__tx=n;var r=null,i=0;try{u()}catch(a){e.DEBUG&&console.log("An exception occured in transaction",arguments);typeof t.onerror==="function"&&t.onerror()}},function(){e.DEBUG&&console.log("An error in transaction",arguments);typeof t.onerror==="function"&&t.onerror()},function(){e.DEBUG&&console.log("Transaction completed",arguments);typeof t.oncomplete==="function"&&t.oncomplete()})},1)};i.prototype.__addToTransactionQueue=function(t,n){if(!this.__active&&this.mode!==r){e.util.throwDOMException(0,"A request was placed against a transaction which is currently not active, or which is finished.",this.__mode)}var i=this.__createRequest();this.__pushToQueue(i,t,n);return i};i.prototype.__createRequest=function(){var t=new e.IDBRequest;t.source=this.db;t.transaction=this;return t};i.prototype.__pushToQueue=function(e,t,n){this.__requests.push({op:t,args:n,req:e});this.__executeRequests()};i.prototype.objectStore=function(t){return new e.IDBObjectStore(t,this)};i.prototype.abort=function(){!this.__active&&e.util.throwDOMException(0,"A request was placed against a transaction which is currently not active, or which is finished",this.__active)};i.prototype.READ_ONLY=0;i.prototype.READ_WRITE=1;i.prototype.VERSION_CHANGE=2;e.IDBTransaction=i})(idbModules);"use strict";(function(e){var t=function(t,n,r,i){this.__db=t;this.version=r;this.__storeProperties=i;this.objectStoreNames=new e.util.StringList;for(var s=0;s<i.rows.length;s++){this.objectStoreNames.push(i.rows.item(s).name)}this.name=n;this.onabort=this.onerror=this.onversionchange=null};t.prototype.createObjectStore=function(t,n){var r=this;n=n||{};n.keyPath=n.keyPath||null;var i=new e.IDBObjectStore(t,r.__versionTransaction,false);var s=r.__versionTransaction;s.__addToTransactionQueue(function(s,o,u,a){function f(){e.util.throwDOMException(0,"Could not create new object store",arguments)}if(!r.__versionTransaction){e.util.throwDOMException(0,"Invalid State error",r.transaction)}var l=["CREATE TABLE",e.util.quote(t),"(key BLOB",n.autoIncrement?", inc INTEGER PRIMARY KEY AUTOINCREMENT":"PRIMARY KEY",", value BLOB)"].join(" ");e.DEBUG&&console.log(l);s.executeSql(l,[],function(e,r){e.executeSql("INSERT INTO __sys__ VALUES (?,?,?,?)",[t,n.keyPath,n.autoIncrement?true:false,"{}"],function(){i.__setReadyState("createObjectStore",true);u(i)},f)},f)});r.objectStoreNames.push(t);return i};t.prototype.deleteObjectStore=function(t){var n=function(){e.util.throwDOMException(0,"Could not delete ObjectStore",arguments)};var r=this;!r.objectStoreNames.contains(t)&&n("Object Store does not exist");r.objectStoreNames.splice(r.objectStoreNames.indexOf(t),1);var i=r.__versionTransaction;i.__addToTransactionQueue(function(i,s,o,u){if(!r.__versionTransaction){e.util.throwDOMException(0,"Invalid State error",r.transaction)}r.__db.transaction(function(r){r.executeSql("SELECT * FROM __sys__ where name = ?",[t],function(r,i){if(i.rows.length>0){r.executeSql("DROP TABLE "+e.util.quote(t),[],function(){r.executeSql("DELETE FROM __sys__ WHERE name = ?",[t],function(){},n)},n)}})})})};t.prototype.close=function(){};t.prototype.transaction=function(t,n){var r=new e.IDBTransaction(t,n||1,this);return r};e.IDBDatabase=t})(idbModules);"use strict";(function(e){var t=4*1024*1024;if(!window.openDatabase){return}var n=window.openDatabase("__sysdb__",1,"System Database",t);n.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS dbVersions (name VARCHAR(255), version INT);",[],function(){},function(){e.util.throwDOMException("Could not create table __sysdb__ to save DB versions")})});var r={open:function(r,i){function u(){if(o){return}var t=e.Event("error",arguments);s.readyState="done";s.error="DOMError";e.util.callback("onerror",s,t);o=true}function a(o){var a=window.openDatabase(r,1,r,t);s.readyState="done";if(typeof i==="undefined"){i=o||1}if(i<=0||o>i){e.util.throwDOMException(0,"An attempt was made to open a database using a lower version than the existing version.",i)}a.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS __sys__ (name VARCHAR(255), keyPath VARCHAR(255), autoInc BOOLEAN, indexList BLOB)",[],function(){t.executeSql("SELECT * FROM __sys__",[],function(t,f){var l=e.Event("success");s.source=s.result=new e.IDBDatabase(a,r,i,f);if(o<i){n.transaction(function(t){t.executeSql("UPDATE dbVersions set version = ? where name = ?",[i,r],function(){var t=e.Event("upgradeneeded");t.oldVersion=o;t.newVersion=i;s.transaction=s.result.__versionTransaction=new e.IDBTransaction([],2,s.source);e.util.callback("onupgradeneeded",s,t,function(){var t=e.Event("success");e.util.callback("onsuccess",s,t)})},u)},u)}else{e.util.callback("onsuccess",s,l)}},u)},u)},u)}var s=new e.IDBOpenRequest;var o=false;n.transaction(function(e){e.executeSql("SELECT * FROM dbVersions where name = ?",[r],function(e,t){if(t.rows.length===0){e.executeSql("INSERT INTO dbVersions VALUES (?,?)",[r,i||1],function(){a(0)},u)}else{a(t.rows.item(0).version)}},u)},u);return s},deleteDatabase:function(r){function o(t){if(s){return}i.readyState="done";i.error="DOMError";var n=e.Event("error");n.message=t;n.debug=arguments;e.util.callback("onerror",i,n);s=true}function a(){n.transaction(function(t){t.executeSql("DELETE FROM dbVersions where name = ? ",[r],function(){i.result=undefined;var t=e.Event("success");t.newVersion=null;t.oldVersion=u;e.util.callback("onsuccess",i,t)},o)},o)}var i=new e.IDBOpenRequest;var s=false;var u=null;n.transaction(function(n){n.executeSql("SELECT * FROM dbVersions where name = ?",[r],function(n,s){if(s.rows.length===0){i.result=undefined;var f=e.Event("success");f.newVersion=null;f.oldVersion=u;e.util.callback("onsuccess",i,f);return}u=s.rows.item(0).version;var l=window.openDatabase(r,1,r,t);l.transaction(function(t){t.executeSql("SELECT * FROM __sys__",[],function(t,n){var r=n.rows;(function i(n){if(n>=r.length){t.executeSql("DROP TABLE __sys__",[],function(){a()},o)}else{t.executeSql("DROP TABLE "+e.util.quote(r.item(n).name),[],function(){i(n+1)},function(){i(n+1)})}})(0)},function(e){a()})},o)})},o);return i},cmp:function(t,n){return e.Key.encode(t)>e.Key.encode(n)?1:t===n?0:-1}};e.shimIndexedDB=r})(idbModules);"use strict";(function(e,t){if(typeof e.openDatabase!=="undefined"){e.shimIndexedDB=t.shimIndexedDB;if(e.shimIndexedDB){e.shimIndexedDB.__useShim=function(){e.indexedDB=t.shimIndexedDB;e.IDBDatabase=t.IDBDatabase;e.IDBTransaction=t.IDBTransaction;e.IDBCursor=t.IDBCursor;e.IDBKeyRange=t.IDBKeyRange};e.shimIndexedDB.__debug=function(e){t.DEBUG=e}}}e.indexedDB=e.indexedDB||e.webkitIndexedDB||e.mozIndexedDB||e.oIndexedDB||e.msIndexedDB;if(typeof e.indexedDB==="undefined"&&typeof e.openDatabase!=="undefined"){e.shimIndexedDB.__useShim()}else{e.IDBDatabase=e.IDBDatabase||e.webkitIDBDatabase;e.IDBTransaction=e.IDBTransaction||e.webkitIDBTransaction;e.IDBCursor=e.IDBCursor||e.webkitIDBCursor;e.IDBKeyRange=e.IDBKeyRange||e.webkitIDBKeyRange;if(!e.IDBTransaction){e.IDBTransaction={}}e.IDBTransaction.READ_ONLY=e.IDBTransaction.READ_ONLY||"readonly";e.IDBTransaction.READ_WRITE=e.IDBTransaction.READ_WRITE||"readwrite"}})(window,idbModules)}(window));