/*
	--------------------------------
	Infinite Scroll Behavior
	Manual / Twitter-style
	--------------------------------
	+ https://github.com/paulirish/infinitescroll/
	+ version 2.0b2.110617
	+ Copyright 2011 Paul Irish & Luke Shumard
	+ Licensed under the MIT license
	
	+ Documentation: http://infinite-scroll.com/
	
*/

(function($, undefined) {
	$.extend($.infinitescroll.prototype,{

		_setup_twitter: function infscr_setup_twitter () {
			var opts = this.options,
				instance = this;

			// Bind nextSelector link to retrieve
			$(opts.nextSelector).click(function(e) {
				if (e.which == 1 && !e.metaKey && !e.shiftKey) {
					e.preventDefault();
					instance.retrieve();
				}
			});

			instance.options.loading.start = function (opts) {
				var $loader;

				$loader = opts.loading.msg.appendTo( opts.loading.selector );
				$( opts.navSelector ).css( "opacity", 0 );

				if ( ( opts.state.currPage + 1 ) <= masonite.totalPages ) {
					$( "#copyright" ).spin( { lines: 13, length: 0, width: 2, radius: 2, top: "50%", left: "-10px", corners: 0 } );
					$loader
						.html( masonite.lang.loading + " " + ( opts.state.currPage + 1 ) + "/" + masonite.totalPages )
						.spin( { lines: 29, length: 1, width: 2, radius: 6, top: 0, corners: 0 } );
				} else {
					$loader.html( masonite.lang.noMorePosts );
				}

				$loader.fadeIn();
				instance.beginAjax( opts );
			}

			instance.options.loading.finished =  function( opts ) {
				if ( opts && !opts.state.isBeyondMaxPage ) {
					opts.loading.msg.fadeOut(opts.loading.speed, function() {
						opts.loading.msg.spin( false );
						$( "#copyright" ).spin( false );
					});
				}
			}
		},
		_showdonemsg_twitter: function infscr_showdonemsg_twitter () {
			var opts = this.options,
				instance = this;

			//Do all the usual stuff
			opts.loading.msg
				.find('img')
				.hide()
				.parent()
				.find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
					$(this).parent().fadeOut('normal');
				});

			//And also hide the navSelector
			$(opts.navSelector).fadeOut('normal');

			// user provided callback when done
			opts.errorCallback.call($(opts.contentSelector)[0],'done');

		}

	});
})(jQuery);
