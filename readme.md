# masonite v0.2.5

**A Tumblr theme.**  
masonry + infinite-scroll = masonite.  
Clever, huh?

[Up for grabs](http://www.tumblr.com/theme/34822) in Tumblr's Theme Garden,  
live at [hellodirty.com](http://hellodirty.com).

## Features

* [Masonry](http://masonry.desandro.com/)-powered index page layout
  * [infinite scrolling](http://www.infinite-scroll.com) – automatic or user-triggered ("Twitter-style")
  * opt-out to a one-column layout
  * optional centered layout mode
  * defaults to 400 pixel wide posts with optional 500-pixel wide posts on index pages  
    (permalink pages show 500 pixel wide content)
* one- or two-column navigation, left or right of the main content and on top or bottom of the viewport
* fully customizable colors thanks to using `@font-face` for all theme icons
* Vimeo-videos incorporating the "Accents"-color and pretty YouTube-videos
* [FitVids.js](https://github.com/davatron5000/FitVids.js) to make videos always fit in the available width, even when nested in blockquotes or similar
* customizable fonts
  * via Tumblr's own custom fonts functionality
  * or by specifying a web font family (and style(s)) from [Google Fonts](http://www.google.com/fonts)
* optional
  * links to "Reblog" and "Like" and tag display on index pages
  * lightbox-view of high resolution images, including a (user-invoked) slideshow
  * hide Tumblr avatar and/or title
  * [Disqus](http://disqus.com/) 2012 integration
  * [Google Analytics](http://www.google.com/analytics/) and [Clicky](http://getclicky.com/) integration
  * [Google Code Prettify](http://code.google.com/p/google-code-prettify/) syntax highlighting
* somewhat working, somewhat orphaned
  * show latest Likes and/or Tweets
  * show "People I follow"

## Customization Options

### Colors

* Background, Brights, Lights, Mids, Darks, Copy, Accents

### Fonts

* **Body, PostMeta, Quote, Title, Pre** – Override the theme default font by choosing from Tumblr's "Customize" font-stacks.
* **Google Web Font** – Load one or multiple font families from [Google Fonts](http://www.google.com/fonts) using the [Web Font Loader](https://github.com/typekit/webfontloader).  
The option accepts an array as defined [here](https://developers.google.com/webfonts/docs/webfont_loader#GoogleModule), e. g. `'Fruktur','Open Sans:400,700,400italic,700italic'` would load the "[Fruktur](http://www.google.com/webfonts/specimen/Fruktur)" font family and the normal (`400`), italic (`400italic`), bold (`700`) and bold italic (`700italic`) versions of "[Open Sans](http://www.google.com/webfonts/specimen/Open+Sans)". To make use of the loaded fonts you can write your own CSS-styles or put the name of the font into one of the five "Google Web Font …" option-fields – e. g. to use "Fruktur" as font for all quotes, put `Fruktur` into the "Google Web Font Quote"-field.

### Images

* **Avatar** – Upload an image to replace the Tumblr avatar with a custom logo.  
Additionally, you can use _Avatar HiDPI_ to provide a high-resolution version of the _Avatar_-image to display on HiDPI devices (such as iPad 3/4). Please make sure that this image is at least exactly twice as big as the original _Avatar_ image.

### Post Options

* **500px Posts** – activate to switch post width from the default 400 to 500px
* Centered Content
* **Custom trigger Infinite Scroll** – enables user-triggered, "Twitter"-style infinite scrolling via a "Load more posts"-button
* Dog Ear Zoom Icon
* Enable Colorbox
* **Enable Google Prettify** – enables syntax highlighting via [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
* Enable Infinite Scrolling
* Enable Like Links on Index Pages
* Enable Reblog Links on Index Pages
* **One Column Content** – opt out of the default jQuery Masonry layout for index pages
* Show Album Art on Audio Posts
* **Show Post Footer Border** – for better distinction between posts
* Show Tags
* Show Tags on Index Page
* **Use White Audio Player** – use Tumblr's white audio player instead of the (default) black one

### Header Options

* **Header Left, Header Top** – activate these to override the default (right- and bottom-aligned) header position
* **Show Avatar** – shows/hides the default Tumblr avatar (or the uploaded one)
* **Show Title** – shows/hides the blog title
* **Show Description** – shows/hides the blog description
* **Show Archive** – shows/hides "Archive" link
* **Show Random** – shows/hides "Random" link
* **Show RSS** – shows/hides "RSS" link
* **Show Mobile** – shows/hides the "Mobile" link
* **Show Search** – shows/hides the search input
* Fading Sidebar
* Two Column Navigation

### Somewhat working, somewhat orphaned

These will work, but aren't really up-to-date:

* Show Copyright
* Show Likes
* Show People I Follow
* Show Twitter

### Analytics & User Tracking

masonite comes with two analytics options built in, Google Analytics and realtime user tracking with Clicky.

#### Google Analytics

To setup Google Analytics [sign up for an account](http://www.google.com/analytics/) first; once you have your site information added, Google will provide you with both a Google Analytics ID and embed code. Just grab the ID (e. g. `UA-000000-1`) and paste it into _Customize > Appearance > Google Analytics_.

#### Clicky

Alternately (or in addition), you can use Clicky to see in realtime what people are doing on your site. [Sign up for a Clicky account](http://getclicky.com/) and paste your site ID into _Customize > Appearance > Clicky Tracking_.

### Disqus Comments

To setup comments with your blog, you'll need to [register a Disqus account for your site](http://disqus.com/admin/register/).  After you're done, grab the Disqus Site Shortname you selected and paste it into _Customize > Appearance > Disqus Shortname_.

### Social Links

Add URLs to display the following social site icons below your site description.  
_Please make sure you add the full URL, including “http://”._

_Dribbble, Facebook, Github, Soundcloud, Twitter, Vimeo, Rdio, Yahoo, Skype, Evernote, Delicious, Behance, XING, LinkedIn, Picasa, YouTube, StumbledUpon, Last.fm, Google+, Forrst, Pinterest, Flickr, deviantART, Instagram, Blogger, Flattr_

## Credits

* originally based on [Off Franklin](http://somerandomdude.com/projects/off-franklin-tumblr-theme/), a Tumblr theme by [P.J. Onori](http://somerandomdude.com/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
* pretty YouTube- and Vimeo-videos thanks to [Matthew Buchanan’s and Hayden Hunter’s YouTube improvement script](http://matthewbuchanan.name/post/451892574/widescreen-youtube-embeds) plus [Better Vimeo Embeds](http://mattbu.ch/tumblr/vimeo-embeds/) by Matthew Buchanan
* [Modernizr](http://modernizr.com/) v2.7.1
* [jQuery](http://jquery.com/) v1.11.0
* [Masonry](http://masonry.desandro.com/) v3.1.4
* [imagesLoaded](http://desandro.github.io/imagesloaded/) v3.1.4
* [ColorBox](http://jacklmoore.com/colorbox/) v1.5.4
* [Infinite Scroll](http://www.infinite-scroll.com) v2.0b.120520
* [FitVids.js](https://github.com/davatron5000/FitVids.js) v1.1 ([slightly modified](https://github.com/fk/FitVids.js/tree/fit-vids-ignore))
* [HTML5 placeholder Polyfill](https://github.com/ginader/HTML5-placeholder-polyfill) v2.0.9
* [jQuery WidowFix](http://matthewlein.com/widowfix/) v1.3.2
* [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
* [Web Font Loader](https://github.com/typekit/webfontloader) v1.5.2
* built on [HTML5 Boilerplate](http://html5boilerplate.com/) v4.3.0 CSS and [normalize.css](http://necolas.github.com/normalize.css/) v3.0.0
* icon-font generated with [IcoMoon](http://icomoon.io/), containing icons from
  * [Typicons](http://typicons.com/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
  * [Entypo](http://www.entypo.com/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
  * [IcoMoon - Free](http://keyamoon.com/icomoon/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
  * [Broccolidry](http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons) – License: [Aribitrary](http://licence.visualidiot.com/)
  * [Iconic](http://somerandomdude.com/work/iconic/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/us/)

## Changelog

### Not yet released

* Switched to Tumblr's own like- and reblog-buttons.
* Updated HTML5 Boilerplate to v4.3.0: This means no more CSS classes to determine if Internet Explorer is used, smaller changes to HTML5 Boilerplates default CSS-styles and the removal of all things related to Google Chrome Frame.
* Updated to HTML5 Placeholder Polyfill v2.0.10.
* Updated to Colorbox v1.5.5.
* Referenced minified version of masonite.js - v0.2.5 referenced the uncompressed version.
* Removed line-through for hovered links in the sidebar; instead, use the "Accent"-color for consistency.
* Fixed transition-duration of the "Dog Ear Zoom Icon" - was 2s, should be 0.2s.
* Improved markup (better use of HTML5's sectioning elements) and source code.
* Removed all 3rd party scripts from the repository.
* Removed obsolete Masonry CSS styles.
* Established an automated build via Grunt and additional plugins.
* 3rd party scripts are now managed with Twitter Bower.
* Added Gemfile.
* Updated Modernizr to a perfectly lean build thanks to [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr).
* Reorganized Sass structure.
* Refined typography.

### 0.2.5

* Added an appearance option "Google Web Fonts Post Title".
* Relayout Masonry after web fonts have loaded.
* Updated to FitVids v1.1.
* Updated to imagesLoaded v3.1.4.
* Updated to Masonry v3.1.4.
* Updated to jQuery v1.11.0.
* Updated to Colorbox v1.5.4.
* Updated to Modernizr v2.7.1.
* Updated to HTML5 Placeholder Polyfill v2.0.9.
* Updated to normalize.css v3.0.0.
* Updated to Web Font Loader v1.5.2.

### 0.2.4

* Minor improvements to the audio player meta layout.
* Improvements to the scaling of images and video embeds.
* "photoset"-posts finally get the right CSS-class/their own "dedicated" markup.
* infinite-scroll's loading screen is now attached to #copyright when not in "custom trigger" mode (should probably be revisited).
* Added an option to opt-out of "position:fixed" for #header and #copyright (using "position:absolute" instead). Not perfect, but a start.
* Soundcloud players now inherit the "masonite.accent"-color.
* Updated to Masonry v3.1.0 – this means [no support for IE<8](http://masonry.desandro.com/faq.html#browser-support) and [no animation for Masonry elements in IE8 and IE9](http://masonry.desandro.com/appendix.html#upgrading-from-v2) (since jQuery animation has been removed).
* Updated to jQuery v1.10.2.
* Updated to normalize.css v1.1.2.
* Updated to ColorBox v1.4.27.
* Updated to Web Font Loader v1.4.8.
* Updated to Google Code Prettify r298.
* Added Grunt, for now just to minify masonite.js.
* Lots of cleanup.

### 0.2.3

* Added "Use White Audio Player" option.

### 0.2.2

* Fixed "Google+" social link option.
* Improved #following markup.

### 0.2.1

* Added minified version of masonite.js.

### 0.2

* Added a bunch of layout options:
  * Show Description
  * Show Archive
  * Show Random
  * Show RSS
  * Show Mobile
  * Show Search
* Improved the “One Column Content” behavior – much smoother transition from the initial one column layout to the jQuery-masonry-powered multicolumn layout – on initial page load as well as when changing the window size.
* Fixed FitVids.js behavior.
* Updated “Likes”-layout: Basic fixes to “hover”-styles; now uses jQuery Masonry for layout.
* Updated to jQuery v1.9.1.
* Updated to jQuery Masonry v2.1.08.
* Updated to jQuery ColorBox v1.4.1.
* Updated jQuery Infinite Scroll to latest version.
* Updated to normalize.css v1.1.0.
* Updated HTML5 Boilerplate’s CSS to latest version.
* Disqus and Tumblr’s “tweets.js” now loaded via modernizr.load.
* Improved markup (added title- and alt-attributes to “following”-links and -images, title-attribute to avatar-, notes-, tag- and Disqus-links, title- and rel=bookmark-attributes to .post permalinks).
* "Notes"-links now directly jump to the #notes-container on the corresponding permalink-page.
* Improved localization.
* Smoother Infinite Scroll behavior.
* Huge improvements behind the scenes – started splitting CSS into partials, lots of cleanup in CSS and JS.
* Updated documentation.

### 0.1

* Added the option to show “Like”-links on index-pages – although I’m not a fan of this because of various reasons, most of the professionally sold Tumblr Theme Garden themes seem to offer this functionality – so here we go.
* Added a whole bunch of new social link options: _Rdio, Yahoo, Skype, Evernote, Delicious, Behance, XING, LinkedIn, Picasa, YouTube, StumbledUpon, Last.fm, Google+, Forrst, Pinterest, Flickr, deviantART, Instagram, Blogger, Flattr_
* Added an option to enable/disable the lightbox/slideshow – ColorBox (the script powering the lightbox/slideshow) now only gets loaded if you want masonite to use its functionality.
* Various “Reblog”-link fixes – no display on individual post pages anymore, repositioning to the post footer
* Improved handling of videos, e. g. when in blockquotes, thanks to FitVids.js
* An improved “Google Web Fonts” option now allows the definition of multiple font-families to be loaded as well as defining which Google Web Font family to use for Body, Meta, Quote, Title and Quote right out of the “Customize”-interface.
* Added a new option to add a custom logo image (in place of the default Tumblr avatar image) – with additional support for a high resolution version for “HiDPI”-devices (such as the iPad 3/4)
* Various Disqus-specific fixes – fixes Disqus comment count for 41+ posts (before, the Disqus comment count would break when using infinite-scroll to load more than 41 posts).
* Improved “centered layout”-mode.
* Various iPad/touch-device specifix improvements.
* Improved theme overview/documentation.
* Tag pages now have a headline.
* Updated jQuery Masonry and modernizr.
* Improved search-input semantics and presentation in non-WebKit browsers.

## Contributing

This project uses [git-flow](https://github.com/nvie/gitflow) and [its branching model](http://nvie.com/posts/a-successful-git-branching-model/): the **master** branch always contains stable, production-ready code (also matching the version available via/submitted to Tumblr's Theme Garden) while the **develop** branch contains the latest development code.

To get started:

  * Install [Ruby](https://www.ruby-lang.org/), [Node.js](http://nodejs.org/) and [Bower](http://bower.io/).
  * Fetch all development dependencies with `bundle install && npm install && bower install`
  * Hack away.
  * Build a release with `grunt`.
  * [Upload CSS and JavaScripts](http://www.tumblr.com/themes/upload_static_file) in `build` to Tumblr.
  * Replace URLs in `masonite.html`.
