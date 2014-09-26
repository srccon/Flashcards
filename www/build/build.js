
/*
 RequireJS 2.1.9 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(Z){function H(b){return"[object Function]"===L.call(b)}function I(b){return"[object Array]"===L.call(b)}function y(b,c){if(b){var e;for(e=0;e<b.length&&(!b[e]||!c(b[e],e,b));e+=1);}}function M(b,c){if(b){var e;for(e=b.length-1;-1<e&&(!b[e]||!c(b[e],e,b));e-=1);}}function t(b,c){return ga.call(b,c)}function l(b,c){return t(b,c)&&b[c]}function F(b,c){for(var e in b)if(t(b,e)&&c(b[e],e))break}function Q(b,c,e,h){c&&F(c,function(c,j){if(e||!t(b,j))h&&"string"!==typeof c?(b[j]||(b[j]={}),Q(b[j],
c,e,h)):b[j]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function aa(b){throw b;}function ba(b){if(!b)return b;var c=Z;y(b.split("."),function(b){c=c[b]});return c}function A(b,c,e,h){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=h;e&&(c.originalError=e);return c}function ha(b){function c(a,f,b){var d,m,c,g,e,h,j,i=f&&f.split("/");d=i;var n=k.map,p=n&&n["*"];if(a&&"."===a.charAt(0))if(f){d=l(k.pkgs,f)?i=[f]:i.slice(0,i.length-
1);f=a=d.concat(a.split("/"));for(d=0;f[d];d+=1)if(m=f[d],"."===m)f.splice(d,1),d-=1;else if(".."===m)if(1===d&&(".."===f[2]||".."===f[0]))break;else 0<d&&(f.splice(d-1,2),d-=2);d=l(k.pkgs,f=a[0]);a=a.join("/");d&&a===f+"/"+d.main&&(a=f)}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&n&&(i||p)){f=a.split("/");for(d=f.length;0<d;d-=1){c=f.slice(0,d).join("/");if(i)for(m=i.length;0<m;m-=1)if(b=l(n,i.slice(0,m).join("/")))if(b=l(b,c)){g=b;e=d;break}if(g)break;!h&&(p&&l(p,c))&&(h=l(p,c),j=d)}!g&&
h&&(g=h,e=j);g&&(f.splice(0,e,g),a=f.join("/"))}return a}function e(a){z&&y(document.getElementsByTagName("script"),function(f){if(f.getAttribute("data-requiremodule")===a&&f.getAttribute("data-requirecontext")===i.contextName)return f.parentNode.removeChild(f),!0})}function h(a){var f=l(k.paths,a);if(f&&I(f)&&1<f.length)return f.shift(),i.require.undef(a),i.require([a]),!0}function $(a){var f,b=a?a.indexOf("!"):-1;-1<b&&(f=a.substring(0,b),a=a.substring(b+1,a.length));return[f,a]}function n(a,f,
b,d){var m,B,g=null,e=f?f.name:null,h=a,j=!0,k="";a||(j=!1,a="_@r"+(L+=1));a=$(a);g=a[0];a=a[1];g&&(g=c(g,e,d),B=l(r,g));a&&(g?k=B&&B.normalize?B.normalize(a,function(a){return c(a,e,d)}):c(a,e,d):(k=c(a,e,d),a=$(k),g=a[0],k=a[1],b=!0,m=i.nameToUrl(k)));b=g&&!B&&!b?"_unnormalized"+(M+=1):"";return{prefix:g,name:k,parentMap:f,unnormalized:!!b,url:m,originalName:h,isDefine:j,id:(g?g+"!"+k:k)+b}}function q(a){var f=a.id,b=l(p,f);b||(b=p[f]=new i.Module(a));return b}function s(a,f,b){var d=a.id,m=l(p,
d);if(t(r,d)&&(!m||m.defineEmitComplete))"defined"===f&&b(r[d]);else if(m=q(a),m.error&&"error"===f)b(m.error);else m.on(f,b)}function v(a,f){var b=a.requireModules,d=!1;if(f)f(a);else if(y(b,function(f){if(f=l(p,f))f.error=a,f.events.error&&(d=!0,f.emit("error",a))}),!d)j.onError(a)}function w(){R.length&&(ia.apply(G,[G.length-1,0].concat(R)),R=[])}function x(a){delete p[a];delete T[a]}function E(a,f,b){var d=a.map.id;a.error?a.emit("error",a.error):(f[d]=!0,y(a.depMaps,function(d,c){var g=d.id,
e=l(p,g);e&&(!a.depMatched[c]&&!b[g])&&(l(f,g)?(a.defineDep(c,r[g]),a.check()):E(e,f,b))}),b[d]=!0)}function C(){var a,f,b,d,m=(b=1E3*k.waitSeconds)&&i.startTime+b<(new Date).getTime(),c=[],g=[],j=!1,l=!0;if(!U){U=!0;F(T,function(b){a=b.map;f=a.id;if(b.enabled&&(a.isDefine||g.push(b),!b.error))if(!b.inited&&m)h(f)?j=d=!0:(c.push(f),e(f));else if(!b.inited&&(b.fetched&&a.isDefine)&&(j=!0,!a.prefix))return l=!1});if(m&&c.length)return b=A("timeout","Load timeout for modules: "+c,null,c),b.contextName=
i.contextName,v(b);l&&y(g,function(a){E(a,{},{})});if((!m||d)&&j)if((z||da)&&!V)V=setTimeout(function(){V=0;C()},50);U=!1}}function D(a){t(r,a[0])||q(n(a[0],null,!0)).init(a[1],a[2])}function J(a){var a=a.currentTarget||a.srcElement,b=i.onScriptLoad;a.detachEvent&&!W?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=i.onScriptError;(!a.detachEvent||W)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function K(){var a;for(w();G.length;){a=
G.shift();if(null===a[0])return v(A("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));D(a)}}var U,X,i,N,V,k={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},p={},T={},Y={},G=[],r={},S={},L=1,M=1;N={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=r[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b=
l(k.pkgs,a.map.id);return(b?l(k.config,a.map.id+"/"+b.main):l(k.config,a.map.id))||{}},exports:r[a.map.id]}}};X=function(a){this.events=l(Y,a.id)||{};this.map=a;this.shim=l(k.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};X.prototype={init:function(a,b,c,d){d=d||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;
this.ignore=d.ignore;d.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;S[a]||(S[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var d=this.exports,m=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(H(m)){if(this.events.error&&this.map.isDefine||j.onError!==aa)try{d=i.execCb(c,m,b,d)}catch(e){a=e}else d=i.execCb(c,m,b,d);this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==
this.exports?d=b.exports:void 0===d&&this.usingExports&&(d=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",v(this.error=a)}else d=m;this.exports=d;if(this.map.isDefine&&!this.ignore&&(r[c]=d,j.onResourceLoad))j.onResourceLoad(i,this.map,this.depMaps);x(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=
!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,e=n(a.prefix);this.depMaps.push(e);s(e,"defined",u(this,function(d){var m,e;e=this.map.name;var g=this.map.parentMap?this.map.parentMap.name:null,h=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(d.normalize&&(e=d.normalize(e,function(a){return c(a,g,!0)})||""),d=n(a.prefix+"!"+e,this.map.parentMap),s(d,"defined",u(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),
e=l(p,d.id)){this.depMaps.push(d);if(this.events.error)e.on("error",u(this,function(a){this.emit("error",a)}));e.enable()}}else m=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),m.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];F(p,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&x(a.map.id)});v(a)}),m.fromText=u(this,function(d,c){var e=a.name,g=n(e),B=O;c&&(d=c);B&&(O=!1);q(g);t(k.config,b)&&(k.config[e]=k.config[b]);try{j.exec(d)}catch(ca){return v(A("fromtexteval",
"fromText eval for "+b+" failed: "+ca,ca,[b]))}B&&(O=!0);this.depMaps.push(g);i.completeLoad(e);h([e],m)}),d.load(a.name,h,m,k)}));i.enable(e,this);this.pluginMaps[e.id]=e},enable:function(){T[this.map.id]=this;this.enabling=this.enabled=!0;y(this.depMaps,u(this,function(a,b){var c,d;if("string"===typeof a){a=n(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=l(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;s(a,"defined",u(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&s(a,"error",u(this,this.errback))}c=a.id;d=p[c];!t(N,c)&&(d&&!d.enabled)&&i.enable(a,this)}));F(this.pluginMaps,u(this,function(a){var b=l(p,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){y(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:k,contextName:b,registry:p,defined:r,urlFetched:S,defQueue:G,Module:X,makeModuleMap:n,
nextTick:j.nextTick,onError:v,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=k.pkgs,c=k.shim,d={paths:!0,config:!0,map:!0};F(a,function(a,b){d[b]?"map"===b?(k.map||(k.map={}),Q(k[b],a,!0,!0)):Q(k[b],a,!0):k[b]=a});a.shim&&(F(a.shim,function(a,b){I(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);c[b]=a}),k.shim=c);a.packages&&(y(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,
location:a.location||a.name,main:(a.main||"main").replace(ja,"").replace(ea,"")}}),k.pkgs=b);F(p,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=n(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(Z,arguments));return b||a.exports&&ba(a.exports)}},makeRequire:function(a,f){function h(d,c,e){var g,k;f.enableBuildCallback&&(c&&H(c))&&(c.__requireJsBuild=!0);if("string"===typeof d){if(H(c))return v(A("requireargs",
"Invalid require call"),e);if(a&&t(N,d))return N[d](p[a.id]);if(j.get)return j.get(i,d,a,h);g=n(d,a,!1,!0);g=g.id;return!t(r,g)?v(A("notloaded",'Module name "'+g+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):r[g]}K();i.nextTick(function(){K();k=q(n(null,a));k.skipMap=f.skipMap;k.init(d,c,e,{enabled:!0});C()});return h}f=f||{};Q(h,{isBrowser:z,toUrl:function(b){var f,e=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==e&&(!("."===g||".."===g)||1<e))f=b.substring(e,b.length),b=
b.substring(0,e);return i.nameToUrl(c(b,a&&a.id,!0),f,!0)},defined:function(b){return t(r,n(b,a,!1,!0).id)},specified:function(b){b=n(b,a,!1,!0).id;return t(r,b)||t(p,b)}});a||(h.undef=function(b){w();var c=n(b,a,!0),f=l(p,b);e(b);delete r[b];delete S[c.url];delete Y[b];f&&(f.events.defined&&(Y[b]=f.events),x(b))});return h},enable:function(a){l(p,a.id)&&q(a).enable()},completeLoad:function(a){var b,c,d=l(k.shim,a)||{},e=d.exports;for(w();G.length;){c=G.shift();if(null===c[0]){c[0]=a;if(b)break;b=
!0}else c[0]===a&&(b=!0);D(c)}c=l(p,a);if(!b&&!t(r,a)&&c&&!c.inited){if(k.enforceDefine&&(!e||!ba(e)))return h(a)?void 0:v(A("nodefine","No define call for "+a,null,[a]));D([a,d.deps||[],d.exportsFn])}C()},nameToUrl:function(a,b,c){var d,e,h,g,i,n;if(j.jsExtRegExp.test(a))g=a+(b||"");else{d=k.paths;e=k.pkgs;g=a.split("/");for(i=g.length;0<i;i-=1)if(n=g.slice(0,i).join("/"),h=l(e,n),n=l(d,n)){I(n)&&(n=n[0]);g.splice(0,i,n);break}else if(h){a=a===h.name?h.location+"/"+h.main:h.location;g.splice(0,i,
a);break}g=g.join("/");g+=b||(/^data\:|\?/.test(g)||c?"":".js");g=("/"===g.charAt(0)||g.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+g}return k.urlArgs?g+((-1===g.indexOf("?")?"?":"&")+k.urlArgs):g},load:function(a,b){j.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ka.test((a.currentTarget||a.srcElement).readyState))P=null,a=J(a),i.completeLoad(a.id)},onScriptError:function(a){var b=J(a);if(!h(b.id))return v(A("scripterror","Script error for: "+b.id,
a,[b.id]))}};i.require=i.makeRequire();return i}var j,w,x,C,J,D,P,K,q,fa,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/\.js$/,ja=/^\.\//;w=Object.prototype;var L=w.toString,ga=w.hasOwnProperty,ia=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),da=!z&&"undefined"!==typeof importScripts,ka=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,W="undefined"!==typeof opera&&
"[object Opera]"===opera.toString(),E={},s={},R=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(H(requirejs))return;s=requirejs;requirejs=void 0}"undefined"!==typeof require&&!H(require)&&(s=require,require=void 0);j=requirejs=function(b,c,e,h){var q,n="_";!I(b)&&"string"!==typeof b&&(q=b,I(c)?(b=c,c=e,e=h):b=[]);q&&q.context&&(n=q.context);(h=l(E,n))||(h=E[n]=j.s.newContext(n));q&&h.configure(q);return h.require(b,c,e)};j.config=function(b){return j(b)};j.nextTick="undefined"!==
typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=j);j.version="2.1.9";j.jsExtRegExp=/^\/|:|\?|\.js$/;j.isBrowser=z;w=j.s={contexts:E,newContext:ha};j({});y(["toUrl","undef","defined","specified"],function(b){j[b]=function(){var c=E._;return c.require[b].apply(c,arguments)}});if(z&&(x=w.head=document.getElementsByTagName("head")[0],C=document.getElementsByTagName("base")[0]))x=w.head=C.parentNode;j.onError=aa;j.createNode=function(b){var c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml",
"html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};j.load=function(b,c,e){var h=b&&b.config||{};if(z)return h=j.createNode(h,c,e),h.setAttribute("data-requirecontext",b.contextName),h.setAttribute("data-requiremodule",c),h.attachEvent&&!(h.attachEvent.toString&&0>h.attachEvent.toString().indexOf("[native code"))&&!W?(O=!0,h.attachEvent("onreadystatechange",b.onScriptLoad)):(h.addEventListener("load",b.onScriptLoad,!1),h.addEventListener("error",
b.onScriptError,!1)),h.src=e,K=h,C?x.insertBefore(h,C):x.appendChild(h),K=null,h;if(da)try{importScripts(e),b.completeLoad(c)}catch(l){b.onError(A("importscripts","importScripts failed for "+c+" at "+e,l,[c]))}};z&&!s.skipDataMain&&M(document.getElementsByTagName("script"),function(b){x||(x=b.parentNode);if(J=b.getAttribute("data-main"))return q=J,s.baseUrl||(D=q.split("/"),q=D.pop(),fa=D.length?D.join("/")+"/":"./",s.baseUrl=fa),q=q.replace(ea,""),j.jsExtRegExp.test(q)&&(q=J),s.deps=s.deps?s.deps.concat(q):
[q],!0});define=function(b,c,e){var h,j;"string"!==typeof b&&(e=c,c=b,b=null);I(c)||(e=c,c=null);!c&&H(e)&&(c=[],e.length&&(e.toString().replace(la,"").replace(ma,function(b,e){c.push(e)}),c=(1===e.length?["require"]:["require","exports","module"]).concat(c)));if(O){if(!(h=K))P&&"interactive"===P.readyState||M(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return P=b}),h=P;h&&(b||(b=h.getAttribute("data-requiremodule")),j=E[h.getAttribute("data-requirecontext")])}(j?
j.defQueue:R).push([b,c,e])};define.amd={jQuery:!0};j.exec=function(b){return eval(b)};j(s)}})(this);

define("libs/require.js", function(){});

/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

define('modules/utils',['app'],function() {

	var Utils = {}, App;
	
	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Utils.initialize = function() {

		App = require("app");

		App.$(window).on("resize", function(e) {

			var $notification = App.$("#notification");

			if ($notification.length) {
				$notification.css({
					top: App.$(window).height() - $notification[0].offsetHeight*2,
					left: App.$(window).width()/2 - $notification[0].offsetWidth/2
				});
			}

			var $dialog = App.$("#dialog");

			if ($dialog.length) {
				$dialog.css({
					top: App.$(window).height()/2 - $dialog.height()/2,
					left: App.$(window).width()/2 - $dialog.width()/2,
					width: App.$("body").width() / 100 * 70
				});
			}
		});
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Utils.events = {
		"click #dialog .close, #dialog-modal, #dialog input[type=button]": function() {
			App.$("#dialog, #dialog-modal").hide();
			if (Utils.dialog.onclose) { Utils.dialog.onclose(); }
		}
	};

	/* ================== */
	/* ====== RAND ====== */
	/* ================== */

	Utils.rand = function(min, max, toFloat) {
		var random = Math.random() * (max-min) + min;
		return toFloat ? random : Math.round(random);
	};

	/* ========================== */
	/* ====== LOCALSTORAGE ====== */
	/* ========================== */

	Utils.localStorage = function(key, value) {
		if (key !== undefined && value !== undefined) {
			// Phonegap hack ?
			window.localStorage.removeItem(key);
			window.localStorage.setItem(key, JSON.stringify(value));
		} else if (key !== undefined) {
			return JSON.parse(window.localStorage.getItem(key));
		}
	};

	/* ========================= */
	/* ====== ESCAPE HTML ====== */
	/* ========================= */

	Utils.escapeHTML = function(str) {
		return str
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	};

	/* =========================== */
	/* ====== UNESCAPE HTML ====== */
	/* =========================== */

	Utils.unescapeHTML = function(str) {
		return str
		  .replace(/&amp;/g, "&")
		  .replace(/&lt;/g, "<")
		  .replace(/&gt;/g, ">")
		  .replace(/&quot;/g, "\"")
		  .replace(/&#039;/g, "'");
	};

	/* ==================== */
	/* ====== DIALOG ====== */
	/* ==================== */

	Utils.dialog = function(title, content, onclose) {

		var $dialog = App.$("#dialog"), $input, $btn_ok;

		if (!$dialog.length) {

			App.$("body").append(
				"<div id='dialog'>" +
					"<span class='close fa fa-times'></span>" +
					"<div class='title'></div>" +
					"<div class='content'></div>" +
					"<div class='buttons'>" +
						"<input type='button' class='button' name='dialog-ok' value='ok'>" +
						"<input type='button' class='button' name='dialog-cancel' value='cancel'>" +
					"</div>" +
				"</div>"
			);

			App.$("body").append("<div id='dialog-modal'>");
			$dialog = App.$("#dialog");
		}

		$dialog.find(".title").html(title);
		$dialog.find(".content").html("");
		$dialog.find(".buttons").toggle(!!content.buttons);

		if (typeof content == "string") {

			$dialog.find(".content").html(content);

		} else {

			if (content.content) { $dialog.find(".content").html(content.content); }

			if (content.buttons) {

				$btn_ok = $dialog.find(".buttons input[name='dialog-ok']");
				$btn_ok.off("click").on("click", content.buttons.ok);
				$btn_ok.toggle(!!content.buttons.ok);

				$dialog.find(".buttons input[name='dialog-cancel']").toggle(!!content.buttons.cancel);
				$dialog.find(".buttons").show();
			}

			if (content.input) {

				$input = App.$("<input type='text'>");

				$input.attr({
					name: content.input.name,
					value: content.input.value || ""
				});

				if (content.input.placeholder)
				{ $input.attr("placeholder", content.input.placeholder); }

				$dialog.find(".content").append($input);
			}
		}

		var width = App.$("body").width() / 100 * 70;

		$dialog.css({
			top: App.$(window).height()/2 - $dialog.height()/2,
			left: App.$(window).width()/2 - width/2,
			width: width
		}).show();

		Utils.dialog.onclose = onclose;

		App.$("#dialog-modal").show();
		if ($input && content.input && content.input.focus) { $input.focus(); }
	};

	/* ========================== */
	/* ====== NOTIFICATION ====== */
	/* ========================== */

	Utils.notification = function(str, duration) {
		if (!duration) { duration = 2000; }

		var $notification = App.$("#notification");

		if (!$notification.length) {
			App.$("body").append("<div id='notification'></div>");
			$notification = App.$("#notification");
		}

		$notification.html(str).css({
			opacity: 0,
			display: "inline-block"
		});

		$notification.css({
			top: App.$(window).height() - $notification[0].offsetHeight*2,
			left: App.$(window).width()/2 - $notification[0].offsetWidth/2
		});

		$notification.stop(true, true).finish(true, true).animate({
			opacity: 1
		}).delay(duration).fadeOut();
	};

	/* =========================== */
	/* ====== ARRAY SHUFFLE ====== */
	/* =========================== */

	Utils.array_shuffle = function(arr) {
		var count = arr.length, temp, index;

		while (count--) {
			index = (Math.random() * count) | 0;
			temp = arr[count];
			arr[count] = arr[index];
			arr[index] = temp;
		}

		return arr;
	};

	/* ========================== */
	/* ====== FORCE RENDER ====== */
	/* ========================== */

	Utils.forceRender = function($elem) {
		$elem.hide();
		var foo = $elem[0].offsetHeight;
		$elem.show();
	};

	/* ====================== */
	/* ====== MARKDOWN ====== */
	/* ====================== */

	Utils.markdown = function(str, remove) {

		// Ruby tags: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby

		return str
		  .replace(/\[([^}]+)\]{([^{]+)}/g, remove ? "$1" : "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>")
		  .replace(/([^}]+){([^{]+)}/g, remove ? "$1" : "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>")
		  .replace(/\*\*\*(.+)\*\*\*/g, remove ? "$1" : "<b><i>$1</i></b>")
		  .replace(/\*\*(.+)\*\*/g, remove ? "$1" : "<b>$1</b>")
		  .replace(/\*(.+)\*/g, remove ? "$1" : "<i>$1</i>");
	};

	/* ============================= */
	/* ====== TRANSLATE RANGE ====== */
	/* ============================= */

	Utils.translateRange = function(val, a0, b0, a1, b1) {
		return ((val-a0)/(b0-a0)) * (b1-a1) + a1;
	};

	/* =================== */
	/* ====== SPEAK ====== */
	/* =================== */

	Utils.speak = function(text, langCode, callback) {
		
		if (!(window.speechSynthesis || window.SpeechSynthesisUtterance))
		{ return callback && callback(); }

		window.clearTimeout(Utils.speak.timeout);
		
		var u = new window.SpeechSynthesisUtterance();
		
		u.text = Utils.unescapeHTML(text);
		u.lang = langCode;
		u.rate = 1.0;

		Utils.speak.status = false;

		u.onend = function() {
			Utils.speak.status = true;
			if (callback) { callback(); }
		};

		window.speechSynthesis.speak(u);

		Utils.speak.timeout = window.setTimeout(function() {
			if (!Utils.speak.status) {
				Utils.notification("Loading TTS-Engine, please wait...", 1000);
			}
		}, 3000);
	};

	return Utils;
});
define('modules/router',['app'],function() {

	var Router = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Router.initialize = function() {

		App = require("app");
		Router.templates = {};

		// Store page templates
		App.$("[data-template=true]").each(function() {
			Router.templates[$(this).attr("id")] = App.$(this).html();
		});

		window.addEventListener("hashchange", Router.route, false);
		Router.route();

		window.setTimeout(function() {
			App.$("#splash-screen").fadeOut();
		}, 1000);
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Router.events = {

		// Show android menu
		"click .button-android-menu": function(e) {

			var $actions = App.Router.$page.find(".actions");
			$actions.toggleClass("android-menu");
			App.Utils.forceRender($("body"));
		},

		// Hide android menu
		"click": function(e) {

			var $target = App.$(e.target);
			if ($target.parent().hasClass("button-android-menu")) { $target = $target.parent(); }

			if ($target.hasClass("button-android-menu")) { return; }
			App.$(".actions").removeClass("android-menu");
		}
	};

	/* ==================== */
	/* ====== ROUTES ====== */
	/* ==================== */

	Router.routes = {

		"page-stacks": function() {
			App.Stacks.updateView();
		},

		"page-statistics": function() {
			App.Statistics.updateView();
		},

		"page-quiz": function(id) {
			App.Stacks.quiz.initialize(+id);
		},

		"page-flashcard-new": function(stackID) {
			App.Stacks.get(+stackID, function(stack) {
				Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
			});
		},
		
		"page-file-browser": function() {
			if (!App.isPhoneGap) { return; }
			App.Utils.PhoneGap.currentDir = "/mnt/sdcard/";
			App.Utils.PhoneGap.updateView();
		},

		"page-flashcard-edit": function(stackID, key) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {

				// Get all flashcards for that stack
				App.Flashcards.get(+key, function(data) {

					var tags = data.tags || [];
					if (typeof tags == "string") { tags = JSON.parse(tags); }

					Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
					Router.$page.find("textarea[name=front]").val(App.Utils.unescapeHTML(data.front));
					Router.$page.find("textarea[name=back]").val(App.Utils.unescapeHTML(data.back));
					Router.$page.find("input[name=tags]").val(tags.join(", "));
				});
			});
		},

		"page-stack-settings": function(stackID) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {
				Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);

				var prefs = App._settings.translation_preferences && App._settings.translation_preferences[stackID];
				var $select = App.$("select.languages");

				App.Flashcards.translate.languages.forEach(function(v, i) {
					var code = App.Flashcards.translate.language_codes[i];
					$select.append("<option value='" + code + "'>" + v + "</option>");
				});

				if (prefs) {
					App.$("select.from").find("option[value=" + prefs.from + "]").attr("selected", "selected");
					App.$("select.to").find("option[value=" + prefs.to + "]").attr("selected", "selected");
				}
			});
		},

		"page-search": function() {

			delete App.Stacks.current;
			Router.$page.find(".loading").show();

			App.Settings.export_json(function(data) {

				App._search = [];

				Object.keys(data).forEach(function(category) {
					Object.keys(data[category]).forEach(function(stack) {
						data[category][stack].forEach(function(v) {

							if (typeof v == "string") { return true; }

							v.category = category;
							v.stack = stack;

							v.value.tags = v.value.tags || [];
							if (typeof v.value.tags == "string") { v.value.tags = JSON.parse(v.value.tags); }

							v.value.score = v.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
							if (typeof v.value.score == "string") { v.value.score = JSON.parse(v.value.score); }

							v.value.score_front = v.value.score.front.yes - v.value.score.front.no;
							v.value.score_back = v.value.score.back.yes - v.value.score.back.no;

							App._search.push(v);
						});
					});
				});

				if ($(".sort-flashcards option[value=" + App._settings.sorting + "]").length) {
					$(".sort-flashcards select").val(App._settings.sorting);
					App._search.sort(App.Stacks.sortFn[App._settings.sorting]);
				}

				var $flashcards = Router.$page.find(".flashcards > tbody").html("");

				if (App._search.length) {
					App._search.forEach(function(v) {

						var class_front = "", class_back = "";

						if (v.value.score_front) { class_front = v.value.score_front > 0 ? "green" : "red"; }
						if (v.value.score_back) { class_back = v.value.score_back > 0 ? "green" : "red"; }

						$flashcards.append(
							"<tr data-key='" + v.key + "' data-stackID='" + v.value.stackID + "'>" +
								"<td>" + App.Utils.markdown(v.value.front) + " <span class='score " + class_front + "'>[" + Math.abs(v.value.score_front) + "]</span></td>" +
								"<td><span class='score " + class_back + "'>[" + Math.abs(v.value.score_back) + "]</span> " + App.Utils.markdown(v.value.back) + "</td>" +
							"</tr>"
						);
					});

					Router.$page.find(".note, .loading").hide();
					Router.$page.find(".stack-buttons, .flashcards, .sort-flashcards").show();
					$flashcards.parent().show();

				} else {
					Router.$page.find(".loading, .stack-buttons, .flashcards").hide();
					Router.$page.find(".note").show();
				}
			}, true);
		},

		"page-stack": function(stackID) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {

				App._search = [];

				// Get all flashcards for that stack
				App.Flashcards.getAll(+stackID, function(data) {

					if ($(".sort-flashcards option[value=" + App._settings.sorting + "]").length) {
						$(".sort-flashcards select").val(App._settings.sorting);
						data.sort(App.Stacks.sortFn[App._settings.sorting]);
					}

					App.Flashcards.current = data || [];
					Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
					var $flashcards = Router.$page.find(".flashcards > tbody").html("");

					if (data.length) {
						data.forEach(function(v) {

							v.stack = stack.name;
							v.category = stack.category;
							v.value.tags = v.value.tags || [];
							if (typeof v.value.tags == "string") { v.value.tags = JSON.parse(v.value.tags); }

							v.value.score = v.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
							if (typeof v.value.score == "string") { v.value.score = JSON.parse(v.value.score); }

							v.value.score_front = v.value.score.front.yes - v.value.score.front.no;
							v.value.score_back = v.value.score.back.yes - v.value.score.back.no;

							var class_front = "", class_back = "";

							if (v.value.score_front) { class_front = v.value.score_front > 0 ? "green" : "red"; }
							if (v.value.score_back) { class_back = v.value.score_back > 0 ? "green" : "red"; }

							$flashcards.append(
								"<tr data-key='" + v.key + "'>" +
									"<td>" + App.Utils.markdown(v.value.front) + " <span class='score " + class_front + "'>[" + Math.abs(v.value.score_front) + "]</span></td>" +
									"<td><span class='score " + class_back + "'>[" + Math.abs(v.value.score_back) + "]</span> " + App.Utils.markdown(v.value.back) + "</td>" +
								"</tr>"
							);

							App._search.push(v);
						});

						Router.$page.find(".note").hide();
						Router.$page.find(".stack-buttons, .flashcards, .sort-flashcards").show();
						$flashcards.parent().show();

					} else {
						Router.$page.find(".stack-buttons, .flashcards").hide();
						Router.$page.find(".note").show();
					}
				});
			});
		}
	};

	Router.registerArgs = function(page, args) {
		if (["stack", "stack-settings", "flashcard-edit", "flashcard-new"].indexOf(page) != -1) {
			App.Stacks.current = +window.location.hash.split(":")[1];
		}
	};

	/* =================== */
	/* ====== ROUTE ====== */
	/* =================== */

	Router.route = function(p) {

		var page = typeof p == "string" ? p : window.location.hash.substr(1),
		    args = page.split(":"),
		    hash = args.shift(),
		    $pageNext;

		Router._args = args;
		Router._hash = hash;

		// Temporary hack
		App.Stacks.practice.clearTimeouts();

		if (!App.$("#" + hash).length) { hash = "page-stacks"; }
		$pageNext = Router.$page = App.$("#" + hash);

		// Apply template if exists
		if (Router.templates[hash])
		{ $pageNext.html(Router.templates[hash]); }

		// Hide the previous page
		if (Router.currentPage) { App.$("#" + Router.currentPage).hide(); }

		// Register arguments in sub modules
		Router.registerArgs(hash.replace(/page-/, ""));

		// Call route function
		if (Router.routes[hash])
		{ Router.routes[hash].apply(this, args); }

		// Route to the new page
		if ($pageNext.hasClass("page")) {
			App.$("html").attr("class", hash);
			Router.currentPage = hash;
			$pageNext.show();
		}
	};

	/* ===================== */
	/* ====== REROUTE ====== */
	/* ===================== */

	Router.reroute = function() {
		if (Router.routes[Router._hash])
		{ Router.routes[Router._hash].apply(this, Router._args); }
	};

	return Router;
});
define('modules/settings',['app'],function() {

	var Settings = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Settings.initialize = function() {

		App = require("app");
		var setting, $elem;

		// Apply settings to UI
		for (setting in App._settings) {
			$elem = App.$("input[name=" + setting + "]");
			if (typeof App._settings[setting] == "boolean" && $elem.length)
			{ $elem.attr("checked", App._settings[setting]); }
		}

		if (App.Utils.localStorage("reset") == "true") {
			App.Utils.localStorage("reset", "false");
			App.Utils.notification("Reset successful");
		}
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Settings.events = {

		"click .button-export": function(e) { Settings.export_json(); },

		"click .button-import": function(e) {
			if (!App.isPhoneGap) { return; }
			e.preventDefault();
			window.location.hash = "page-file-browser";
		},

		"change .button-import input": function(e) {

			if (App.isPhoneGap) {
				e.preventDefault();
				return;
			}

			var reader = new FileReader();
			var fileName = e.target.files[0].name;
			var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
			var $target = App.$(e.currentTarget);

			if (extension != "json") { return App.Utils.notification("Only json files supported"); }

			reader.readAsText(e.target.files[0]);
			reader.onload = function(e) {
				Settings.import_json(e.target.result);
				$target.val("");
			};
		},

		"click .button-reset-all": function(e) {
			App.Utils.dialog("Confirm", {
				content: "Do you really wish to delete your entire stacks, flashcards and statistics?",
				buttons: {
					ok: function() { Settings.reset(); },
					cancel: true
				}
			});
		},

		"click .button-reset-statistics": function(e) {
			App.Utils.dialog("Confirm", {
				content: "Do you really wish to delete your statistics?",
				buttons: {
					ok: function() { Settings.reset_statistics(); },
					cancel: true
				}
			});
		},

		"change #page-settings input[type=checkbox]": function(e) {
			var what = App.$(e.currentTarget).attr("name");
			var status = App.$(e.currentTarget).is(":checked");
			Settings.set(what, status);
		},

		// Return to settings
		"click .button-return-settings": function(e) {
			window.location.hash = "#page-settings";
		},
	};

	/* ================= */
	/* ====== SET ====== */
	/* ================= */

	Settings.set = function(what, status) {

		var _settings = App.Utils.localStorage("settings") || {};
		_settings[what] = status;

		App.Utils.localStorage("settings", _settings);
		App._settings = _settings;
	};

	/* ========================= */
	/* ====== EXPORT JSON ====== */
	/* ========================= */

	Settings.export_json = (function() {

		var anchor = document.createElement("a"),
		    json_data, stackdata, stackdata_length, count,
		    interval, _callback, _parse,
		    
		    fn_export, fn_process,
		    fn_check, fn_serve;

		fn_export = function(callback) {

			_callback = callback;

			if (!callback)
			{ App.Utils.notification("Exporting..."); }

			App.Flashcards.get(null, function(data) {

				var stackID;
				json_data = {};
				stackdata = {};
				count = 0;

				[].forEach.call(data, function(v) {
					if (!stackdata[v.value.stackID]) { stackdata[v.value.stackID] = []; }
					stackdata[v.value.stackID].push(v);
				});

				stackdata_length = Object.keys(stackdata).length;

				for (stackID in stackdata)
				{ App.Stacks.get(+stackID, fn_process); }
			});
		};

		fn_process = function(stack) {

			var data = stackdata[stack.id],
			    prefs = App._settings.translation_preferences[stack.id];

			data = data.map(function(v) {

				if (_callback) { return v; }

				var card = {
					front: v.value.front,
					back: v.value.back,
					tags: v.value.tags,
					score: v.value.score
				};

				if (typeof v.value.tags == "string") {
					card.tags = JSON.parse(v.value.tags);
					if (typeof card.tags == "string") { card.tags = [card.tags]; }
				}

				if (typeof v.value.score == "string") {
					card.score = JSON.parse(v.value.score);
				}

				if (!card.tags || !card.tags.join("").length) { delete card.tags; }
				if (!card.score) { delete card.score; }

				return card;
			});

			if (prefs) { data.push(prefs.from + "|" + prefs.to); }

			if (!json_data[stack.category]) { json_data[stack.category] = {}; }
			json_data[stack.category][stack.name] = data;

			count++;
			fn_check();
		};

		fn_check = function() {
			if (count != stackdata_length) { return; }
			fn_serve();
		};

		fn_serve = function() {

			if (typeof _callback == "function") { return _callback(json_data); }
			var out = JSON.stringify(json_data, null, "\t");

			if (App.isPhoneGap) {

				var date = new Date(),

				    year = date.getFullYear(),
				    month = date.getMonth()+1,
				    day = date.getUTCDate(),
				    
				    hours = date.getHours(),
				    minutes = date.getMinutes(),
				    seconds = date.getUTCSeconds(),
				    dateString;

				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				dateString = year + "-" + month + "-" + day + "_" + hours + "-" + minutes + "-" + seconds;
				path = "flashcards/flashcards_" + dateString + ".json";

				App.Utils.PhoneGap.writeFile(path, out, function() {
					App.Utils.notification("Created file in: /sdcard/" + path);
				});

			} else {
				anchor.href = "data:application/json;charset=UTF-8;," + encodeURIComponent(out);
				anchor.download = "flashcards.json";
				anchor.click();
			}
		};

		return fn_export;

	}());

	/* ========================= */
	/* ====== IMPORT JSON ====== */
	/* ========================= */

	Settings.import_json = (function() {

		var json_data, imported, merged,
		    count, stack_length, interval,

		    fn_import, fn_stack_create,
		    fn_merge, fn_check, fn_report;


		fn_import = function(data) {

			App.Utils.notification("Importing...");

			json_data = data;

			// Parse json data
			if (typeof json_data != "object") {
				try {
					json_data = JSON.parse(json_data);
				} catch (err) {
					App.Utils.notification("An error occured while parsing the json file");
					return;
				}
			}

			var stack_names = [], stack_keys = [];

			imported = [];
			merged = [];
			count = 0;
			stack_length = 0;

			Object.keys(json_data).forEach(function(v) {
				stack_length += Object.keys(json_data[v]).length;
			});

			App.Stacks.getAll(function(data) {

				var category, stack;
				
				data.forEach(function(v) {
					stack_names.push(v.value.name);
					stack_keys.push(v.key);
				});

				for (category in json_data) {
					for (stack in json_data[category]) {

						// Stack doesn't exist, create it
						if (stack_names.indexOf(stack) == -1) {
							App.Stacks.create(category, stack, fn_stack_create, true);

						// Stack exists, merge them
						} else {

							var stackID = stack_keys[stack_names.indexOf(stack)];

							// Compare flashcards
							App.Flashcards.getAll(stackID, fn_merge);
						}
					}
				}
			});
		};

		fn_stack_create = function(key, category, stackname) {

			var flashcards = json_data[category][stackname];

			flashcards = flashcards.filter(function(v) {

				if (typeof v == "string") {
					var prefs = v.split("|");
					App._settings.translation_preferences[key] = {
						from: prefs[0],
						to: prefs[1]
					};

					return false;
				}

				v.stackID = key;
				v.tags = JSON.stringify(v.tags);
				v.score = JSON.stringify(v.score);

				return true;
			});

			App.Flashcards.add(flashcards, function() {
				imported.push("<li>" + category + " // " + stackname + "</li>");
				count++;
				fn_check();
			});
		};

		fn_merge = function(data, stackID) {
			App.Stacks.get(stackID, function(stack) {

				// Sort out equal flashcards
				var flashcards = json_data[stack.category][stack.name].filter(function(v, i) {
					
					var front_same, back_same;
					var unique = [].every.call(data, function(vv) {

						front_same = v.front == vv.value.front;
						back_same = v.back == vv.value.back;

						return !(front_same && back_same);
					});

					return unique;
				});

				if (!flashcards.length) { count++; return fn_check(); }

				flashcards.forEach(function(v) {
					v.stackID = stackID;
					v.tags = JSON.stringify(v.tags);
					v.score = JSON.stringify(v.score);
				});

				// Add new flashcards
				App.Flashcards.add(flashcards, function() {
					merged.push("<li>" + stack.category + " // " + stack.name + "</li>");
					count++;
					fn_check();
				});
			});
		};

		fn_check = function() {
			if (count < stack_length) { return; }
			fn_report();
		};

		fn_report = function() {

			var out = [];

			if (imported.length)
			{ out.push("<b>Imported</b>:<br><br><ul>" + imported.join("") + "</ul>"); }

			if (merged.length)
			{ out.push("<b>Merged</b>:<br><br><ul>" + merged.join("") + "</ul>"); }

			if (!imported.length && !merged.length)
			{ return App.Utils.notification("Everything up to date!"); }
	
			App.Utils.localStorage("settings", App._settings);
			App.Utils.dialog("Import", out.join("<br><br>"));
			window.location.hash = "page-settings";
		};

		return fn_import;

	}());

	/* =================== */
	/* ====== RESET ====== */
	/* =================== */

	Settings.reset = function() {

		var request, interval;

		App.Utils.notification("Resetting...");
		window.localStorage.clear();

		App.DB.App.close();
		request = window.indexedDB.deleteDatabase("App");

		interval = window.setInterval(function() {
			if (request.readyState != "done" && !window.shimIndexedDB) { return; }
			window.clearInterval(interval);
			App.Utils.localStorage("reset", "true");
			window.location.reload();
		}, 250);
	};

	/* ============================== */
	/* ====== RESET STATISTICS ====== */
	/* ============================== */

	Settings.reset_statistics = function() {

		App.Utils.notification("Resetting...");

		App.DB.deleteObjectStore("App", "Statistics", null, function() {
			App.DB.createObjectStore("App", "Statistics", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); }, function() {
				App.Utils.localStorage("reset", "true");
				window.location.reload();
			});
		});
	};

	return Settings;
});
define('IDBOpen',["IDBOpen"], function(IDBOpen) {

	// CC https://gist.github.com/axemclion/2656808#file-indexeddb-setversionshim-js

	var openReqShim = function(dbName, version){
		var me = this;
		var IDBRequest = function(){
			this.onsuccess = this.onerror = this.onblocked = this.onupgradeneeded = null;
		};
		
		function copyReq(req){
			req = req || dbOpenReq;
			for (var key in req) {
				if (typeof result[key] === "undefined") {
					result[key] = req[key];
				}
			}
		}
		
		function callback(fn, context, argArray, func){
			//window.setTimeout(function(){
			(typeof context[fn] === "function") && context[fn].apply(context, argArray);
			(typeof func === "function") && func();
			//}, 1);
		}
		
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		var dbOpenReq = version ? indexedDB.open(dbName, version) : indexedDB.open(dbName);
		var result = new IDBRequest();
		dbOpenReq.onsuccess = function(e){
			copyReq();
			var db = dbOpenReq.result;
			if (typeof db.setVersion === "function") {
				var oldVersion = parseInt(db.version || 1, 10);
				var newVersion = typeof version === "undefined" ? oldVersion : parseInt(version, 10);
				if (oldVersion < newVersion) {
					var versionReq = db.setVersion(version);
					versionReq.onsuccess = function(upgradeEvent){
						result.transaction = versionReq.result;
						var evt;

						try { evt = new Event("upgradeneeded") } catch(e) {
							evt = document.createEvent("Event");
							evt.initEvent("upgradeneeded", true, true);
						}

						evt.oldVersion = oldVersion;
						evt.newVersion = newVersion;
						for (var key in upgradeEvent) {
							if (key !== "type") {
								if (upgradeEvent[evt] !== null)
								Object.defineProperty(evt, key, { value: upgradeEvent[key] });
							
							}
						}

						callback("onupgradeneeded", result, [evt]);
						// Version transaction is now complete, to open ordinary transaction
						versionReq.result.db.close();
						//console.log("Database closed, and will try to open again, with same version");
						var newDbOpenReq = indexedDB.open(dbName);
						delete result.transaction;
						delete result.result;
						
						newDbOpenReq.onsuccess = function(e){
							//console.log("DB Opened without version change", newDbOpenReq.result);
							copyReq(newDbOpenReq);
							callback("onsuccess", result, [e], function(){
								newDbOpenReq.result.close();
							});
							newDbOpenReq.result.close();
						};
						newDbOpenReq.onerror = function(e){
							copyReq(newDbOpenReq);
							callback("onerror", result, [e], function(){
								//console.log("Closed database in newRequest on error", newDbOpenReq);
								newDbOpenReq.result.close();
							});
						};
						newDbOpenReq.onblocked = function(e){
							//console.log("DB Blocked without version change", newDbOpenReq.result);
							copyReq(newDbOpenReq);
							callback("onblocked", result, [e], function(){
								//console.log("Closed database in newRequest on blocked", newDbOpenReq);
								newDbOpenReq.result.close();
							});
						};
					};
					versionReq.onerror = function(){
						callback("onerror", result, [e]);
						versionReq.result.close();
					};
					versionReq.onblocked = function(e){
						// This always gets called, resulting the blocking the DB upgrade
						//console.log("Version transaction blocked, so calling the on blocked method");
						callback("onblocked", result, [e]);
					};
				} else if (oldVersion === newVersion) {
					callback("onsuccess", result, [e]);
					db.close();
				} else {
					callback("onerror", result, [e]);
					db.close();
				}
			} else {
				callback("onsuccess", result, [e]);
			}
		};
		dbOpenReq.onerror = function(e){
			copyReq();
			//console.log("Error", dbOpenReq);
			callback("onerror", result, [e]);
		};
		dbOpenReq.onblocked = function(e){
			copyReq();
			callback("onblocked", result, [e]);
		};
		dbOpenReq.onupgradeneeded = function(e){
			copyReq();
			if (typeof result["onupgradeneeded"] === "function") {
				result["onupgradeneeded"](e);
			}
		};
		
		return result;
	};

	return openReqShim;

});
define('modules/database',["IDBOpen"], function(IDBOpen) {

	// Documentation: https://developer.mozilla.org/en-US/docs/IndexedDB

	var Database = {}, w = window, App;

	w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;
	w.IDBTransaction = w.IDBTransaction || w.webkitIDBTransaction || w.msIDBTransaction;
	w.IDBKeyRange = w.IDBKeyRange || w.webkitIDBKeyRange || w.msIDBKeyRange;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Database.initialize = function(callback) {

		App = require("app");
		var request;

		// Open database
		request = IDBOpen("App");
		request.onerror = function() { App.Utils.dialog("Error", "Can't open the database!"); };

		request.onsuccess = function(e) {

			// Store database object
			Database.App = request.result;

			// Create necessary object stores
			Database.createObjectStore("App", "Stacks");
			Database.createObjectStore("App", "Flashcards", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); });
			Database.createObjectStore("App", "Statistics", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); }, callback, callback);
		};
	};



	/* ================================= */
	/* ====== CREATE OBJECT STORE ====== */
	/* ================================= */

	Database.createObjectStore = function(dbName, name, onupgradeneeded, onsuccess, onexists) {

		// objectStore already exists
		if ([].indexOf.call(Database[dbName].objectStoreNames, name) != -1) { return (onexists || function(){})(); }

		// Operation pending, store current call in queue
		if (Database.createObjectStore.pending) {

			if (!Database.createObjectStore.queue)
			{ Database.createObjectStore.queue = []; }

			Database.createObjectStore.queue.push(arguments);
			return;
		}

		Database.createObjectStore.pending = true;
		var version, request, objectStore;

		// Reopen DB with new version
		version = Database[dbName].version + 1; Database[dbName].close();
		request = IDBOpen(dbName, version);

		// Create new objectStore
		request.onupgradeneeded = function(e) {
			objectStore = request.result.createObjectStore(name, { autoIncrement: true });
			if (onupgradeneeded) { onupgradeneeded(objectStore); }
		};

		request.onsuccess = function(e) {
			Database.createObjectStore.pending = false;
			Database[dbName] = request.result;

			if (onsuccess) { onsuccess(); }

			// Process next call if available
			if (Database.createObjectStore.queue) {
				var call = Database.createObjectStore.queue.shift();
				if (call) { Database.createObjectStore.apply(this, call); }
			}
		};
	};

	/* ================================= */
	/* ====== DELETE OBJECT STORE ====== */
	/* ================================= */

	Database.deleteObjectStore = function(dbName, name, onupgradeneeded, onsuccess) {

		// Operation pending, store current call in queue
		if (Database.deleteObjectStore.pending) {

			if (!Database.deleteObjectStore.queue)
			{ Database.deleteObjectStore.queue = []; }

			Database.deleteObjectStore.queue.push([dbName, name, onupgradeneeded, onsuccess]);
			return;
		}

		Database.deleteObjectStore.pending = true;
		var version, request, objectStore;

		// Reopen DB with new version
		version = Database[dbName].version + 1; Database[dbName].close();
		request = IDBOpen(dbName, version);

		// Delete objectStore
		request.onupgradeneeded = function(e) {
			objectStore = request.result.deleteObjectStore(name);
			if (onupgradeneeded) { onupgradeneeded(objectStore); }
		};

		request.onsuccess = function(e) {
			Database.deleteObjectStore.pending = false;
			Database[dbName] = request.result;
			if (onsuccess) { onsuccess(); }

			if (Database.deleteObjectStore.queue) {
				var call = Database.deleteObjectStore.queue.shift();
				if (call) { Database.deleteObjectStore.apply(this, call); }
			}
		};
	};

	/* ====================== */
	/* ====== GET DATA ====== */
	/* ====================== */

	Database.getData = function(dbName, objectStoreName, key, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName);
		var objectStore = transaction.objectStore(objectStoreName);
		var pairs = [], range;
		var filter = key && typeof key == "object" && key.length;

		if (typeof key == "number") {

			objectStore.get(key).onsuccess = function(e) { onsuccess(e.target.result); };

		} else if (key && typeof key == "object" && key.length === undefined) {

			range = window.IDBKeyRange.only(key.range);

			objectStore.index(key.index).openCursor(range).onsuccess = function(e) {

				var cursor = e.target.result;

				if (cursor) {
					
					pairs.push({
						value: cursor.value,
						key: cursor.primaryKey
					});

					cursor["continue"]();

				} else { onsuccess(pairs); }
			};

		} else {

			objectStore.openCursor().onsuccess = function(e) {

				var cursor = e.target.result;

				if (cursor) {

					if (filter && key.indexOf(cursor.key) == -1) {
						cursor["continue"]();
						return;
					}

					pairs.push({
						value: cursor.value,
						key: cursor.key
					});

					cursor["continue"]();

				} else { onsuccess(pairs); }
			};
		}
	};

	/* ======================================== */
	/* ====== COUNT OBJECT STORE ENTRIES ====== */
	/* ======================================== */

	Database.countObjectStoreEntries = function(dbName, objectStoreName, key, callback) {

		var transaction = Database[dbName].transaction(objectStoreName);
		var objectStore = transaction.objectStore(objectStoreName);
		var pairs = [], range, request;

		if (key && typeof key == "object" && key.length) {

			range = window.IDBKeyRange.only(key[1]);
			request = objectStore.index(key[0]).count(range);

		} else { request = objectStore.count(); }

		request.onsuccess = function(e) { callback(e.target.result); };
	};

	/* ====================== */
	/* ====== ADD DATE ====== */
	/* ====================== */

	Database.addData = function(dbName, objectStoreName, data, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName);

		if (data.length) {
			data.forEach(function(v, i) {
				if (i == data.length-1)
				{ objectStore.add(v).onsuccess = onsuccess; }
				else
				{ objectStore.add(v); }
			});
		} else { objectStore.add(data).onsuccess = onsuccess; }
	};

	/* ========================= */
	/* ====== UPDATE DATA ====== */
	/* ========================= */

	Database.updateData = function(dbName, objectStoreName, key, newData, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName), request, range, fn;

		if (typeof key == "object" && key.length === undefined) {

			range = key.range ? window.IDBKeyRange.only(key.range) : undefined;

			fn = function(e) {

				var cursor = e.target.result, attr, data = newData;

				if (cursor) {

					if (newData.length) { data = newData[cursor.key] || {}; }

					if (key.keys.indexOf(cursor.primaryKey) != -1) {
						for (attr in data) { cursor.value[attr] = data[attr]; }
						cursor.update(cursor.value);
					}

					cursor["continue"]();

				} else { onsuccess(); }
			};

			if (range) { objectStore.index(key.index).openCursor(range).onsuccess = fn; }
			else {objectStore.index(key.index).openCursor().onsuccess = fn; }

		} else {

			request = objectStore.get(+key).onsuccess = function(e) {

				var data = e.target.result, attr;
				for (attr in newData) { data[attr] = newData[attr]; }

				objectStore.put(data, +key).onsuccess = onsuccess;
			};
		}
	};

	/* ========================= */
	/* ====== REMOVE DATA ====== */
	/* ========================= */

	Database.removeData = function(dbName, objectStoreName, key, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName);
		var request, range, fn;

		if (typeof key == "object" && key.length === undefined) {

			range = key.range ? window.IDBKeyRange.only(key.range) : undefined;

			fn = function(e) {

				var cursor = e.target.result;

				if (cursor) {

					if (key.keys.indexOf(cursor.primaryKey) != -1)
					{ objectStore.delete(cursor.primaryKey); }

					cursor["continue"]();

				} else { onsuccess(); }
			};

			if (range) { objectStore.index(key.index).openKeyCursor(range).onsuccess = fn; }
			else { objectStore.index(key.index).openKeyCursor().onsuccess = fn; }


		} else {
			request = objectStore["delete"](key);
			request.onsuccess = onsuccess;
		}
	};

	/* =============================== */
	/* ====== CREATE TEST DATA  ====== */
	/* =============================== */

	Database.createTestData = function(callback) {

		if (App.Utils.localStorage("testdata") && callback)
		{ return callback(); }

		App.Utils.localStorage("testdata", true);

		var count = 0, fn_finish = function() {
			if (++count > 1 && callback) { callback(); }
		};

		App.Stacks.create("Japanese", "Greetings", function(stackID) {
			App.Flashcards.add([
				{
					stackID: stackID,
					front: "Nice to meet you!",
					back: "はじめまして！"
				}, {
					stackID: stackID,
					front: "Good morning!",
					back: "おはよう！"
				}, {
					stackID: stackID,
					front: "Good afternoon!",
					back: "こんにちは！"
				}, {
					stackID: stackID,
					front: "Good evening.",
					back: "こんばんは。"
				}
			], fn_finish);
		}, true);

		App.Stacks.create("Japanese", "Animals", function(stackID) {
				App.Flashcards.add([
				{
					stackID: stackID,
					front: "Dog",
					back: "犬{いぬ}"
				},
				{
					stackID: stackID,
					front: "Cat",
					back: "猫{ねこ}"
				},
				{
					stackID: stackID,
					front: "Horse",
					back: "馬{うま}"
				},
				{
					stackID: stackID,
					front: "Fish",
					back: "魚{さかな}"
				},
				{
					stackID: stackID,
					front: "Bird",
					back: "鳥{とり}"
				}
			], fn_finish);
		}, true);	
	};

	return Database;
});
var Chart=function(s){function v(a,c,b){a=A((a-c.graphMin)/(c.steps*c.stepValue),1,0);return b*c.steps*a}function x(a,c,b,e){function h(){g+=f;var k=a.animation?A(d(g),null,0):1;e.clearRect(0,0,q,u);a.scaleOverlay?(b(k),c()):(c(),b(k));if(1>=g)D(h);else if("function"==typeof a.onAnimationComplete)a.onAnimationComplete()}var f=a.animation?1/A(a.animationSteps,Number.MAX_VALUE,1):1,d=B[a.animationEasing],g=a.animation?0:1;"function"!==typeof c&&(c=function(){});D(h)}function C(a,c,b,e,h,f){var d;a=
Math.floor(Math.log(e-h)/Math.LN10);h=Math.floor(h/(1*Math.pow(10,a)))*Math.pow(10,a);e=Math.ceil(e/(1*Math.pow(10,a)))*Math.pow(10,a)-h;a=Math.pow(10,a);for(d=Math.round(e/a);d<b||d>c;)a=d<b?a/2:2*a,d=Math.round(e/a);c=[];z(f,c,d,h,a);return{steps:d,stepValue:a,graphMin:h,labels:c}}function z(a,c,b,e,h){if(a)for(var f=1;f<b+1;f++)c.push(E(a,{value:(e+h*f).toFixed(0!=h%1?h.toString().split(".")[1].length:0)}))}function A(a,c,b){return!isNaN(parseFloat(c))&&isFinite(c)&&a>c?c:!isNaN(parseFloat(b))&&
isFinite(b)&&a<b?b:a}function y(a,c){var b={},e;for(e in a)b[e]=a[e];for(e in c)b[e]=c[e];return b}function E(a,c){var b=!/\W/.test(a)?F[a]=F[a]||E(document.getElementById(a).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return c?
b(c):b}var r=this,B={linear:function(a){return a},easeInQuad:function(a){return a*a},easeOutQuad:function(a){return-1*a*(a-2)},easeInOutQuad:function(a){return 1>(a/=0.5)?0.5*a*a:-0.5*(--a*(a-2)-1)},easeInCubic:function(a){return a*a*a},easeOutCubic:function(a){return 1*((a=a/1-1)*a*a+1)},easeInOutCubic:function(a){return 1>(a/=0.5)?0.5*a*a*a:0.5*((a-=2)*a*a+2)},easeInQuart:function(a){return a*a*a*a},easeOutQuart:function(a){return-1*((a=a/1-1)*a*a*a-1)},easeInOutQuart:function(a){return 1>(a/=0.5)?
0.5*a*a*a*a:-0.5*((a-=2)*a*a*a-2)},easeInQuint:function(a){return 1*(a/=1)*a*a*a*a},easeOutQuint:function(a){return 1*((a=a/1-1)*a*a*a*a+1)},easeInOutQuint:function(a){return 1>(a/=0.5)?0.5*a*a*a*a*a:0.5*((a-=2)*a*a*a*a+2)},easeInSine:function(a){return-1*Math.cos(a/1*(Math.PI/2))+1},easeOutSine:function(a){return 1*Math.sin(a/1*(Math.PI/2))},easeInOutSine:function(a){return-0.5*(Math.cos(Math.PI*a/1)-1)},easeInExpo:function(a){return 0==a?1:1*Math.pow(2,10*(a/1-1))},easeOutExpo:function(a){return 1==
a?1:1*(-Math.pow(2,-10*a/1)+1)},easeInOutExpo:function(a){return 0==a?0:1==a?1:1>(a/=0.5)?0.5*Math.pow(2,10*(a-1)):0.5*(-Math.pow(2,-10*--a)+2)},easeInCirc:function(a){return 1<=a?a:-1*(Math.sqrt(1-(a/=1)*a)-1)},easeOutCirc:function(a){return 1*Math.sqrt(1-(a=a/1-1)*a)},easeInOutCirc:function(a){return 1>(a/=0.5)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)},easeInElastic:function(a){var c=1.70158,b=0,e=1;if(0==a)return 0;if(1==(a/=1))return 1;b||(b=0.3);e<Math.abs(1)?(e=1,c=b/4):c=b/(2*
Math.PI)*Math.asin(1/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((1*a-c)*2*Math.PI/b))},easeOutElastic:function(a){var c=1.70158,b=0,e=1;if(0==a)return 0;if(1==(a/=1))return 1;b||(b=0.3);e<Math.abs(1)?(e=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/e);return e*Math.pow(2,-10*a)*Math.sin((1*a-c)*2*Math.PI/b)+1},easeInOutElastic:function(a){var c=1.70158,b=0,e=1;if(0==a)return 0;if(2==(a/=0.5))return 1;b||(b=1*0.3*1.5);e<Math.abs(1)?(e=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/e);return 1>a?-0.5*e*Math.pow(2,10*
(a-=1))*Math.sin((1*a-c)*2*Math.PI/b):0.5*e*Math.pow(2,-10*(a-=1))*Math.sin((1*a-c)*2*Math.PI/b)+1},easeInBack:function(a){return 1*(a/=1)*a*(2.70158*a-1.70158)},easeOutBack:function(a){return 1*((a=a/1-1)*a*(2.70158*a+1.70158)+1)},easeInOutBack:function(a){var c=1.70158;return 1>(a/=0.5)?0.5*a*a*(((c*=1.525)+1)*a-c):0.5*((a-=2)*a*(((c*=1.525)+1)*a+c)+2)},easeInBounce:function(a){return 1-B.easeOutBounce(1-a)},easeOutBounce:function(a){return(a/=1)<1/2.75?1*7.5625*a*a:a<2/2.75?1*(7.5625*(a-=1.5/2.75)*
a+0.75):a<2.5/2.75?1*(7.5625*(a-=2.25/2.75)*a+0.9375):1*(7.5625*(a-=2.625/2.75)*a+0.984375)},easeInOutBounce:function(a){return 0.5>a?0.5*B.easeInBounce(2*a):0.5*B.easeOutBounce(2*a-1)+0.5}},q=s.canvas.width,u=s.canvas.height;window.devicePixelRatio&&(s.canvas.style.width=q+"px",s.canvas.style.height=u+"px",s.canvas.height=u*window.devicePixelRatio,s.canvas.width=q*window.devicePixelRatio,s.scale(window.devicePixelRatio,window.devicePixelRatio));this.PolarArea=function(a,c){r.PolarArea.defaults={scaleOverlay:!0,
scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleShowLine:!0,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",
animateRotate:!0,animateScale:!1,onAnimationComplete:null};var b=c?y(r.PolarArea.defaults,c):r.PolarArea.defaults;return new G(a,b,s)};this.Radar=function(a,c){r.Radar.defaults={scaleOverlay:!1,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleShowLine:!0,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!1,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",
scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,angleShowLineOut:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:12,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",onAnimationComplete:null};var b=c?y(r.Radar.defaults,c):r.Radar.defaults;return new H(a,b,s)};this.Pie=function(a,
c){r.Pie.defaults={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,onAnimationComplete:null};var b=c?y(r.Pie.defaults,c):r.Pie.defaults;return new I(a,b,s)};this.Doughnut=function(a,c){r.Doughnut.defaults={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,
onAnimationComplete:null};var b=c?y(r.Doughnut.defaults,c):r.Doughnut.defaults;return new J(a,b,s)};this.Line=function(a,c){r.Line.defaults={scaleOverlay:!1,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,bezierCurve:!0,
pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:2,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",onAnimationComplete:null};var b=c?y(r.Line.defaults,c):r.Line.defaults;return new K(a,b,s)};this.Bar=function(a,c){r.Bar.defaults={scaleOverlay:!1,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",
scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",onAnimationComplete:null};var b=c?y(r.Bar.defaults,c):r.Bar.defaults;return new L(a,b,s)};var G=function(a,c,b){var e,h,f,d,g,k,j,l,m;g=Math.min.apply(Math,[q,u])/2;g-=Math.max.apply(Math,[0.5*c.scaleFontSize,0.5*c.scaleLineWidth]);
d=2*c.scaleFontSize;c.scaleShowLabelBackdrop&&(d+=2*c.scaleBackdropPaddingY,g-=1.5*c.scaleBackdropPaddingY);l=g;d=d?d:5;e=Number.MIN_VALUE;h=Number.MAX_VALUE;for(f=0;f<a.length;f++)a[f].value>e&&(e=a[f].value),a[f].value<h&&(h=a[f].value);f=Math.floor(l/(0.66*d));d=Math.floor(0.5*(l/d));m=c.scaleShowLabels?c.scaleLabel:null;c.scaleOverride?(j={steps:c.scaleSteps,stepValue:c.scaleStepWidth,graphMin:c.scaleStartValue,labels:[]},z(m,j.labels,j.steps,c.scaleStartValue,c.scaleStepWidth)):j=C(l,f,d,e,h,
m);k=g/j.steps;x(c,function(){for(var a=0;a<j.steps;a++)if(c.scaleShowLine&&(b.beginPath(),b.arc(q/2,u/2,k*(a+1),0,2*Math.PI,!0),b.strokeStyle=c.scaleLineColor,b.lineWidth=c.scaleLineWidth,b.stroke()),c.scaleShowLabels){b.textAlign="center";b.font=c.scaleFontStyle+" "+c.scaleFontSize+"px "+c.scaleFontFamily;var e=j.labels[a];if(c.scaleShowLabelBackdrop){var d=b.measureText(e).width;b.fillStyle=c.scaleBackdropColor;b.beginPath();b.rect(Math.round(q/2-d/2-c.scaleBackdropPaddingX),Math.round(u/2-k*(a+
1)-0.5*c.scaleFontSize-c.scaleBackdropPaddingY),Math.round(d+2*c.scaleBackdropPaddingX),Math.round(c.scaleFontSize+2*c.scaleBackdropPaddingY));b.fill()}b.textBaseline="middle";b.fillStyle=c.scaleFontColor;b.fillText(e,q/2,u/2-k*(a+1))}},function(e){var d=-Math.PI/2,g=2*Math.PI/a.length,f=1,h=1;c.animation&&(c.animateScale&&(f=e),c.animateRotate&&(h=e));for(e=0;e<a.length;e++)b.beginPath(),b.arc(q/2,u/2,f*v(a[e].value,j,k),d,d+h*g,!1),b.lineTo(q/2,u/2),b.closePath(),b.fillStyle=a[e].color,b.fill(),
c.segmentShowStroke&&(b.strokeStyle=c.segmentStrokeColor,b.lineWidth=c.segmentStrokeWidth,b.stroke()),d+=h*g},b)},H=function(a,c,b){var e,h,f,d,g,k,j,l,m;a.labels||(a.labels=[]);g=Math.min.apply(Math,[q,u])/2;d=2*c.scaleFontSize;for(e=l=0;e<a.labels.length;e++)b.font=c.pointLabelFontStyle+" "+c.pointLabelFontSize+"px "+c.pointLabelFontFamily,h=b.measureText(a.labels[e]).width,h>l&&(l=h);g-=Math.max.apply(Math,[l,1.5*(c.pointLabelFontSize/2)]);g-=c.pointLabelFontSize;l=g=A(g,null,0);d=d?d:5;e=Number.MIN_VALUE;
h=Number.MAX_VALUE;for(f=0;f<a.datasets.length;f++)for(m=0;m<a.datasets[f].data.length;m++)a.datasets[f].data[m]>e&&(e=a.datasets[f].data[m]),a.datasets[f].data[m]<h&&(h=a.datasets[f].data[m]);f=Math.floor(l/(0.66*d));d=Math.floor(0.5*(l/d));m=c.scaleShowLabels?c.scaleLabel:null;c.scaleOverride?(j={steps:c.scaleSteps,stepValue:c.scaleStepWidth,graphMin:c.scaleStartValue,labels:[]},z(m,j.labels,j.steps,c.scaleStartValue,c.scaleStepWidth)):j=C(l,f,d,e,h,m);k=g/j.steps;x(c,function(){var e=2*Math.PI/
a.datasets[0].data.length;b.save();b.translate(q/2,u/2);if(c.angleShowLineOut){b.strokeStyle=c.angleLineColor;b.lineWidth=c.angleLineWidth;for(var d=0;d<a.datasets[0].data.length;d++)b.rotate(e),b.beginPath(),b.moveTo(0,0),b.lineTo(0,-g),b.stroke()}for(d=0;d<j.steps;d++){b.beginPath();if(c.scaleShowLine){b.strokeStyle=c.scaleLineColor;b.lineWidth=c.scaleLineWidth;b.moveTo(0,-k*(d+1));for(var f=0;f<a.datasets[0].data.length;f++)b.rotate(e),b.lineTo(0,-k*(d+1));b.closePath();b.stroke()}c.scaleShowLabels&&
(b.textAlign="center",b.font=c.scaleFontStyle+" "+c.scaleFontSize+"px "+c.scaleFontFamily,b.textBaseline="middle",c.scaleShowLabelBackdrop&&(f=b.measureText(j.labels[d]).width,b.fillStyle=c.scaleBackdropColor,b.beginPath(),b.rect(Math.round(-f/2-c.scaleBackdropPaddingX),Math.round(-k*(d+1)-0.5*c.scaleFontSize-c.scaleBackdropPaddingY),Math.round(f+2*c.scaleBackdropPaddingX),Math.round(c.scaleFontSize+2*c.scaleBackdropPaddingY)),b.fill()),b.fillStyle=c.scaleFontColor,b.fillText(j.labels[d],0,-k*(d+
1)))}for(d=0;d<a.labels.length;d++){b.font=c.pointLabelFontStyle+" "+c.pointLabelFontSize+"px "+c.pointLabelFontFamily;b.fillStyle=c.pointLabelFontColor;var f=Math.sin(e*d)*(g+c.pointLabelFontSize),h=Math.cos(e*d)*(g+c.pointLabelFontSize);b.textAlign=e*d==Math.PI||0==e*d?"center":e*d>Math.PI?"right":"left";b.textBaseline="middle";b.fillText(a.labels[d],f,-h)}b.restore()},function(d){var e=2*Math.PI/a.datasets[0].data.length;b.save();b.translate(q/2,u/2);for(var g=0;g<a.datasets.length;g++){b.beginPath();
b.moveTo(0,d*-1*v(a.datasets[g].data[0],j,k));for(var f=1;f<a.datasets[g].data.length;f++)b.rotate(e),b.lineTo(0,d*-1*v(a.datasets[g].data[f],j,k));b.closePath();b.fillStyle=a.datasets[g].fillColor;b.strokeStyle=a.datasets[g].strokeColor;b.lineWidth=c.datasetStrokeWidth;b.fill();b.stroke();if(c.pointDot){b.fillStyle=a.datasets[g].pointColor;b.strokeStyle=a.datasets[g].pointStrokeColor;b.lineWidth=c.pointDotStrokeWidth;for(f=0;f<a.datasets[g].data.length;f++)b.rotate(e),b.beginPath(),b.arc(0,d*-1*
v(a.datasets[g].data[f],j,k),c.pointDotRadius,2*Math.PI,!1),b.fill(),b.stroke()}b.rotate(e)}b.restore()},b)},I=function(a,c,b){for(var e=0,h=Math.min.apply(Math,[u/2,q/2])-5,f=0;f<a.length;f++)e+=a[f].value;x(c,null,function(d){var g=-Math.PI/2,f=1,j=1;c.animation&&(c.animateScale&&(f=d),c.animateRotate&&(j=d));for(d=0;d<a.length;d++){var l=j*a[d].value/e*2*Math.PI;b.beginPath();b.arc(q/2,u/2,f*h,g,g+l);b.lineTo(q/2,u/2);b.closePath();b.fillStyle=a[d].color;b.fill();c.segmentShowStroke&&(b.lineWidth=
c.segmentStrokeWidth,b.strokeStyle=c.segmentStrokeColor,b.stroke());g+=l}},b)},J=function(a,c,b){for(var e=0,h=Math.min.apply(Math,[u/2,q/2])-5,f=h*(c.percentageInnerCutout/100),d=0;d<a.length;d++)e+=a[d].value;x(c,null,function(d){var k=-Math.PI/2,j=1,l=1;c.animation&&(c.animateScale&&(j=d),c.animateRotate&&(l=d));for(d=0;d<a.length;d++){var m=l*a[d].value/e*2*Math.PI;b.beginPath();b.arc(q/2,u/2,j*h,k,k+m,!1);b.arc(q/2,u/2,j*f,k+m,k,!0);b.closePath();b.fillStyle=a[d].color;b.fill();c.segmentShowStroke&&
(b.lineWidth=c.segmentStrokeWidth,b.strokeStyle=c.segmentStrokeColor,b.stroke());k+=m}},b)},K=function(a,c,b){var e,h,f,d,g,k,j,l,m,t,r,n,p,s=0;g=u;b.font=c.scaleFontStyle+" "+c.scaleFontSize+"px "+c.scaleFontFamily;t=1;for(d=0;d<a.labels.length;d++)e=b.measureText(a.labels[d]).width,t=e>t?e:t;q/a.labels.length<t?(s=45,q/a.labels.length<Math.cos(s)*t?(s=90,g-=t):g-=Math.sin(s)*t):g-=c.scaleFontSize;d=c.scaleFontSize;g=g-5-d;e=Number.MIN_VALUE;h=Number.MAX_VALUE;for(f=0;f<a.datasets.length;f++)for(l=
0;l<a.datasets[f].data.length;l++)a.datasets[f].data[l]>e&&(e=a.datasets[f].data[l]),a.datasets[f].data[l]<h&&(h=a.datasets[f].data[l]);f=Math.floor(g/(0.66*d));d=Math.floor(0.5*(g/d));l=c.scaleShowLabels?c.scaleLabel:"";c.scaleOverride?(j={steps:c.scaleSteps,stepValue:c.scaleStepWidth,graphMin:c.scaleStartValue,labels:[]},z(l,j.labels,j.steps,c.scaleStartValue,c.scaleStepWidth)):j=C(g,f,d,e,h,l);k=Math.floor(g/j.steps);d=1;if(c.scaleShowLabels){b.font=c.scaleFontStyle+" "+c.scaleFontSize+"px "+c.scaleFontFamily;
for(e=0;e<j.labels.length;e++)h=b.measureText(j.labels[e]).width,d=h>d?h:d;d+=10}r=q-d-t;m=Math.floor(r/(a.labels.length-1));n=q-t/2-r;p=g+c.scaleFontSize/2;x(c,function(){b.lineWidth=c.scaleLineWidth;b.strokeStyle=c.scaleLineColor;b.beginPath();b.moveTo(q-t/2+5,p);b.lineTo(q-t/2-r-5,p);b.stroke();0<s?(b.save(),b.textAlign="right"):b.textAlign="center";b.fillStyle=c.scaleFontColor;for(var d=0;d<a.labels.length;d++)b.save(),0<s?(b.translate(n+d*m,p+c.scaleFontSize),b.rotate(-(s*(Math.PI/180))),b.fillText(a.labels[d],
0,0),b.restore()):b.fillText(a.labels[d],n+d*m,p+c.scaleFontSize+3),b.beginPath(),b.moveTo(n+d*m,p+3),c.scaleShowGridLines&&0<d?(b.lineWidth=c.scaleGridLineWidth,b.strokeStyle=c.scaleGridLineColor,b.lineTo(n+d*m,5)):b.lineTo(n+d*m,p+3),b.stroke();b.lineWidth=c.scaleLineWidth;b.strokeStyle=c.scaleLineColor;b.beginPath();b.moveTo(n,p+5);b.lineTo(n,5);b.stroke();b.textAlign="right";b.textBaseline="middle";for(d=0;d<j.steps;d++)b.beginPath(),b.moveTo(n-3,p-(d+1)*k),c.scaleShowGridLines?(b.lineWidth=c.scaleGridLineWidth,
b.strokeStyle=c.scaleGridLineColor,b.lineTo(n+r+5,p-(d+1)*k)):b.lineTo(n-0.5,p-(d+1)*k),b.stroke(),c.scaleShowLabels&&b.fillText(j.labels[d],n-8,p-(d+1)*k)},function(d){function e(b,c){return p-d*v(a.datasets[b].data[c],j,k)}for(var f=0;f<a.datasets.length;f++){b.strokeStyle=a.datasets[f].strokeColor;b.lineWidth=c.datasetStrokeWidth;b.beginPath();b.moveTo(n,p-d*v(a.datasets[f].data[0],j,k));for(var g=1;g<a.datasets[f].data.length;g++)c.bezierCurve?b.bezierCurveTo(n+m*(g-0.5),e(f,g-1),n+m*(g-0.5),
e(f,g),n+m*g,e(f,g)):b.lineTo(n+m*g,e(f,g));b.stroke();c.datasetFill?(b.lineTo(n+m*(a.datasets[f].data.length-1),p),b.lineTo(n,p),b.closePath(),b.fillStyle=a.datasets[f].fillColor,b.fill()):b.closePath();if(c.pointDot){b.fillStyle=a.datasets[f].pointColor;b.strokeStyle=a.datasets[f].pointStrokeColor;b.lineWidth=c.pointDotStrokeWidth;for(g=0;g<a.datasets[f].data.length;g++)b.beginPath(),b.arc(n+m*g,p-d*v(a.datasets[f].data[g],j,k),c.pointDotRadius,0,2*Math.PI,!0),b.fill(),b.stroke()}}},b)},L=function(a,
c,b){var e,h,f,d,g,k,j,l,m,t,r,n,p,s,w=0;g=u;b.font=c.scaleFontStyle+" "+c.scaleFontSize+"px "+c.scaleFontFamily;t=1;for(d=0;d<a.labels.length;d++)e=b.measureText(a.labels[d]).width,t=e>t?e:t;q/a.labels.length<t?(w=45,q/a.labels.length<Math.cos(w)*t?(w=90,g-=t):g-=Math.sin(w)*t):g-=c.scaleFontSize;d=c.scaleFontSize;g=g-5-d;e=Number.MIN_VALUE;h=Number.MAX_VALUE;for(f=0;f<a.datasets.length;f++)for(l=0;l<a.datasets[f].data.length;l++)a.datasets[f].data[l]>e&&(e=a.datasets[f].data[l]),a.datasets[f].data[l]<
h&&(h=a.datasets[f].data[l]);f=Math.floor(g/(0.66*d));d=Math.floor(0.5*(g/d));l=c.scaleShowLabels?c.scaleLabel:"";c.scaleOverride?(j={steps:c.scaleSteps,stepValue:c.scaleStepWidth,graphMin:c.scaleStartValue,labels:[]},z(l,j.labels,j.steps,c.scaleStartValue,c.scaleStepWidth)):j=C(g,f,d,e,h,l);k=Math.floor(g/j.steps);d=1;if(c.scaleShowLabels){b.font=c.scaleFontStyle+" "+c.scaleFontSize+"px "+c.scaleFontFamily;for(e=0;e<j.labels.length;e++)h=b.measureText(j.labels[e]).width,d=h>d?h:d;d+=10}r=q-d-t;m=
Math.floor(r/a.labels.length);s=(m-2*c.scaleGridLineWidth-2*c.barValueSpacing-(c.barDatasetSpacing*a.datasets.length-1)-(c.barStrokeWidth/2*a.datasets.length-1))/a.datasets.length;n=q-t/2-r;p=g+c.scaleFontSize/2;x(c,function(){b.lineWidth=c.scaleLineWidth;b.strokeStyle=c.scaleLineColor;b.beginPath();b.moveTo(q-t/2+5,p);b.lineTo(q-t/2-r-5,p);b.stroke();0<w?(b.save(),b.textAlign="right"):b.textAlign="center";b.fillStyle=c.scaleFontColor;for(var d=0;d<a.labels.length;d++)b.save(),0<w?(b.translate(n+
d*m,p+c.scaleFontSize),b.rotate(-(w*(Math.PI/180))),b.fillText(a.labels[d],0,0),b.restore()):b.fillText(a.labels[d],n+d*m+m/2,p+c.scaleFontSize+3),b.beginPath(),b.moveTo(n+(d+1)*m,p+3),b.lineWidth=c.scaleGridLineWidth,b.strokeStyle=c.scaleGridLineColor,b.lineTo(n+(d+1)*m,5),b.stroke();b.lineWidth=c.scaleLineWidth;b.strokeStyle=c.scaleLineColor;b.beginPath();b.moveTo(n,p+5);b.lineTo(n,5);b.stroke();b.textAlign="right";b.textBaseline="middle";for(d=0;d<j.steps;d++)b.beginPath(),b.moveTo(n-3,p-(d+1)*
k),c.scaleShowGridLines?(b.lineWidth=c.scaleGridLineWidth,b.strokeStyle=c.scaleGridLineColor,b.lineTo(n+r+5,p-(d+1)*k)):b.lineTo(n-0.5,p-(d+1)*k),b.stroke(),c.scaleShowLabels&&b.fillText(j.labels[d],n-8,p-(d+1)*k)},function(d){b.lineWidth=c.barStrokeWidth;for(var e=0;e<a.datasets.length;e++){b.fillStyle=a.datasets[e].fillColor;b.strokeStyle=a.datasets[e].strokeColor;for(var f=0;f<a.datasets[e].data.length;f++){var g=n+c.barValueSpacing+m*f+s*e+c.barDatasetSpacing*e+c.barStrokeWidth*e;b.beginPath();
b.moveTo(g,p);b.lineTo(g,p-d*v(a.datasets[e].data[f],j,k)+c.barStrokeWidth/2);b.lineTo(g+s,p-d*v(a.datasets[e].data[f],j,k)+c.barStrokeWidth/2);b.lineTo(g+s,p);c.barShowStroke&&b.stroke();b.closePath();b.fill()}}},b)},D=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)},F={}};
define("chart", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Chart;
    };
}(this)));

define('modules/statistics',["chart"], function(Chart) {

	var Statistics = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */
	
	Statistics.initialize = function() {

		App = require("app");
		var updateTimeout;

		// Update statistics once the window size hasn't changed for 100ms
		App.$(window).on("resize", function() {
			window.clearTimeout(updateTimeout);
			updateTimeout = window.setTimeout(Statistics.updateView, 100);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Statistics.get = function(callback) {
		App.DB.getData("App", "Statistics", null, function(data) {
			callback(data);
		});
	};

	Statistics.updateView = function() {

		var display_note = true,
		    stackdata = [], fn_insert;
		
		fn_insert = function(stack) {

			var data = stackdata[stack.id];

			// Not enough data to generate proper statistics
			if (data.length < 2) { return; }

			// Hide the note
			if (display_note) {
				App.$("#page-statistics").find(".content").html("");
				display_note = false;
			}

			// Create canvas
			var ctx = document.createElement("canvas").getContext("2d");
			ctx.canvas.width = App.$("body").width() / 100 * 80;
			ctx.canvas.height = Math.round(ctx.canvas.width / 1.618);

			// Insert heading and canvas
			App.$("#page-statistics").find(".content").append("<h1>" + stack.category + " // " + stack.name + "</h1><hr>");
			App.$("#page-statistics").find(".content").append(ctx.canvas);
			App.$("#page-statistics").find(".content").append("<hr class='transparent'>");

			// Define chart variables
			var labels = [], datasets = [{

				fillColor: "#CCC",
				strokeColor: "#999",
				data: [],
				label: "foo"

			}], max_scale = 0;

			// Fill labels and datasets
			data.forEach(function(v) {
				var date = new Date(v.value.timestamp);
				labels.push("".split.call(date, " ").slice(0, 3).join(" "));

				datasets[0].data.push(v.value.score);
				max_scale = v.value.total > max_scale ? v.value.total : max_scale;
			});

			// Create the chart
			var chart = new Chart(ctx).Line({ labels: labels, datasets: datasets }, {
				scaleOverride: true,
				scaleSteps: Math.round(max_scale/2),
				scaleStepWidth: 2,
				scaleStartValue: 0,
				scaleLabel: "<%=value%> Cards",
				bezierCurve: true,
				datasetStrokeWidth: 5,
				animation: false
			});
		};

		// Get all statistics
		App.Statistics.get(function(data) {

			var stackID;

			// Sort them into their own stack array
			[].forEach.call(data, function(v) {
				if (!stackdata[v.value.stackID]) { stackdata[v.value.stackID] = []; }
				stackdata[v.value.stackID].push(v);
			});

			if (display_note) { App.$("#page-statistics").find(".note").show(); }

			// Now fetch the stack name and process the data
			for (stackID in stackdata) {
				App.Stacks.get(+stackID, fn_insert);
			}
		});
	};

	Statistics.reset = function(stackID) {
		App.Flashcards.getAll(stackID, function(data) {
			var keys = data.map(function(v) { return v.key; });
			var score = "{\"front\":{\"yes\":0,\"no\":0},\"back\":{\"yes\":0,\"no\":0}}";

			App.Flashcards.update.origin = window.location.hash.substr(1);
			App.Flashcards.update({ index: "stackID", keys: keys }, { score: score }, function() {
				App.Utils.notification("Reset successful");
			});
		});
	};

	/* ======================================= */
	/* ====== REGISTER PRACTICE SESSION ====== */
	/* ======================================= */

	Statistics.registerPracticeSession = function(id, score, total) {
		App.DB.addData("App", "Statistics", {
			stackID: +id,
			score: score,
			total: total,
			timestamp: new Date().getTime()
		});
	};

	return Statistics;
});
define('modules/stacks',['app'],function() {

	var Stacks = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Stacks.initialize = function() {

		App = require("app");
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Stacks.events = {

		// Expand category
		"click #stacks > li ": function(e) {
			Stacks.currentFocus = e.currentTarget;
			App.$(e.currentTarget).toggleClass("expand");
		},

		// Stack link
		"click #stacks > li > ul > li": function(e) {
			window.location.hash = "page-stack:" + App.$(e.currentTarget).attr("data-key");
		},

		// Create stack
		"click .button-new-stack": function(e) {

			var guess = Stacks.currentFocus ? $(Stacks.currentFocus).find(".category .name").text().trim() : "";

			App.Utils.dialog("Enter stack name", {

				content: "<input type='text' name='stack-category' value='" + guess + "' placeholder='Category'><br><br>" +
				         "<input type='text' name='stack-name' placeholder='Stackname'>",

				buttons: {
					ok: Stacks.create,
					cancel: true
				}
			});
		},

		// Rename stack
		"click .button-rename-stack": function(e) {

			var pair = App.Router.$page.find(".stack-name").text().split(" // ");
			var category = pair.shift();
			var stack = pair.join("");
			
			App.Utils.dialog("Enter stack name", {

				content: "<input type='text' name='stack-category' value='" + category + "'><br><br>" +
				         "<input type='text' name='stack-name' value='" + stack + "'>",

				buttons: {
					ok: function() { Stacks.rename(Stacks.current); },
					cancel: true
				}
			});
		},

		// Reset statistics
		"click .button-reset-stack": function(e) {

			App.Utils.dialog("Confirm", {
				content: "Reset individual flashcard statistics for this stack?",
				buttons: { ok: function() { App.Statistics.reset(Stacks.current); }, cancel: true }
			});
		},

		// Remove stack
		"click .button-remove-stack": function(e) {

			var stack = App.Router.$page.find(".stack-name").text();

			App.Utils.dialog("Confirm", {
				content: "Remove \"" + stack + "\" and all of its flashcards?",
				buttons: { ok: function() { Stacks.remove(Stacks.current); }, cancel: true }
			});
		},

		// Practice mode
		"click .button-practice": function(e) {
			Stacks.practice.initialize();
		},

		// Practice buttons
		"click #practice-buttons .button": function(e) {

			var correct = App.$(e.currentTarget).hasClass("green");

			if (correct)
			{ Stacks.practice.score++; }

			Stacks.practice.updateStats(correct, Stacks.practice.advance);
		},

		// Exit practice
		"click .button-exit-practice": function(e) {
			Stacks.practice.abort();
		},

		// Quiz buttons
		"click #quiz .quiz-answer": function(e) {

			if (Stacks.quiz.pending) { return; }
			Stacks.quiz.pending = true;

			var $target = App.$(e.currentTarget);
			var correct = $target.attr("data-correct") == "true";
			var switched = Stacks.quiz.question.switched;
			var langCode, text, prefs;

			var fn = function() {
				Stacks.quiz.pending = false;
				$target.removeClass(correct ? "correct" : "false");
				if (!Stacks.quiz.question.failed) { Stacks.quiz.score++; }

				if (correct) {
					Stacks.quiz.updateStats(!Stacks.quiz.question.failed, Stacks.quiz.advance);
				}
			};

			if (!correct) { Stacks.quiz.question.failed = true; }
			$target.addClass(correct ? "correct" : "false");

			if (correct && App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.quiz.question.value.stackID];
				
				if (prefs) {
					langCode = switched ? prefs.from : prefs.to;
					text = App.Utils.markdown(Stacks.quiz.question.value[switched ? "front" : "back"], true);
					App.Utils.speak(text, langCode, fn);
				}
			}

			if (!prefs) { window.setTimeout(fn, 500); }
		},

		// Quiz mode
		"click .button-quiz": function(e) {
			window.location.hash = "page-quiz:" + Stacks.current;
		},

		// Exit quiz
		"click .button-exit-quiz": function(e) {
			Stacks.quiz.abort();
		},

		// Return to stacks
		"click .button-return-stacks": function(e) {
			window.location.hash = "#page-stacks";
		},

		// Return to stack
		"click .button-return-stack": function(e) {
			window.location.hash = "page-stack:" + App.Stacks.current;
		},

		// Stack settings
		"click .button-stack-settings": function(e) {
			window.location.hash = "page-stack-settings:" + Stacks.current;
		},

		// Stack settings
		"change .languages": function(e) {

			var stackID = Stacks.current;
			var isFrom = App.$(e.currentTarget).hasClass("from");
			var code = App.$(e.currentTarget).val();

			if (!App._settings.translation_preferences)
			{ App._settings.translation_preferences = {}; }

			if (!App._settings.translation_preferences[stackID])
			{ App._settings.translation_preferences[stackID] = {}; }

			App._settings.translation_preferences[stackID][isFrom ? "from" : "to"] = code;
			App.Utils.localStorage("settings", App._settings);
		},

		"click .button-apply-lang-all": function(e) {

			var category = App.Router.$page.find(".stack-name").text().split(" // ").shift();
			var from = App.$(".languages.from").val();
			var to = App.$(".languages.to").val();

			if (!App._settings.translation_preferences)
			{ App._settings.translation_preferences = {}; }

			Stacks.getAll(function(data) {
				[].forEach.call(data, function(v) {
					if (v.value.category != category) { return; }

					var stackID = v.key;
					App._settings.translation_preferences[stackID] = { from: from, to: to };
				});

				App.Utils.localStorage("settings", App._settings);
				App.Utils.notification("Updated stack settings successfully");
			});
		},

		"click .tts": function(e) {
			if (!Stacks.practice.flashcard) { return; }

			var prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.practice.flashcard.value.stackID],
				switched = Stacks.practice.flashcard.switched,
			    langCode, text;
			
			if (prefs) {
				langCode = switched ? prefs.to : prefs.from;
				text = App.Utils.markdown(Stacks.practice.flashcard.value[switched ? "back" : "front"], true);
				App.Utils.speak(text, langCode);
			} else {
				App.Utils.notification("Please set your translation preferences in your stack settings first");
			}
		},

		"change .sort-flashcards select": function(e) {
			var val = $(e.currentTarget).val();
			App._settings.sorting = val;
			App.Utils.localStorage("settings", App._settings);
			App.Router.reroute();
		}
	};

	Stacks.sortFn = {
		"front-asc": function(a, b) { return a.value.front < b.value.front ? -1 : 1; },
		"front-desc": function(a, b) { return a.value.front > b.value.front ? -1 : 1; },

		"back-asc": function(a, b) { return a.value.back < b.value.back ? -1 : 1; },
		"back-desc": function(a, b) { return a.value.back > b.value.back ? -1 : 1; },

		"date-asc": function(a, b) { return a.key < b.key ? -1 : 1; },
		"date-desc": function(a, b) { return a.key > b.key ? -1 : 1; }
	};

	/* ========================= */
	/* ====== UPDATE VIEW ====== */
	/* ========================= */

	Stacks.updateView = function() {

		delete Stacks.currentFocus;

		Stacks.getAll(function(stacks) {

			var $stacks = App.$("#stacks"),
			    $category, categories = {},
			    category, fn_insert, fn_sort;

			fn_insert = function(v) {
				Stacks.countFlashcards(v, function(stack) {
					$category = $stacks.find("li[data-category='" + stack.value.category + "']");

					$category.find("ul").append(
						"<li class='stack' data-key='" + stack.key + "'>" +
							"<span class='fa fa-tags' style='margin-right: 0.5em;'></span>" +
							v.value.name +
							"<span class='fa fa-arrow-right'></span>" +
							"<span class='count'>" + stack.value.flashcardAmount + " Cards</span>" +
						"</li^>"
					);
				});
			};

			fn_sort = function(a, b) { return a.value.name < b.value.name ? -1 : 1; };

			if (stacks.length) {

				[].forEach.call(stacks, function(v) {

					var category = v.value.category || "Uncategorized";
					if (category == "Uncategorized") { v.value.category = category; }

					if (!categories[category]) {

						categories[category] = [];

						$stacks.append(
							"<li data-category='" + category + "'>" +
								"<div class='category'>" +
									"<span class='fa fa-fw fa-caret-right'></span> " +
									"<span class='name'>" +category + "</span>" +
								"</div>" +
								"<ul></ul>" +
							"</li>"
						);
					}

					categories[category].push(v);
				});

				for (category in categories) {
					stacks = categories[category];
					$category = $stacks.find("li[data-category='" + category + "'] .category");
					$category.append("<span class='count'>" + stacks.length + " Stacks</span>");
				}

				for (category in categories) {
					stacks = categories[category];
					stacks = stacks.sort(fn_sort);
					stacks.forEach(fn_insert);
				}

				App.Router.$page.find(".view-all").css("display", "block");

			} else { App.Router.$page.find(".note").show(); }
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Stacks.get = function(id, callback) {

		App.DB.getData("App", "Stacks", id, function(data) {
			if (!data) { return; }

			data.id = id;
			if (callback) { callback(data); }
		});
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Stacks.getAll = function(callback) {
		App.DB.getData("App", "Stacks", null, function(data) {
			data = data.sort(function(a, b) { return a.value.category < b.value.category ? -1 : 1; });
			callback(data);
		});
	};

	/* ============================== */
	/* ====== COUNT FLASHCARDS ====== */
	/* ============================== */

	Stacks.countFlashcards = function(stack, callback) {
		App.DB.countObjectStoreEntries("App", "Flashcards", ["stackID", stack.key], function(num) {
			stack.value.flashcardAmount = num;
			if (callback) { callback(stack); }
		});
	};

	/* ==================== */
	/* ====== CREATE ====== */
	/* ==================== */

	Stacks.create = function(category, name, callback, no_UI) {

		if (typeof category != "string") { category = App.$("#dialog input[name='stack-category']").val().trim(); }
		if (typeof name != "string") { name = App.$("#dialog input[name='stack-name']").val().trim(); }

		category = App.Utils.escapeHTML(category);
		name = App.Utils.escapeHTML(name);

		App.DB.addData("App", "Stacks", { category: category, name: name }, function(e) {

			var key = e.target.result, $stacks, $category;

			if (!no_UI) {

				category = category || "Uncategorized";

				$stacks = App.$("#stacks");
				$category = $stacks.find("li[data-category='" + category + "']");

				if (!App.$(".stack").length) {
					App.Router.$page.find(".view-all").css("display", "block");
					App.Router.$page.find(".note").hide();
				}

				if (!$category.length) {

					$stacks.append(
						"<li data-category='" + category + "'>" +
							"<div class='category'>" +
								"<span class='fa fa-fw fa-caret-right'></span> " +
								"<span class='name'>" + category + "</span>" +
								"<span class='count'>1 Stack</span>" +
							"</div>" +
							"<ul></ul>" +
						"</li>"
					);

					$category = $stacks.find("li[data-category='" + category + "']");
				}

				$category.find("ul").append(
					"<li class='stack' data-key='" + key + "'>" +
						"<span class='fa fa-tags' style='margin-right: 0.5em;'></span>" +
						name +
						"<span class='fa fa-arrow-right' style='float: right;'></span>" +
						"<span class='count'>0 Cards</span>" +
					"</li>"
				);

				$category.find(".category > .count").html($category.find("ul").children().length + " Stacks");
				$category.toggleClass("expand", true);
			}

			if (callback) { callback(key, category, name); }
		});
	};

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Stacks.remove = function(id) {
		App.Flashcards.getAll(id, function(flashcards) {

			var keys = [].map.call(flashcards, function(v) { return v.key; });
			App.Flashcards.remove(keys, true);

			App.Flashcards.getAll(id, function(data) {

				var keys = data.map(function(v) { return v.key; });

				if (window.shimIndexedDB) {
					keys.forEach(function(v) {
						App.DB.removeData("App", "Flashcards", v);
					});

					App.DB.removeData("App", "Stacks", id, function(e) {
						App.$(".stack[data-key=" + id + "]").remove();
						if (!App.$(".stack").length) { App.Router.$page.find(".note").show(); }
						window.location.hash = "page-stacks";
					});
				} else {

					App.DB.removeData("App", "Flashcards", { index: "stackID", range: id, keys: keys }, function(e) {
						App.DB.removeData("App", "Stacks", id, function(e) {
							App.$(".stack[data-key=" + id + "]").remove();
							if (!App.$(".stack").length) { App.Router.$page.find(".note").show(); }
							window.location.hash = "page-stacks";
						});
					});
				}
			});
		});
	};

	/* ==================== */
	/* ====== RENAME ====== */
	/* ==================== */

	Stacks.rename = function(id) {

		var category = App.$("#dialog input[name='stack-category']").val().trim();
		var name = App.$("#dialog input[name='stack-name']").val().trim();

		category = App.Utils.escapeHTML(category);
		name = App.Utils.escapeHTML(name);

		App.DB.updateData("App", "Stacks", id, { category: category, name: name }, function(e) {
			App.$(".stack[data-key=" + id + "] b").html(name);
			App.Router.$page.find(".stack-name").html(category + " // " + name);
		});
	};

	/* ====================== */
	/* ====== PRACTICE ====== */
	/* ====================== */

	Stacks.practice = (function() {

		var api = {};

		function initialize() {

			var keys = [],
			    selection = App.Flashcards.getSelection(),
			    $cards_visible;

			Stacks.practice.custom = App.Router.$page.attr("id") == "page-search";
			Stacks.practice.origin = window.location.hash.substr(1);
			Stacks.practice.timeouts = [];

			if (selection.length) {

				keys = selection.map(function(v) { return v.key; });
				App.Utils.dialog("Selective Practice", {

					content: "You have selected one or more flashcards. Would you like to practice only those selected? " +
					"This also disables progress-statistics for this session.",

					buttons: {
						ok: function() {
							Stacks.practice.custom = true;
							App.Flashcards.get(keys, process);
						},
						cancel: true
					}
				});

			} else {

				$cards_visible = App.Router.$page.find(".flashcards tbody tr:visible");
				$cards_visible.each(function(i) {
					keys.push(+$(this).attr("data-key"));
				});

				if ($cards_visible.length != App.Router.$page.find(".flashcards tbody tr").length) {

					if ($cards_visible.length < 3) {
						App.Utils.notification("No flashcards visible for filtered practice");
						return;
					}

					App.Utils.dialog("Filtered Practice", {

						content: "You have filtered your flashcards. Only those visible will be included in practice mode. " +
						"This also disables progress-statistics for this session. Continue?",

						buttons: {
							ok: function() {
								Stacks.practice.custom = true;
								App.Flashcards.get(keys, process);
							},
							cancel: true
						}
					});

				} else { App.Flashcards.get(keys, process); }
			}
		}

		function process(data) {

			if (!data.length) {

				App.$("#flashcard .front span").html("┗(･ω･;)┛");
				App.Utils.dialog("No flashcards available!", "Create at least one flashcard to start practicing");

				return;
			}

			Stacks.practice.stackID = Stacks.current;
			Stacks.practice.total = data.length;
			Stacks.practice.index = 0;
			Stacks.practice.score = 0;
			
			// Shuffle
			if (App._settings.shuffle_flashcards)
			{ data = App.Utils.array_shuffle(data); }

			// Sort
			else {
				$(".sort-flashcards select").val(App._settings.sorting || "front-asc");
				data.sort(App.Stacks.sortFn[App._settings.sorting || "front-asc"]);
			}

			// Replace linebreaks
			data = data.map(function(v) {
				v.value.front = v.value.front.replace(/\n/, "<br>");
				v.value.back = v.value.back.replace(/\n/, "<br>");

				return v;
			});

			App.Router.route("page-practice");
			$(".tts").toggle(!App._settings.playthrough);

			Stacks.practice.flashcards = data;
			Stacks.practice.advance();
		}

		function end() {

			clearTimeouts();
			delete Stacks.practice.flashcards;
			if (App._settings.playthrough) { return App.Router.route(Stacks.practice.origin); }

			if (!Stacks.practice.custom) {
				App.Statistics.registerPracticeSession(
					Stacks.practice.stackID,
					Stacks.practice.score,
					Stacks.practice.total
				);
			}

			var score = Math.round(100/Stacks.practice.total*Stacks.practice.score);
			var message = Stacks.resultMessages[Math.round(App.Utils.translateRange(score, 0, 100, 0, 4))];
		
			App.Utils.dialog(
				"Session complete!",
				"<b>Score:</b> " + (Stacks.practice.score) + "/" + Stacks.practice.total + " (" + score + "%)<br><br>" + message,
				function() { App.Router.route(Stacks.practice.origin); }
			);
		}

		function abort() {
			clearTimeouts();
			delete Stacks.practice.flashcards;
			delete Stacks.practice.index;
			App.Router.route(Stacks.practice.origin);
		}

		function updateStats(bool, callback) {
			if (bool !== undefined && !App._settings.playthrough) {
				var switched = Stacks.practice.flashcard._switched;
				var score = Stacks.practice.flashcard.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
				if (typeof score == "string") { score = JSON.parse(score); }

				score[switched ? "back" : "front"][bool ? "yes" : "no"]++;
				App.DB.updateData("App", "Flashcards", Stacks.practice.flashcard.key, { score: JSON.stringify(score) }, callback || function(){});
			} else {
				App.Router.$page.find(".stats").html("Flashcard " + (Stacks.practice.index) + " of " + Stacks.practice.total + "<br>");
			}
		}

		function advance() {

			var flashcard = Stacks.practice.flashcards[Stacks.practice.index++];
			if (!flashcard) { return end(); }

			Stacks.practice.flashcard = flashcard;
			Stacks.practice.flashcard.flipped = false;

			var $front = App.$("#flashcard .front"),
			    $back = App.$("#flashcard .back"),
			    switched = App._settings.switch_front_back,
			    tallest, prefs, langCode, text;

			if (App._settings.switch_front_back_randomly)
			{ switched = Math.round(Math.random()); }

			flashcard._switched = switched;
			flashcard.switched = switched;

			var front = switched ? flashcard.value.back : flashcard.value.front;
			var back = switched ? flashcard.value.front : flashcard.value.back;

			// Show/Hide buttons
			App.$("#practice-buttons").toggle(!!App._settings.always_show_buttons);

			// Reset rotation
			$front.css({ rotateX: 5 });
			$back.css({ rotateX: 180 });
			App.$("#flashcard-shadow").css({ rotateX: 0 });

			// Insert new data
			$front.removeAttr("style").find("span").html(App.Utils.markdown(front));
			$back.removeAttr("style").find("span").html(App.Utils.markdown(back));

			// Make each flashcard side of equal size
			tallest = Math.max($front.height(), $back.height());
			$front.height(tallest);
			$back.height(tallest);

			updateStats();

			if (App._settings.tts_auto || App._settings.playthrough) {
				prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.practice.flashcard.value.stackID];
				
				if (prefs) {
					langCode = switched ? prefs.to : prefs.from;
					text = App.Utils.markdown(front, true);
					App.Utils.speak(text, langCode, App._settings.playthrough ? playthrough : undefined);
				} else if (App._settings.playthrough) {
					Stacks.practice.timeouts.push(window.setTimeout(playthrough, 1000));
				}
			}
		}

		function playthrough() {
			if (!Stacks.practice.flashcard.flipped) {
				Stacks.practice.timeouts.push(window.setTimeout(function() { App.Flashcards.flip(!Stacks.practice.flashcard.flipped, playthrough); }, 1000));
			} else {
				Stacks.practice.timeouts.push(window.setTimeout(advance, 1000));
			}
		}

		function clearTimeouts() {
			if (!Stacks.practice.timeouts) { return; }
			Stacks.practice.timeouts.forEach(function(v) {
				window.clearTimeout(v);
			});
		}

		api = {
			initialize: initialize,
			updateStats: updateStats,
			clearTimeouts: clearTimeouts,
			advance: advance,
			abort: abort
		};

		return api;

	}());

	/* ================== */
	/* ====== QUIZ ====== */
	/* ================== */

	Stacks.quiz = (function() {

		var api = {};

		function initialize(id) {

			App.Flashcards.getAll(id, function(data) {

				if (data.length < 4) {

					App.Utils.dialog("Not enough flashcards available!", "Create at least four flashcard to start the quiz", function() {
						window.location.hash = "page-stack:" + id;
					});

					return;
				}

				Stacks.quiz.stackID = id;
				Stacks.quiz.total = data.length;
				Stacks.quiz.index = 0;
				Stacks.quiz.score = 0;
				
				// Shuffle
				if (App._settings.shuffle_flashcards)
				{ data = App.Utils.array_shuffle(data); }

				// Sort
				else {
					$(".sort-flashcards select").val(App._settings.sorting || "front-asc");
					data.sort(App.Stacks.sortFn[App._settings.sorting || "front-asc"]);
				}

				// Replace linebreaks
				data = data.map(function(v) {
					v.value.front = v.value.front.replace(/\n/, "<br>");
					v.value.back = v.value.back.replace(/\n/, "<br>");

					return v;
				});

				Stacks.quiz.flashcards = data;
				Stacks.quiz.advance();
			});
		}

		function end() {
			delete Stacks.quiz.flashcards;

			App.Statistics.registerPracticeSession(
				Stacks.quiz.stackID,
				Stacks.quiz.score,
				Stacks.quiz.total
			);

			var score = Math.round(100/Stacks.quiz.total*Stacks.quiz.score);
			var message = Stacks.resultMessages[Math.round(App.Utils.translateRange(score, 0, 100, 0, 4))];
		
			App.Utils.dialog(
				"Session complete!",
				"<b>Score:</b> " + (Stacks.quiz.score) + "/" + Stacks.quiz.total + " (" + score + "%)<br><br>" + message,
				function() { window.location.hash = "page-stack:" + Stacks.quiz.stackID; }
			);
		}

		function abort() {
			delete Stacks.quiz.flashcards;
			delete Stacks.quiz.index;
			window.location.hash = "page-stack:" + Stacks.quiz.stackID;
		}

		function updateStats(bool, callback) {
			if (bool !== undefined) {
				var switched = Stacks.quiz.question._switched;
				var score = Stacks.quiz.question.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
				if (typeof score == "string") { score = JSON.parse(score); }

				score[switched ? "back" : "front"][bool ? "yes" : "no"]++;
				App.DB.updateData("App", "Flashcards", Stacks.quiz.question.key, { score: JSON.stringify(score) }, callback || function(){});
			} else {
				App.Router.$page.find(".stats").html((Stacks.quiz.index) + " of " + Stacks.quiz.total + "<br>");
			}
		}

		function advance() {

			var question = Stacks.quiz.flashcards[Stacks.quiz.index++];
			if (!question) { return end(); }
			Stacks.quiz.question = question;

			var $question = App.$("#quiz .quiz-question"),
			    $answers = App.$("#quiz .quiz-answer"),
			    switched = App._settings.switch_front_back,
			    right_answer, indices, index, val, i, langCode, text, prefs;

			if (App._settings.switch_front_back_randomly)
			{ switched = Math.round(Math.random()); }
			
			$answers.removeAttr("data-correct");
			question._switched = switched;
			question.switched = switched;
			question.failed = false;

			var front = switched ? question.value.back : question.value.front;
			var back = switched ? question.value.front : question.value.back;

			right_answer = Array.prototype.splice.call($answers, App.Utils.rand(0, 3), 1);

			// Insert new data
			$question.html(App.Utils.markdown(front));
			App.$(right_answer).html(App.Utils.markdown(back));
			App.$(right_answer).attr("data-correct", "true");

			indices = [Stacks.quiz.index-1];
			index = Stacks.quiz.index-1;

			for (i = 0; i < 3; i++) {

				while (indices.indexOf(index) != -1)
				{ index = App.Utils.rand(0, Stacks.quiz.total-1); }

				indices.push(index);
				val = App.Utils.markdown(Stacks.quiz.flashcards[index].value[switched ? "front" : "back"]);

				App.$(Array.prototype.pop.call($answers)).html(val);
			}

			updateStats();

			if (App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.quiz.question.value.stackID];
				
				if (prefs) {
					langCode = switched ? prefs.to : prefs.from;
					text = App.Utils.markdown(front, true);
					App.Utils.speak(text, langCode);
				}
			}
		}

		api = {
			initialize: initialize,
			updateStats: updateStats,
			advance: advance,
			abort: abort
		};

		return api;

	}());

	Stacks.resultMessages = [
		// >= 0%
		"Uh ou.. keep trying my friend!",

		// >= 20%+
		"I think you can do better!",

		// >= 40%+
		"We're getting there!",

		// >= 60%+
		"Almost there!",

		// >= 80%+
		"Well done!"
	];

	return Stacks;
});
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);
define("transit", ["jquery"], function(){});

define('modules/flashcards',["transit"], function() {

	var Flashcards = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Flashcards.initialize = function() {

		App = require("app");
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Flashcards.events = {

		// Select all
		"click .select-all": function(e) {
			var selected = App.$(e.currentTarget).hasClass("selected");
			App.$(e.currentTarget).toggleClass("selected");
			App.Router.$page.find(".flashcards tbody tr").toggleClass("selected", !selected);
		},

		// Select single
		"click .flashcards tbody tr": function(e) {
			App.$(e.currentTarget).toggleClass("selected");
		},

		// Search
		"search|keyup .search-wrapper input": function(e) {

			Flashcards.search($(e.currentTarget).val().trim());
		},

		// Markdown info
		"click .button-markdown-info": function(e) {
			App.Utils.dialog("Markdown",
				"<table class='help'>" +
					"<tr><th>Description</th><th>Markdown</th><th>Result</th></tr>" +
					"<tr><td>Italic</td><td>*word*</td><td><i>word</i></td></tr>" +
					"<tr><td>Bold</td><td>**word**</td><td><b>word</b></td></tr>" +
					"<tr><td>Bold and italic</td><td>***word***</td><td><b><i>word</i></b></td></tr>" +
					"<tr><td>Furigana</td><td>[明日]{あした}</td><td><ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby></td></tr>" +
				"</table>"
			);
		},

		// Search info
		"click .button-search-info": function(e) {
			App.Utils.dialog("Search",
				"More specific queries require a special syntax:<br><br>"+
				"<ul>" +
					"<li><b>category:</b>value</li>" +
					"<li><b>stack:</b>value</li>" +
					"<li><b>front:</b>value</li>" +
					"<li><b>back:</b>value</li>" +
					"<li><b>tags:</b>value</li>" +
					"<li><b>score_front:</b>[n, &gt;n, &lt;n]</li>" +
					"<li><b>score_back:</b>[n, &gt;n, &lt;n]</li>" +
				"</ul><br>" +

				"Most of the keywords should be pretty self explanatory. It is important to not use spaces between the keyword and the search value." +
				"If you must use spaces, wrap them in quotes.<br><br>" +

				"<b>score_front</b> and <b>score_back</b> are used to filter flashcards by their score (indicated by the number in front of their value). " +
				"You can either search for an exact score, or for a score lesser/greater a number using &lt; and &gt;.<br><br>" +

				"To search for multiple categories or stacks, seperate them with two pipe symbols (||), tags however use a comma for seperation.<br><br>" +
				"An example query could look like this:<br><b>stack:\"Lorem Ipsum\"||Dolor tags:foo,bar</b><br><br>" +
				"Note that we have to seperate each syntax:value pair with a space. The above example would search for all flashcards contained in a stack named <b>Lorem Ipsum</b> or <b>Dolor</b> with either <b>foo</b> or <b>bar</b> as a tag."
			);
		},

		// New flashcard(s)
		"click .button-new-flashcard": function(e) {
			window.location.hash = "page-flashcard-new:" + App.Stacks.current;
		},

		// Add flashcard(s)
		"click .flashcard-add": function(e) {

			var data = {
				stackID: App.Stacks.current,
				front: App.Utils.escapeHTML(App.Router.$page.find("textarea[name=front]").val()),
				back: App.Utils.escapeHTML(App.Router.$page.find("textarea[name=back]").val()),
				tags: JSON.stringify(App.Utils.escapeHTML(App.Router.$page.find("input[name=tags]").val()).split(/ ?, ?/g))
			};

			if (!data.front.trim() || !data.back.trim())
			{ return App.Utils.notification("Front and/or back is empty"); }

			Flashcards.add(data);
		},

		// Flashcard info
		"click .flashcard-info": function(e) {

			var cards = Flashcards.getSelection();
			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			Flashcards.get(cards.map(function(v) { return v.key; }), function(data) {

				var html ="<table class='flashcard-info-table'><tr><th>Front</th><th>Back</th><tr>";

				data.forEach(function(v) {
					var s = v.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
					if (typeof s == "string") { s = JSON.parse(s); }

					html += "<tr>";
					html += "<td>[" + s.front.yes + ";" + s.front.no + "] " + v.value.front + "</td>";
					html += "<td>[" + s.back.yes + ";" + s.back.no + "] " + v.value.back + "</td>";
					html += "</tr>";
				});

				html += "</table><hr>";
				html += "The first number inside each bracket represents the amount of times you pressed the \"thumbs-up\"-button, ";
				html += "the second one the opposite.<br><br>The numbers displayed behind this window represent the difference between the two (thumbs-up minus thumbs-down).";

				App.Utils.dialog("Flashcard Info", html);
			});
		},


		// Remove flashcard(s)
		"click .flashcard-remove": function(e) {

			var cards = Flashcards.getSelection();
			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			App.Utils.dialog("Confirm", {
				content: "Remove selection?",
				buttons: {
					ok: function() { Flashcards.remove(cards); },
					cancel: true
				}
			});
		},

		// Edit flashcard(s)
		"click .flashcard-edit": function(e) {

			var cards = Flashcards.getSelection(), card;
			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			card = cards.shift();

			Flashcards.update.origin = window.location.hash.substr(1);
			window.location.hash = "page-flashcard-edit:" + card.stackID + ":" + card.key;
			Flashcards.update.queue = cards;
		},

		// Move flashcard(s)
		"click .flashcard-move": function(e) {

			var cards = Flashcards.getSelection();
			var stackname = App.Router.$page.find(".stack-name").text().trim();

			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			App.Stacks.getAll(function(stacks) {

				var $select = App.$("<select></select>"), destination;

				[].forEach.call(stacks, function(v) {
					if (v.key == App.Stacks.current) { return true; }
					destination = v.value.category + " // " + v.value.name;
					$select.append("<option data-key='" + v.key + "'>" + destination + "</option>");
				});

				App.Utils.dialog("Select destination", {

					content: $select[0].outerHTML,
					buttons: {
						ok: Flashcards.move,
						cancel: true
					}
				});
			});
		},

		// Update flashcard(s)
		"click .flashcard-update": function(e) {

			var key = +window.location.hash.split(":")[2];

			var data = {
				front: App.Router.$page.find("textarea[name=front]").val(),
				back: App.Router.$page.find("textarea[name=back]").val(),
				tags: JSON.stringify(App.Utils.escapeHTML(App.Router.$page.find("input[name=tags]").val()).split(/ ?, ?/g))
			};

			Flashcards.update(key, data);
		},

		// Translate flashcard
		"click .translate": function(e) {

			var isFront = App.$(e.currentTarget).hasClass("front");
			var text = App.Router.$page.find("textarea[name=" + (isFront ? "front" : "back") + "]").val();

			if (!text.trim()) { return; }

			if (App.isOnline()) {
				Flashcards.translate(App.Stacks.current, text, isFront);
			} else {
				App.Utils.notification("Can't translate when offline");
			}
		},

		"click #flashcard .front, #flashcard .back": function(e) {
			if (App._settings.playthrough) { return; }
			Flashcards.flip(e);
		}
	};

	/* ================== */
	/* ====== FLIP ====== */
	/* ================== */

	Flashcards.flip = function(e, speakCallback) {

		if (App.Stacks.practice.pending) { return; }
		App.Stacks.practice.pending = true;

		if (!App.Stacks.practice.flashcard.flipped) { App.Stacks.practice.flashcard.flipped = true; }
		else { App.Stacks.practice.flashcard.flipped = !App.Stacks.practice.flashcard.flipped; }

		var time_factor = 1,
			front = e === true || $(e.currentTarget).hasClass("front"),
		    switched = App.Stacks.practice.flashcard.switched,
		    langCode, text, prefs;

		if (App._settings.disable_animation) { time_factor = 0; }
		App.Stacks.practice.flashcard.switched = !App.Stacks.practice.flashcard.switched;

		App.$("#flashcard .front").transition({ rotateX: front ? 180 : 5 }, 750 * time_factor, function() {
			App.Stacks.practice.pending = false;
		});

		App.$("#flashcard .back").transition({ rotateX: front ? 365 : 180 }, 750 * time_factor);
		App.$("#flashcard-shadow").transition({ rotateX: front ? 180 : 0 }, 750 * time_factor);

		if (front && !App._settings.playthrough) { App.$("#practice-buttons").delay(750 * time_factor).fadeIn(500 * time_factor); }

		if (App._settings.tts_auto || App._settings.playthrough) {

			prefs = App._settings.translation_preferences && App._settings.translation_preferences[App.Stacks.practice.flashcard.value.stackID];
			
			if (prefs) {
				langCode = switched ? (front ? prefs.from : prefs.to) : (front ? prefs.to : prefs.from);
				text = App.Utils.markdown(App.Stacks.practice.flashcard.value[switched ? "front" : "back"], true);
				App.Utils.speak(text, langCode, speakCallback);
			} else if (speakCallback) {
				App.Stacks.practice.timeouts.push(window.setTimeout(speakCallback, 1000));
			}
		}
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Flashcards.getAll = function(stackID, callback, applyMarkdown) {
		App.DB.getData("App", "Flashcards", stackID !== undefined ? { index: "stackID", range: stackID } : null, function(data) {

			if (applyMarkdown) {
				data.forEach(function(v) {
					v.value.front = App.Utils.markdown(v.value.front);
					v.value.back = App.Utils.markdown(v.value.back);
				});
			}

			data = data.sort(function(a, b) { return a.value.front < b.value.front ? -1 : 1; });
			callback(data, stackID);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Flashcards.get = function(key, callback) {
		App.DB.getData("App", "Flashcards", key, function(data) {
			callback(data);
		});
	};

	/* =========================== */
	/* ====== GET SELECTION ====== */
	/* =========================== */

	Flashcards.getSelection = function() {

		var $rows = App.Router.$page.find(".flashcards tbody tr.selected");
		var cards = [];

		$rows.each(function() {
			cards.push({
				stackID: +App.$(this).attr("data-stackID") || App.Stacks.current,
				key: +App.$(this).attr("data-key")
			});
		});

		return cards;
	};

	/* ================= */
	/* ====== ADD ====== */
	/* ================= */

	Flashcards.add = function(data, callback) {

		// Add key(s)
		App.DB.addData("App", "Flashcards", data, function(e) {

			if (callback) { callback(); }
			if (data.length) { return; }
			
			App.Router.$page.find("textarea[name=front]").val("");
			App.Router.$page.find("textarea[name=back]").val("");
			App.Router.$page.find("input[name=tags]").val("");

			App.Utils.notification("Flashcard added");
		});
	};

	/* ==================== */
	/* ====== UPDATE ====== */
	/* ==================== */

	Flashcards.update = function(key, newData, callback) {

		App.DB.updateData("App", "Flashcards", key, newData, function() {

			if (callback) { callback(); }

			if (Flashcards.update.queue && Flashcards.update.queue.length) {
				var card = Flashcards.update.queue.shift();
				window.location.hash = "page-flashcard-edit:" + card.stackID + ":" + card.key;
				return;
			}

			window.location.hash = Flashcards.update.origin;
		});
	};

	Flashcards.translate = function(stackID, text, isFront) {

		var prefs = App._settings.translation_preferences && App._settings.translation_preferences[stackID], from, to, url, $target;
		if (!prefs) { return App.Utils.notification("Please set your translation preferences in your stack settings first"); }

		$target = App.Router.$page.find("textarea[name=" + (isFront ? "back" : "front") + "]");
		$target.val("translating ...");

		from = prefs.from;
		to = prefs.to;

		// Switch
		if (!isFront) { from = prefs.to; to = prefs.from; }

		url = "http://mymemory.translated.net/api/get?q=" + encodeURIComponent(text) + "&langpair=" + from + "|" + to + "&de=elias.schuett@gmail.com";

		App.$.getJSON(url, function(data) {
			var translation = data.responseData.translatedText;
			$target.val(translation);
		});
	};

	Flashcards.translate.languages = ["Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Bajan", "Balkan Gipsy", "Basque", "Bemba", "Bengali", "Bielarus", "Bislama", "Bosnian", "Breton", "Bulgarian", "Burmese", "Catalan", "Cebuano", "Chamorro", "Chinese (Simplified)", "Chinese Traditional", "Comorian (Ngazidja)", "Coptic", "Croatian", "Czech", "Danish", "Dutch", "Dzongkha", "English", "Esperanto", "Estonian", "Fanagalo", "Faroese", "Finnish", "French", "Galician", "Georgian", "German", "Greek", "Greek (Classical)", "Gujarati", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Inuktitut (Greenlandic)", "Irish Gaelic", "Italian", "Japanese", "Javanese", "Kabuverdianu", "Kabylian", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Kirundi", "Korean", "Kurdish", "Kurdish Sorani", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Maldivian", "Maltese", "Manx Gaelic", "Maori", "Marshallese", "Mende", "Mongolian", "Morisyen", "Nepali", "Niuean", "Norwegian", "Nyanja", "Pakistani", "Palauan", "Panjabi", "Papiamentu", "Pashto", "Persian", "Pijin", "Polish", "Portuguese", "Potawatomi", "Quechua", "Romanian", "Russian", "Samoan", "Sango", "Scots Gaelic", "Serbian", "Shona", "Sinhala", "Slovak", "Slovenian", "Somali", "Sotho, Southern", "Spanish", "Sranan Tongo", "Swahili", "Swedish", "Swiss German", "Syriac (Aramaic)", "Tagalog", "Tajik", "Tamashek (Tuareg)", "Tamil", "Telugu", "Tetum", "Thai", "Tibetan", "Tigrinya", "Tok Pisin", "Tokelauan", "Tongan", "Tswana", "Turkish", "Turkmen", "Tuvaluan", "Ukrainian", "Uma", "Uzbek", "Vietnamese", "Wallisian", "Welsh", "Wolof", "Xhosa", "Yiddish", "Zulu"];
	Flashcards.translate.language_codes = ["af-ZA", "sq-AL", "am-AM", "ar-SA", "hy-AM", "az-AZ", "bjs-BJS", "rm-RO", "eu-ES", "bem-BEM", "bn-IN", "be-BY", "bi-BI", "bs-BA", "br-FR", "bg-BG", "my-MM", "ca-ES", "cb-PH", "ch-CH", "zh-CN", "zh-TW", "zdj-ZDJ", "cop-XNA", "hr-HR", "cs-CZ", "da-DK", "nl-NL", "dz-DZ", "en-GB", "eo-XN", "et-EE", "fn-FNG", "fo-FO", "fi-FI", "fr-FR", "gl-ES", "ka-GE", "de-DE", "el-GR", "XN-GR", "gu-IN", "ha-HA", "XN-US", "he-IL", "hi-IN", "hu-HU", "is-IS", "id-ID", "kl-KL", "ga-IE", "it-IT", "ja-JP", "jw-ID", "kea-KEA", "kab-DZ", "ka-IN", "kk-KZ", "km-KM", "rw-RW", "rn-RN", "ko-KR", "ku-TR", "ku-TR", "ky-KY", "lo-LO", "la-XN", "lv-LV", "lt-LT", "lb-LB", "mk-MK", "mg-MG", "ms-MY", "dv-DV", "mt-MT", "gv-IM", "mi-NZ", "mh-MH", "men-MEN", "mn-MN", "mfe-MFE", "ne-NP", "niu-NIU", "no-NO", "ny-NY", "ur-PK", "pau-PAU", "pa-IN", "pap-PAP", "ps-PK", "fa-IR", "pis-PIS", "pl-PL", "pt-PT", "pot-US", "qu-XN", "ro-RO", "ru-RU", "sm-SM", "sg-SG", "gd-GB", "sr-RS", "sn-SN", "si-LK", "sk-SK", "sl-SI", "so-SO", "st-ST", "es-ES", "srn-SRN", "sw-SZ", "sv-SE", "de-CH", "syc-TR", "tl-PH", "tg-TJ", "tmh-DZ", "ta-LK", "te-IN", "tet-TET", "th-TH", "bo-CN", "ti-TI", "tpi-TPI", "tkl-TKL", "to-TO", "tn-TN", "tr-TR", "tk-TK", "tvl-TVL", "uk-UA", "ppk-ID", "uz-UZ", "vi-VN", "wls-WLS", "cy-GB", "wo-SN", "xh-ZA", "yi-YD", "zu-ZU"];

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Flashcards.remove = function(card, no_UI) {

		var cards = typeof card == "object" && card.length ? card : [card], count = 0;
		var fn = function(key) {

			if (fn.fired) { return; }
			fn.fired = true;

			if (!no_UI) {
				cards.forEach(function(v) {
					App.Router.$page.find("tr[data-key=" + v.key + "]").remove();
				});

				if (!App.Router.$page.find(".flashcards > tbody tr").length) {
					App.Router.$page.find(".stack-buttons, .flashcards").hide();
					App.Router.$page.find(".note").show();
				}
			}
			
			count++;
		};

		// Workaround...
		if (window.shimIndexedDB) {
			card.forEach(function(card) {
				App.DB.removeData("App", "Flashcards", card.key, function() { fn(card.key); });
			});
		} else {

			// Remove key(s)
			App.DB.removeData("App", "Flashcards", { index: "stackID", keys: cards.map(function(v) { return v.key; }) }, function() { fn(card.key); });
		}
	};

	/* ================== */
	/* ====== MOVE ====== */
	/* ================== */

	Flashcards.move = function() {

		var destination = App.$("#dialog select option:selected").text();
		var stackID = +$("#dialog select option:selected").attr("data-key");
		var $checkboxes = App.Router.$page.find(".flashcards td input:checked");
		var cards = Flashcards.getSelection();

		var fn_finish = function(e) {

			var is_search = App.Router.$page.attr("id") == "page-search";

			cards.forEach(function(v) {
				if (v.key != App.Stacks.current && !is_search) {
					App.Router.$page.find("tr[data-key=" + v.key + "]").remove();
				}
			});

			if (!App.Router.$page.find(".flashcards > tbody tr").length) {
				App.Router.$page.find(".stack-buttons, .flashcards").hide();
				App.Router.$page.find(".note").show();
			}

			App.Utils.notification("Moved " + cards.length + " flashcards to " + destination);
		};

		// Workaround...
		if (window.shimIndexedDB) {

			cards.forEach(function(v) {
				delete Flashcards.update.queue;
				Flashcards.update.origin = window.location.hash.substr(1);
				cards.map(function(v) { Flashcards.update(v.key, { stackID: stackID }); });
			});

			return fn_finish();
		}

		App.DB.updateData("App", "Flashcards", {

				index: "stackID",
				range: App.Stacks.current,
				keys: cards.map(function(v) { return v.key; })

			}, { stackID: stackID },

			fn_finish
		);
	};

	Flashcards.search = (function() {

		var tests = {
			category: function(v, fl) { return v.indexOf(fl.category) != -1; },
			stack: function(v, fl) { return v.indexOf(fl.stack) != -1; },
			raw: function(v, fl) { return fl.value.front.indexOf(v) != -1 || fl.value.back.indexOf(v) != -1; },
			front: function(v, fl) { return fl.value.front.indexOf(v) != -1; },
			back: function(v, fl) { return fl.value.back.indexOf(v) != -1; },
			score_front: function(v, fl) {

				var match = false;
				
				if (v[0] == "<")
				{ match = fl.value.score_front < +v.substr(1); }
				else if (v[0] == ">")
				{ match = fl.value.score_front > +v.substr(1); }
				else
				{ match = fl.value.score_front == +v; }

				return match;
			},

			score_back: function(v, fl) {

				var match = false;
				
				if (v[0] == "<")
				{ match = fl.value.score_back < +v.substr(1); }
				else if (v[0] == ">")
				{ match = fl.value.score_back > +v.substr(1); }
				else
				{ match = fl.value.score_back == +v; }

				return match;
			},

			tags: function(v, fl) {
				return v.some(function(tag) {
					return fl.value.tags.indexOf(tag) != -1;
				});
			}
		}, fn_parse, fn_process, pending, last_query, timeout;

		fn_parse = function(query_string) {

			var query = {}, query_pairs = [], start = 0, quotes;

			// Split the query on whitespace excpet when
			// the whitespace is contained in quotes
			query_string.split("").map(function(v, i) {
				
				if (v == "\"") { quotes = !quotes; }
				
				if (i == query_string.length-1) {
					quotes = false;
					v = " ";
					i++;
				}

				if (!quotes && v == " ") {
					query_pairs.push(query_string.substring(start, i).replace(/\"/g, ""));
					start = i+1;
				}
			});

			// Form syntax pairs into a proper object
			query_pairs.forEach(function(v) {

				var pair = v.split(":");
				var filter = pair[0];
				var search = pair[1];

				if (pair.length == 1) {
					if (query.raw) { return true; }
					query.raw = pair[0];
					return true;
				}

				if (filter == "tags")
				{ search = search.split(/ ?, ?/g); }
				else if (["category", "stack"].indexOf(filter) != -1)
				{ search = search.split(/ ?\|\| ?/g); }

				query[pair[0]] = search;
			});

			fn_process(query);
		};

		fn_process = function(query) {

			// Don't excessively search while typing
			if (pending) {

				last_query = query;

				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					pending = false;
					fn_process(last_query);
				}, 250);

				return;
			}

			pending = true;

			// No input
			if (!Object.keys(query).length) { return App.Router.$page.find(".flashcards tbody tr").show(); }

			var keys = [], show = [], hide = [], query_tests = Object.keys(query);

			// Perform tests
			App._search.forEach(function(v) {

				var passed = 0;

				query_tests.forEach(function(t) {
					if (tests[t] && tests[t](query[t], v)) { passed++; }
				});

				if (passed == query_tests.length) { keys.push(v.key); }
			});

			// Get table row objects
			App.Router.$page.find(".flashcards > tbody tr").each(function(i) {
				if (keys.indexOf(+App.$(this).attr("data-key")) != -1)
				{ show.push(this); }
				else
				{ hide.push(this); }
			});

			App.$.call(this, show).show();
			App.$.call(this, hide).hide();
		};

		return fn_parse;
	}());

	return Flashcards;
});
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchMove = function() { return FastClick.prototype.onTouchMove.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !this.deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	'use strict';

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;
	var chromeVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			
			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define('fastclick',[],function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
};
define('app',[

	"jquery",

	"modules/utils",
	"modules/router",

	"modules/settings",
	"modules/database",

	"modules/statistics",
	"modules/stacks",
	"modules/flashcards",
	"fastclick"

], function($, Utils, Router, Settings, DB, Statistics, Stacks, Flashcards, fastclick) {

	var App = {
		_settings: Utils.localStorage("settings") || {},
		isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
	};

	App._settings.translation_preferences = App._settings.translation_preferences || {};
	App.isPhoneGap = App.isMobile && (document.location.protocol == "file:");

	App.$ = $;
	App.Utils = Utils;
	App.Router = Router;
	App.Settings = Settings;
	App.DB = DB;
	App.Statistics = Statistics;
	App.Stacks = Stacks;
	App.Flashcards = Flashcards;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	App.initialize = function() {

		// Load indexedDB shim if needed
		if (!window.indexedDB || (window.indexedDB && window.indexedDB.setVersion)) {

			require(["js_external/indexedDB.js"], function() {
				// window.shimIndexedDB.__debug(true);
				App.initialize();
			});

			return;
		}

		// Open external links with PhoneGap's InAppBrowser
		if (App.isPhoneGap) {

			$("body").on("click", "a[target='_blank']", function(e) {

				var url = $(e.currentTarget).attr("href");
				window.open(url, "_blank", "location=yes");

				e.preventDefault();
				return false;
			});

		// Load roboto font
		} else {
			App.$("head").append("<link rel='stylesheet' type='text/css' href='css_external/roboto.css'>");
		}

		// Other modules depend on Utils
		// so initialize them first
		Utils.initialize();

		// Initialize the database
		DB.initialize(function() {
			Settings.initialize();
			Statistics.initialize();
			Stacks.initialize();
			Flashcards.initialize();
			Router.initialize();
			App.registerEvents();
		});
	};

	/* ======================= */
	/* ====== IS ONLINE ====== */
	/* ======================= */

	App.isOnline = function() {
		return App.isOnlinePhoneGap !== undefined ? App.isOnlinePhoneGap : navigator.onLine;
	};

	/* ============================= */
	/* ====== REGISTER EVENTS ====== */
	/* ============================= */

	App.registerEvents = function() {

		// Translates click events into touch events
		fastclick.attach(document.body);

		// Menubutton event listener
		document.addEventListener("menubutton", function(e) {

			if (!Router.$page) { return; }
			var $actions = Router.$page.find(".actions");
			$actions.toggleClass("android-menu");
			Utils.forceRender($("body"));

		}, false);

		// Register module events
		var key, evt, pair, type, selector;

		for (key in App) {
			if (App[key].events) {
				for (evt in App[key].events) {
					pair = evt.split(" ");
					type = pair.shift().replace("|", " ");
					selector = pair.join(" ");
					$("body").on(type, selector, App[key].events[evt]);
				}
			}
		}
	};

	return App;

});
require.config({

	shim: {
		"chart": { exports: "Chart" },
		"transit": { deps: ["jquery"] }
	},

	paths: {
		"IDBOpen": "shims/IDBOpen",
		"jquery": "libs/jquery",
		"chart": "libs/chart",
		"transit": "plugins/jquery.transit",
		"fastclick": "libs/fastclick"
	}
});

require(["app"], function(App) {

	if (App.isPhoneGap) {
		require(["cordova.js", "js_external/utils_phonegap"], function(Cordova, PhoneGap_Utils) {
			App.Utils.PhoneGap = PhoneGap_Utils;
			App.Utils.PhoneGap.initialize();
		});

		return;
	}

	App.initialize();
});
define("main", function(){});

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);
define("libs/prefixfree.js", function(){});
