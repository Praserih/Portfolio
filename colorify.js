!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports["lottie-colorify"]=r():t["lottie-colorify"]=r()}(window,(function(){return function(t){var r={};function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(r){return t[r]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=0)}([function(t,r,e){"use strict";var n=this&&this.__spreadArrays||function(){for(var t=0,r=0,e=arguments.length;r<e;r++)t+=arguments[r].length;var n=Array(t),o=0;for(r=0;r<e;r++)for(var c=arguments[r],u=0,a=c.length;u<a;u++,o++)n[o]=c[u];return n},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(r,"__esModule",{value:!0}),r.getColors=r.flatten=r.replaceColor=r.colorify=void 0;var c=o(e(1));r.colorify=function(t,r,e){void 0===t&&(t=[]),void 0===e&&(e=!0);for(var n=[],o=0,a=t;o<a.length;o++){var f=a[o];n.push(u(f))}return i(n,e?c.default(r):r)};var u=function(t){if("string"==typeof t&&t.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)){var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(!r)throw new Error("Color can be only hex or rgb array (ex. [10,20,30])");return[Math.round(parseInt(r[1],16)/255*1e3)/1e3,Math.round(parseInt(r[2],16)/255*1e3)/1e3,Math.round(parseInt(r[3],16)/255*1e3)/1e3]}if("object"==typeof t&&3===t.length&&t.every((function(t){return t>=0&&t<=255})))return[Math.round(t[0]/255*1e3)/1e3,Math.round(t[1]/255*1e3)/1e3,Math.round(t[2]/255*1e3)/1e3];if(t)throw new Error("Color can be only hex or rgb array (ex. [10,20,30])")},a=function(t){return Math.round(1e3*t)/1e3};r.replaceColor=function(t,r,e,o){void 0===o&&(o=!0);var i=u(t),f=u(r);if(!i||!f)throw new Error("Proper colors must be used for both source and target");return function t(r,e,o){if(o.s&&Array.isArray(o.s)&&4===o.s.length)r[0]===o.s[0]&&r[1]===o.s[1]&&r[2]===o.s[2]&&(o.s=n(e,[1]));else if(o.c&&o.c.k)Array.isArray(o.c.k)&&"number"!=typeof o.c.k[0]?t(r,e,o.c.k):r[0]===a(o.c.k[0])&&r[1]===a(o.c.k[1])&&r[2]===a(o.c.k[2])&&(o.c.k=e);else for(var c in o)"object"==typeof o[c]&&t(r,e,o[c]);return o}(i,f,o?c.default(e):e)},r.flatten=function(t,r,e){void 0===e&&(e=!0);var o=u(t);if(!o)throw new Error("Proper colors must be used for target");return function t(r,e){if(e.s&&Array.isArray(e.s)&&4===e.s.length)e.s=n(r,[1]);else if(e.c&&e.c.k)Array.isArray(e.c.k)&&"number"!=typeof e.c.k[0]?t(r,e.c.k):e.c.k=r;else for(var o in e)"object"==typeof e[o]&&t(r,e[o]);return e}(o,e?c.default(r):r)};var i=function(t,r){var e=0;return function t(r,o){for(var c in o.s&&Array.isArray(o.s)&&4===o.s.length?(r[e]&&(o.s=n(r[e],[1])),e++):o.c&&o.c.k&&(Array.isArray(o.c.k)&&"number"!=typeof o.c.k[0]?t(r,o.c.k):(r[e]&&(o.c.k=r[e]),e++)),o)"object"==typeof o[c]&&t(r,o[c]);return o}(t,r)};r.getColors=function(t){var r=[];return function t(e){if(e.s&&Array.isArray(e.s)&&4===e.s.length)r.push((o=e.s,[Math.round(255*o[0]),Math.round(255*o[1]),Math.round(255*o[2]),o[3]]));else if(e.c&&e.c.k)Array.isArray(e.c.k)&&"number"!=typeof e.c.k[0]?t(e.c.k):r.push(function(t){return[Math.round(255*t[0]),Math.round(255*t[1]),Math.round(255*t[2])]}(e.c.k));else for(var n in e)"object"==typeof e[n]&&t(e[n]);var o;return r}(t),r}},function(t,r,e){(function(t,e){var n="[object Arguments]",o="[object Function]",c="[object GeneratorFunction]",u="[object Map]",a="[object Set]",i=/\w*$/,f=/^\[object .+?Constructor\]$/,s=/^(?:0|[1-9]\d*)$/,l={};l[n]=l["[object Array]"]=l["[object ArrayBuffer]"]=l["[object DataView]"]=l["[object Boolean]"]=l["[object Date]"]=l["[object Float32Array]"]=l["[object Float64Array]"]=l["[object Int8Array]"]=l["[object Int16Array]"]=l["[object Int32Array]"]=l[u]=l["[object Number]"]=l["[object Object]"]=l["[object RegExp]"]=l[a]=l["[object String]"]=l["[object Symbol]"]=l["[object Uint8Array]"]=l["[object Uint8ClampedArray]"]=l["[object Uint16Array]"]=l["[object Uint32Array]"]=!0,l["[object Error]"]=l[o]=l["[object WeakMap]"]=!1;var p="object"==typeof t&&t&&t.Object===Object&&t,y="object"==typeof self&&self&&self.Object===Object&&self,b=p||y||Function("return this")(),h=r&&!r.nodeType&&r,d=h&&"object"==typeof e&&e&&!e.nodeType&&e,_=d&&d.exports===h;function v(t,r){return t.set(r[0],r[1]),t}function j(t,r){return t.add(r),t}function g(t,r,e,n){var o=-1,c=t?t.length:0;for(n&&c&&(e=t[++o]);++o<c;)e=r(e,t[o],o,t);return e}function w(t){var r=!1;if(null!=t&&"function"!=typeof t.toString)try{r=!!(t+"")}catch(t){}return r}function A(t){var r=-1,e=Array(t.size);return t.forEach((function(t,n){e[++r]=[n,t]})),e}function m(t,r){return function(e){return t(r(e))}}function O(t){var r=-1,e=Array(t.size);return t.forEach((function(t){e[++r]=t})),e}var k,x=Array.prototype,M=Function.prototype,P=Object.prototype,S=b["__core-js_shared__"],I=(k=/[^.]+$/.exec(S&&S.keys&&S.keys.IE_PROTO||""))?"Symbol(src)_1."+k:"",E=M.toString,$=P.hasOwnProperty,C=P.toString,F=RegExp("^"+E.call($).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),U=_?b.Buffer:void 0,D=b.Symbol,B=b.Uint8Array,T=m(Object.getPrototypeOf,Object),V=Object.create,R=P.propertyIsEnumerable,W=x.splice,z=Object.getOwnPropertySymbols,L=U?U.isBuffer:void 0,N=m(Object.keys,Object),G=dt(b,"DataView"),q=dt(b,"Map"),H=dt(b,"Promise"),J=dt(b,"Set"),K=dt(b,"WeakMap"),Q=dt(Object,"create"),X=wt(G),Y=wt(q),Z=wt(H),tt=wt(J),rt=wt(K),et=D?D.prototype:void 0,nt=et?et.valueOf:void 0;function ot(t){var r=-1,e=t?t.length:0;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function ct(t){var r=-1,e=t?t.length:0;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function ut(t){var r=-1,e=t?t.length:0;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function at(t){this.__data__=new ct(t)}function it(t,r){var e=mt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Ot(t)}(t)&&$.call(t,"callee")&&(!R.call(t,"callee")||C.call(t)==n)}(t)?function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n}(t.length,String):[],o=e.length,c=!!o;for(var u in t)!r&&!$.call(t,u)||c&&("length"==u||jt(u,o))||e.push(u);return e}function ft(t,r,e){var n=t[r];$.call(t,r)&&At(n,e)&&(void 0!==e||r in t)||(t[r]=e)}function st(t,r){for(var e=t.length;e--;)if(At(t[e][0],r))return e;return-1}function lt(t,r,e,f,s,p,y){var b;if(f&&(b=p?f(t,s,p,y):f(t)),void 0!==b)return b;if(!Mt(t))return t;var h=mt(t);if(h){if(b=function(t){var r=t.length,e=t.constructor(r);r&&"string"==typeof t[0]&&$.call(t,"index")&&(e.index=t.index,e.input=t.input);return e}(t),!r)return function(t,r){var e=-1,n=t.length;r||(r=Array(n));for(;++e<n;)r[e]=t[e];return r}(t,b)}else{var d=vt(t),_=d==o||d==c;if(kt(t))return function(t,r){if(r)return t.slice();var e=new t.constructor(t.length);return t.copy(e),e}(t,r);if("[object Object]"==d||d==n||_&&!p){if(w(t))return p?t:{};if(b=function(t){return"function"!=typeof t.constructor||gt(t)?{}:(r=T(t),Mt(r)?V(r):{});var r}(_?{}:t),!r)return function(t,r){return bt(t,_t(t),r)}(t,function(t,r){return t&&bt(r,Pt(r),t)}(b,t))}else{if(!l[d])return p?t:{};b=function(t,r,e,n){var o=t.constructor;switch(r){case"[object ArrayBuffer]":return yt(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return function(t,r){var e=r?yt(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)}(t,n);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(t,r){var e=r?yt(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}(t,n);case u:return function(t,r,e){return g(r?e(A(t),!0):A(t),v,new t.constructor)}(t,n,e);case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return function(t){var r=new t.constructor(t.source,i.exec(t));return r.lastIndex=t.lastIndex,r}(t);case a:return function(t,r,e){return g(r?e(O(t),!0):O(t),j,new t.constructor)}(t,n,e);case"[object Symbol]":return c=t,nt?Object(nt.call(c)):{}}var c}(t,d,lt,r)}}y||(y=new at);var m=y.get(t);if(m)return m;if(y.set(t,b),!h)var k=e?function(t){return function(t,r,e){var n=r(t);return mt(t)?n:function(t,r){for(var e=-1,n=r.length,o=t.length;++e<n;)t[o+e]=r[e];return t}(n,e(t))}(t,Pt,_t)}(t):Pt(t);return function(t,r){for(var e=-1,n=t?t.length:0;++e<n&&!1!==r(t[e],e,t););}(k||t,(function(n,o){k&&(n=t[o=n]),ft(b,o,lt(n,r,e,f,o,t,y))})),b}function pt(t){return!(!Mt(t)||(r=t,I&&I in r))&&(xt(t)||w(t)?F:f).test(wt(t));var r}function yt(t){var r=new t.constructor(t.byteLength);return new B(r).set(new B(t)),r}function bt(t,r,e,n){e||(e={});for(var o=-1,c=r.length;++o<c;){var u=r[o],a=n?n(e[u],t[u],u,e,t):void 0;ft(e,u,void 0===a?t[u]:a)}return e}function ht(t,r){var e,n,o=t.__data__;return("string"==(n=typeof(e=r))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==e:null===e)?o["string"==typeof r?"string":"hash"]:o.map}function dt(t,r){var e=function(t,r){return null==t?void 0:t[r]}(t,r);return pt(e)?e:void 0}ot.prototype.clear=function(){this.__data__=Q?Q(null):{}},ot.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},ot.prototype.get=function(t){var r=this.__data__;if(Q){var e=r[t];return"__lodash_hash_undefined__"===e?void 0:e}return $.call(r,t)?r[t]:void 0},ot.prototype.has=function(t){var r=this.__data__;return Q?void 0!==r[t]:$.call(r,t)},ot.prototype.set=function(t,r){return this.__data__[t]=Q&&void 0===r?"__lodash_hash_undefined__":r,this},ct.prototype.clear=function(){this.__data__=[]},ct.prototype.delete=function(t){var r=this.__data__,e=st(r,t);return!(e<0)&&(e==r.length-1?r.pop():W.call(r,e,1),!0)},ct.prototype.get=function(t){var r=this.__data__,e=st(r,t);return e<0?void 0:r[e][1]},ct.prototype.has=function(t){return st(this.__data__,t)>-1},ct.prototype.set=function(t,r){var e=this.__data__,n=st(e,t);return n<0?e.push([t,r]):e[n][1]=r,this},ut.prototype.clear=function(){this.__data__={hash:new ot,map:new(q||ct),string:new ot}},ut.prototype.delete=function(t){return ht(this,t).delete(t)},ut.prototype.get=function(t){return ht(this,t).get(t)},ut.prototype.has=function(t){return ht(this,t).has(t)},ut.prototype.set=function(t,r){return ht(this,t).set(t,r),this},at.prototype.clear=function(){this.__data__=new ct},at.prototype.delete=function(t){return this.__data__.delete(t)},at.prototype.get=function(t){return this.__data__.get(t)},at.prototype.has=function(t){return this.__data__.has(t)},at.prototype.set=function(t,r){var e=this.__data__;if(e instanceof ct){var n=e.__data__;if(!q||n.length<199)return n.push([t,r]),this;e=this.__data__=new ut(n)}return e.set(t,r),this};var _t=z?m(z,Object):function(){return[]},vt=function(t){return C.call(t)};function jt(t,r){return!!(r=null==r?9007199254740991:r)&&("number"==typeof t||s.test(t))&&t>-1&&t%1==0&&t<r}function gt(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||P)}function wt(t){if(null!=t){try{return E.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function At(t,r){return t===r||t!=t&&r!=r}(G&&"[object DataView]"!=vt(new G(new ArrayBuffer(1)))||q&&vt(new q)!=u||H&&"[object Promise]"!=vt(H.resolve())||J&&vt(new J)!=a||K&&"[object WeakMap]"!=vt(new K))&&(vt=function(t){var r=C.call(t),e="[object Object]"==r?t.constructor:void 0,n=e?wt(e):void 0;if(n)switch(n){case X:return"[object DataView]";case Y:return u;case Z:return"[object Promise]";case tt:return a;case rt:return"[object WeakMap]"}return r});var mt=Array.isArray;function Ot(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}(t.length)&&!xt(t)}var kt=L||function(){return!1};function xt(t){var r=Mt(t)?C.call(t):"";return r==o||r==c}function Mt(t){var r=typeof t;return!!t&&("object"==r||"function"==r)}function Pt(t){return Ot(t)?it(t):function(t){if(!gt(t))return N(t);var r=[];for(var e in Object(t))$.call(t,e)&&"constructor"!=e&&r.push(e);return r}(t)}e.exports=function(t){return lt(t,!0,!0)}}).call(this,e(2),e(3)(t))},function(t,r){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,r){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}}])}));