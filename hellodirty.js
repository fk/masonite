// $.fn.imagesLoaded jQuery plugin
// original by Paul Irish, forked for jquery.masonry by David DeSandro
// http://metafizzy.co/blog/imagesloaded-plugin
// https://gist.github.com/797120

// $('#content-with-images').imagesLoaded( myFunction )
// execute a callback when all images inside a parent have loaded.
// needed because .load() doesn't work on cached images

// Useful for Masonry or Isotope, triggering dynamic layout
// after images have loaded:
//		$('#content').imagesLoaded( function(){
//		$('#content').masonry();
//		});

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//	 as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback){
	var elems = this.find('img'),
		len = elems.length,
		_this = this;

	if ( !elems.length ) {
	callback.call( this );
	}

	elems.bind('load',function(){
	if (--len <= 0){
		callback.call( _this );
	}
	}).each(function(){
	// cached images don't fire load sometimes, so we reset src.
	if (this.complete || this.complete === undefined){
		var src = this.src;
		// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
		// data uri bypasses webkit log warning (thx doug jones)
		this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		this.src = src;
	}
	});

	return this;
};

/*!
// Infinite Scroll jQuery plugin
// copyright Paul Irish, licensed GPL & MIT
// version 1.5.110124

// home and docs: http://www.infinite-scroll.com
*/
(function($){$.fn.infinitescroll=function(options,callback){function debug(){if(opts.debug){window.console&&console.log.call(console,arguments)}}function areSelectorsValid(opts){for(var key in opts){if(key.indexOf&&key.indexOf("Selector")>-1&&$(opts[key]).length===0){debug("Your "+key+" found no elements.");return false}return true}}function determinePath(path){if(path.match(/^(.*?)\b2\b(.*?$)/)){path=path.match(/^(.*?)\b2\b(.*?$)/).slice(1)}else{if(path.match(/^(.*?)2(.*?$)/)){if(path.match(/^(.*?page=)2(\/.*|$)/)){path=path.match(/^(.*?page=)2(\/.*|$)/).slice(1);return path}debug("Trying backup next selector parse technique. Treacherous waters here, matey.");path=path.match(/^(.*?)2(.*?$)/).slice(1)}else{if(path.match(/^(.*?page=)1(\/.*|$)/)){path=path.match(/^(.*?page=)1(\/.*|$)/).slice(1);return path}if($.isFunction(opts.pathParse)){return[path]}else{debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");props.isInvalidPage=true}}}return path}function filterNav(){opts.isFiltered=true;return binder.trigger("error.infscr."+opts.infid,[302])}function hiddenHeight(element){var height=0;$(element).children().each(function(){height=height+$(this).outerHeight(false)});return height}function generateInstanceID(element){var number=$(element).length+$(element).html().length+$(element).attr("class").length+$(element).attr("id").length;opts.infid=number}function isNearBottom(){if(opts.container.nodeName=="HTML"){var pixelsFromWindowBottomToBottom=0+$(document).height()-($(opts.container).scrollTop()||$(opts.container.ownerDocument.body).scrollTop())-$(window).height()}else{var pixelsFromWindowBottomToBottom=0+hiddenHeight(opts.container)-$(opts.container).scrollTop()-$(opts.container).height()}debug("math:",pixelsFromWindowBottomToBottom,opts.pixelsFromNavToBottom);return(pixelsFromWindowBottomToBottom-opts.bufferPx<opts.pixelsFromNavToBottom)}function showDoneMsg(){props.loadingMsg.find("img").hide().parent().find("div").html(opts.donetext).animate({opacity:1},2000,function(){$(this).parent().fadeOut("normal")});opts.errorCallback()}function infscrSetup(){if(opts.isDuringAjax||opts.isInvalidPage||opts.isDone||opts.isFiltered||opts.isPaused){return}if(!isNearBottom(opts,props)){return}$(document).trigger("retrieve.infscr."+opts.infid)}function kickOffAjax(){opts.isDuringAjax=true;props.loadingMsg.appendTo(opts.loadMsgSelector).show(opts.loadingMsgRevealSpeed,function(){$(opts.navSelector).hide();opts.currPage++;debug("heading into ajax",path);box=$(opts.contentSelector).is("table")?$("<tbody/>"):$("<div/>");frag=document.createDocumentFragment();if($.isFunction(opts.pathParse)){desturl=opts.pathParse(path.join("2"),opts.currPage)}else{desturl=path.join(opts.currPage)}box.load(desturl+" "+opts.itemSelector,null,loadCallback)})}function loadCallback(){if(opts.isDone){showDoneMsg();return false}else{var children=box.children();if(children.length==0||children.hasClass("error404")){return infscrError([404])}while(box[0].firstChild){frag.appendChild(box[0].firstChild)}$(opts.contentSelector)[0].appendChild(frag);props.loadingMsg.fadeOut("normal");if(opts.animate){var scrollTo=$(window).scrollTop()+$("#infscr-loading").height()+opts.extraScrollPx+"px";$("html,body").animate({scrollTop:scrollTo},800,function(){opts.isDuringAjax=false})}callback.call($(opts.contentSelector)[0],children.get());if(!opts.animate){opts.isDuringAjax=false}}}function initPause(pauseValue){if(pauseValue=="pause"){opts.isPaused=true}else{if(pauseValue=="resume"){opts.isPaused=false}else{opts.isPaused=!opts.isPaused}}debug("Paused: "+opts.isPaused);return false}function infscrError(xhr){if(!opts.isDone&&xhr==404){debug("Page not found. Self-destructing...");showDoneMsg();opts.isDone=true;opts.currPage=1;binder.unbind("scroll.infscr."+opts.infid);$(document).unbind("retrieve.infscr."+opts.infid)}if(opts.isFiltered&&xhr==302){debug("Filtered. Going to next instance...");opts.isDone=true;opts.currPage=1;opts.isPaused=false;binder.unbind("scroll.infscr."+opts.infid,infscrSetup).unbind("pause.infscr."+opts.infid).unbind("filter.infscr."+opts.infid).unbind("error.infscr."+opts.infid);$(document).unbind("retrieve.infscr."+opts.infid,kickOffAjax)}}$.browser.ie6=$.browser.msie&&$.browser.version<7;var opts=$.extend({},$.infinitescroll.defaults,options),props=$.infinitescroll,box,frag,desturl,thisPause,errorStatus;callback=callback||function(){};if(!areSelectorsValid(opts)){return false}opts.container=opts.container||document.documentElement;opts.contentSelector=opts.contentSelector||this;if(opts.infid==0){generateInstanceID(opts.contentSelector)}opts.loadMsgSelector=opts.loadMsgSelector||opts.contentSelector;var relurl=/(.*?\/\/).*?(\/.*)/,path=$(opts.nextSelector).attr("href");if(!path){debug("Navigation selector not found");return}path=determinePath(path);props.loadingMsg=$('<div id="infscr-loading" style="text-align: center;"><img alt="Loading..." src="'+opts.loadingImg+'" /><div>'+opts.loadingText+"</div></div>");(new Image()).src=opts.loadingImg;if(opts.container.nodeName=="HTML"){debug("Window Scroll");var innerContainerHeight=$(document).height();var binder=$(window)}else{debug("Local Scroll");var innerContainerHeight=hiddenHeight(opts.container);var binder=$(opts.container)}opts.pixelsFromNavToBottom=innerContainerHeight+(opts.container==document.documentElement?0:$(opts.container).offset().top)-$(opts.navSelector).offset().top;binder.bind("scroll.infscr."+opts.infid,infscrSetup).bind("filter.infscr."+opts.infid,filterNav).bind("error.infscr."+opts.infid,function(event,errorStatus){infscrError(errorStatus)}).bind("pause.infscr."+opts.infid,function(event,thisPause){initPause(thisPause)}).trigger("scroll.infscr."+opts.infid);$(document).bind("retrieve.infscr."+opts.infid,kickOffAjax);return this};$.infinitescroll={defaults:{debug:false,preload:false,nextSelector:"div.navigation a:first",loadingImg:"http://www.infinite-scroll.com/loading.gif",loadingText:"<em>Loading the next set of posts...</em>",donetext:"<em>Congratulations, you've reached the end of the internet.</em>",navSelector:"div.navigation",contentSelector:null,loadMsgSelector:null,loadingMsgRevealSpeed:"fast",extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:undefined,bufferPx:40,errorCallback:function(){},currPage:1,infid:0,isDuringAjax:false,isInvalidPage:false,isFiltered:false,isDone:false,isPaused:false,container:undefined,pixelsFromNavToBottom:undefined},loadingImg:undefined,loadingMsg:undefined,currDOMChunk:null}})(jQuery);

// ColorBox v1.3.15 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2010 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(b,ib){var t="none",M="LoadedContent",c=false,v="resize.",o="y",q="auto",e=true,L="nofollow",m="x";function f(a,c){a=a?' id="'+i+a+'"':"";c=c?' style="'+c+'"':"";return b("<div"+a+c+"/>")}function p(a,b){b=b===m?n.width():n.height();return typeof a==="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function U(b){return a.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(b)}function cb(a){for(var c in a)if(b.isFunction(a[c])&&c.substring(0,2)!=="on")a[c]=a[c].call(l);a.rel=a.rel||l.rel||L;a.href=a.href||b(l).attr("href");a.title=a.title||l.title;return a}function w(c,a){a&&a.call(l);b.event.trigger(c)}function jb(){var b,e=i+"Slideshow_",c="click."+i,f,k;if(a.slideshow&&h[1]){f=function(){F.text(a.slideshowStop).unbind(c).bind(V,function(){if(g<h.length-1||a.loop)b=setTimeout(d.next,a.slideshowSpeed)}).bind(W,function(){clearTimeout(b)}).one(c+" "+N,k);j.removeClass(e+"off").addClass(e+"on");b=setTimeout(d.next,a.slideshowSpeed)};k=function(){clearTimeout(b);F.text(a.slideshowStart).unbind([V,W,N,c].join(" ")).one(c,f);j.removeClass(e+"on").addClass(e+"off")};a.slideshowAuto?f():k()}}function db(c){if(!O){l=c;a=cb(b.extend({},b.data(l,r)));h=b(l);g=0;if(a.rel!==L){h=b("."+G).filter(function(){return (b.data(this,r).rel||this.rel)===a.rel});g=h.index(l);if(g===-1){h=h.add(l);g=h.length-1}}if(!u){u=D=e;j.show();if(a.returnFocus)try{l.blur();b(l).one(eb,function(){try{this.focus()}catch(a){}})}catch(f){}x.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":q}).show();a.w=p(a.initialWidth,m);a.h=p(a.initialHeight,o);d.position(0);X&&n.bind(v+P+" scroll."+P,function(){x.css({width:n.width(),height:n.height(),top:n.scrollTop(),left:n.scrollLeft()})}).trigger("scroll."+P);w(fb,a.onOpen);Y.add(H).add(I).add(F).add(Z).hide();ab.html(a.close).show()}d.load(e)}}var gb={transition:"elastic",speed:300,width:c,initialWidth:"600",innerWidth:c,maxWidth:c,height:c,initialHeight:"450",innerHeight:c,maxHeight:c,scalePhotos:e,scrolling:e,inline:c,html:c,iframe:c,photo:c,href:c,title:c,rel:c,opacity:.9,preloading:e,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:c,returnFocus:e,loop:e,slideshow:c,slideshowAuto:e,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:c,onLoad:c,onComplete:c,onCleanup:c,onClosed:c,overlayClose:e,escKey:e,arrowKey:e},r="colorbox",i="cbox",fb=i+"_open",W=i+"_load",V=i+"_complete",N=i+"_cleanup",eb=i+"_closed",Q=i+"_purge",hb=i+"_loaded",E=b.browser.msie&&!b.support.opacity,X=E&&b.browser.version<7,P=i+"_IE6",x,j,A,s,bb,T,R,S,h,n,k,J,K,Z,Y,F,I,H,ab,B,C,y,z,l,g,a,u,D,O=c,d,G=i+"Element";d=b.fn[r]=b[r]=function(c,f){var a=this,d;if(!a[0]&&a.selector)return a;c=c||{};if(f)c.onComplete=f;if(!a[0]||a.selector===undefined){a=b("<a/>");c.open=e}a.each(function(){b.data(this,r,b.extend({},b.data(this,r)||gb,c));b(this).addClass(G)});d=c.open;if(b.isFunction(d))d=d.call(a);d&&db(a[0]);return a};d.init=function(){var l="hover",m="clear:left";n=b(ib);j=f().attr({id:r,"class":E?i+"IE":""});x=f("Overlay",X?"position:absolute":"").hide();A=f("Wrapper");s=f("Content").append(k=f(M,"width:0; height:0; overflow:hidden"),K=f("LoadingOverlay").add(f("LoadingGraphic")),Z=f("Title"),Y=f("Current"),I=f("Next"),H=f("Previous"),F=f("Slideshow").bind(fb,jb),ab=f("Close"));A.append(f().append(f("TopLeft"),bb=f("TopCenter"),f("TopRight")),f(c,m).append(T=f("MiddleLeft"),s,R=f("MiddleRight")),f(c,m).append(f("BottomLeft"),S=f("BottomCenter"),f("BottomRight"))).children().children().css({"float":"left"});J=f(c,"position:absolute; width:9999px; visibility:hidden; display:none");b("body").prepend(x,j.append(A,J));s.children().hover(function(){b(this).addClass(l)},function(){b(this).removeClass(l)}).addClass(l);B=bb.height()+S.height()+s.outerHeight(e)-s.height();C=T.width()+R.width()+s.outerWidth(e)-s.width();y=k.outerHeight(e);z=k.outerWidth(e);j.css({"padding-bottom":B,"padding-right":C}).hide();I.click(d.next);H.click(d.prev);ab.click(d.close);s.children().removeClass(l);b("."+G).live("click",function(a){if(!(a.button!==0&&typeof a.button!=="undefined"||a.ctrlKey||a.shiftKey||a.altKey)){a.preventDefault();db(this)}});x.click(function(){a.overlayClose&&d.close()});b(document).bind("keydown",function(b){if(u&&a.escKey&&b.keyCode===27){b.preventDefault();d.close()}if(u&&a.arrowKey&&!D&&h[1])if(b.keyCode===37&&(g||a.loop)){b.preventDefault();H.click()}else if(b.keyCode===39&&(g<h.length-1||a.loop)){b.preventDefault();I.click()}})};d.remove=function(){j.add(x).remove();b("."+G).die("click").removeData(r).removeClass(G)};d.position=function(f,d){function b(a){bb[0].style.width=S[0].style.width=s[0].style.width=a.style.width;K[0].style.height=K[1].style.height=s[0].style.height=T[0].style.height=R[0].style.height=a.style.height}var e,h=Math.max(document.documentElement.clientHeight-a.h-y-B,0)/2+n.scrollTop(),g=Math.max(n.width()-a.w-z-C,0)/2+n.scrollLeft();e=j.width()===a.w+z&&j.height()===a.h+y?0:f;A[0].style.width=A[0].style.height="9999px";j.dequeue().animate({width:a.w+z,height:a.h+y,top:h,left:g},{duration:e,complete:function(){b(this);D=c;A[0].style.width=a.w+z+C+"px";A[0].style.height=a.h+y+B+"px";d&&d()},step:function(){b(this)}})};d.resize=function(b){if(u){b=b||{};if(b.width)a.w=p(b.width,m)-z-C;if(b.innerWidth)a.w=p(b.innerWidth,m);k.css({width:a.w});if(b.height)a.h=p(b.height,o)-y-B;if(b.innerHeight)a.h=p(b.innerHeight,o);if(!b.innerHeight&&!b.height){b=k.wrapInner("<div style='overflow:auto'></div>").children();a.h=b.height();b.replaceWith(b.children())}k.css({height:a.h});d.position(a.transition===t?0:a.speed)}};d.prep=function(m){var c="hidden";function l(s){var p,f,m,c,l=h.length,q=a.loop;d.position(s,function(){function s(){E&&j[0].style.removeAttribute("filter")}if(u){E&&o&&k.fadeIn(100);k.show();w(hb);Z.show().html(a.title);if(l>1){typeof a.current==="string"&&Y.html(a.current.replace(/\{current\}/,g+1).replace(/\{total\}/,l)).show();I[q||g<l-1?"show":"hide"]().html(a.next);H[q||g?"show":"hide"]().html(a.previous);p=g?h[g-1]:h[l-1];m=g<l-1?h[g+1]:h[0];a.slideshow&&F.show();if(a.preloading){c=b.data(m,r).href||m.href;f=b.data(p,r).href||p.href;c=b.isFunction(c)?c.call(m):c;f=b.isFunction(f)?f.call(p):f;if(U(c))b("<img/>")[0].src=c;if(U(f))b("<img/>")[0].src=f}}K.hide();a.transition==="fade"?j.fadeTo(e,1,function(){s()}):s();n.bind(v+i,function(){d.position(0)});w(V,a.onComplete)}})}if(u){var o,e=a.transition===t?0:a.speed;n.unbind(v+i);k.remove();k=f(M).html(m);k.hide().appendTo(J.show()).css({width:function(){a.w=a.w||k.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}(),overflow:a.scrolling?q:c}).css({height:function(){a.h=a.h||k.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}()}).prependTo(s);J.hide();b("#"+i+"Photo").css({cssFloat:t,marginLeft:q,marginRight:q});X&&b("select").not(j.find("select")).filter(function(){return this.style.visibility!==c}).css({visibility:c}).one(N,function(){this.style.visibility="inherit"});a.transition==="fade"?j.fadeTo(e,0,function(){l(0)}):l(e)}};d.load=function(u){var n,c,s,q=d.prep;D=e;l=h[g];u||(a=cb(b.extend({},b.data(l,r))));w(Q);w(W,a.onLoad);a.h=a.height?p(a.height,o)-y-B:a.innerHeight&&p(a.innerHeight,o);a.w=a.width?p(a.width,m)-z-C:a.innerWidth&&p(a.innerWidth,m);a.mw=a.w;a.mh=a.h;if(a.maxWidth){a.mw=p(a.maxWidth,m)-z-C;a.mw=a.w&&a.w<a.mw?a.w:a.mw}if(a.maxHeight){a.mh=p(a.maxHeight,o)-y-B;a.mh=a.h&&a.h<a.mh?a.h:a.mh}n=a.href;K.show();if(a.inline){f().hide().insertBefore(b(n)[0]).one(Q,function(){b(this).replaceWith(k.children())});q(b(n))}else if(a.iframe){j.one(hb,function(){var c=b("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];c.name=i+ +new Date;c.src=a.href;if(!a.scrolling)c.scrolling="no";if(E)c.allowtransparency="true";b(c).appendTo(k).one(Q,function(){c.src="//about:blank"})});q(" ")}else if(a.html)q(a.html);else if(U(n)){c=new Image;c.onload=function(){var e;c.onload=null;c.id=i+"Photo";b(c).css({border:t,display:"block",cssFloat:"left"});if(a.scalePhotos){s=function(){c.height-=c.height*e;c.width-=c.width*e};if(a.mw&&c.width>a.mw){e=(c.width-a.mw)/c.width;s()}if(a.mh&&c.height>a.mh){e=(c.height-a.mh)/c.height;s()}}if(a.h)c.style.marginTop=Math.max(a.h-c.height,0)/2+"px";h[1]&&(g<h.length-1||a.loop)&&b(c).css({cursor:"pointer"}).click(d.next);if(E)c.style.msInterpolationMode="bicubic";setTimeout(function(){q(c)},1)};setTimeout(function(){c.src=n},1)}else n&&J.load(n,function(d,c,a){q(c==="error"?"Request unsuccessful: "+a.statusText:b(this).children())})};d.next=function(){if(!D){g=g<h.length-1?g+1:0;d.load()}};d.prev=function(){if(!D){g=g?g-1:h.length-1;d.load()}};d.close=function(){if(u&&!O){O=e;u=c;w(N,a.onCleanup);n.unbind("."+i+" ."+P);x.fadeTo("fast",0);j.stop().fadeTo("fast",0,function(){w(Q);k.remove();j.add(x).css({opacity:1,cursor:q}).hide();setTimeout(function(){O=c;w(eb,a.onClosed)},1)})}};d.element=function(){return b(l)};d.settings=gb;b(d.init)})(jQuery,this);


/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "pngFix"
 * Version: 1.1, 11.09.2007
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *						http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([237-9n-zA-Z]|1\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(s(m){3.fn.pngFix=s(c){c=3.extend({P:\'blank.gif\'},c);8 e=(o.Q=="t R S"&&T(o.u)==4&&o.u.A("U 5.5")!=-1);8 f=(o.Q=="t R S"&&T(o.u)==4&&o.u.A("U 6.0")!=-1);p(3.browser.msie&&(e||f)){3(2).B("img[n$=.C]").D(s(){3(2).7(\'q\',3(2).q());3(2).7(\'r\',3(2).r());8 a=\'\';8 b=\'\';8 g=(3(2).7(\'E\'))?\'E="\'+3(2).7(\'E\')+\'" \':\'\';8 h=(3(2).7(\'F\'))?\'F="\'+3(2).7(\'F\')+\'" \':\'\';8 i=(3(2).7(\'G\'))?\'G="\'+3(2).7(\'G\')+\'" \':\'\';8 j=(3(2).7(\'H\'))?\'H="\'+3(2).7(\'H\')+\'" \':\'\';8 k=(3(2).7(\'V\'))?\'float:\'+3(2).7(\'V\')+\';\':\'\';8 d=(3(2).parent().7(\'href\'))?\'cursor:hand;\':\'\';p(2.9.v){a+=\'v:\'+2.9.v+\';\';2.9.v=\'\'}p(2.9.w){a+=\'w:\'+2.9.w+\';\';2.9.w=\'\'}p(2.9.x){a+=\'x:\'+2.9.x+\';\';2.9.x=\'\'}8 l=(2.9.cssText);b+=\'<y \'+g+h+i+j;b+=\'9="W:X;white-space:pre-line;Y:Z-10;I:transparent;\'+k+d;b+=\'q:\'+3(2).q()+\'z;r:\'+3(2).r()+\'z;\';b+=\'J:K:L.t.M(n=\\\'\'+3(2).7(\'n\')+\'\\\', N=\\\'O\\\');\';b+=l+\'"></y>\';p(a!=\'\'){b=\'<y 9="W:X;Y:Z-10;\'+a+d+\'q:\'+3(2).q()+\'z;r:\'+3(2).r()+\'z;">\'+b+\'</y>\'}3(2).hide();3(2).after(b)});3(2).B("*").D(s(){8 a=3(2).11(\'I-12\');p(a.A(".C")!=-1){8 b=a.13(\'url("\')[1].13(\'")\')[0];3(2).11(\'I-12\',\'none\');3(2).14(0).15.J="K:L.t.M(n=\'"+b+"\',N=\'O\')"}});3(2).B("input[n$=.C]").D(s(){8 a=3(2).7(\'n\');3(2).14(0).15.J=\'K:L.t.M(n=\\\'\'+a+\'\\\', N=\\\'O\\\');\';3(2).7(\'n\',c.P)})}return 3}})(3);',[],68,'||this|jQuery||||attr|var|style||||||||||||||src|navigator|if|width|height|function|Microsoft|appVersion|border|padding|margin|span|px|indexOf|find|png|each|id|class|title|alt|background|filter|progid|DXImageTransform|AlphaImageLoader|sizingMethod|scale|blankgif|appName|Internet|Explorer|parseInt|MSIE|align|position|relative|display|inline|block|css|image|split|get|runtimeStyle'.split('|'),0,{}))

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;	 if ((t/=d)==1) return b+c;	 if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;	 if ((t/=d)==1) return b+c;	 if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;	 if ((t/=d/2)==2) return b+c;	 if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/*************************************************
**	jQuery Masonry version 1.3.2
**	Copyright David DeSandro, licensed MIT
**	http://desandro.com/resources/jquery-masonry
**************************************************/
(function(e){var n=e.event,o;n.special.smartresize={setup:function(){e(this).bind("resize",n.special.smartresize.handler)},teardown:function(){e(this).unbind("resize",n.special.smartresize.handler)},handler:function(j,l){var g=this,d=arguments;j.type="smartresize";o&&clearTimeout(o);o=setTimeout(function(){jQuery.event.handle.apply(g,d)},l==="execAsap"?0:100)}};e.fn.smartresize=function(j){return j?this.bind("smartresize",j):this.trigger("smartresize",["execAsap"])};e.fn.masonry=function(j,l){var g=
{getBricks:function(d,b,a){var c=a.itemSelector===undefined;b.$bricks=a.appendedContent===undefined?c?d.children():d.find(a.itemSelector):c?a.appendedContent:a.appendedContent.filter(a.itemSelector)},placeBrick:function(d,b,a,c,h){b=Math.min.apply(Math,a);for(var i=b+d.outerHeight(true),f=a.length,k=f,m=c.colCount+1-f;f--;)if(a[f]==b)k=f;d.applyStyle({left:c.colW*k+c.posLeft,top:b},e.extend(true,{},h.animationOptions));for(f=0;f<m;f++)c.colY[k+f]=i},setup:function(d,b,a){g.getBricks(d,a,b);if(a.masoned)a.previousData=
d.data("masonry");a.colW=b.columnWidth===undefined?a.masoned?a.previousData.colW:a.$bricks.outerWidth(true):b.columnWidth;a.colCount=Math.floor(d.width()/a.colW);a.colCount=Math.max(a.colCount,1)},arrange:function(d,b,a){var c;if(!a.masoned||b.appendedContent!==undefined)a.$bricks.css("position","absolute");if(a.masoned){a.posTop=a.previousData.posTop;a.posLeft=a.previousData.posLeft}else{d.css("position","relative");var h=e(document.createElement("div"));d.prepend(h);a.posTop=Math.round(h.position().top);
a.posLeft=Math.round(h.position().left);h.remove()}if(a.masoned&&b.appendedContent!==undefined){a.colY=a.previousData.colY;for(c=a.previousData.colCount;c<a.colCount;c++)a.colY[c]=a.posTop}else{a.colY=[];for(c=a.colCount;c--;)a.colY.push(a.posTop)}e.fn.applyStyle=a.masoned&&b.animate?e.fn.animate:e.fn.css;b.singleMode?a.$bricks.each(function(){var i=e(this);g.placeBrick(i,a.colCount,a.colY,a,b)}):a.$bricks.each(function(){var i=e(this),f=Math.ceil(i.outerWidth(true)/a.colW);f=Math.min(f,a.colCount);
if(f===1)g.placeBrick(i,a.colCount,a.colY,a,b);else{var k=a.colCount+1-f,m=[];for(c=0;c<k;c++){var p=a.colY.slice(c,c+f);m[c]=Math.max.apply(Math,p)}g.placeBrick(i,k,m,a,b)}});a.wallH=Math.max.apply(Math,a.colY);d.applyStyle({height:a.wallH-a.posTop},e.extend(true,[],b.animationOptions));a.masoned||setTimeout(function(){d.addClass("masoned")},1);l.call(a.$bricks);d.data("masonry",a)},resize:function(d,b,a){a.masoned=!!d.data("masonry");var c=d.data("masonry").colCount;g.setup(d,b,a);a.colCount!=c&&
g.arrange(d,b,a)}};return this.each(function(){var d=e(this),b={};b.masoned=!!d.data("masonry");var a=b.masoned?d.data("masonry").options:{},c=e.extend({},e.fn.masonry.defaults,a,j),h=a.resizeable;b.options=c.saveOptions?c:a;l=l||function(){};g.getBricks(d,b,c);if(!b.$bricks.length)return this;g.setup(d,c,b);g.arrange(d,c,b);!h&&c.resizeable&&e(window).bind("smartresize.masonry",function(){g.resize(d,c,b)});h&&!c.resizeable&&e(window).unbind("smartresize.masonry")})};e.fn.masonry.defaults={singleMode:false,
columnWidth:undefined,itemSelector:undefined,appendedContent:undefined,saveOptions:true,resizeable:true,animate:false,animationOptions:{}}})(jQuery);

function fixVimeo() {
	/*
		Better Vimeo Embeds 2.1 by Matthew Buchanan
		Modelled on the Vimeo Embedinator Script
		http://mattbu.ch/tumblr/vimeo-embeds/

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/
	var color = Accents;
	var opts = "title=0&byline=0&portrait=0";
	$("iframe[src^='http://player.vimeo.com']").each(function() {
		var src = $(this).attr("src");
		var w = $(this).attr("width");
		var h = $(this).attr("height");
		if (src.indexOf("?") == -1) {
			$(this).replaceWith(
				"<iframe src='"+src+"?"+opts+"&color="+
				color+"' width='"+w+"' height='"+h+
				"' frameborder='0'></iframe>"
			);
		}
	});
	$("object[data^='http://vimeo.com']").each(function() {
		var $obj = $(this);
		var data = $obj.attr("data");
		var temp = data.split("clip_id=")[1];
		var id = temp.split("&")[0];
		var server = temp.split("&")[1];
		var w = $obj.attr("width");
		var h = $obj.attr("height");
		$obj.replaceWith(
			"<iframe src='http://player.vimeo.com/video/"
			+id+"?"+server+"&"+opts+"&color="+color+
			"' width='"+w+"' height='"+h+
			"' frameborder='0'></iframe>"
		);
	});
}

function fixYouTube() {
	/*
		Widescreen YouTube Embeds by Matthew Buchanan & Hayden Hunter
		http://matthewbuchanan.name/451892574
		http://blog.haydenhunter.me

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/
	$("div.post object").each(function () {
		if ($(this).find("embed[src^='http://www.youtube.com']").length > 0) {
			// Identify and hide embed(s)
			var parent = $(this).parent();
			parent.css("visibility","hidden");
			var youtubeCode = parent.html();
			var params = "";
			if (youtubeCode.toLowerCase().indexOf("<param") == -1) {
				// IE doesn't return params with html(), soâ€¦
				$("param", this).each(function () {
					params += $(this).get(0).outerHTML;
				});
			}
			// Set colours in control bar to match page background
			var oldOpts = /rel=0/g;
			var newOpts = "rel=0&amp;color1=0x"+Whites+"&amp;color2=0x"+Whites;
			youtubeCode = youtubeCode.replace(oldOpts, newOpts);
			if (params != "") {
				params = params.replace(oldOpts, newOpts);
				youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
			}
			// Extract YouTube ID and calculate ideal height
			var youtubeIDParam = $(this).find("embed").attr("src");
			var youtubeIDPattern = /\/v\/([0-9A-Za-z-_]*)/;
			var youtubeID = youtubeIDParam.match(youtubeIDPattern);
			var youtubeHeight = Math.floor(parent.find("object").width() * 0.75 + 25 - 3);
			var youtubeHeightWide = Math.floor(parent.find("object").width() * 0.5625 + 25 - 3);
			// Test for widescreen aspect ratio
			$.getJSON("http://gdata.youtube.com/feeds/api/videos/" + youtubeID[1] + "?v=2&alt=json-in-script&callback=?", function (data) {
				oldOpts = /height="?([0-9]*)"?/g;
				if (data.entry.media$group.yt$aspectRatio != null) {
					newOpts = 'height="' + youtubeHeightWide + '"';
				} else {
					newOpts = 'height="' + youtubeHeight + '"';
				}
				youtubeCode = youtubeCode.replace(oldOpts, newOpts);
				if (params != "") {
					params = params.replace(oldOpts, newOpts);
					youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
				}
				// Replace YouTube embed with new code
				parent.html(youtubeCode).css("visibility","visible");
			});
		}
	});
}

function webkitSearch() {
	var defaultValue = "Search"; // Default Value
	if ($.browser.webkit) {
		var sf = document.getElementById("searchfield");
		sf.setAttribute("type", "search");
		sf.setAttribute("autosave", "saved.data");
		sf.setAttribute("results", "10");
		sf.setAttribute("placeholder", defaultValue);
		$("#searchfield").addClass("webkit");
		$("#search .button").hide();
	} else {
		$("#searchfield").val(defaultValue);
		$("#searchfield").css("color", "#889");
		$("#searchfield").focus( function() {
			if ($(this).val() == defaultValue) {
				$(this).val("");
			}
			$(this).css("color", "#334");
		});
		$("#searchfield").blur( function() {
			if ($(this).val() == "") {
				$(this).val(defaultValue);
				$(this).css("color", "#889");
			}
		});
	}
}

function fadingSidebar() {
	// kudos to http://www.tumblr.com/theme/11862, wouldn't have tought about search
	$sidebar = $('#header, #copyright');
	$sidebar.css('opacity', 0.5);

	$sidebar.mouseenter(function() {
		$sidebar
		  .stop()
		  .animate({
  			opacity: 1
    	}, 250);
	}).mouseleave(function() {
		if($('#header input:focus').length == 0) {
			$sidebar
			  .stop()
			  .animate({
  				opacity: 0.5
  			}, 250);
		}
	});
}

// hellodirty

// remap jQuery to $
(function($){

	// ready
	$(function() {

		fixVimeo();
		fixYouTube();
		webkitSearch();
		fadingSidebar();

		$("a.fullsize")
			.hide()
			.colorbox({
				slideshow:true,
				slideshowAuto:false,
				speed:200,
				photo:true,
				maxWidth:"90%",
				maxHeight:"90%"});

		$posts = $('#container .post');

		$posts.live({
			mouseenter: function(event) {
			 $(this)
				.addClass('active')
				.find('a.fullsize')
				  .stop()
				  .fadeIn({duration: 200, easing: 'easeInOutCubic'});
				event.stopPropagation();
			},
			mouseleave: function(event) {
				$(this)
					.removeClass('active')
					.find('a.fullsize')
					  .stop()
					  .fadeOut({duration: 200, easing: 'easeInOutCubic'});
				event.stopPropagation();
			}
		});

		// fix pngs
		$(document).pngFix({blankgif:'http://static.tumblr.com/vkmldjw/LKtkxpcr0/blank.gif'});

		$("#likes li:first-child").addClass('first');
		$("#likes li:last-child").addClass('last');

		// break down according to body.class (=site section)
		// see http://somedirection.com/2008/03/14/structuring-jquery-for-speed-and-efficiency/
		// index pages
		if ( $('body#index').length ) {

			var $wall = $('#posts');

			$(window).load(function() {
				$wall.masonry({
					singleMode    : true,
					animate       : true,
					itemSelector  : '.post',
					saveOptions   : true
				});
			});

			// infinite scroll
			$wall.infinitescroll({
				navSelector     : '#pagination li.next a',   // selector for the paged navigation
				nextSelector    : '#pagination li.next a',  // selector for the NEXT link (to page 2)
				itemSelector    : '#posts .post',           // selector for all items you'll retrieve
				loadingImg      : 'http://static.tumblr.com/wccjej0/SzLlinacm/ajax-loader.gif',
				loadingText     : 'Loading next page',
				donetext        : 'No more pages to load',
				debug           : false,
				errorCallback   : function() {
					// fade out the error message after 2 seconds
					$('#infscr-loading').animate({opacity: .8},2000).fadeOut('normal');
				}
				},
				// call masonry as a callback
				function( newElements ) {
					var $elems = $(newElements);

					//set opacity to 0 for all new elements while they get arranged
					$elems.css('opacity', "0.0");

					// via http://stackoverflow.com/questions/4218377/tumblr-audio-player-not-loading-with-infinite-scroll
					// – thanks to the excellent http://inspirewell.tumblr.com/
					$elems.each(function() {
						if($(this).hasClass("audio")){
							var audioID = $(this).attr("id");
							var $audioPost = $(this);
							$audioPost.find(".player span").css({ visibility: 'hidden' });

							var script=document.createElement('script');
							script.type='text/javascript';
							script.src="http://assets.tumblr.com/javascript/tumblelog.js?16";

							$("body").append(script);

							$.ajax({
								url: "/api/read/json?id=" + audioID,
								dataType: "jsonp",
								timeout: 5000,
								success: function(data){
									$audioPost.find(".player span").css({ visibility: 'visible' });
									embed = data.posts[0]['audio-player'].replace("audio_player.swf", "audio_player_black.swf");
									$audioPost.find("span:first").append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + audioID + '",\'\x3cdiv class=\x22audio_player\x22\x3e' + embed +'\x3c/div\x3e\')</script>');
								}
							});
						}
					});

					//fix Vimeo
					var color = Accents;
					var opts = "title=0&byline=0&portrait=0";
					$elems.find("iframe[src^='http://player.vimeo.com']").each(function() {
						var src = $(this).attr("src");
						var w = $(this).attr("width");
						var h = $(this).attr("height");
						if (src.indexOf("?") == -1) {
							$(this).replaceWith(
								"<iframe src='"+src+"?"+opts+"&color="+
								color+"' width='"+w+"' height='"+h+
								"' frameborder='0'></iframe>"
							);
						}
					});
					$elems.find("object[data^='http://vimeo.com']").each(function() {
						var $obj = $(this);
						var data = $obj.attr("data");
						var temp = data.split("clip_id=")[1];
						var id = temp.split("&")[0];
						var server = temp.split("&")[1];
						var w = $obj.attr("width");
						var h = $obj.attr("height");
						$obj.replaceWith(
							"<iframe src='http://player.vimeo.com/video/"
							+id+"?"+server+"&"+opts+"&color="+color+
							"' width='"+w+"' height='"+h+
							"' frameborder='0'></iframe>"
						);
					});

					// fix YouTube
					$elems.find("embed[src^='http://www.youtube.com']").each(function() {
						// Identify and hide embed(s)
						var parent = $(this).closest('object');
						parent.css("visibility","hidden");
						var youtubeCode = parent.html();
						var params = "";
						if (youtubeCode.toLowerCase().indexOf("<param") == -1) {
							// IE doesn't return params with html(), soâ€¦
							$("param", this).each(function () {
								params += $(this).get(0).outerHTML;
							});
						}
						// Set colours in control bar to match page background
						var oldOpts = /rel=0/g;
						var newOpts = "rel=0&amp;color1=0x"+Whites+"&amp;color2=0x"+Whites;
						youtubeCode = youtubeCode.replace(oldOpts, newOpts);
						if (params != "") {
							params = params.replace(oldOpts, newOpts);
							youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
						}
						// Extract YouTube ID and calculate ideal height
						var youtubeIDParam = $(this).attr("src");
						var youtubeIDPattern = /\/v\/([0-9A-Za-z-_]*)/;
						var youtubeID = youtubeIDParam.match(youtubeIDPattern);
						var youtubeHeight = Math.floor(parent.width() * 0.75 + 25 - 3);
						var youtubeHeightWide = Math.floor(parent.width() * 0.5625 + 25 - 3);
						// Test for widescreen aspect ratio
						$.getJSON("http://gdata.youtube.com/feeds/api/videos/" + youtubeID[1] + "?v=2&alt=json-in-script&callback=?", function (data) {
							oldOpts = /height="?([0-9]*)"?/g;
							if (data.entry.media$group.yt$aspectRatio != null) {
								newOpts = 'height="' + youtubeHeightWide + '"';
							} else {
								newOpts = 'height="' + youtubeHeight + '"';
							}
							youtubeCode = youtubeCode.replace(oldOpts, newOpts);
							if (params != "") {
								params = params.replace(oldOpts, newOpts);
								youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
							}
							// Replace YouTube embed with new code
							parent.html(youtubeCode).css("visibility","visible");
						});

					});

					$elems.imagesLoaded( function(){
					$wall.masonry({ appendedContent: $elems },
						function() {
							$(this).find("a.fullsize").hide().colorbox({slideshow:true, slideshowAuto:false, speed:200, photo:true, maxWidth:"90%", maxHeight:"90%"});

							$elems.animate({opacity: 1.0}, 200, 'swing');
							if(customTrigger){
								$('#pagination li.next a').fadeIn({duration: 200, easing: 'easeInOutCubic'});
							}
						}
					);
				});
			});

			if(customTrigger){
				// kill scroll binding
				$(window).unbind('.infscr');
				// hook up the manual click guy.
				$('#pagination li.next a').text('Load more posts').click(function(){
					 $(document).trigger('retrieve.infscr');
					 return false;
				});
				// remove the paginator when we're done.
				$(document).ajaxError(function(e,xhr,opt){
					 if (xhr.status == 404) $('#pagination li.next a').remove();
				});
			}

			// leftover from the original theme
			// for the yet totally untested disqus-comments
			$('#container .post .footer .comments a').each(function() {
				$(this).html($(this).text().replace('Comments',''));
				$(this).html($(this).text().replace('Comment',''));
			})

		} // body#index

	}); // ready

})(window.jQuery);