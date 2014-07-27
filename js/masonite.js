/*jshint browser:true, curly:true, eqeqeq:true, forin:true, immed:true, indent:4, strict:true, trailing:true, undef:true, unused:true */
/*global Modernizr, jQuery, prettyPrint, Tumblr, masonite, queryString */

(function( window, $, undefined ) {
	"use strict";

	$.fn.fixTumblrVideo = function() {
		this.find( ".tumblr_video_container" ).each(function() {
			var $this = $( this ),
				id = $this.closest( "article" ).attr( "id" );

			$.ajax({
				url: "/api/read/json?id=" + id,
				dataType: "jsonp",
				timeout: 10000,
				success: function( data ) {
					$this.html( data.posts[ 0 ][ "video-player" ] );
				}
			});
		});

		return this;
	};

	$.fn.fixSoundcloud = function() {
		this.find( "iframe[src*='//w.soundcloud.com/']" ).each(function() {
			changeIframeSource( this, {
				color: masonite.accents
			});
		});
		
		return this;
	};

	$.fn.fixTumblrAudio = function() {
		this.find( "iframe[class*='tumblr_audio_player']" ).each(function() {
			changeIframeSource( this, {
				color: masonite.tumblrAudioPlayerTheme
			});
		});
		
		return this;
	};

	$.fn.fixVimeo = function() {
		var opts = "title=0&byline=0&portrait=0&color=" + masonite.accents;

		this.find( "iframe[src*='//player.vimeo.com']" ).each(function() {
			changeIframeSource( this, {
				title: 0,
				byline: 0,
				portrait: 0,
				color: masonite.accents
			});
		});

		/*
			Based on

			Better Vimeo Embeds 2.1 by Matthew Buchanan
			Modelled on the Vimeo Embedinator Script
			http://mattbu.ch/tumblr/vimeo-embeds/

			Released under a Creative Commons attribution license:
			http://creativecommons.org/licenses/by/3.0/nz/
		*/
		this.find( "embed[src^='http://vimeo.com']" ).each(function() {
			var $this = $( this ),
				$obj = $this.parents( "object" ),
				data = $this.attr( "src" ),
				temp = data.split( "clip_id=" )[ 1 ],
				id = temp.split( "&" )[ 0 ],
				server = temp.split( "&" )[ 1 ],
				w = $obj.attr( "width" ),
				h = $obj.attr( "height" );

			$obj.replaceWith(
				"<iframe src='//player.vimeo.com/video/" +
				id + "?" + server + "&" + opts + "&color=" + masonite.accents +
				"' width='" + w + "' height='" + h + "' frameborder='0'></iframe>"
			);
		});

		return this;
	};

	$.fn.fixYouTube = function() {
		this.find( "iframe[src*='//www.youtube.com/']" ).each(function() {
			changeIframeSource( this, {
				showinfo: 0,
				rel: 0,
				theme: masonite.youtubePlayerTheme
			});
		});

		/*
			Based on

			Widescreen YouTube Embeds by Matthew Buchanan & Hayden Hunter
			http://matthewbuchanan.name/451892574
			http://blog.haydenhunter.me

			Released under a Creative Commons attribution license:
			http://creativecommons.org/licenses/by/3.0/nz/
		*/
		this.find( "embed[src*='//www.youtube.com']" ).each(function() {
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

	function changeIframeSource( iframe, options ) {
		var $this = $( iframe ),
			opts = options ? options : {},
			attributes = $this.prop( "attributes" ),
			src = $this.attr( "src" ),
			$newIframe = $( "<iframe></iframe>" ),
			queryStringStart = src.indexOf( "?" ),
			parsedQueryString,
			location,
			newSrc,
			query;

			$.each( attributes, function() {
				if ( this.name === "src" ) {
					if ( queryStringStart !== -1 ) {
						query = src.slice( queryStringStart + 1 );
						location = src.slice( 0, queryStringStart );
						parsedQueryString = queryString.parse( query );

						$.each( opts, function( key, value ) {
							parsedQueryString[ key ] = value;
						});

						newSrc = location + "?" +  queryString.stringify( parsedQueryString );
					} else {
						newSrc = src + "?" + decodeURIComponent( $.param( opts ) );
					}

					$newIframe.attr( this.name, newSrc );
				} else {
					$newIframe.attr( this.name, this.value );
				}
			});

		$this.replaceWith( $newIframe );
	}

	$.fn.initColorbox = function() {
		if ( masonite.colorbox ) {
			this.find( "a.fullsize" ).colorbox( masonite.colorboxOptions );
		}

		return this;
	};

	$.fn.disqusCommentCount = function() {
		if ( masonite.disqusShortname ) {
			var scriptURL = "http://disqus.com/forums/" + masonite.disqusShortname + "/count.js";
			$.getScript( scriptURL );
		}

		return this;
	};

	function prettifyCode() {
		if ( masonite.googlePrettify ) {
			var a = false;

			$( "pre code" ).parent().each(function() {
				if ( !$( this ).hasClass( "prettyprint" ) ){
					$( this ).addClass( "prettyprint" );
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

	$(function() {
		var $avatar = $( "#avatar" ),
			$copyright = $( "#copyright" ),
			$likes = $( "#likes" );

		$avatar.imagesLoaded(function() {
			var width = $avatar.width(),
				hidpi = $avatar.attr( "data-hidpi-src" ),
				src = $avatar.attr( "src" );

			if ( hidpi !== "" ) {
				$avatar.attr( "src", hidpi ).attr( "width", width );
				$avatar.one( "error", function() {
					this.src = src;
				});
			}
		});

		if ( masonite.fadeSidebar && !Modernizr.touch ) {
			fadingSidebar();
		}

		$likes.masonry({
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
				.on( "cbox_open", function() {
					$( "body" ).css({
						overflow: "hidden"
					});
				}).on( "cbox_cleanup", function() {
					$( "body" ).css({
						overflow: "auto"
					});
				});
		}

		$( ".post" )
			.initColorbox()
			.disqusCommentCount()
			.end()
			.fixYouTube()
			.fixVimeo()
			.fitVids()
			.fixTumblrAudio()
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
							transform: "translateY(40px)"
						},
						visibleStyle: {
							opacity: 1,
							transform: "translateY(0)"
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
										$likes.masonry( "layout" );
									});

								} else {

									$page.width( columns * colW + offset );
									// $wall.width( columns * colW );

									$wall.masonry( "layout" );
									$likes.masonry( "layout" );

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

				if ( masonite.headerAlignment === "right" ) {
					masonite.spinjs.small.left = $copyright.width() + 8 + "px";
				} else if ( masonite.headerAlignment === "center" ) {
					masonite.spinjs.small.left = $copyright.width() / 2 + "px";
					masonite.spinjs.small.top = "-8px";
				}

				masonite.infiniteScrollLoadingOptions = {
					finishedMsg: masonite.lang.noMorePosts,
					msg: $( "<div id='loading'></div>" ),
					start: function( opts ) {
						var instance = $( this ).data( "infinitescroll" ),
							$loader;

						$( opts.navSelector ).hide();
						$loader = opts.loading.msg.appendTo( opts.loading.selector );

						if ( ( opts.state.currPage + 1 ) <= masonite.totalPages ) {
							$copyright.spin( masonite.spinjs.small );
							$loader
								.html( masonite.lang.loading + " " + ( opts.state.currPage + 1 ) + "/" + masonite.totalPages )
								.spin( masonite.spinjs.big );
						} else {
							$loader.html( masonite.lang.noMorePosts );
						}

						$loader.fadeIn();
						instance.beginAjax( opts );
					},
					finished: function() {
						return;
					},
					customFinished: function() {
						var opts =  $wall.data( "infinitescroll" ).options;

						if ( opts && !opts.state.isBeyondMaxPage ) {
							opts.loading.msg.fadeOut(opts.loading.speed, function() {
								opts.loading.msg.spin( false );
								$copyright.spin( false );
							});
						}
					}
				};

				if ( masonite.customTrigger ) {
					infinitescroll_behavior = "twitter";
					$( "#pagination li.next a" ).text( masonite.lang.loadMorePosts );
				}

				$wall.infinitescroll({
					loading: masonite.infiniteScrollLoadingOptions,
					navSelector: "#pagination",
					nextSelector: "#pagination .next a",
					itemSelector: "#posts .post",
					bufferPx: $(window).height() * 2,
					behavior: infinitescroll_behavior,
					maxPage: masonite.totalPages,
					pathParse: function() {
						var href = $( "#pagination .next a" ).attr( "href" );
						return [ href.substr( 0, href.lastIndexOf( "/" ) + 1 ), "" ];
					},
					errorCallback: function() {
						// fade out the error message
						$( "#loading" ).animate({
							opacity: 0.8
						}, 2000).fadeOut( "normal" );
					},
					state: {
						currPage: masonite.currentPage
					}
				},
				function ( newElements ) {
					var $elems = $( newElements ).css({ opacity: 0 });

					$wall.infinitescroll( "pause" );

					$elems
						.initColorbox()
						.disqusCommentCount()
						.fixYouTube()
						.fixVimeo()
						.fitVids()
						.fixSoundcloud()
						.fixTumblrVideo()
						.fixTumblrAudio()
						.find( ".title" )
							.widowFix();

					prettifyCode();

					$elems.imagesLoaded(function() {
						$wall.data("infinitescroll").options.loading.customFinished();

						if ( masonite.singleColumn ) {
							$elems.animate( { opacity: 1.0 }, 200 );
						} else {
							$elems.css( { opacity: 1 } );
							$wall.masonry( "appended", newElements );
						}

						if ( masonite.customTrigger ) {
							$( $wall.data( "infinitescroll" ).options.navSelector ).css( "opacity", 1 );
						}

						$wall.infinitescroll( "resume" );

						var $elemIDs = $elems.map(function() {
							return this.id;
						}).get();

						Tumblr.LikeButton.get_status_by_post_ids( $elemIDs );
					});
				}
			);
			}
		}
	});
})( window, jQuery );
