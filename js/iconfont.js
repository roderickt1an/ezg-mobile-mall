(function(window){var svgSprite='<svg><symbol id="icon-dianhua" viewBox="0 0 1025 1024"><path d="M938.602 736.847c35.275 42.328 19.203 106.356 7.028 118.796-12.176 12.632-11.296 18.694-69.666 71.656-58.745 53.397-176.239 16.883-229.586 0-53.35-16.946-198.333-109.669-332.397-237.1C178.16 561.082 107.933 400.206 79.184 312.795c-28.683-87.663-10.73-119.301 0-148.94 10.735-29.635 30.375-54.77 88.56-88.164 58.054-33.45 79.08-7.998 94.017 0 14.879 7.884 79.897 64.78 102.432 118.555 22.407 53.77 11.737 88.346-5.588 104.666-17.256 16.32-29.558 31.265-43.87 41.392-14.31 9.943-17.321 24.386-15.188 52.271 2.01 27.95 102.871 136.995 122.764 157.13 19.835 20.192 151.134 156.003 196.7 166.443 45.63 10.254 62.136-9.566 67.094-14.943 4.96-5.314 22.91-29.763 43.245-46.77 20.462-16.885 75.066-12.255 88.556-2.751 13.495 9.508 85.422 42.645 120.696 85.164z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)