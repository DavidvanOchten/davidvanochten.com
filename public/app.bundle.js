!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){o(1),e.exports=o(11)},function(e,t,o){"use strict";var r=l(o(2)),n=l(o(3)),i=o(10);function l(e){return e&&e.__esModule?e:{default:e}}!function(){console.log("[App] Service Worker enabled > JS/CSS still disabled"),console.log("[App] Check JSON-LD and inline fonts");var e=!!window.chrome&&!!window.chrome.webstore,t="undefined"!=typeof InstallTrigger;(e||t)&&(0,i.createServiceWorker)(),window.addEventListener("load",function(){r.default.polyfill(),n.default.app.init(),n.default.index.init()})}()},function(e,t,o){!function(){"use strict";function t(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==e.__forceSmoothScrollPolyfill__)){var o=e.HTMLElement||e.Element,r=468,n={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:o.prototype.scroll||s,scrollIntoView:o.prototype.scrollIntoView},i=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,l=function(e){return new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(e)}(e.navigator.userAgent)?1:0;e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==a(arguments[0])?v.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):n.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(a(arguments[0])?n.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):v.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},o.prototype.scroll=o.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==a(arguments[0])){var e=arguments[0].left,t=arguments[0].top;v.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");n.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},o.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==a(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):n.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},o.prototype.scrollIntoView=function(){if(!0!==a(arguments[0])){var o=function(e){var o;do{o=(e=e.parentNode)===t.body}while(!1===o&&!1===d(e));return o=null,e}(this),r=o.getBoundingClientRect(),i=this.getBoundingClientRect();o!==t.body?(v.call(this,o,o.scrollLeft+i.left-r.left,o.scrollTop+i.top-r.top),"fixed"!==e.getComputedStyle(o).position&&e.scrollBy({left:r.left,top:r.top,behavior:"smooth"})):e.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else n.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function s(e,t){this.scrollLeft=e,this.scrollTop=t}function a(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function c(e,t){return"Y"===t?e.clientHeight+l<e.scrollHeight:"X"===t?e.clientWidth+l<e.scrollWidth:void 0}function u(t,o){var r=e.getComputedStyle(t,null)["overflow"+o];return"auto"===r||"scroll"===r}function d(e){var t=c(e,"Y")&&u(e,"Y"),o=c(e,"X")&&u(e,"X");return t||o}function f(t){var o,n,l,s=(i()-t.startTime)/r;o=function(e){return.5*(1-Math.cos(Math.PI*e))}(s=s>1?1:s),n=t.startX+(t.x-t.startX)*o,l=t.startY+(t.y-t.startY)*o,t.method.call(t.scrollable,n,l),n===t.x&&l===t.y||e.requestAnimationFrame(f.bind(e,t))}function v(o,r,l){var a,c,u,d,v=i();o===t.body?(a=e,c=e.scrollX||e.pageXOffset,u=e.scrollY||e.pageYOffset,d=n.scroll):(a=o,c=o.scrollLeft,u=o.scrollTop,d=s),f({scrollable:a,method:d,startTime:v,startX:c,startY:u,x:r,y:l})}}e.exports={polyfill:t}}()},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(o(4)),n=i(o(6));function i(e){return e&&e.__esModule?e:{default:e}}var l={app:r.default,index:n.default};t.default=l},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(o(5));var n=function(){var e={};return{init:function(){e.lazyContent=[].slice.call(document.querySelectorAll("[data-src]")),e.lazyContent.forEach(function(e){(0,r.default)({element:e,type:e.tagName}).init()})}}}();t.default=n},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t={};return{init:function(){t.root=e.element,t.type=e.type,t.cb=e.callback,void 0!==t.type&&"IMG"!==t.type||(window.innerWidth<600&&t.root.dataset.srcS?t.src=t.root.dataset.srcS:t.src=t.root.dataset.src,new Promise(function(e,o){var r=new Image;r.src=t.src,r.onload=e,r.onerror=o}).then(function(){return t.root.src=t.src,void(t.cb&&(t.root.complete?t.cb():t.root.addEventListener("load",t.cb)))}).catch(function(e){return console.log("[LazyLoader.js] Error: ",e)})),"VIDEO"===t.type&&(t.root.src=t.root.dataset.src,t.root.load(),t.cb&&t.cb())}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(o(7)),n=l(o(8)),i=l(o(13));function l(e){return e&&e.__esModule?e:{default:e}}var s=function(){var e={},t={},o=function(e){t.cursor.style.transform="translate3d("+(e.clientX+15)+"px, "+(e.clientY-5)+"px, 0)",t.cursor.style.webkitTransform="translate3d("+(e.clientX+15)+"px, "+(e.clientY-5)+"px, 0)"};return{init:function(){e.currentYear=document.querySelector("[data-year]"),e.currentYear.textContent=(new Date).getFullYear(),e.info=document.querySelector("[data-info]"),e.infoTrigger=document.querySelector("[data-info-trigger]"),e.infoTrigger.addEventListener("click",function(){window.scroll({top:e.info.getBoundingClientRect().top,behavior:"smooth"})}),e.compilation=(0,i.default)("data-compilation"),e.compilation.init(),e.projects=[].slice.call(document.querySelectorAll("[data-project]")),e.projects.forEach(function(e){(0,n.default)(e).init()}),(0,r.default)({content:e.projects,threshold:0,flag:!0,callback:function(e){"true"===e.dataset.intersected&&e.querySelector("[data-project-thumbnail]").classList.add("project__thumbnail--is-visible")}}).init(),t.cursor=document.querySelector("[data-cursor]"),document.body.addEventListener("mousemove",o)}}}();t.default=s},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var IntersectionTracker=function IntersectionTracker(obj){var intersectionTracker={},browser={},_intersectionObserverCB=function(e){e.forEach(function(e){e.intersectionRatio>=intersectionTracker.threshold&&e.isIntersecting?(e.target.dataset.intersected="true",intersectionTracker.useFlag&&intersectionTracker.io.unobserve(e.target)):e.target.dataset.intersected="false",intersectionTracker.cb(e.target)})},_buildThresholdList=function(){for(var e=[],t=1;t<=100;t++){var o=t/100;e.push(o)}return e.push(0),e},_useIntersectionObserver=function(){var e={threshold:_buildThresholdList()};intersectionTracker.io=new IntersectionObserver(_intersectionObserverCB,e),intersectionTracker.content.forEach(function(e){return intersectionTracker.io.observe(e)})},_eventsCB=function _eventsCB(){browser.ticking=!1,intersectionTracker.content.forEach(function(item){if(!intersectionTracker.useFlag||"true"!==item.dataset.intersected){var itemTop=item.getBoundingClientRect().top,itemBottom=item.getBoundingClientRect().bottom;if(0===intersectionTracker.threshold){var topInView=itemTop>=0&&itemTop<=window.innerHeight,bottomInView=itemBottom>=0&&itemBottom<=window.innerHeight,inFullView=itemTop<=0&&itemBottom>=window.innerHeight;intersectionTracker.condition="(topInView || bottomInView || inFullView)"}else intersectionTracker.condition="(itemTop <= intersectionTracker.threshold * window.innerHeight && itemBottom >= intersectionTracker.threshold * window.innerHeight)";eval(intersectionTracker.condition)?item.dataset.intersected="true":item.dataset.intersected="false",intersectionTracker.cb(item)}})},_requestTick=function(){browser.ticking||requestAnimationFrame(_eventsCB),browser.ticking=!0},_useEvents=function(){intersectionTracker.container.addEventListener("scroll",_requestTick),intersectionTracker.container.addEventListener("resize",_requestTick),_requestTick()},_selectIntersectionTechnique=function(){"IntersectionObserver"in window?_useIntersectionObserver():_useEvents()},construct=function(){intersectionTracker.content=obj.content,intersectionTracker.container=obj.container||window,intersectionTracker.threshold=obj.threshold||0,intersectionTracker.cb=obj.callback,intersectionTracker.useFlag=obj.flag,browser.ticking=!1,_selectIntersectionTechnique()};return{init:construct}};exports.default=IntersectionTracker},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(o(12)),n=o(14),i=o(9),l=o(15);t.default=function(e){var t={},o={},s=function(e,t){return new Promise(function(o){void 0===t&&(t={});var r=t,n=r.a,i=void 0===n?1:n,l=r.b,s=void 0===l?0:l,a=r.c,c=void 0===a?0:a,u=r.d,d=void 0===u?1:u,f=r.tx,v=void 0===f?0:f,m=r.ty,g=void 0===m?0:m;e.addEventListener("transitionend",function t(r){r.target===e&&(e.removeEventListener("transitionend",t),o())}),e.style.webkitTransform="matrix("+i+", "+s+", "+c+", "+d+", "+v+", "+g+")",e.style.transform="matrix("+i+", "+s+", "+c+", "+d+", "+v+", "+g+")"})},a=function e(o){o.target===t.gallery&&s(t.thumbnail,{}).then(function(){document.body.classList.remove("u-no-scroll"),t.root.classList.remove(t.rootClass),t.gallery.classList.remove(t.galleryVisibleClass),t.thumbnail.classList.remove(t.thumbnailClass),t.thumbnail.addEventListener("mouseover",v),t.thumbnail.addEventListener("mouseout",v),"true"===document.body.dataset.mutedVideos&&t.videoElement&&t.video.setVideo(!1),t.gallery.removeEventListener("transitionend",e),t.gallery.removeAttribute("style"),(0,n.disableUserInput)(!1)}).catch(function(e){return(0,i.handleFetchError)(e)})},c=function e(r){r.target===t.thumbnail&&(t.thumbnail.removeEventListener("transitionend",e),t.gallery.style.webkitTransform="translate3d(0, "+-1*t.gallery.getBoundingClientRect().top+"px, 0)",t.gallery.style.transform="translate3d(0, "+-1*t.gallery.getBoundingClientRect().top+"px, 0)",s(t.thumbnail,t.matrixValuesY).then(function(){return s(t.thumbnail,t.matrixValuesAll)}).then(function(){return t.gallery.classList.add(t.galleryActiveClass),t.videoElement&&(t.video.setVideo(!0),o.cursor.classList.add("cursor--gallery"),o.cursor.classList.add("cursor--is-visible")),void(0,n.disableUserInput)(!1)}).catch(function(e){return console.log(e)}))},u=function(){o.ticking=!1,t.galleryContainer.scrollTop<1?t.galleryContainer.scrollTop=1:t.galleryContainer.scrollHeight-t.galleryContainer.scrollTop===t.galleryContainer.clientHeight&&(t.galleryContainer.scrollTop=t.galleryContainer.scrollHeight-t.galleryContainer.clientHeight-1)},d=function(e){o.ticking||requestAnimationFrame(u),o.ticking=!0},f=function(e){document.body.classList.contains("u-is-loading")||(e.preventDefault(),(0,n.disableUserInput)(!0),t.thumnbnailData=t.thumbnail.getBoundingClientRect(),t.matrixValuesY={d:window.innerHeight/t.thumnbnailData.height,ty:Math.round(-1*t.thumnbnailData.top)},t.matrixValuesAll={a:window.innerWidth/t.thumnbnailData.width,d:window.innerHeight/t.thumnbnailData.height,tx:Math.round(-1*t.thumnbnailData.left),ty:Math.round(-1*t.thumnbnailData.top)},t.root.classList.contains(t.rootClass)?(o.isMobile.matches&&t.galleryContainer.removeEventListener("scroll",d),t.videoElement&&("false"===document.body.dataset.mutedVideos&&t.video.setVideo(!1),o.cursor.classList.remove("cursor--gallery"),o.cursor.classList.remove("cursor--is-visible")),t.gallery.addEventListener("transitionend",a),t.gallery.classList.remove(t.galleryActiveClass)):(document.body.classList.add("u-no-scroll"),o.cursor.classList.toggle("cursor--is-visible"),o.isMobile.matches&&t.galleryContainer.addEventListener("scroll",d),o.cursor.classList.contains("cursor--video")&&o.cursor.classList.toggle("cursor--video"),t.root.classList.add(t.rootClass),t.gallery.classList.add(t.galleryVisibleClass),t.thumbnail.removeEventListener("mouseover",v),t.thumbnail.removeEventListener("mouseout",v),t.thumbnail.addEventListener("transitionend",c),t.thumbnail.classList.add(t.thumbnailClass)))},v=function(e){o.cursor.classList.toggle("cursor--is-visible"),"video"===e.currentTarget.closest("[data-project]").dataset.project&&o.cursor.classList.toggle("cursor--video")};return{init:function(){o.cursor=document.querySelector("[data-cursor]"),o.isMobile=window.matchMedia("(pointer: coarse)"),t.root=e,t.gallery=t.root.querySelector("[data-project-gallery]"),t.galleryContainer=t.gallery.querySelector("[data-project-gallery-container]"),t.thumbnail=t.root.querySelector("[data-project-thumbnail]"),t.videoElement=t.gallery.querySelector("video")||!1,t.rootClass="project--is-active",t.galleryActiveClass="gallery--is-active",t.galleryVisibleClass="project__gallery--is-visible",t.thumbnailClass="project__thumbnail--is-hidden",t.toggles=[].slice.call(t.root.querySelectorAll("[data-project-toggle]")),t.toggles.forEach(function(e){return e.addEventListener("click",f)}),t.thumbnail.addEventListener("mouseover",v),t.thumbnail.addEventListener("mouseout",v),t.videoElement&&(t.video=(0,r.default)(t.videoElement),t.video.init(),t.gallery.querySelector("[data-project-toggle]").addEventListener("mouseover",function(e){return(0,l.hideCursor)(!0)}),t.gallery.querySelector("[data-project-toggle]").addEventListener("mouseout",function(e){return(0,l.hideCursor)(!1)}))}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.handleFetchError=function(e){console.log(e)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.createServiceWorker=function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(function(){console.log("[Service Worker] Registered")}).catch(function(e){console.log("[Service Worker] Error: ",e)})}},function(e,t){},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Video=function Video(element){var video={},browser={},_onWheel=function(e){window.clearTimeout(browser.isWheeling),browser.isWheeling=setTimeout(function(){video.element.playbackRate=1,video.element.removeAttribute("style"),"false"===document.body.dataset.mutedVideos&&(video.element.volume=1)},100),e.deltaY>1&&(video.element.volume=0,video.element.style.filter="grayscale(1)",video.element.style.opacity=".5",e.deltaY>50?video.element.playbackRate=5:video.element.playbackRate=1+e.deltaY/10)},setVideo=function(e){!0===e?(video.element.play(),"false"===document.body.dataset.mutedVideos&&muteVideo(!1),browser.isChrome&&window.addEventListener("wheel",_onWheel,{passive:!0})):("false"===document.body.dataset.mutedVideos?muteVideo(!0,function(){video.element.pause()}):video.element.pause(),browser.isChrome&&window.removeEventListener("wheel",_onWheel))},muteVideo=function muteVideo(bool,cb){video.isTransitioning=!0;var volume=!1===bool?0:1,volumeCondition=!1===bool?"volume >= 1":"volume <= 0",volumeDirection=!1===bool?"volume + 0.05":"volume - 0.05",controlVolume=setInterval(function(){volume=parseFloat(eval(volumeDirection).toFixed(2)),video.element.volume=volume,eval(volumeCondition)&&(clearInterval(controlVolume),video.isTransitioning=!1,cb&&cb())},50)},construct=function(){video.element=element,video.element.volume=0,browser.cursor=document.querySelector("[data-cursor]"),browser.isChrome=!!window.chrome&&!!window.chrome.webstore,browser.isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),browser.isMobile=window.matchMedia("(pointer: coarse)"),browser.isMobile.matches?video.element.muted=!0:(browser.isSafari&&(muteVideo(!0),browser.cursor.classList.add("cursor--mute"),document.body.dataset.mutedVideos="true"),video.element.parentNode.addEventListener("click",function(){video.isTransitioning||("true"===document.body.dataset.mutedVideos?(muteVideo(!1),browser.cursor.classList.remove("cursor--mute"),document.body.dataset.mutedVideos="false"):(muteVideo(!0),browser.cursor.classList.add("cursor--mute"),document.body.dataset.mutedVideos="true"))}))};return{init:construct,muteVideo:muteVideo,setVideo:setVideo}};exports.default=Video},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(o(12)),n=o(14),i=o(15);t.default=function(e){var t={},o={},l=function e(o){o.target===t.gallery&&(t.gallery.removeEventListener("transitionend",e),(0,n.disableUserInput)(!1))},s=function(e){document.body.classList.contains("u-is-loading")||(e.preventDefault(),(0,n.disableUserInput)(!0),document.body.classList.toggle("u-no-scroll"),t.gallery.addEventListener("transitionend",l),t.gallery.classList.toggle("gallery--is-active"),t.gallery.classList.contains("gallery--is-active")?t.video.setVideo(!0):t.video.setVideo(!1),o.cursor.classList.toggle("cursor--light"),o.cursor.classList.toggle("cursor--gallery"),o.cursor.classList.toggle("cursor--is-visible"))};return{init:function(){o.cursor=document.querySelector("[data-cursor]"),t.root=document.querySelector("["+e+"]"),t.gallery=t.root.querySelector("[data-compilation-gallery]"),t.toggles=[].slice.call(t.root.querySelectorAll("[data-compilation-toggle]")),t.toggles.forEach(function(e){return e.addEventListener("click",s)}),t.gallery.querySelector("[data-compilation-toggle]").addEventListener("mouseover",function(e){return(0,i.hideCursor)(!0)}),t.gallery.querySelector("[data-compilation-toggle]").addEventListener("mouseout",function(e){return(0,i.hideCursor)(!1)}),t.video=(0,r.default)(t.gallery.querySelector("video")),t.video.init()}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.disableUserInput=function(e){!0===e?document.body.classList.add("u-is-loading"):document.body.classList.remove("u-is-loading")}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.hideCursor=function(e){var t=document.querySelector("[data-cursor]");!0===e?t.classList.add("cursor--is-hidden"):t.classList.remove("cursor--is-hidden")}}]);