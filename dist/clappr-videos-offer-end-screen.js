!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("moment")):"function"==typeof define&&define.amd?define(["moment"],r):"object"==typeof exports?exports.ClapprVideosOfferEndScreen=r(require("moment")):e.ClapprVideosOfferEndScreen=r(e.moment)}(this,function(e){return function(e){function r(i){if(t[i])return t[i].exports;var n=t[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,r),n.loaded=!0,n.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var n=t(1),a=i(n);r.default=a.default,e.exports=r.default},function(e,r,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function n(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function a(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function o(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var l=function(){function e(e,r){for(var t=0;t<r.length;t++){var i=r[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,t,i){return t&&e(r.prototype,t),i&&e(r,i),r}}(),p=t(2),s=i(p),d=t(3),f=i(d),c=t(5),u=i(c),v=Clappr,y=v.UICorePlugin,h=v.Events,_=v.template,m=function(e){function r(e){n(this,r);var t=a(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.videoEnded=!1,t}return o(r,e),l(r,[{key:"name",get:function(){return r.pluginName}},{key:"template",get:function(){return _(s.default)}},{key:"attributes",get:function(){return{class:"videos-offer-end-screen","data-videos-offer":""}}},{key:"mediaControl",get:function(){return this.core.mediaControl}},{key:"posterPlugin",get:function(){return this.container.getPlugin("poster")}},{key:"container",get:function(){return this.core.getCurrentContainer()}},{key:"options",get:function(){return this.core.options.endOffer||{}}}]),l(r,[{key:"bindEvents",value:function(){this.listenTo(this.core,h.CORE_CONTAINERS_CREATED,this.onContainerCreated),this.listenTo(this.core,h.CORE_OPTIONS_CHANGE,this.onCoreOptionsChange),this.listenTo(this.mediaControl,h.MEDIACONTROL_CONTAINERCHANGED,this.bindContainerEvents),this.bindContainerEvents()}},{key:"onContainerCreated",value:function(){this.videoEnded=!1,this.hideVideosOffer()}},{key:"bindContainerEvents",value:function(){this.hasEndOffer()&&(this.stopListening(this.container,h.CONTAINER_PLAY),this.listenTo(this.container,h.CONTAINER_PLAY,this.onContainerPlay),this.stopListening(this.container,h.CONTAINER_ENDED),this.listenTo(this.container,h.CONTAINER_ENDED,this.onContainerEnded))}},{key:"bindMarkupEvents",value:function(){var e=this.$el.find(".videos-offer-end-screen__replay"),r=this.$el.find(".videos-offer-end-screen__item");e.off("click"),e.on("click",this.onReplayClick.bind(this)),r.off("click"),r.on("click",this.onItemClick.bind(this))}},{key:"render",value:function(){return this.hasEndOffer()&&(this.createMarkup(),this.appendMarkup(),this.bindMarkupEvents()),this}},{key:"appendMarkup",value:function(){this.core.$el.append(this.el)}},{key:"createMarkup",value:function(){var e=this.options.videos.slice(0,4);this.$el.html(this.template({videos:this.withHumanizedDuration(e)})),this.createStyle()}},{key:"withHumanizedDuration",value:function(e){return e.map(function(e,r){var t=Object.assign({},e);return t.duration=u.default.duration(e.duration).humanize(),t})}},{key:"createStyle",value:function(){var e=void 0;if(window.WP3){var r=window.WP3.Styler,t=this.core.options.playerId;e=r.getStyleFrom(f.default,{playerId:t})[0]}else{var i=window.Clappr.Styler;e=i.getStyleFor(f.default)}this.$el.append(e)}},{key:"hasEndOffer",value:function(){return!!(this.options.videos&&this.options.videos.length>0)}},{key:"showPosterIcon",value:function(){this.posterPlugin.showPlayButton()}},{key:"hidePosterIcon",value:function(){this.posterPlugin.hidePlayButton()}},{key:"showVideosOffer",value:function(){this.$el.addClass("videos-offer-end-screen--visible")}},{key:"hideVideosOffer",value:function(){this.$el.removeClass("videos-offer-end-screen--visible")}},{key:"addBackgroundBlur",value:function(){this.posterPlugin.$el.find(".poster-background").css({"-webkit-filter":"blur(5px)","-moz-filter":"blur(5px)","-o-filter":"blur(5px)"})}},{key:"removeBackgroundBlur",value:function(){this.posterPlugin.$el.find(".poster-background").css({"-webkit-filter":"blur(0px)","-moz-filter":"blur(0px)","-o-filter":"blur(0px)"})}},{key:"onCoreOptionsChange",value:function(){this.render(),this.bindContainerEvents(),this.options.visible&&this.videoEnded&&this.onContainerEnded()}},{key:"onContainerPlay",value:function(){this.showPosterIcon(),this.removeBackgroundBlur(),this.hideVideosOffer(),this.videoEnded=!1}},{key:"onContainerEnded",value:function(){this.videoEnded=!0,this.options.visible&&(this.hidePosterIcon(),this.addBackgroundBlur(),this.showVideosOffer())}},{key:"onReplayClick",value:function(){this.container.play(),this.hideVideosOffer()}},{key:"clickedItemindex",value:function(e){return $(e).closest(".videos-offer-end-screen__item").index()}},{key:"onItemClick",value:function(e){var r=this.options,t=r.videos,i=r.onVideoClick,n=this.clickedItemindex(e.target),a=t[n];this.videoEnded=!1,i&&(this.hideVideosOffer(),i(e,a))}}]),r}(y);m.pluginName="videos-offer-end-screen",r.default=m,e.exports=r.default},function(e,r){e.exports='<div class=videos-offer-end-screen__background> <div class=videos-offer-end-screen__content-wrapper> <h2 class=videos-offer-end-screen__header>Assista Também</h2> <div class=videos-offer-end-screen__track> <% videos.forEach(function(video) { %> <a class=videos-offer-end-screen__item href="<%= video.url_for_consumption %>" title="<%= video.title %>"> <div class=videos-offer-end-screen__thumbnail> <img src="<%= video.thumbnail %>" alt="<%= video.title %>"/> <span><%= video.duration %></span> </div> <div class=videos-offer-end-screen__info> <span class=videos-offer-end-screen__program-title> <%= video.program.title %> </span> <p class=videos-offer-end-screen__title> <%= video.title %> </p> </div> </a> <% }) %> </div> <div class=videos-offer-end-screen__footer href=#> <a class=videos-offer-end-screen__replay> <svg width=100% height=100% viewBox="0 0 21 25" xmlns=http://www.w3.org/2000/svg> <path d="M17.842 8.137a1.078 1.078 0 1 0-1.627 1.418 7.962 7.962 0 0 1 1.803 6.919c-.91 4.324-5.167 7.102-9.491 6.194-4.324-.91-7.102-5.166-6.194-9.491.756-3.596 3.829-6.115 7.329-6.341l-2.18 2.21a1.08 1.08 0 1 0 1.537 1.516L12.927 6.6a1.078 1.078 0 0 0-.01-1.527l-3.963-3.91a1.08 1.08 0 1 0-1.516 1.539l2.009 1.982c-4.412.319-8.273 3.508-9.228 8.048-1.154 5.49 2.374 10.894 7.864 12.049 5.49 1.153 10.894-2.374 12.049-7.864a10.092 10.092 0 0 0-2.29-8.781" fill-rule=evenodd /> </svg> <span>Reveja</span> </a> </div> </div> </div> '},function(e,r,t){r=e.exports=t(4)(),r.push([e.id,'div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen{position:absolute;width:100%;height:100%;z-index:1000;background-repeat:no-repeat;background-size:contain;pointer-events:none;opacity:0}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen--visible{transition:opacity;transition-duration:2s;pointer-events:all;opacity:1}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__background{z-index:100;width:100%;height:100%;position:absolute}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__background:before{content:"";cursor:pointer;width:100%;height:100%;position:absolute;top:0;left:0;background:rgba(0,0,0,.6)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__content-wrapper{position:relative;display:flex;flex-direction:column;justify-content:center;color:#fff;width:100%;height:100%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__header{display:block;margin-top:5%;margin-bottom:5%;text-transform:uppercase;font-family:GloboFutura,Arial,Helvetica,sans-serif;font-weight:700;font-size:calc(1.9021739130434785vw + 10.391304347826088px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__track{display:flex;align-self:center;justify-content:space-around;width:80%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item{display:none;flex-direction:row;align-items:center;text-decoration:none;text-align:left;color:#fff;width:100%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item:first-child{display:flex}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail{position:relative;display:flex;width:32%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail img{width:100%;height:100%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail span{position:absolute;bottom:0;right:0;background:rgba(0,0,0,.7);padding:.1em .45em;font-family:Open Sans;font-weight:300;font-size:calc(1.11vw + 9.42px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__info{display:flex;flex-direction:column;width:68%;padding:2px 0 2px 5%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__program-title{text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-bottom:1%;color:#aaa;font-family:GloboFutura,Arial,Helvetica,sans-serif;font-weight:500;font-size:calc(1.42vw + 7.42px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__title{font-family:Open Sans,Arial,Helvetica,sans-serif;font-weight:600;font-size:3.3vw;line-height:4.7vw;max-height:9.4vw;overflow:hidden}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer{display:flex;justify-content:center;text-decoration:none;text-transform:uppercase;color:#c4c4c4;margin-top:2%;font-family:GloboFutura,Arial,Helvetica,sans-serif;font-weight:500;font-size:calc(1.9vw + 9px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer svg{fill:#c4c4c4;transform:rotateY(180deg);margin-right:calc(1.63vw + 4.47px);width:.8em;overflow:visible!important}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer span{height:100%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__replay{display:flex;justify-content:center;align-items:center;padding:1rem;cursor:pointer}@media screen and (min-width:768px){div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item{flex-direction:column;width:29.5%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item:nth-child(2),div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item:nth-child(3){display:flex}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__header{margin-top:3%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail{width:100%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail span{font-size:calc(1.17vw + 5px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__info{width:100%;padding:4px 0 0}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__program-title{font-size:1.9vw;margin:.5vw 0 .4vw}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__title{font-size:2vw;line-height:2.8vw;max-height:5.6vw}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer{font-size:21px;margin-top:5%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer svg{margin-right:18%}}@media screen and (min-width:1024px){div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__header{font-size:calc(.8928571428571428vw + 8.857142857142858px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__program-title{font-size:.8rem;margin:.4rem 0 .2rem}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__title{font-size:.85rem;line-height:1.3rem;max-height:2.6rem}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer{font-size:calc(.44vw + 11.42px);margin-top:3%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail span{font-size:calc(.11160714285714285vw + 11.857142857142858px)}}@media screen and (min-width:1200px){div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item{flex-direction:column;width:21.5%}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__item:nth-child(4){display:flex}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__header{margin-top:calc(2.5vw + 20px)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__title{font-size:calc(.138vw + 11.33px);line-height:calc(.41vw + 13px);max-height:calc((.41vw + 13px) * 3)}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer{margin-top:calc(3.055vw + 3.33px)}}@media screen and (min-width:1920px){div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__header{font-size:26px;margin-top:68px}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__title{font-size:14px;line-height:21px;max-height:63px}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__footer{font-size:20px;margin-top:62px}div.clappr-player[data-player]#wp3-player-0 .videos-offer-end-screen__thumbnail span{font-size:14px}}',""])},function(e,r){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],r=0;r<this.length;r++){var t=this[r];t[2]?e.push("@media "+t[2]+"{"+t[1]+"}"):e.push(t[1])}return e.join("")},e.i=function(r,t){"string"==typeof r&&(r=[[null,r,""]]);for(var i={},n=0;n<this.length;n++){var a=this[n][0];"number"==typeof a&&(i[a]=!0)}for(n=0;n<r.length;n++){var o=r[n];"number"==typeof o[0]&&i[o[0]]||(t&&!o[2]?o[2]=t:t&&(o[2]="("+o[2]+") and ("+t+")"),e.push(o))}},e}},function(e,r,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var n=t(6),a=i(n);a.default.locale("pt-br"),a.default.updateLocale("pt-br",{relativeTime:{future:"em %s",past:"%s atrás",s:"%d seg",m:"%d min",mm:"%d min",h:"1 h",hh:"%d h",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"}}),r.default=a.default,e.exports=r.default},function(r,t){r.exports=e}])});