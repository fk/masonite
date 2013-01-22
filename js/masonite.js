/*jshint browser:true, curly:true, white:false, eqeqeq:true, eqnull:true, strict:true, trailing:true, undef:true */
/*global jQuery, masonite, Modernizr, prettyPrint */

// remap jQuery to $
(function( window, $, undefined ){

	'use strict';

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
				params = "",
				oldOpts = /rel=0/g,
				newOpts,
				youtubeIDParam = $(this).attr("src"),
				youtubeIDPattern = /\/v\/([0-9A-Za-z-_]*)/,
				youtubeID = youtubeIDParam.match(youtubeIDPattern),
				youtubeHeight = Math.floor(parent.width() * 0.75 + 25 - 3),
				youtubeHeightWide = Math.floor(parent.width() * 0.5625 + 25 - 3);

			parent.css("visibility", "hidden");

			if ( youtubeCode.toLowerCase().indexOf("<param") === -1 ) {
				// IE doesn't return params with html(), so…
				$("param", this).each(function () {
					params += $(this).get(0).outerHTML;
				});
			}

			// Set colours in control bar to match page background
			newOpts = "rel=0&amp;color1=0x" + masonite.whites + "&amp;color2=0x" + masonite.whites;
			youtubeCode = youtubeCode.replace(oldOpts, newOpts);

			if ( params !== "" ) {
				params = params.replace(oldOpts, newOpts);
				youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
			}

			// Test for widescreen aspect ratio
			$.getJSON("http://gdata.youtube.com/feeds/api/videos/" + youtubeID[1] + "?v=2&alt=json-in-script&callback=?", function (data) {
				oldOpts = /height="?([0-9]*)"?/g;
				if ( data.entry.media$group.yt$aspectRatio != null ) {
					newOpts = 'height="' + youtubeHeightWide + '"';
				} else {
					newOpts = 'height="' + youtubeHeight + '"';
				}
				youtubeCode = youtubeCode.replace(oldOpts, newOpts);
				if ( params !== "" ) {
					params = params.replace(oldOpts, newOpts);
					youtubeCode = youtubeCode.replace(/<embed/i, params + "<embed");
				}
				// Replace YouTube embed with new code
				parent.html(youtubeCode).css("visibility", "visible");
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

			if ( src.indexOf("?") === -1 ) {
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
		if ( masonite.disqusShortname ) {
			var scriptURL = 'http://disqus.com/forums/' + masonite.disqusShortname + '/count.js';
			$.getScript(scriptURL);
		}

		return this;
	};

	$.fn.fixTumblrAudio = function() {
		// via http://stackoverflow.com/questions/4218377/tumblr-audio-player-not-loading-with-infinite-scroll
		this.each(function() {
			if ( $(this).hasClass("audio") ) {
				var $audioPost = $(this),
					audioID = $audioPost.attr("id"),
					script = document.createElement('script');
				
				$audioPost.find(".player span").css({ visibility: 'hidden' });

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
						$audioPost.find("span:first").append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + audioID + '",\'\x3cdiv class=\x22audio_player\x22\x3e' + embed + '\x3c/div\x3e\')</script>');
					}
				});
			}
		});

		return this;
	};

	function prettifyCode() {
		if ( masonite.googlePrettify ) {
			var a = false;

			$("pre code").parent().each(function() {
				if ( !$(this).hasClass("prettyprint") ){
					$(this).addClass("prettyprint");
						a = true;
					}
			});

			if ( a ) {
				prettyPrint();
			}
		}
	}

	function fadingSidebar() {
		// kudos to http://www.tumblr.com/theme/11862, wouldn't have tought about search
		var $sidebar = $('#header, #copyright'),
			defaultOpacity = 0.5;

		$sidebar.css('opacity', defaultOpacity);

		$sidebar.mouseenter(function() {
			$sidebar
				.stop()
				.animate({
					opacity: 1
				}, 250);
		}).mouseleave(function() {
			if ( $('#header input:focus').length === 0 ) {
				$sidebar
					.stop()
					.animate({
						opacity: defaultOpacity
					}, 250);
			}
		});
	}

	// ready
	$(function() {

		$('#avatar').imagesLoaded(function() {

			var $that = $(this),
				width = $that.width(),
				hidpi = $that.attr('data-hidpi-src'),
				src = $that.attr('src');

			if ( hidpi !== "" ) {

				$that.attr('src', hidpi).attr('width', width);
				$that.one('error', function () {
					this.src = src;
				});

			}

		});

		if ( masonite.fadeSidebar && !Modernizr.touch ) {
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

		$('.post').initColorbox().disqusCommentCount().filter('.video').fixYouTube().fitVids().fixVimeo();
		prettifyCode();

		$('.title').widowFix();

		// index pages
		if ( $('body#index').length ) {

			var $wall = $('#posts'),
				infinitescroll_behavior;

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
					offset = $('#header').outerWidth(false),
					$sidebar = $('#header, #copyright'),
					$post = $('.post:first'),
					colW = $post.outerWidth(true),
					postHOff = colW - $post.width(),
					columns = null;

				$(window).smartresize(function() {
					// check if columns has changed
					var currentColumns = Math.floor( ( $('body').width() - offset - postHOff ) / colW );

					if ( currentColumns !== columns && currentColumns > 0 ) {
						// set new column count
						columns = currentColumns;
						// apply width to container manually, then trigger relayout
						$page.width( columns * colW + offset );
						$wall.width( columns * colW );
						if ( $wall.hasClass('masonry') ) {
							$wall.masonry('reload');
						}
						if ( !$('body').hasClass('header-left') ) {
							$sidebar.css({
								'margin-left': columns * colW + postHOff,
								'right': 'auto'
							});
						} else {
							$sidebar.css( 'margin-left', 0 );
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

						$elems.initColorbox().fixTumblrAudio().disqusCommentCount().filter('.video').fixYouTube().fitVids().fixVimeo().end().find('.title').widowFix();

						$elems.imagesLoaded(function() {
							$wall.masonry( 'appended', $elems, true, function() {
								$elems.animate({ opacity: 1.0 }, 200, 'swing');
								if ( masonite.customTrigger ) {
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

})( window, jQuery );