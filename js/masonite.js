// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
 * jQuery WidowFix Plugin
 * http://matthewlein.com/widowfix/
 * Copyright (c) 2010 Matthew Lein
 * Version: 1.3.2 (7/23/2011)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4 or later
 */

(function(a){jQuery.fn.widowFix=function(d){var c={letterLimit:null,prevLimit:null,linkFix:false,dashes:false};var b=a.extend(c,d);if(this.length){return this.each(function(){var i=a(this);var n;if(b.linkFix){var h=i.find("a:last");h.wrap("<var>");var e=a("var").html();n=h.contents()[0];h.contents().unwrap()}var f=a(this).html().split(" "),m=f.pop();if(f.length<=1){return}function k(){if(m===""){m=f.pop();k()}}k();if(b.dashes){var j=["-","–","—"];a.each(j,function(o,p){if(m.indexOf(p)>0){m='<span style="white-space:nowrap;">'+m+"</span>";return false}})}var l=f[f.length-1];if(b.linkFix){if(b.letterLimit!==null&&n.length>=b.letterLimit){i.find("var").each(function(){a(this).contents().replaceWith(e);a(this).contents().unwrap()});return}else{if(b.prevLimit!==null&&l.length>=b.prevLimit){i.find("var").each(function(){a(this).contents().replaceWith(e);a(this).contents().unwrap()});return}}}else{if(b.letterLimit!==null&&m.length>=b.letterLimit){return}else{if(b.prevLimit!==null&&l.length>=b.prevLimit){return}}}var g=f.join(" ")+"&nbsp;"+m;i.html(g);if(b.linkFix){i.find("var").each(function(){a(this).contents().replaceWith(e);a(this).contents().unwrap()})}})}}})(jQuery);

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


/**
 * jQuery Masonry v2.1.06
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
*/
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left";var g=this.element.css("padding-"+this.horizontalDirection),h=this.element.css("padding-top");this.offset={x:g?parseInt(g,10):0,y:h?parseInt(h,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var i=this;setTimeout(function(){i.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){i.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);


$.fn.fixYouTube = function() {
	/*
		Widescreen YouTube Embeds by Matthew Buchanan & Hayden Hunter
		http://matthewbuchanan.name/451892574
		http://blog.haydenhunter.me

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/
	this.find("embed[src^='http://www.youtube.com']").each(function() {
		// Identify and hide embed(s)
		var parent = $(this).closest('object'),
			youtubeCode = parent.html(),
			params = "";

		parent.css("visibility","hidden");

		if (youtubeCode.toLowerCase().indexOf("<param") == -1) {
			// IE doesn't return params with html(), so…
			$("param", this).each(function () {
				params += $(this).get(0).outerHTML;
			});
		}
		// Set colours in control bar to match page background
		var oldOpts = /rel=0/g,
			newOpts = "rel=0&amp;color1=0x" + masonite.whites + "&amp;color2=0x" + masonite.whites;
		youtubeCode = youtubeCode.replace(oldOpts, newOpts);
		if (params != "") {
			params = params.replace(oldOpts, newOpts);
			youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
		}
		// Extract YouTube ID and calculate ideal height
		var youtubeIDParam = $(this).attr("src"),
			youtubeIDPattern = /\/v\/([0-9A-Za-z-_]*)/,
			youtubeID = youtubeIDParam.match(youtubeIDPattern),
			youtubeHeight = Math.floor(parent.width() * 0.75 + 25 - 3),
			youtubeHeightWide = Math.floor(parent.width() * 0.5625 + 25 - 3);
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

	return this;
};

$.fn.fixVimeo = function() {
	/*
		Better Vimeo Embeds 2.1 by Matthew Buchanan
		Modelled on the Vimeo Embedinator Script
		http://mattbu.ch/tumblr/vimeo-embeds/

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/
	var color = masonite.accents,
		opts = "title=0&byline=0&portrait=0";

	this.find("iframe[src^='http://player.vimeo.com']").each(function() {
		var src = $(this).attr("src"),
			w = $(this).attr("width"),
			h = $(this).attr("height");

		if ( src.indexOf("?") == -1 ) {
			$(this).replaceWith(
				"<iframe src='" + src + "?" + opts + "&color=" +
				color + "' width='" + w + "' height='" + h +
				"' frameborder='0'></iframe>"
			);
		}
	});

	this.find("object[data^='http://vimeo.com']").each(function() {
		var $obj = $(this),
			data = $obj.attr("data"),
			temp = data.split("clip_id=")[1],
			id = temp.split("&")[0],
			server = temp.split("&")[1],
			w = $obj.attr("width"),
			h = $obj.attr("height");

		$obj.replaceWith(
			"<iframe src='http://player.vimeo.com/video/" +
			id + "?" + server + "&" + opts + "&color=" + color +
			"' width='" + w + "' height='" + h +
			"' frameborder='0'></iframe>"
		);
	});

	return this;
};

$.fn.initColorbox = function() {
	if ( masonite.colorbox ) {
		this.find("a.fullsize").colorbox(masonite.colorboxOptions);
	}

	return this;
};

$.fn.disqusCommentCount = function() {
	if( masonite.disqusShortname ){
		var scriptURL = 'http://disqus.com/forums/' + masonite.disqusShortname + '/count.js';
		$.getScript(scriptURL);
	}

	return this;
};

$.fn.fixTumblrAudio = function() {
	// via http://stackoverflow.com/questions/4218377/tumblr-audio-player-not-loading-with-infinite-scroll
	// – thanks to the excellent http://inspirewell.tumblr.com/
	this.each(function() {
		if($(this).hasClass("audio")){
			var audioID = $(this).attr("id"),
				$audioPost = $(this);
			
			$audioPost.find(".player span").css({ visibility: 'hidden' });

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = "http://assets.tumblr.com/javascript/tumblelog.js?16";

			$("body").append(script);

			$.ajax({
				url: "/api/read/json?id=" + audioID,
				dataType: "jsonp",
				timeout: 5000,
				success: function(data){
					$audioPost.find(".player span").css({ visibility: 'visible' });
					var embed = data.posts[0]['audio-player'].replace("audio_player.swf", "audio_player_black.swf");
					$audioPost.find("span:first").append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + audioID + '",\'\x3cdiv class=\x22audio_player\x22\x3e' + embed +'\x3c/div\x3e\')</script>');
				}
			});
		}
	});

	return this;
};

function prettifyCode() {
	if ( masonite.googlePrettify ) {
		var a = false;

		$("pre code").parent().each(function(){
			if (!$(this).hasClass("prettyprint")){
				$(this).addClass("prettyprint");
					a = true;
				}
		});

		if (a) {
			prettyPrint();
		}
	}
}

function fadingSidebar() {
	// kudos to http://www.tumblr.com/theme/11862, wouldn't have tought about search
	var $sidebar = $('#header, #copyright');
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

// masonite

// remap jQuery to $
(function($){

	// ready
	$(function() {

    $('#avatar').imagesLoaded(function() {
      
      var $that = $(this),
          width = $that.width(),
          hidpi = $that.attr('data-hidpi-src'),
          src = $that.attr('src');
      
      if ( hidpi != "" ) {
        
        $that.attr('src', hidpi).attr('width', width);
        $that.one('error', function () {
          this.src = src;
        });
      
      }
      
    });

		if( masonite.fadeSidebar && !Modernizr.touch ){
			fadingSidebar();
		}

		masonite.colorboxOptions = {
			slideshow: true,
			slideshowAuto: false,
			speed: 200,
			photo: true,
			maxWidth: "90%",
			maxHeight: "90%"
		};

		$('#posts .post').initColorbox().fixYouTube().fixVimeo().disqusCommentCount();
		prettifyCode();

		$('.title').widowFix();

		// index pages
		if ( $('body#index').length ) {

			var $wall = $('#posts');

			if ( masonite.likeLinks ) {
				$('body').append('<iframe id="like"></iframe>');
				$('.footer').on(
					{
						click: function(event) {
							event.preventDefault();
							var $post = $(this).closest('.post'),
									id = $post.attr('id'),
									oauth = $post.attr('rel').slice(-8),
									liked = ( $(this).hasClass('liked') ),
									command = liked ? 'unlike' : 'like',
									iframeSource = 'http://www.tumblr.com/' + command + '/' + oauth + '?id=' + id;

							$('#like').attr('src', iframeSource);
							$(this).toggleClass('liked');
						}
					},
					'.like a'
				);

			}

			if ( masonite.centeredContent && !$('body').hasClass('single-column') ) {
				var $page = $('#container'),
						$offset = $('#header'),
						colW = $('.post').outerWidth(true),
						postHOff = colW - $('.post').width(),
						columns = null;

				$(window).smartresize(function(){
					// check if columns has changed
					var currentColumns = Math.floor( ( $('body').width() - $offset.outerWidth(false) - postHOff ) / colW );
					if ( currentColumns !== columns && currentColumns > 0 ) {
						// set new column count
						columns = currentColumns;
						// apply width to container manually, then trigger relayout
						$page.width( columns * colW + $offset.outerWidth(false) );
						$wall.width( columns * colW );
						if($wall.hasClass('masonry')){
							$wall.masonry('reload');
						}
						if ( !$('body').hasClass('header-left') ) {
							$('#header, #copyright').css( {'margin-left':columns * colW + postHOff, 'right':'auto'} );
						} else {
							$('#header, #copyright').css( 'margin-left', 0 );
						}
					}
				}).smartresize(); // trigger resize to set container width
			}

			if ( !$('body').hasClass('single-column') ) {
				// http://masonry.desandro.com/docs/options.html
				// http://masonry.desandro.com/docs/animating.html#modernizr
				$wall.imagesLoaded(function() {
					$wall.masonry({
						isAnimated: !Modernizr.csstransitions,
						itemSelector: '.post',
						isFitWidth: masonite.centeredContent,
						isResizable: !masonite.centeredContent,
						columnWidth: $('.post').outerWidth(true)
					});
				});
			}


			if ( masonite.infiniteScroll ) {

				var infinitescroll_behavior;

				if ( masonite.customTrigger ) {
					infinitescroll_behavior = 'twitter';
					$('#pagination li.next a').text('Load more posts');
				}

				$wall.infinitescroll({
					loading: {
						finishedMsg: "No more pages to load",
						img: "http://static.tumblr.com/wccjej0/SzLlinacm/ajax-loader.gif",
						msgText: "Loading page 2/" + masonite.totalPages
					},
					navSelector: '#pagination li.next a',  // selector for the paged navigation
					nextSelector: '#pagination li.next a', // selector for the NEXT link (to page 2)
					itemSelector: '#posts .post',          // selector for all items you'll retrieve
					behavior: infinitescroll_behavior,
					errorCallback: function() {
						// fade out the error message after 2 seconds
						$('#infscr-loading').animate({opacity: 0.8},2000).fadeOut('normal');
					}
				},
				function ( newElements ) {
					if ( !$('body').hasClass('single-column') ) {
						prettifyCode();

						// get opts by getting internal data of infinite scroll instance
						var opts = $wall.data('infinitescroll').options,
							$elems = $( newElements ).css({ opacity: 0 });

						$elems.fixTumblrAudio().initColorbox().fixYouTube().fixVimeo().disqusCommentCount().find('.title').widowFix();

						$elems.imagesLoaded( function(){
							$wall.masonry( 'appended', $elems, true, function(){
								$elems.animate({ opacity: 1.0 }, 200, 'swing');
								if(masonite.customTrigger){
									$('#pagination li.next a').fadeIn({ duration: 200, easing: 'easeInOutCubic' });
								}
							});
						});

						setTimeout(function() {
							$('#infscr-loading > div').html("Loading page " + (opts.state.currPage + 1) + "/" + masonite.totalPages);
						}, 400);
					}
				}
			);
			}

		} // body#index

	}); // ready

})(window.jQuery);