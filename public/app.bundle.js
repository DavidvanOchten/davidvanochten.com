!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){"use strict";var r=n(5),o=n(17),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function a(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===i.call(e)}function u(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.beforeViewChange=function(e){var t=new MutationObserver(function(n){n[0].removedNodes.length>0&&(e(),t.disconnect())});t.observe(document.querySelector("[data-main]"),{childList:!0})}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(19),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:("undefined"!=typeof XMLHttpRequest?a=n(7):void 0!==t&&(a=n(7)),a),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){c.headers[e]={}}),r.forEach(["post","put","patch"],function(e){c.headers[e]=r.merge(i)}),e.exports=c}).call(t,n(6))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default=function(e){var t={target:document.querySelector('[data-scroller-target="'+e.id+'"]'),trigger:document.querySelector('[data-scroller-trigger="'+e.id+'"]'),duration:e.duration||1e3,easing:e.easing||"easeInOutCubic",offset:e.offset||0,cb:e.callback},n={windowHeight:window.innerHeight,documentHeight:Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)},o={linear:function(e){return e},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1}},i=function(){if("top"===e.id)return 0;for(var n=t.target,r=0;n;)r+=n.offsetTop+n.clientTop,n=n.offsetParent;return r},s=function(){n.body=function(){document.documentElement.scrollTop+=1;var e=0!==document.documentElement.scrollTop?document.documentElement:document.body;return document.documentElement.scrollTop-=1,e}(),t.targetTop=i();var e=window.performance.now?performance.now()+performance.timing.navigationStart:Date.now(),r=n.body.scrollTop,s=n.documentHeight-t.targetTop<n.windowHeight?n.documentHeight-n.windowHeight:Math.abs(t.targetTop-t.offset);requestAnimationFrame(function i(){var a=window.performance.now?performance.now()+performance.timing.navigationStart:Date.now(),c=Math.min(1,(a-e)/t.duration),u=o[t.easing](c);n.body.scrollTop=u*(s-r)+r,n.body.scrollTop!==Math.floor(s)?requestAnimationFrame(i):t.cb&&t.cb()})},a=function(){n.windowHeight=window.innerHeight,n.documentHeight=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight),t.targetTop=i()},c=function(){window.removeEventListener("resize",a)};return{init:function(){t.trigger.addEventListener("click",s),window.addEventListener("resize",a),(0,r.beforeViewChange)(c)},scroll:s}}},function(e,t,n){e.exports=n(16)},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var c,u=[],l=!1,d=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&p())}function p(){if(!l){var e=a(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++d<t;)c&&c[d].run();d=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||a(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(20),i=n(22),s=n(23),a=n(24),c=n(8),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(25);e.exports=function(e){return new Promise(function(l,d){var f=e.data,p=e.headers;r.isFormData(f)&&delete p["Content-Type"];var m=new XMLHttpRequest,g="onreadystatechange",h=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in m||a(e.url)||(m=new window.XDomainRequest,g="onload",h=!0,m.onprogress=function(){},m.ontimeout=function(){}),e.auth){var v=e.auth.username||"",w=e.auth.password||"";p.Authorization="Basic "+u(v+":"+w)}if(m.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),m.timeout=e.timeout,m[g]=function(){if(m&&(4===m.readyState||h)&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in m?s(m.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?m.response:m.responseText,status:1223===m.status?204:m.status,statusText:1223===m.status?"No Content":m.statusText,headers:t,config:e,request:m};o(l,d,n),m=null}},m.onerror=function(){d(c("Network Error",e,null,m)),m=null},m.ontimeout=function(){d(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",m)),m=null},r.isStandardBrowserEnv()){var y=n(26),b=(e.withCredentials||a(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}if("setRequestHeader"in m&&r.forEach(p,function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:m.setRequestHeader(t,e)}),e.withCredentials&&(m.withCredentials=!0),e.responseType)try{m.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&m.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&m.upload&&m.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){m&&(m.abort(),d(e),m=null)}),void 0===f&&(f=null),m.send(f)})}}).call(t,n(6))},function(e,t,n){"use strict";var r=n(21);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t={target:document.querySelector('[data-toggle="'+e.id+'"]'),targetClass:e.class,cb:e.callback},n=function(){t.target.classList.toggle(t.targetClass),null!==t.target.getAttribute("aria-hidden")&&"false"===t.target.getAttribute("aria-hidden")?t.target.setAttribute("aria-hidden",!0):t.target.setAttribute("aria-hidden",!1),void 0!==t.trigger&&("false"===t.trigger.getAttribute("aria-pressed")?t.trigger.setAttribute("aria-pressed",!0):t.trigger.setAttribute("aria-pressed",!1)),void 0!==t.triggerClass&&t.trigger.classList.toggle(t.triggerClass),t.cb&&t.cb(t)};return{init:function(){t.trigger=document.querySelector('[data-toggle-trigger="'+e.id+'"]'),t.triggerClass=e.triggerClass,t.trigger.addEventListener("click",n),t.trigger.addEventListener("keyup",function(e){13===e.keyCode&&n()})},toggle:n}}},function(e,t,n){n(13),e.exports=n(50)},function(e,t,n){"use strict";var r=s(n(14)),o=s(n(15)),i=n(49);function s(e){return e&&e.__esModule?e:{default:e}}console.log("[App] Service Worker enabled > JS/CSS still disabled"),(0,i.createServiceWorker)(),window.addEventListener("load",function(){var e=(0,r.default)(),t=(0,o.default)();e.init(),t.init()})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e={panel:document.querySelector('[data-menu="panel"]'),toggle:document.querySelector('[data-menu="toggle"]'),items:[].slice.call(document.querySelectorAll('[data-menu="item"]'))},t={logo:document.querySelector('[data-site-header="logo"]'),background:document.querySelector('[data-site-header="background"]')},n=function(){t.background.classList.toggle("siteHeader__background--isActive"),e.panel.classList.toggle("menu__panel--isVisible"),e.toggle.classList.toggle("menu__toggle--isActive"),e.toggle.classList.contains("menu__toggle--isActive")?(e.toggle.setAttribute("aria-pressed",!0),e.panel.setAttribute("aria-hidden",!1)):(e.toggle.setAttribute("aria-pressed",!1),e.panel.setAttribute("aria-hidden",!0)),e.items.map(function(e){e.classList.toggle("menu__item--isVisible"),e.querySelector('[data-menu="link"]').classList.toggle("menu__link--isVisible")}),document.body.classList.toggle("u-mask")};return{init:function(){t.background.addEventListener("click",n),t.logo.addEventListener("click",function(t){t.currentTarget.blur(),e.panel.classList.contains("menu__panel--isVisible")&&n()}),e.toggle.addEventListener("click",n),e.toggle.addEventListener("keyup",function(e){13===e.keyCode&&n()}),e.items.map(function(e){e.querySelector('[data-menu="link"]').addEventListener("click",n)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(4)),o=a(n(34)),i=a(n(3)),s=n(48);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(){var e={viewSelector:"[data-view]",viewParent:document.querySelector("[data-main]"),activeViewClass:"page--isVisible"},t={activeLinkClass:"menu__link--isActive"},n=function(t){t.preventDefault(),e.targetUrl=t.currentTarget.href,e.targetUrl!==window.location.href?(spinner.show(!0),window.history.pushState(null,null,e.targetUrl),new Promise(function(t,n){var r=document.querySelector(e.viewSelector);r.classList.remove(e.activeViewClass),r.addEventListener("transitionend",function(n){n.target===r&&(e.viewParent.removeChild(r),r=null,t())})}).then(function(){return r.default.get(e.targetUrl)}).then(function(t){return n=t.data,r=(new DOMParser).parseFromString(n,"text/html").querySelector(e.viewSelector),e.viewParent.appendChild(r);var n,r}).then(function(t){e.view=t;var n=e.view.dataset.view;document.title=n.substr(0,1).toUpperCase()+n.substr(1)+" | David van Ochten",document.documentElement.scrollTop=0,document.body.scrollTop=0,spinner.show(!1),a()}).catch(function(e){console.log(e),spinner.show(!1),(0,s.showNotification)("error")})):(0,i.default)({id:"top"}).scroll()},a=function(){o.default.base.init(),o.default[e.view.dataset.view].init(),e.links=[].slice.call(document.querySelectorAll("a:not([data-bypass])")),e.links.map(function(e){return e.addEventListener("click",n)}),"offline"!==e.view.dataset.view&&"error"!==e.view.dataset.view&&(t.links.map(function(e){e.classList.contains(t.activeLinkClass)&&e.classList.remove(t.activeLinkClass)}),t.links.filter(function(e){return e.pathname.split("/")[1]===window.location.pathname.split("/")[1]})[0].classList.add(t.activeLinkClass)),e.view.classList.add(e.activeViewClass)};return{init:function(){e.view=document.querySelector(e.viewSelector),t.links=[].slice.call(document.querySelectorAll('[data-menu="link"]')),a(),window.addEventListener("popstate",function(e){document.body.style.visibility="hidden",window.location=window.location.href})}}}},function(e,t,n){"use strict";var r=n(0),o=n(5),i=n(18),s=n(2);function a(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=a(s);c.Axios=i,c.create=function(e){return a(r.merge(s,e))},c.Cancel=n(10),c.CancelToken=n(32),c.isCancel=n(9),c.all=function(e){return Promise.all(e)},c.spread=n(33),e.exports=c,e.exports.default=c},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(2),o=n(0),i=n(27),s=n(28);function a(e){this.defaults=e,this.interceptors={request:new i,response:new i}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,this.defaults,{method:"get"},e)).method=e.method.toLowerCase();var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=a},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(8);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)&&(t+="[]"),r.isArray(e)||(e=[e]),r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),s="",a=0,c=r;i.charAt(0|a)||(c="=",a%1);s+=c.charAt(63&t>>8-a%1*8)){if((n=i.charCodeAt(a+=.75))>255)throw new o;t=t<<8|n}return s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(29),i=n(9),s=n(2),a=n(30),c=n(31);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(10);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=f(n(35)),o=f(n(39)),i=f(n(40)),s=f(n(41)),a=f(n(44)),c=f(n(45)),u=f(n(46)),l=f(n(51)),d=f(n(47));function f(e){return e&&e.__esModule?e:{default:e}}var p={base:r.default,contact:o.default,error:i.default,index:s.default,notes:a.default,offline:c.default,profile:u.default,project:l.default,work:d.default};t.default=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(36)),o=s(n(3)),i=n(37);function s(e){return e&&e.__esModule?e:{default:e}}var a,c,u,l=(a={},c=function(e){"true"===e.dataset.intersected&&e.classList.remove("reveal--"+e.dataset.reveal)},u=function(e){"true"===e.dataset.intersected&&(0,i.lazyLoad)(e)},{init:function(){if(a.topScroller=(0,o.default)({id:"top",duration:500}),a.lazyImages=(0,r.default)({content:[].slice.call(document.querySelectorAll("[data-src]")),callback:u,flag:!0}),a.revealContent=(0,r.default)({content:[].slice.call(document.querySelectorAll("[data-reveal]")),callback:c,flag:!0}),a.lazyImages.init(),a.revealContent.init(),document.querySelector("[data-site-footer]")){var e=new Date;document.querySelector("[data-year]").textContent=e.getFullYear(),a.topScroller.init()}}});t.default=l},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _beforeViewChange=__webpack_require__(1),IntersectionTracker=function IntersectionTracker(obj){var intersectionTracker={content:obj.content,threshold:obj.threshold*window.innerHeight||0,cb:obj.callback,useFlag:obj.flag},browser={ticking:!1},_intersectionObserverCB=function(e){e.map(function(e){e.isIntersecting?(e.target.dataset.intersected="true",intersectionTracker.useFlag&&intersectionTracker.io.unobserve(e.target)):e.target.dataset.intersected="false",intersectionTracker.cb(e.target)})},_useIntersectionObserver=function(){var e={threshold:0,rootMargin:"-"+intersectionTracker.threshold+"px"};intersectionTracker.io=new IntersectionObserver(_intersectionObserverCB,e),intersectionTracker.content.map(function(e){return intersectionTracker.io.observe(e)})},_eventsCB=function _eventsCB(){browser.ticking=!1,intersectionTracker.content.map(function(item){if(!intersectionTracker.useFlag||"true"!==item.dataset.intersected){var itemTop=item.getBoundingClientRect().top,itemBottom=item.getBoundingClientRect().bottom;if(0===intersectionTracker.threshold){var topInView=itemTop>=0&&itemTop<=window.innerHeight,bottomInView=itemBottom>=0&&itemBottom<=window.innerHeight,inFullView=itemTop<=0&&itemBottom>=window.innerHeight;intersectionTracker.condition="(topInView || bottomInView || inFullView)"}else intersectionTracker.condition="(itemTop <= intersectionTracker.threshold && itemBottom >= intersectionTracker.threshold)";eval(intersectionTracker.condition)?item.dataset.intersected="true":item.dataset.intersected="false",intersectionTracker.cb(item)}})},_requestTick=function(){browser.ticking||requestAnimationFrame(_eventsCB),browser.ticking=!0},_useEvents=function(){window.addEventListener("scroll",_requestTick),window.addEventListener("resize",_requestTick),_requestTick()},_selectIntersectionTechnique=function(){"IntersectionObserver"in window?_useIntersectionObserver():_useEvents()},_remove=function(){window.removeEventListener("scroll",_requestTick),window.removeEventListener("resize",_requestTick),intersectionTracker.io&&intersectionTracker.io.disconnect()},construct=function(){_selectIntersectionTechnique(),(0,_beforeViewChange.beforeViewChange)(_remove)};return{init:construct}};exports.default=IntersectionTracker},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.lazyLoad=function(e){var t={src:e.dataset.src,img:e},n=function(){window.getComputedStyle(t.img).width&&t.img.parentNode.classList.add("lazyLoader--isDone")};new Promise(function(e,n){var r=new Image;r.src=t.src,r.onload=e,r.onerror=n}).then(function(){return t.img.src=t.src,void(t.img.complete?n():t.img.addEventListener("load",n))}).catch(function(e){return console.log("[lazyLoad.js] Error: ",e)})}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(4)),o=i(n(3));function i(e){return e&&e.__esModule?e:{default:e}}var s,a,c,u,l=(s={},a=function(e){if("error"===e){if(s.response.data.errors)s.errors=s.response.data.errors.map(function(e){var t=[].slice.call(s.root.querySelectorAll("[data-form-input]")).filter(function(t){return t.dataset.formInput===e.param}),n=document.createElement("a");return n.textContent="Hint",n.href=e.msg,n.target="_blank",n.classList.add("form__error"),t[0].parentNode.appendChild(n),n}),(0,o.default)({id:"form",callback:function(){s.errors.map(function(e){return e.parentNode.classList.add("form__field--error")})}}).scroll();else{var t=document.createElement("p");t.textContent="Something went wrong with your submission. Please try again later or send me an email.",t.classList.add("headline","form__message","form__message--isVisible","form__message--error"),s.root.parentNode.appendChild(t),s.errors[0]=t}s.root.removeAttribute("style")}if("success"===e){var n=document.createElement("p");n.textContent="Ahoy there. I got your message. I’ll get back to you as soon as possible.",n.classList.add("headline","form__message"),s.root.parentNode.appendChild(n),s.root.style.height="0px",s.root.addEventListener("transitionend",function(e){e.target===s.root&&n.classList.add("form__message--isVisible")}),n.addEventListener("transitionend",function(e){e.target===n&&(s.root.innerHTML="",s.errors=[])}),s.root.classList.add("form__isSubmitted")}},c=function(e){s.errors.length>0&&s.errors.map(function(e){e.parentNode.classList.remove("form__field--error"),e.parentNode.removeChild(e)}),s.response=e,200===e.status?a("success"):a("error")},u=function(e){e.preventDefault();var t=s.nameInput.value,n=s.emailInput.value,o=s.messageInput.value;s.submitButton.classList.add(s.processingClass),s.root.style.height=s.root.offsetHeight+"px",spinner.show(!0),r.default.post("/contact",{name:t,email:n,message:o}).then(function(e){spinner.show(!1),s.submitButton.classList.remove(s.processingClass),c(e)}).catch(function(e){spinner.show(!1),s.submitButton.classList.remove(s.processingClass),c(e.response)})},{init:function(){s.root=document.querySelector('[data-form="contact"]'),s.nameInput=s.root.querySelector('[data-form-input="name"]'),s.emailInput=s.root.querySelector('[data-form-input="email"]'),s.messageInput=s.root.querySelector('[data-form-input="message"]'),s.submitButton=s.root.querySelector('[data-form-button="submit"]'),s.errors=[],s.processingClass="form__submit--isProcessing",s.root.addEventListener("submit",u)}});t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(42)),o=s(n(43)),i=n(1);function s(e){return e&&e.__esModule?e:{default:e}}var a,c,u,l,d,f=(a={stickyColumn:null},c=600,u=function(){window.innerWidth>=c?(a.stickyColumn=a.col1.offsetHeight<a.col2.offsetHeight?a.col1:a.col2,a.stickyColumnOffset=a.stickyColumn.offsetHeight-window.innerHeight,a.stickyColumn.style.top="-"+a.stickyColumnOffset+"px"):null!==a.stickyColumn&&(a.stickyColumn.style.top="")},l=function(){(window.removeEventListener("resize",u),document.querySelector('[data-toggle="site-header"]').classList.contains("siteHeader--isHidden"))&&document.querySelector('[data-toggle="site-header"]').classList.toggle("siteHeader--isHidden")},d=function(e){var t=document.querySelector('[data-toggle="site-header"]');(e&&!t.classList.contains("siteHeader--isHidden")||!e&&t.classList.contains("siteHeader--isHidden"))&&t.classList.toggle("siteHeader--isHidden")},{init:function(){var e=document.querySelector('[data-toggle-trigger="site-header"]');document.querySelector('[data-toggle="site-header"]'),(0,o.default)({end:function(e){for(var t=e.offsetHeight,n=0;e;)n+=e.offsetTop+e.clientTop,e=e.offsetParent;return window.pageYOffset-a.stickyColumnOffset>0?t+n-(window.pageYOffset-a.stickyColumnOffset):t+n}(e),callback:d}).init(),a.col1=document.querySelector('[data-index-column="1"]'),a.col2=document.querySelector('[data-index-column="2"]'),a.notesSlider=(0,r.default)("notes"),a.notesSlider.init(),window.addEventListener("resize",u),u(),(0,i.beforeViewChange)(l)}});t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default=function(e){var t={draggingClass:"slider__content--isDragging",activeIndex:0,position:0},n={hasMouseDown:!1,isDragging:!1},o=function(){n.isDragging?(t.content.style.webkitTransform="translate3d("+t.position+"px, 0, 0)",t.content.style.transform="translate3d("+t.position+"px, 0, 0)"):(t.position=parseInt(t.content.querySelector('[data-index="'+t.activeIndex+'"]').dataset.offset),t.content.style.webkitTransform="translate3d(-"+t.position+"px, 0, 0)",t.content.style.transform="translate3d(-"+t.position+"px, 0, 0)")},i=function(){t.content.classList.remove(t.draggingClass);var e=Math.abs(t.position);if(t.position>0)t.activeIndex=parseInt(t.items[0].dataset.index);else if(e>parseInt(t.items[t.items.length-1].dataset.activeArea.split("|")[1]))t.activeIndex=parseInt(t.items[t.items.length-1].dataset.index);else{var n=t.items.filter(function(t){var n=parseInt(t.dataset.activeArea.split("|")[0]),r=parseInt(t.dataset.activeArea.split("|")[1]);if(e>=n&&e<r)return t});t.activeIndex=parseInt(n[0].dataset.index)}o()},s=function(e){n.hasMouseDown=!1,n.isDragging?(n.isDragging=!1,i()):void 0!==e.target.dataset.index&&(t.activeIndex=parseInt(e.target.dataset.index),o())},a=function(e){if(n.hasMouseDown){if(n.isDragging=!0,t.content.classList.contains(t.draggingClass)||t.content.classList.add(t.draggingClass),"item"!==e.target.dataset.slider)return void s();t.position=e.clientX-t.startX,o()}},c=function(e){n.hasMouseDown=!0,t.startX=e.clientX+t.position},u=function(e){n.isDragging&&(n.isDragging=!1,i())},l=function(e){n.isDragging=!0,t.content.classList.contains(t.draggingClass)||t.content.classList.add(t.draggingClass);var r=e.touches[0].clientX-t.startX,i=e.touches[0].clientY-t.startY;Math.abs(r)>Math.abs(i)&&e.cancelable?(e.preventDefault(),t.position=e.touches[0].clientX-t.adjustedStartX,o()):t.position=e.touches[0].clientX-t.adjustedStartX},d=function(e){t.startX=e.touches[0].clientX,t.startY=e.touches[0].clientY,t.adjustedStartX=e.touches[0].clientX+t.position},f=function(e){37===e.keyCode&&t.activeIndex>0?t.activeIndex=t.activeIndex-1:39===e.keyCode&&t.activeIndex<t.items.length-1&&(t.activeIndex=t.activeIndex+1),o()},p=function(){var e=t.items[0].offsetWidth,n=parseInt(window.getComputedStyle(t.content).marginLeft),r=e+n-t.root.offsetWidth/2,o=0,i=0,s=0;t.items.map(function(t,n){t.dataset.index=n,t.dataset.offset=o,o=t.offsetWidth+o,s=r+o-e,t.dataset.activeArea=i+"|"+s,i=s})},m=function(){window.removeEventListener("mousemove",a),window.removeEventListener("resize",p),window.removeEventListener("resize",o),window.removeEventListener("keyup",f)};return{init:function(){t.root=document.querySelector('[data-slider="'+e+'"]'),t.content=t.root.querySelector('[data-slider="content"]'),t.items=[].slice.call(t.root.querySelectorAll('[data-slider="item"]')),p(),t.content.addEventListener("touchstart",d),t.content.addEventListener("touchmove",l),t.content.addEventListener("touchend",u),t.content.addEventListener("mousedown",c),t.content.addEventListener("mouseup",s),window.addEventListener("mousemove",a),window.addEventListener("keyup",f),window.addEventListener("resize",p),window.addEventListener("resize",o),(0,r.beforeViewChange)(m)}}}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _beforeViewChange=__webpack_require__(1),ScrollTracker=function ScrollTracker(obj){var scrollTracker={start:obj.start,end:obj.end,cb:obj.callback},browser={scrolledY:0,ticking:!1},_eventsCB=function _eventsCB(){browser.ticking=!1,browser.scrolledY=window.pageYOffset,eval(scrollTracker.condition)?scrollTracker.cb(!0):scrollTracker.cb(!1)},_requestTick=function(){browser.ticking||requestAnimationFrame(_eventsCB),browser.ticking=!0},_remove=function(){window.removeEventListener("scroll",_requestTick),window.removeEventListener("resize",_requestTick)},construct=function(){void 0===scrollTracker.start?scrollTracker.condition="scrollTracker.end > browser.scrolledY":void 0===scrollTracker.end?scrollTracker.condition="scrollTracker.start < browser.scrolledY":scrollTracker.condition="scrollTracker.start <= browser.scrolledY && scrollTracker.end >= browser.scrolledY",window.addEventListener("scroll",_requestTick),window.addEventListener("resize",_requestTick),_requestTick(),(0,_beforeViewChange.beforeViewChange)(_remove)};return{init:construct}};exports.default=ScrollTracker},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=(r=o)&&r.__esModule?r:{default:r};var s,a,c=(s={activeItemClass:"accordion__item--isActive"},a=function(e){var t=e.trigger.querySelector('[data-accordion="content"]');e.trigger.classList.contains(s.activeItemClass)?(e.target.style.height=parseInt(window.getComputedStyle(t).height)+parseInt(window.getComputedStyle(t).paddingBottom)+"px",e.trigger.setAttribute("aria-expanded",!0)):(e.target.removeAttribute("style"),e.trigger.setAttribute("aria-expanded",!1))},{init:function(){s.root=document.querySelector('[data-accordion="services"]'),s.items=[].slice.call(s.root.querySelectorAll('[data-accordion="item"]')),s.items.map(function(e){(0,i.default)({id:e.dataset.toggleTrigger,class:"accordion__container--isVisible",triggerClass:"accordion__item--isActive",callback:a}).init()})}});t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.showNotification=function(e){if(null===document.querySelector('[data-notification="'+e+'"]')){var t="",n=document.createElement("button"),r=document.createTextNode("Close");n.appendChild(r);var o=document.createElement("div");o.classList.add("notification"),o.dataset.notification=e,"error"===e&&(o.classList.add("notification--error"),t=document.createTextNode("Can't fetch this page right now. Do you have an internet connection? Please try again later.")),o.appendChild(t),o.appendChild(n),document.body.appendChild(o)}var i=document.querySelector('[data-notification="'+e+'"]');window.getComputedStyle(i).width&&i.classList.add("notification--visible"),i.querySelector("button").addEventListener("click",function(e){i.classList.remove("notification--visible")})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.createServiceWorker=function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(function(){console.log("[Service Worker] Registered")}).catch(function(e){console.log("[Service Worker] Error: ",e)})}},function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=(r=o)&&r.__esModule?r:{default:r};var s,a,c,u=(s={},a={},c=function(){s.header.toggle(),s.column.toggle(),document.body.classList.add("u-mask"),setTimeout(function(){window.scrollTo({top:0}),document.body.removeAttribute("class"),a.root.classList.toggle("gallery--isVisible")},1e3)},{init:function(){s.header=(0,i.default)({id:"site-header",class:"siteHeader--isHidden"}),s.column=(0,i.default)({id:"column",class:"project__column--isHidden"}),a.root=document.querySelector('[data-gallery="project"]'),a.trigger=(0,i.default)({id:"gallery-content",class:"gallery__content--isVisible",triggerClass:"gallery--isActive",callback:c}),a.trigger.init()}});t.default=u}]);