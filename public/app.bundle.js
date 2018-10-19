!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}([function(e,t,n){"use strict";var r=n(2),o=n(15),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function c(e){return null!==e&&"object"==typeof e}function a(e){return"[object Function]"===i.call(e)}function u(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:c,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:a,isStream:function(e){return c(e)&&a(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(17),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(4):void 0!==t&&(e=n(4)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],function(e){c.headers[e]={}}),r.forEach(["post","put","patch"],function(e){c.headers[e]=r.merge(i)}),e.exports=c}).call(t,n(3))},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var a,u=[],l=!1,f=-1;function d(){l&&a&&(l=!1,a.length?u=a.concat(u):f=-1,u.length&&p())}function p(){if(!l){var e=c(d);l=!0;for(var t=u.length;t;){for(a=u,u=[];++f<t;)a&&a[f].run();f=-1,t=u.length}a=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function v(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||l||c(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(18),i=n(20),s=n(21),c=n(22),a=n(5),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(23);e.exports=function(e){return new Promise(function(l,f){var d=e.data,p=e.headers;r.isFormData(d)&&delete p["Content-Type"];var h=new XMLHttpRequest,v="onreadystatechange",m=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||c(e.url)||(h=new window.XDomainRequest,v="onload",m=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var g=e.auth.username||"",y=e.auth.password||"";p.Authorization="Basic "+u(g+":"+y)}if(h.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[v]=function(){if(h&&(4===h.readyState||m)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in h?s(h.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?h.response:h.responseText,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:t,config:e,request:h};o(l,f,n),h=null}},h.onerror=function(){f(a("Network Error",e,null,h)),h=null},h.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var w=n(24),b=(e.withCredentials||c(e.url))&&e.xsrfCookieName?w.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}if("setRequestHeader"in h&&r.forEach(p,function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),f(e),h=null)}),void 0===d&&(d=null),h.send(d)})}}).call(t,n(3))},function(e,t,n){"use strict";var r=n(19);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.handleFetchError=function(e){console.log(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.beforeViewChange=function(e,t){var n=new MutationObserver(function(e){e[0].removedNodes.length>0&&(t(),n.disconnect())});n.observe(document.querySelector(e),{childList:!0})}},function(e,t,n){n(11),e.exports=n(42)},function(e,t,n){"use strict";var r=s(n(12)),o=s(n(40)),i=n(41);function s(e){return e&&e.__esModule?e:{default:e}}console.log("[App] Service Worker enabled > JS/CSS still disabled"),console.log("[App] Check JSON-LD, canonical links and inline fonts"),(0,i.createServiceWorker)(),window.addEventListener("load",function(){(0,r.default)().init(),o.default.polyfill()})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(13)),o=a(n(32)),i=n(38),s=n(39),c=n(8);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(){var e={},t=function(t){!0===t?(e.isBusy=!0,document.body.classList.add("u-is-loading")):(e.isBusy=!1,document.body.classList.remove("u-is-loading"))},n=function(){(0,s.removeView)(e.view,e.activeViewClass).then(function(){return r.default.get(e.targetUrl)}).then(function(t){return(0,i.appendView)(t.data,e.siteContent)}).then(function(n){return function(n){e.view=n,e.viewName=e.view.dataset.view,document.title=e.viewName.substr(0,1).toUpperCase()+e.viewName.substr(1)+" — David van Ochten",window.history.pushState(null,null,e.targetUrl),window.getComputedStyle(e.view).width&&u(),t(!1)}(n)}).catch(function(e){t(!1),(0,c.handleFetchError)(e)})},a=function(r){r.preventDefault(),e.isBusy||(e.clickedLink=r.currentTarget,e.targetUrl=e.clickedLink.href,t(!0),n())},u=function(){o.default.app.init(),o.default[e.viewName].init(),e.activeViewClass="view--"+e.viewName,e.links=[].slice.call(document.querySelectorAll("a:not([data-bypass])")),e.links.forEach(function(e){return e.addEventListener("click",a)}),e.view.classList.add(e.activeViewClass)};return{init:function(){e.siteContent=document.querySelector("[data-site-content]"),e.view=e.siteContent.querySelector("[data-view]"),e.viewName=e.view.dataset.view,u(),window.addEventListener("popstate",function(){document.body.style.visibility="hidden",window.location=window.location.href})}}}},function(e,t,n){e.exports=n(14)},function(e,t,n){"use strict";var r=n(0),o=n(2),i=n(16),s=n(1);function c(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var a=c(s);a.Axios=i,a.create=function(e){return c(r.merge(s,e))},a.Cancel=n(7),a.CancelToken=n(30),a.isCancel=n(6),a.all=function(e){return Promise.all(e)},a.spread=n(31),e.exports=a,e.exports.default=a},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(1),o=n(0),i=n(25),s=n(26);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,this.defaults,{method:"get"},e)).method=e.method.toLowerCase();var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){c.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){c.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=c},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(5);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)&&(t+="[]"),r.isArray(e)||(e=[e]),r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),s="",c=0,a=r;i.charAt(0|c)||(a="=",c%1);s+=a.charAt(63&t>>8-c%1*8)){if((n=i.charCodeAt(c+=.75))>255)throw new o;t=t<<8|n}return s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var c=[];c.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&c.push("expires="+new Date(n).toGMTString()),r.isString(o)&&c.push("path="+o),r.isString(i)&&c.push("domain="+i),!0===s&&c.push("secure"),document.cookie=c.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(27),i=n(6),s=n(1),c=n(28),a=n(29);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!c(e.url)&&(e.url=a(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(7);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(33)),o=s(n(34)),i=s(n(37));function s(e){return e&&e.__esModule?e:{default:e}}var c={app:r.default,index:o.default,info:i.default};t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(35)),o=s(n(36)),i=n(9);function s(e){return e&&e.__esModule?e:{default:e}}var c=function(){var e={},t={},n=function(e){"true"===e.dataset.intersected&&(t.projectsCounterCurrent.textContent="0"+e.dataset.projectId)},s=function(){e.ticking=!1,a()},c=function(){e.ticking||requestAnimationFrame(s),e.ticking=!0},a=function(){e.isFirefox||(t.projectsList.scrollTop<=0?t.projectsList.scrollTop=t.projectsList.scrollHeight-window.innerHeight:t.projectsList.scrollTop>=t.projectsList.scrollHeight-window.innerHeight&&(t.projectsList.scrollTop=1))},u=function(){t.projectsList.removeEventListener("scroll",c),t.projectsList.removeEventListener("resize",c)};return{init:function(){e.ticking=!1,e.isFirefox=navigator.userAgent.indexOf("Firefox")>-1,t.projectsList=document.querySelector("[data-projects-list]"),t.projectsList.scrollTop=1,t.projects=[].slice.call(document.querySelectorAll("[data-project]")),function(){if(!e.isFirefox){var n=t.projects[0].cloneNode(!0);n.dataset.project="clone",t.projectsList.appendChild(n),t.projects.push(n)}}(),t.projects.forEach(function(e){(0,r.default)({element:e,container:t.projectsList}).init()}),t.projectsCounter=document.querySelector("[data-projects-counter]"),t.projectsCounterCurrent=t.projectsCounter.querySelector('[data-projects-counter="current"]'),t.projectsCounterTotal=t.projectsCounter.querySelector('[data-projects-counter="total"]'),e.isFirefox?(t.projectsCounterTotal.textContent="0"+t.projects.length,t.projects.forEach(function(e,t){return e.dataset.projectId=t+1})):(t.projectsCounterTotal.textContent="0"+(t.projects.length-1),t.projects.forEach(function(e,n){e.dataset.projectId=n+1,n===t.projects.length-1&&(e.dataset.projectId=1)})),(0,o.default)({content:t.projects,list:t.projectsList,threshold:.5,callback:n}).init(),t.projectsList.addEventListener("scroll",c),t.projectsList.addEventListener("resize",c),(0,i.beforeViewChange)("[data-site-content]",u)}}}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(8);t.default=function(e){var t={},n=function(e){!0===e?(t.isTransitioning=!0,t.container.classList.add("u-is-loading")):(t.isTransitioning=!1,t.container.classList.remove("u-is-loading"))},o=function(e,t){return new Promise(function(n){void 0===t&&(t={});var r=t,o=r.a,i=void 0===o?1:o,s=r.b,c=void 0===s?0:s,a=r.c,u=void 0===a?0:a,l=r.d,f=void 0===l?1:l,d=r.tx,p=void 0===d?0:d,h=r.ty,v=void 0===h?0:h;e.addEventListener("transitionend",function t(r){r.target===e&&(e.removeEventListener("transitionend",t),n())}),e.style.webkitTransform="matrix("+i+", "+c+", "+u+", "+f+", "+p+", "+v+")",e.style.transform="matrix("+i+", "+c+", "+u+", "+f+", "+p+", "+v+")"})},i=function e(i){i.target===t.gallery&&o(t.thumbnail,{}).then(function(){t.root.classList.remove(t.rootClass),t.thumbnail.classList.remove(t.thumbnailClass),t.container.classList.remove(t.containerClass),t.gallery.removeEventListener("transitionend",e),t.gallery.removeAttribute("style"),n(!1)}).catch(function(e){return(0,r.handleFetchError)(e)})},s=function e(r){r.target===t.thumbnail&&(t.thumbnail.removeEventListener("transitionend",e),t.gallery.style.webkitTransform="translate3d(0, "+-1*t.gallery.getBoundingClientRect().top+"px, 0)",t.gallery.style.transform="translate3d(0, "+-1*t.gallery.getBoundingClientRect().top+"px, 0)",o(t.thumbnail,t.matrixValuesY).then(function(){return o(t.thumbnail,t.matrixValuesAll)}).then(function(){return t.gallery.classList.add(t.galleryClass),void n(!1)}).catch(function(e){return console.log(e)}))},c=function(e){t.isTransitioning||(e.preventDefault(),n(!0),t.thumnbnailData=t.thumbnail.getBoundingClientRect(),t.matrixValuesY={d:window.innerHeight/t.thumnbnailData.height,ty:Math.round(-1*t.thumnbnailData.top)},t.matrixValuesAll={a:window.innerWidth/t.thumnbnailData.width,d:window.innerHeight/t.thumnbnailData.height,tx:Math.round(-1*t.thumnbnailData.left),ty:Math.round(-1*t.thumnbnailData.top)},t.root.classList.contains(t.rootClass)?(t.gallery.addEventListener("transitionend",i),t.gallery.classList.remove(t.galleryClass)):(t.root.classList.add(t.rootClass),t.container.classList.add(t.containerClass),t.thumbnail.addEventListener("transitionend",s),t.thumbnail.classList.add(t.thumbnailClass)))};return{init:function(){t.container=e.container,t.root=e.element,t.gallery=t.root.querySelector("[data-project-gallery]"),t.thumbnail=t.root.querySelector("[data-project-thumbnail]"),t.toggles=[].slice.call(t.root.querySelectorAll("[data-project-toggle]")),t.toggles.forEach(function(e){return e.addEventListener("click",c)}),t.rootClass="project--is-active",t.containerClass="projects__list--is-inactive",t.galleryClass="project__gallery--is-active",t.thumbnailClass="project__thumbnail--is-hidden",t.isTransitioning=!1,console.log("Project.js: Check Safari project counter and z-index problem with headline overlapping the gallery")}}}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _beforeViewChange=__webpack_require__(9),IntersectionTracker=function IntersectionTracker(obj){var intersectionTracker={},browser={},_intersectionObserverCB=function(e){e.forEach(function(e){e.intersectionRatio>=intersectionTracker.threshold&&e.isIntersecting?(e.target.dataset.intersected="true",intersectionTracker.useFlag&&intersectionTracker.io.unobserve(e.target)):e.target.dataset.intersected="false",intersectionTracker.cb(e.target)})},_buildThresholdList=function(){for(var e=[],t=1;t<=100;t++){var n=t/100;e.push(n)}return e.push(0),e},_useIntersectionObserver=function(){var e={threshold:_buildThresholdList()};intersectionTracker.io=new IntersectionObserver(_intersectionObserverCB,e),intersectionTracker.content.forEach(function(e){return intersectionTracker.io.observe(e)})},_eventsCB=function _eventsCB(){browser.ticking=!1,intersectionTracker.content.forEach(function(item){if(!intersectionTracker.useFlag||"true"!==item.dataset.intersected){var itemTop=item.getBoundingClientRect().top,itemBottom=item.getBoundingClientRect().bottom;if(0===intersectionTracker.threshold){var topInView=itemTop>=0&&itemTop<=window.innerHeight,bottomInView=itemBottom>=0&&itemBottom<=window.innerHeight,inFullView=itemTop<=0&&itemBottom>=window.innerHeight;intersectionTracker.condition="(topInView || bottomInView || inFullView)"}else intersectionTracker.condition="(itemTop <= intersectionTracker.threshold && itemBottom >= intersectionTracker.threshold)";eval(intersectionTracker.condition)?item.dataset.intersected="true":item.dataset.intersected="false",intersectionTracker.cb(item)}})},_requestTick=function(){browser.ticking||requestAnimationFrame(_eventsCB),browser.ticking=!0},_useEvents=function(){intersectionTracker.container.addEventListener("scroll",_requestTick),intersectionTracker.container.addEventListener("resize",_requestTick),_requestTick()},_selectIntersectionTechnique=function(){"IntersectionObserver"in window?_useIntersectionObserver():_useEvents()},_remove=function(){intersectionTracker.container.removeEventListener("scroll",_requestTick),intersectionTracker.container.removeEventListener("resize",_requestTick),intersectionTracker.io&&intersectionTracker.io.disconnect()},construct=function(){intersectionTracker.content=obj.content,intersectionTracker.container=obj.container||window,intersectionTracker.threshold=obj.threshold||0,intersectionTracker.cb=obj.callback,intersectionTracker.useFlag=obj.flag,browser.ticking=!1,_selectIntersectionTechnique(),(0,_beforeViewChange.beforeViewChange)("[data-site-content]",_remove)};return{init:construct}};exports.default=IntersectionTracker},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={init:function(){}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.appendView=function(e,t){var n=(new DOMParser).parseFromString(e,"text/html").querySelector("[data-view]");return t.appendChild(n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.removeView=function(e,t){return new Promise(function(n,r){e.addEventListener("transitionend",function(t){t.target===e&&(e.parentNode.removeChild(e),e=null,n())}),e.classList.remove(t)})}},function(e,t,n){!function(){"use strict";function t(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==e.__forceSmoothScrollPolyfill__)){var n=e.HTMLElement||e.Element,r=468,o={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:n.prototype.scroll||c,scrollIntoView:n.prototype.scrollIntoView},i=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,s=function(e){return new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(e)}(e.navigator.userAgent)?1:0;e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==a(arguments[0])?p.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):o.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(a(arguments[0])?o.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):p.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},n.prototype.scroll=n.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==a(arguments[0])){var e=arguments[0].left,t=arguments[0].top;p.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},n.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==a(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},n.prototype.scrollIntoView=function(){if(!0!==a(arguments[0])){var n=function(e){var n;do{n=(e=e.parentNode)===t.body}while(!1===n&&!1===f(e));return n=null,e}(this),r=n.getBoundingClientRect(),i=this.getBoundingClientRect();n!==t.body?(p.call(this,n,n.scrollLeft+i.left-r.left,n.scrollTop+i.top-r.top),"fixed"!==e.getComputedStyle(n).position&&e.scrollBy({left:r.left,top:r.top,behavior:"smooth"})):e.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else o.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function c(e,t){this.scrollLeft=e,this.scrollTop=t}function a(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function u(e,t){return"Y"===t?e.clientHeight+s<e.scrollHeight:"X"===t?e.clientWidth+s<e.scrollWidth:void 0}function l(t,n){var r=e.getComputedStyle(t,null)["overflow"+n];return"auto"===r||"scroll"===r}function f(e){var t=u(e,"Y")&&l(e,"Y"),n=u(e,"X")&&l(e,"X");return t||n}function d(t){var n,o,s,c=(i()-t.startTime)/r;n=function(e){return.5*(1-Math.cos(Math.PI*e))}(c=c>1?1:c),o=t.startX+(t.x-t.startX)*n,s=t.startY+(t.y-t.startY)*n,t.method.call(t.scrollable,o,s),o===t.x&&s===t.y||e.requestAnimationFrame(d.bind(e,t))}function p(n,r,s){var a,u,l,f,p=i();n===t.body?(a=e,u=e.scrollX||e.pageXOffset,l=e.scrollY||e.pageYOffset,f=o.scroll):(a=n,u=n.scrollLeft,l=n.scrollTop,f=c),d({scrollable:a,method:f,startTime:p,startX:u,startY:l,x:r,y:s})}}e.exports={polyfill:t}}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.createServiceWorker=function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(function(){console.log("[Service Worker] Registered")}).catch(function(e){console.log("[Service Worker] Error: ",e)})}},function(e,t){}]);