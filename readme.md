# masonite

**A Tumblr theme.**  
masonry + infinite-scroll = masonite.  
Clever, huh?

[Up for grabs](http://www.tumblr.com/theme/34822) in Tumblr Theme Garden,  
live at [hellodirty.com](http://hellodirty.com).

## Features and Options

* [jQuery Masonry](http://masonry.desandro.com/)-powered index page layout
  * [infinite scrolling](http://www.infinite-scroll.com) – automatic or user-triggered ("Twitter-style")
  * opt-out to a one-column layout
  * optional centered layout mode
  * defaults to 400 pixel wide posts with optional 500-pixel wide posts on index pages  
    (permalink pages show 500 pixel wide content)
* one- or two-column navigation, left or right of the main content and on top or bottom of the viewport
* fully customizable colors thanks to using `@font-face` for all theme icons
* Vimeo-videos incorporating the "Accents"-color and pretty YouTube-videos
* customizable fonts
  * via Tumblr's own custom fonts functionality
  * or you may override those by specifying a web font family (and style(s)) from the [Google Web Fonts API](http://www.google.com/webfonts)
* optional
  * lightbox-view of high resolution images, including a (user-invoked) slideshow
  * display of tags
  * Tumblr avatar and/or title, Likes and "People I follow"
  * [Disqus](http://disqus.com/) 2012 integration
  * [Google Analytics](http://www.google.com/analytics/) integration
  * [Clicky](http://getclicky.com/) integration
  * [Google Code Prettify](http://code.google.com/p/google-code-prettify/) syntax highlighting

### Appearance Options Overview

* **Custom Colors**  
  Background, Brights, Lights, Mids, Darks, Copy, Accents
* **Custom Fonts**  
  Body, PostMeta, Quote, Title, Pre – alternatively a Google Web Font and Google Web Font Style(s)
  * **Google Web Font**  
    If defined, the supplied [Google Web Fonts](http://www.google.com/webfonts) font family (e. g. `Source Sans Pro`) will be used; additionaly, you may define the font styles to be loaded in _Google Web Font Styles_ (e. g. `400,700,400italic,700italic`)
* **Social Icons**  
  Soundcloud, Facebook, Github, Dribbble, Vimeo, Twitter
* **Post Width**  
  defaults to 400px, can be switched to 500px
* **Header Options**
  * **Header Left, Header Top**  
    activate these to override the header default (right- and bottom-aligned) position
  * Show Avatar
  * Show Title
  * Fading Sidebar
  * Two Column Navigation
* One Column Content
* Centered Content
* Show Album Art on Audio Posts
* Show Copyright
* Show Likes
* Show People I Follow
* Show Post Footer Border
* Show Tags
* Show Tags on Index Page
* Custom trigger Infinite Scroll
* Dog Ear Zoom Icon
* Enable Google Prettify
* Show Twitter
* Disqus Shortname
* Google Analytics
* Clicky Tracking

## Credits

* originally based on [Off Franklin](http://somerandomdude.com/projects/off-franklin-tumblr-theme/) by [P.J. Onori](http://somerandomdude.com/)
* pretty YouTube- and Vimeo-videos thanks to [Matthew Buchanan’s and Hayden Hunter’s YouTube improvement script](http://matthewbuchanan.name/post/451892574/widescreen-youtube-embeds) plus [Better Vimeo Embeds](http://mattbu.ch/tumblr/vimeo-embeds/) by Matthew Buchanan
* layout powered by David DeSandro’s [jQuery Masonry](http://masonry.desandro.com/) v2.1.05
* lightbox and slideshow powered by Jack Moore’s [ColorBox](http://jacklmoore.com/colorbox/) v1.3.20.1
* infinite scrolling courtesy of the [Infinite Scroll jQuery plugin](http://www.infinite-scroll.com) v2.0b2.120519
* [jQuery](http://jquery.com/) v1.8.2
* built on HTML5 Boilerplate's CSS (normalize.css + H5BP goodies)
* icon-font generated with [IcoMoon](http://icomoon.io/) by [@Keyamoon](http://twitter.com/keyamoon/)

## Contributing

Contributions are welcome!  
We use [git-flow](https://github.com/nvie/gitflow) and its branching model: the **master** branch always contains stable, production-ready code while the **develop** branch contains the latest development code.

When editing CSS, please use SASS and Compass if possible.