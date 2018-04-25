!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){"use strict";var r=n(4),o=n(17),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function a(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===i.call(e)}function u(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.beforeViewChange=function(e){var t=new MutationObserver(function(n){n[0].removedNodes.length>0&&(e(),t.disconnect())});t.observe(document.querySelector("[data-main]"),{childList:!0})}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(19),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:("undefined"!=typeof XMLHttpRequest?a=n(6):void 0!==t&&(a=n(6)),a),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){c.headers[e]={}}),r.forEach(["post","put","patch"],function(e){c.headers[e]=r.merge(i)}),e.exports=c}).call(t,n(5))},function(e,t,n){e.exports=n(16)},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var c,u=[],d=!1,l=-1;function f(){d&&c&&(d=!1,c.length?u=c.concat(u):l=-1,u.length&&p())}function p(){if(!d){var e=a(f);d=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,d=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function v(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||d||a(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(20),i=n(22),s=n(23),a=n(24),c=n(7),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(25);e.exports=function(e){return new Promise(function(d,l){var f=e.data,p=e.headers;r.isFormData(f)&&delete p["Content-Type"];var m=new XMLHttpRequest,v="onreadystatechange",T=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in m||a(e.url)||(m=new window.XDomainRequest,v="onload",T=!0,m.onprogress=function(){},m.ontimeout=function(){}),e.auth){var h=e.auth.username||"",E=e.auth.password||"";p.Authorization="Basic "+u(h+":"+E)}if(m.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),m.timeout=e.timeout,m[v]=function(){if(m&&(4===m.readyState||T)&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in m?s(m.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?m.response:m.responseText,status:1223===m.status?204:m.status,statusText:1223===m.status?"No Content":m.statusText,headers:t,config:e,request:m};o(d,l,n),m=null}},m.onerror=function(){l(c("Network Error",e,null,m)),m=null},m.ontimeout=function(){l(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",m)),m=null},r.isStandardBrowserEnv()){var g=n(26),_=(e.withCredentials||a(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;_&&(p[e.xsrfHeaderName]=_)}if("setRequestHeader"in m&&r.forEach(p,function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:m.setRequestHeader(t,e)}),e.withCredentials&&(m.withCredentials=!0),e.responseType)try{m.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&m.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&m.upload&&m.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){m&&(m.abort(),l(e),m=null)}),void 0===f&&(f=null),m.send(f)})}}).call(t,n(5))},function(e,t,n){"use strict";var r=n(21);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.showSpinner=function(e){var t=document.querySelector("[data-spinner]");!0===e?t.classList.add("spinner--isVisible"):t.classList.remove("spinner--isVisible")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default=function(e){var t={TARGET:document.querySelector('[data-scroller-target="'+e.id+'"]'),TRIGGER:document.querySelector('[data-scroller-trigger="'+e.id+'"]'),DURATION:e.duration||1e3,EASING:e.easing||"easeInOutCubic",OFFSET:e.offset||0,CB:e.callback},n={WINDOW_HEIGHT:window.innerHeight,DOCUMENT_HEIGHT:Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)},o={linear:function(e){return e},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1}},i=function(){if("top"===e.id)return 0;for(var n=t.TARGET,r=0;n;)r+=n.offsetTop+n.clientTop,n=n.offsetParent;return r},s=function(e){var r=window.performance.now?performance.now()+performance.timing.navigationStart:Date.now(),i=n.BODY.scrollTop,s=n.DOCUMENT_HEIGHT-t.TARGET_TOP<n.WINDOW_HEIGHT?n.DOCUMENT_HEIGHT-n.WINDOW_HEIGHT:Math.abs(t.TARGET_TOP-t.OFFSET);requestAnimationFrame(function e(){var a=window.performance.now?performance.now()+performance.timing.navigationStart:Date.now(),c=Math.min(1,(a-r)/t.DURATION),u=o[t.EASING](c);n.BODY.scrollTop=u*(s-i)+i,n.BODY.scrollTop!==s?requestAnimationFrame(e):t.CB&&t.CB()})},a=function(){n.WINDOW_HEIGHT=window.innerHeight,n.DOCUMENT_HEIGHT=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight),t.TARGET_TOP=i()},c=function(){window.removeEventListener("resize",a)};return{init:function(){n.BODY=function(){document.documentElement.scrollTop+=1;var e=0!==document.documentElement.scrollTop?document.documentElement:document.body;return document.documentElement.scrollTop-=1,e}(),t.TARGET_TOP=i(),t.TRIGGER.addEventListener("click",s),window.addEventListener("resize",a),(0,r.beforeViewChange)(c)}}}},function(e,t,n){n(13),e.exports=n(50)},function(e,t,n){"use strict";var r=a(n(14)),o=a(n(15)),i=a(n(48)),s=n(49);function a(e){return e&&e.__esModule?e:{default:e}}console.log("[App] Service Worker enabled > JS/CSS still disabled"),(0,s.createServiceWorker)(),window.addEventListener("load",function(e){var t=(0,r.default)(),n=(0,o.default)(),s=(0,i.default)(),a=document.querySelector("[data-splash]");a.addEventListener("transitionend",function(e){return e.target.parentNode.removeChild(e.target)}),setTimeout(function(){t.init(),n.init(),s.init(),a.classList.remove("splash--isVisible"),document.body.removeAttribute("style")},1500)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e={PANEL:document.querySelector('[data-menu="panel"]'),TOGGLE:document.querySelector('[data-menu="toggle"]'),ITEMS:[].slice.call(document.querySelectorAll('[data-menu="item"]'))},t={LOGO:document.querySelector('[data-site-header="logo"]'),BG:document.querySelector('[data-site-header="background"]')},n=function t(){e.TOGGLE.classList.toggle("menu__toggle--isActive"),e.TOGGLE.classList.contains("menu__toggle--isActive")?(e.TOGGLE.setAttribute("aria-pressed",!0),e.PANEL.setAttribute("aria-hidden",!1)):(e.TOGGLE.setAttribute("aria-pressed",!1),e.PANEL.setAttribute("aria-hidden",!0)),e.PANEL.removeEventListener("transitionend",t)},r=function(r){("click"===r.type||"keyup"===r.type&&13===r.keyCode)&&(t.BG.classList.toggle("siteHeader__background--isActive"),e.PANEL.addEventListener("transitionend",n),e.PANEL.classList.toggle("menu__panel--isVisible"),e.ITEMS.map(function(e){e.classList.toggle("menu__item--isVisible"),e.querySelector('[data-menu="link"]').classList.toggle("menu__link--isVisible")}),document.body.classList.toggle("u-isUnscrollable"))};return{init:function(){t.LOGO.addEventListener("click",function(e){e.currentTarget.blur()}),t.BG.addEventListener("click",r),e.TOGGLE.addEventListener("click",r),e.TOGGLE.addEventListener("keyup",r),e.ITEMS.map(function(e){e.querySelector('[data-menu="link"]').addEventListener("click",r)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(3)),o=a(n(34)),i=(a(n(11)),n(10)),s=n(47);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(){var e={LINKS:[]},t=function(t){e.LINKS.map(function(e){!0===t?e.classList.add("u-isUnclickable"):e.classList.remove("u-isUnclickable")})},n=function(e){e.preventDefault();var n=e.currentTarget.href;if(n!==window.location.href){(0,i.showSpinner)(!0),t(!0);var o=null;window.history.pushState(null,null,n),new Promise(function(e,t){var n=document.querySelector("[data-view]");n.classList.remove("page--isVisible"),setTimeout(function(){document.querySelector("[data-main]").removeChild(n),n=null,e()},500)}).then(function(){return r.default.get(n)}).then(function(e){return o=e.data,t=o,n=(new DOMParser).parseFromString(t,"text/html").querySelector("[data-view]"),document.querySelector("[data-main]").appendChild(n);var t,n}).then(function(e){var n=e.dataset.view;document.title=n.substr(0,1).toUpperCase()+n.substr(1)+" | David van Ochten",document.documentElement.scrollTop=0,document.body.scrollTop=0,(0,i.showSpinner)(!1),a(e),t(!1)}).catch(function(e){console.log(e),(0,i.showSpinner)(!1),t(!1),(0,s.showNotification)("error")})}},a=function(t){var r,i;r=[].slice.call(document.querySelectorAll('[data-menu="link"]')),i=r.filter(function(e){return e.pathname.split("/")[1]===window.location.pathname.split("/")[1]})[0],r.map(function(e){e.classList.contains("menu__link--isActive")&&e.classList.remove("menu__link--isActive")}),i.classList.add("menu__link--isActive"),e.LINKS=[].slice.call(document.querySelectorAll("a:not([data-bypass])")),e.LINKS.map(function(e){return e.addEventListener("click",n)}),o.default.base.init(),o.default[t.dataset.view].init(),t.classList.add("page--isVisible")};return{init:function(){var e=document.querySelector("[data-view]");a(e),window.addEventListener("popstate",function(e){document.body.style.visibility="hidden",window.location=window.location.href})}}}},function(e,t,n){"use strict";var r=n(0),o=n(4),i=n(18),s=n(2);function a(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=a(s);c.Axios=i,c.create=function(e){return a(r.merge(s,e))},c.Cancel=n(9),c.CancelToken=n(32),c.isCancel=n(8),c.all=function(e){return Promise.all(e)},c.spread=n(33),e.exports=c,e.exports.default=c},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(2),o=n(0),i=n(27),s=n(28);function a(e){this.defaults=e,this.interceptors={request:new i,response:new i}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,this.defaults,{method:"get"},e)).method=e.method.toLowerCase();var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=a},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(7);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)&&(t+="[]"),r.isArray(e)||(e=[e]),r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),s="",a=0,c=r;i.charAt(0|a)||(c="=",a%1);s+=c.charAt(63&t>>8-a%1*8)){if((n=i.charCodeAt(a+=.75))>255)throw new o;t=t<<8|n}return s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(29),i=n(8),s=n(2),a=n(30),c=n(31);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(9);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(35)),o=l(n(38)),i=l(n(39)),s=l(n(40)),a=l(n(43)),c=l(n(44)),u=l(n(45)),d=l(n(46));function l(e){return e&&e.__esModule?e:{default:e}}var f={base:r.default,case:o.default,contact:i.default,index:s.default,notes:a.default,offline:c.default,profile:u.default,work:d.default};t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(36)),o=s(n(11)),i=n(37);function s(e){return e&&e.__esModule?e:{default:e}}var a,c,u,d=(a={},c=function(e){"true"===e.dataset.intersected&&e.classList.contains("classname")?(console.log("Add class",e),e.classList.remove("classname")):"false"===e.dataset.intersected&&e.classList.add("classname")},u=function(e){"true"===e.dataset.intersected&&(0,i.lazyLoad)(e)},{init:function(){a.TOP_SCROLLER=(0,o.default)({id:"top",duration:500}),a.LAZY_IMAGES=(0,r.default)({content:[].slice.call(document.querySelectorAll("[data-src]")),flag:!0,callback:u}),a.REVEAL_CONTENT=(0,r.default)({content:[].slice.call(document.querySelectorAll("[data-reveal]")),threshold:.5,callback:c}),a.TOP_SCROLLER.init(),a.LAZY_IMAGES.init(),a.REVEAL_CONTENT.init()}});t.default=d},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _beforeViewChange=__webpack_require__(1),IntersectionTracker=function IntersectionTracker(obj){var INTERSECTION_TRACKER={CONTENT:obj.content,THRESHOLD:obj.threshold*window.innerHeight||0,USE_FLAG:obj.flag,CB:obj.callback},BROWSER={ticking:!1},_intersectionObserverCB=function(e){e.map(function(e){e.isIntersecting?(e.target.dataset.intersected="true",INTERSECTION_TRACKER.USE_FLAG&&INTERSECTION_TRACKER.IO.unobserve(e.target)):e.target.dataset.intersected="false",INTERSECTION_TRACKER.CB(e.target)})},_useIntersectionObserver=function(){var e={threshold:0,rootMargin:"-"+INTERSECTION_TRACKER.THRESHOLD+"px"};INTERSECTION_TRACKER.IO=new IntersectionObserver(_intersectionObserverCB,e),INTERSECTION_TRACKER.CONTENT.map(function(e){return INTERSECTION_TRACKER.IO.observe(e)})},_eventsCB=function _eventsCB(){BROWSER.ticking=!1,INTERSECTION_TRACKER.CONTENT.map(function(item){if(!INTERSECTION_TRACKER.USE_FLAG||"true"!==item.dataset.intersected){var intersectionCondition="",ITEM_TOP=item.getBoundingClientRect().top,ITEM_BOTTOM=item.getBoundingClientRect().bottom;if(0===INTERSECTION_TRACKER.THRESHOLD){var TOP_IN_VIEW=ITEM_TOP>=0&&ITEM_TOP<=window.innerHeight,BOTTOM_IN_VIEW=ITEM_BOTTOM>=0&&ITEM_BOTTOM<=window.innerHeight,IN_FULL_VIEW=ITEM_TOP<=0&&ITEM_BOTTOM>=window.innerHeight;intersectionCondition="(TOP_IN_VIEW || BOTTOM_IN_VIEW || IN_FULL_VIEW)"}else intersectionCondition="(ITEM_TOP <= INTERSECTION_TRACKER.THRESHOLD && ITEM_BOTTOM >= INTERSECTION_TRACKER.THRESHOLD)";eval(intersectionCondition)?item.dataset.intersected="true":item.dataset.intersected="false",INTERSECTION_TRACKER.CB(item)}})},_requestTick=function(){BROWSER.ticking||requestAnimationFrame(_eventsCB),BROWSER.ticking=!0},_useEvents=function(){window.addEventListener("scroll",_requestTick),window.addEventListener("resize",_requestTick),_requestTick()},_selectIntersectionTechnique=function(){"IntersectionObserver"in window?_useIntersectionObserver():_useEvents()},_remove=function(){window.removeEventListener("scroll",_requestTick),window.removeEventListener("resize",_requestTick),INTERSECTION_TRACKER.IO&&INTERSECTION_TRACKER.IO.disconnect()},construct=function(){_selectIntersectionTechnique(),(0,_beforeViewChange.beforeViewChange)(_remove)};return{init:construct}};exports.default=IntersectionTracker},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.lazyLoad=function(e){var t={IMG:e,SRC:e.dataset.src},n=function(){window.getComputedStyle(t.IMG).width&&t.IMG.parentNode.classList.add("lazyLoader--isDone")};new Promise(function(e,n){var r=new Image;r.src=t.SRC,r.onload=e,r.onerror=n}).then(function(){return t.IMG.src=t.SRC,void(t.IMG.complete?n():t.IMG.addEventListener("load",n))}).catch(function(e){return console.log("[lazyLoad.js] Error: ",e)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(3),i=(r=o)&&r.__esModule?r:{default:r},s=n(10);var a,c,u,d=(a=null,c=function(e){console.log("Handle status",e),e.status,console.log(e.data)},u=function(e){e.preventDefault();var t=a.querySelector('[data-form-input="name"]').value,n=a.querySelector('[data-form-input="email"]').value,r=a.querySelector('[data-form-input="message"]').value,o=e.target.querySelector('[data-form-input="submit"]');o.classList.add("form__submit--isProcessing"),(0,s.showSpinner)(!0),i.default.post("/contact",{name:t,email:n,message:r}).then(function(e){(0,s.showSpinner)(!1),a.classList.add("form--isHidden"),o.classList.remove("form__submit--isProcessing"),o.classList.add("form__submit--isDone"),c(e)}).catch(function(e){(0,s.showSpinner)(!1),o.classList.remove("form__submit--isProcessing"),c(e)})},{init:function(){(a=document.querySelector('[data-form="contact"]')).addEventListener("submit",u)}});t.default=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(41)),o=s(n(42)),i=n(1);function s(e){return e&&e.__esModule?e:{default:e}}var a,c,u,d,l,f=(a={STICKY_COLUMN:null},c=600,u=function(){window.innerWidth>=c?(a.STICKY_COLUMN=a.COL_1.offsetHeight<a.COL_2.offsetHeight?a.COL_1:a.COL_2,a.STICKY_COLUMN_OFFSET=a.STICKY_COLUMN.offsetHeight-window.innerHeight,a.STICKY_COLUMN.style.top="-"+a.STICKY_COLUMN_OFFSET+"px"):null!==a.STICKY_COLUMN&&(a.STICKY_COLUMN.style.top="")},d=function(){(window.removeEventListener("resize",u),document.querySelector('[data-toggle="site-header"]').classList.contains("siteHeader--isHidden"))&&document.querySelector('[data-toggle="site-header"]').classList.toggle("siteHeader--isHidden")},l=function(e){var t=document.querySelector('[data-toggle="site-header"]');(e&&!t.classList.contains("siteHeader--isHidden")||!e&&t.classList.contains("siteHeader--isHidden"))&&t.classList.toggle("siteHeader--isHidden")},{init:function(){var e=document.querySelector('[data-toggle-trigger="site-header"]');document.querySelector('[data-toggle="site-header"]'),(0,o.default)({end:function(e){for(var t=e.offsetHeight,n=0;e;)n+=e.offsetTop+e.clientTop,e=e.offsetParent;return window.pageYOffset-a.STICKY_COLUMN_OFFSET>0?t+n-(window.pageYOffset-a.STICKY_COLUMN_OFFSET):t+n}(e),callback:l}).init(),a.COL_1=document.querySelector('[data-index-column="1"]'),a.COL_2=document.querySelector('[data-index-column="2"]'),a.NOTES_SLIDER=(0,r.default)("notes"),a.NOTES_SLIDER.init(),window.addEventListener("resize",u),u(),(0,i.beforeViewChange)(d)}});t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default=function(e){var t={DRAGGING_CLASS:"slider__content--isDragging",activeIndex:0,position:0},n={hasMouseDown:!1,isDragging:!1},o=function(){n.isDragging?(t.CONTENT.style.webkitTransform="translate3d("+t.position+"px, 0, 0)",t.CONTENT.style.transform="translate3d("+t.position+"px, 0, 0)"):(t.position=parseInt(t.CONTENT.querySelector('[data-index="'+t.activeIndex+'"]').dataset.offset),t.CONTENT.style.webkitTransform="translate3d(-"+t.position+"px, 0, 0)",t.CONTENT.style.transform="translate3d(-"+t.position+"px, 0, 0)")},i=function(){t.CONTENT.classList.remove(t.DRAGGING_CLASS);var e=Math.abs(t.position);if(t.position>0)t.activeIndex=parseInt(t.ITEMS[0].dataset.index);else if(e>parseInt(t.ITEMS[t.ITEMS.length-1].dataset.activeArea.split("|")[1]))t.activeIndex=parseInt(t.ITEMS[t.ITEMS.length-1].dataset.index);else{var n=t.ITEMS.filter(function(t){var n=parseInt(t.dataset.activeArea.split("|")[0]),r=parseInt(t.dataset.activeArea.split("|")[1]);if(e>=n&&e<r)return t});t.activeIndex=parseInt(n[0].dataset.index)}o()},s=function(e){n.hasMouseDown=!1,n.isDragging?(n.isDragging=!1,i()):void 0!==e.target.dataset.index&&(t.activeIndex=parseInt(e.target.dataset.index),o())},a=function(e){if(n.hasMouseDown){if(n.isDragging=!0,t.CONTENT.classList.contains(t.DRAGGING_CLASS)||t.CONTENT.classList.add(t.DRAGGING_CLASS),"item"!==e.target.dataset.slider)return void s();t.position=e.clientX-t.startX,o()}},c=function(e){n.hasMouseDown=!0,t.startX=e.clientX+t.position},u=function(e){n.isDragging&&(n.isDragging=!1,i())},d=function(e){n.isDragging=!0,t.CONTENT.classList.contains(t.DRAGGING_CLASS)||t.CONTENT.classList.add(t.DRAGGING_CLASS);var r=e.touches[0].clientX-t.startX,i=e.touches[0].clientY-t.startY;Math.abs(r)>Math.abs(i)&&e.cancelable&&e.preventDefault(),t.position=e.touches[0].clientX-t.adjustedStartX,o()},l=function(e){t.startX=e.touches[0].clientX,t.startY=e.touches[0].clientY,t.adjustedStartX=e.touches[0].clientX+t.position},f=function(e){37===e.keyCode&&t.activeIndex>0?t.activeIndex=t.activeIndex-1:39===e.keyCode&&t.activeIndex<t.ITEMS.length-1&&(t.activeIndex=t.activeIndex+1),o()},p=function(){var e=t.ITEMS[0].offsetWidth,n=parseInt(window.getComputedStyle(t.CONTENT).marginLeft),r=e+n-t.ROOT.offsetWidth/2,o=0,i=0,s=0;t.ITEMS.map(function(t,n){t.dataset.index=n,t.dataset.offset=o,o=t.offsetWidth+o,s=r+o-e,t.dataset.activeArea=i+"|"+s,i=s})},m=function(){window.removeEventListener("mousemove",a),window.removeEventListener("resize",p),window.removeEventListener("resize",o),window.removeEventListener("keyup",f)};return{init:function(){t.ROOT=document.querySelector('[data-slider="'+e+'"]'),t.CONTENT=t.ROOT.querySelector('[data-slider="content"]'),t.ITEMS=[].slice.call(t.ROOT.querySelectorAll('[data-slider="item"]')),p(),t.CONTENT.addEventListener("touchstart",l),t.CONTENT.addEventListener("touchmove",d),t.CONTENT.addEventListener("touchend",u),t.CONTENT.addEventListener("mousedown",c),t.CONTENT.addEventListener("mouseup",s),window.addEventListener("mousemove",a),window.addEventListener("keyup",f),window.addEventListener("resize",p),window.addEventListener("resize",o),(0,r.beforeViewChange)(m)}}}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _beforeViewChange=__webpack_require__(1),Tracker=function Tracker(obj){var TRACKER={START:obj.start,END:obj.end,CB:obj.callback},BROWSER={scrolledY:0,ticking:!1},_eventsCB=function _eventsCB(){BROWSER.ticking=!1,BROWSER.scrolledY=window.pageYOffset,eval(TRACKER.CONDITION)?TRACKER.CB(!0):TRACKER.CB(!1)},_requestTick=function(){BROWSER.ticking||requestAnimationFrame(_eventsCB),BROWSER.ticking=!0},_remove=function(){window.removeEventListener("scroll",_requestTick),window.removeEventListener("resize",_requestTick)},construct=function(){void 0===TRACKER.START?TRACKER.CONDITION="TRACKER.END > BROWSER.scrolledY":void 0===TRACKER.END?TRACKER.CONDITION="TRACKER.START < BROWSER.scrolledY":TRACKER.CONDITION="TRACKER.START <= BROWSER.scrolledY && TRACKER.END >= BROWSER.scrolledY",window.addEventListener("scroll",_requestTick),window.addEventListener("resize",_requestTick),_requestTick(),(0,_beforeViewChange.beforeViewChange)(_remove)};return{init:construct}};exports.default=Tracker},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.showNotification=function(e){if(null===document.querySelector('[data-notification="'+e+'"]')){var t="",n=document.createElement("button"),r=document.createTextNode("Close");n.appendChild(r);var o=document.createElement("div");o.classList.add("notification"),o.dataset.notification=e,"error"===e&&(o.classList.add("notification--error"),t=document.createTextNode("Can't fetch this page right now. Do you have an internet connection? Please try again later.")),o.appendChild(t),o.appendChild(n),document.body.appendChild(o)}var i=document.querySelector('[data-notification="'+e+'"]');window.getComputedStyle(i).width&&i.classList.add("notification--visible"),i.querySelector("button").addEventListener("click",function(e){i.classList.remove("notification--visible")})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=document.querySelector("[data-spinner]"),t={MOUSE_X:0,MOUSE_Y:0},n=function(n){t.MOUSE_X=n.clientX,t.MOUSE_Y=n.clientY,e.style.top=t.MOUSE_Y+"px",e.style.left=t.MOUSE_X+"px"};return{init:function(){"ontouchstart"in window||navigator.maxTouchPoints||window.addEventListener("mousemove",n)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.createServiceWorker=function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(function(){console.log("[Service Worker] Registered")}).catch(function(e){console.log("[Service Worker] Error: ",e)})}},function(e,t){}]);