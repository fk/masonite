/*jshint browser:true, curly:true, eqeqeq:true, forin:true, immed:true, indent:4, strict:true, trailing:true, undef:true, unused:true */
/*global Modernizr, jQuery, prettyPrint, Tumblr, masonite */

(function( window, $, undefined ) {

	"use strict";

	$.fn.fixYouTube = function() {
		/*
			Widescreen YouTube Embeds by Matthew Buchanan & Hayden Hunter
			http://matthewbuchanan.name/451892574
			http://blog.haydenhunter.me

			Released under a Creative Commons attribution license:
			http://creativecommons.org/licenses/by/3.0/nz/
		*/
		this.find( "embed[src^='http://www.youtube.com']" ).each(function() {
			// Identify and hide embed(s)
			var parent = $( this ).closest( "object" ),
				youtubeCode = parent.html(),
				params = "",
				oldOpts = /rel=0/g,
				newOpts,
				youtubeIDParam = $( this ).attr( "src" ),
				youtubeIDPattern = /\/v\/([0-9A-Za-z-_]*)/,
				youtubeID = youtubeIDParam.match( youtubeIDPattern ),
				youtubeHeight = Math.floor( parent.width() * 0.75 + 25 - 3 ),
				youtubeHeightWide = Math.floor( parent.width() * 0.5625 + 25 - 3 );

			parent.css( "visibility", "hidden" );

			if ( youtubeCode.toLowerCase().indexOf( "<param" ) === -1 ) {
				// IE doesn't return params with html(), so…
				$( "param", this ).each(function () {
					params += $( this ).get( 0 ).outerHTML;
				});
			}

			// Set colours in control bar to match page background
			newOpts = "rel=0&amp;color1=0x" + masonite.whites + "&amp;color2=0x" + masonite.whites;
			youtubeCode = youtubeCode.replace( oldOpts, newOpts );

			if ( params !== "" ) {
				params = params.replace( oldOpts, newOpts );
				youtubeCode = youtubeCode.replace( /<embed/i, params + "<embed" );
			}

			// Test for widescreen aspect ratio
			$.getJSON( "http://gdata.youtube.com/feeds/api/videos/" + youtubeID[ 1 ] + "?v=2&alt=json-in-script&callback=?", function (data) {
				oldOpts = /height="?([0-9]*)"?/g;
				if ( data.entry.media$group.yt$aspectRatio !== null ) {
					newOpts = "height='" + youtubeHeightWide + "'";
				} else {
					newOpts = "height='" + youtubeHeight + "'";
				}
				youtubeCode = youtubeCode.replace( oldOpts, newOpts );
				if ( params !== "" ) {
					params = params.replace( oldOpts, newOpts );
					youtubeCode = youtubeCode.replace( /<embed/i, params + "<embed" );
				}
				// Replace YouTube embed with new code
				parent.html( youtubeCode ).css( "visibility", "visible" );
			});

		});

		return this;
	};

	$.fn.fixSoundcloud = function() {
		this.find( "iframe[src^='https://w.soundcloud.com/']" ).each(function() {
			var $obj = $(this),
				attributes = $obj.prop( "attributes" ),
				$newIframe = $( "<iframe></iframe>" ).insertAfter( $obj ).hide();

			$obj.remove();
			$newIframe.show();

			$.each(attributes, function() {
				if ( this.name === "src" ) {
					$newIframe.attr( this.name, this.value + "&color=" + masonite.accents );
				} else {
					$newIframe.attr( this.name, this.value );
				}
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
		var opts = "title=0&byline=0&portrait=0";

		this.find( "iframe[src^='http://player.vimeo.com']" ).each(function() {
			var src = $(this).attr( "src" ),
				w = $(this).attr( "width" ),
				h = $(this).attr( "height" );

			if ( src.indexOf( "?" ) === -1 ) {
				$( this ).replaceWith(
					"<iframe src='" + src + "?" + opts + "&color=" +
					masonite.accents + "' width='" + w + "' height='" + h +
					"' frameborder='0'></iframe>"
				);
			}
		});

		this.find( "object[data^='http://vimeo.com']" ).each(function() {
			var $obj = $( this ),
				data = $obj.attr( "data" ),
				temp = data.split( "clip_id=" )[ 1 ],
				id = temp.split( "&" )[ 0 ],
				server = temp.split( "&" )[ 1 ],
				w = $obj.attr( "width" ),
				h = $obj.attr( "height" );

			$obj.replaceWith(
				"<iframe src='http://player.vimeo.com/video/" +
				id + "?" + server + "&" + opts + "&color=" + masonite.accents +
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
			var scriptURL = "http://disqus.com/forums/" + masonite.disqusShortname + "/count.js";
			$.getScript(scriptURL);
		}

		return this;
	};

	$.fn.fixTumblrAudio = function() {
		// via http://stackoverflow.com/questions/4218377/tumblr-audio-player-not-loading-with-infinite-scroll
		this.each(function() {
			if ( $(this).hasClass( "audio" ) ) {
				var $audioPost = $( this ),
					audioID = $audioPost.attr( "id" ),
					script = document.createElement( "script" );

				$audioPost.find( ".player span" ).css({ visibility: "hidden" });

				script.type = "text/javascript";
				script.src = "http://assets.tumblr.com/javascript/tumblelog.js?16";

				$( "body" ).append( script );

				$.ajax({
					url: "/api/read/json?id=" + audioID,
					dataType: "jsonp",
					timeout: 5000,
					success: function( data ) {
						$audioPost.find( ".player span" ).css({ visibility: "visible" });
						var embed = data.posts[0][ "audio-player" ].replace( "audio_player.swf", "audio_player" + masonite.audioPlayerColor + ".swf" );
						$audioPost.find( "span:first" ).append( '<script type="text/javascript">replaceIfFlash(9,"audio_player_' + audioID + '",\'\x3cdiv class=\x22audio_player\x22\x3e' + embed + '\x3c/div\x3e\')</script>' );
					}
				});
			}
		});

		return this;
	};

	function prettifyCode() {
		if ( masonite.googlePrettify ) {
			var a = false;

			$( "pre code" ).parent().each(function() {
				if ( !$(this).hasClass( "prettyprint" ) ){
					$(this).addClass( "prettyprint" );
					a = true;
				}
			});

			if ( a ) {
				prettyPrint();
			}
		}
	}

	function fadingSidebar() {
		var $sidebar = $( "#header, #copyright" ),
			defaultOpacity = 0.5;

		$sidebar.css( "opacity", defaultOpacity );

		$sidebar.mouseenter(function() {
			$sidebar
				.stop()
				.animate({
					opacity: 1
				}, 250);
		}).mouseleave(function() {
			if ( $( "#header input:focus" ).length === 0 ) {
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

		$( "#avatar" ).imagesLoaded(function() {
			var $that = $( "#avatar" ),
				width = $that.width(),
				hidpi = $that.attr( "data-hidpi-src" ),
				src = $that.attr( "src" );

			if ( hidpi !== "" ) {
				$that.attr( "src", hidpi ).attr( "width", width );
				$that.one( "error", function() {
					this.src = src;
				});
			}
		});

		if ( masonite.fadeSidebar && !Modernizr.touch ) {
			fadingSidebar();
		}

		$( "#likes" ).masonry({
			itemSelector: "li",
			isResizeBound: true,
			columnWidth: $( "li" ).width()
		});

		if ( masonite.colorbox ) {
			masonite.colorboxOptions = {
				opacity: 0.92,
				slideshow: true,
				slideshowAuto: false,
				speed: 200,
				photo: true,
				fixed: true,
				maxWidth: "90%",
				maxHeight: "90%"
			};

			$( document )
				.on( "cbox_open", function(){
					$( "body" ).css({
						overflow: "hidden"
					});
				}).on( "cbox_cleanup", function(){
					$( "body" ).css({
						overflow: "auto"
					});
				});
		}

		$( ".post" )
			.initColorbox()
			.disqusCommentCount()
			.find( "embed[src*='assets.tumblr.com\/swf\/audio_player']" )
				.addClass( "fit-vids-ignore" )
			.end()
			.fixYouTube()
			.fitVids()
			.fixVimeo()
			.fixSoundcloud();

		prettifyCode();

		$( ".title" ).widowFix();

		// index pages
		if ( $( "body" ).hasClass( "index" ) ) {

			var $wall = $( "#posts" ),
				infinitescroll_behavior;

			if ( !masonite.singleColumn ) {
				$wall.imagesLoaded(function() {

					$wall.masonry({
						itemSelector: ".post",
						isFitWidth: masonite.centeredContent,
						isResizeBound: !masonite.centeredContent,
						columnWidth: $( ".post" ).outerWidth( true ),
						hiddenStyle: {
							opacity: 0,
							transform: 'translateY(40px)'
						},
						visibleStyle: {
							opacity: 1,
							transform: 'translateY(0)'
						}
					});

					if ( masonite.centeredContent ) {
						var $page = $( "#container" ),
							offset = $( "#header" ).outerWidth( false ),
							$sidebar = $( "#header, #copyright" ),
							$post = $( ".post:first" ),
							colW = $post.outerWidth( true ),
							postHOff = colW - $post.width(),
							columns = null,
							moreColumns = false;

						$( window ).on( "debouncedresize", function() {
							// check if columns has changed
							var currentColumns = Math.floor( ( $( "body" ).width() - offset - ( postHOff * 2 ) ) / colW );

							if ( currentColumns !== columns && currentColumns > 0 ) {
								// set new column count
								if ( currentColumns > columns ) {
									moreColumns = true;
								} else {
									moreColumns = false;
								}
								columns = currentColumns;

								// apply width to container manually, then trigger relayout
								var $queue;

								if ( moreColumns ) {

									if ( masonite.headerLeft ) {
										$queue = $( "#posts, #container" );
									} else {
										$queue = $( "#header, #copyright, #posts, #container" );
									}

									$page.animate({
										"width": columns * colW + offset
									}, 100);
									// $wall.width( $wall.width() ).animate({
									//	'width': columns * colW
									// }, 100);

									if ( !masonite.headerLeft ) {
										$sidebar.animate({
											"margin-left": columns * colW
										}, 100);
									}

									$queue.promise().done(function(){
										$wall.masonry( "layout" );
										$( "#likes" ).masonry( "layout" );
									});

								} else {

									$page.width( columns * colW + offset );
									// $wall.width( columns * colW );

									$wall.masonry( "layout" );
									$( "#likes" ).masonry( "layout" );

									if ( !masonite.headerLeft ) {
										$sidebar.css({
											"margin-left": columns * colW
										});
									}
								}
							}
						});

						// trigger resize to set container width
						$( window ).trigger( "debouncedresize" );
					}
				});
			}

			if ( masonite.infiniteScroll ) {

				masonite.infiniteScrollLoadingOptions = {
					finishedMsg: masonite.lang.noMorePosts,
					img: "http://static.tumblr.com/wccjej0/SzLlinacm/ajax-loader.gif",
					msgText: masonite.lang.loading + " 2/" + masonite.totalPages
				};

				if ( masonite.customTrigger ) {
					infinitescroll_behavior = "twitter";
					$( "#pagination li.next a" ).text( masonite.lang.loadMorePosts );
				} else {
					masonite.infiniteScrollLoadingOptions.selector = "#copyright";
				}

				$wall.infinitescroll({
					loading: masonite.infiniteScrollLoadingOptions,
					navSelector: "#pagination",
					nextSelector: "#pagination .next a",
					itemSelector: "#posts .post",
					bufferPx: $(window).height() * 2,
					behavior: infinitescroll_behavior,
					maxPage: masonite.totalPages,
					errorCallback: function() {
						// fade out the error message
						$( "#infscr-loading" ).animate({
							opacity: 0.8
						}, 2000).fadeOut( "normal" );
					}
				},
				function ( newElements ) {
					var opts = $wall.data( "infinitescroll" ).options,
						$elems = $( newElements ).css({ opacity: 0 });

					$elems
						.initColorbox()
						.disqusCommentCount()
						.fixYouTube()
						.fitVids()
						.fixVimeo()
						.fixSoundcloud()
						.fixTumblrAudio()
						.find( ".title" )
							.widowFix();

					prettifyCode();

					$elems.imagesLoaded(function() {

						if ( masonite.singleColumn ) {
							$elems.animate({ opacity: 1.0 }, 200, "swing");
						} else {
							$elems.css({ opacity: 1 });
							$wall.masonry( "appended", newElements );
						}

						if ( masonite.customTrigger ) {
							$( "#pagination li.next a" ).fadeIn({
								duration: 200,
								easing: "easeInOutCubic"
							});
						}

						var $elemIDs = $elems.map(function () {
							return this.id;
						}).get();

						Tumblr.LikeButton.get_status_by_post_ids($elemIDs);
					});

					setTimeout(function() {
						var $loader = $( "#infscr-loading > div" );
						if ( ( opts.state.currPage + 1 ) <= masonite.totalPages ) {
							$loader.html( masonite.lang.loading + " " + ( opts.state.currPage + 1 ) + "/" + masonite.totalPages );
						} else {
							$loader.html( masonite.lang.noMorePosts );
						}
					}, 400);
				}
			);
			}

		}

	});

})( window, jQuery );