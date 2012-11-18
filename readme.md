# masonite

**A tumblr theme.**  
masonry + infinite-scroll = masonite.  
Clever, huh?

[Up for grabs](http://www.tumblr.com/theme/34822) in the Tumblr Theme Garden,  
live at [hellodirty.com](http://hellodirty.com).

## Features and Options

* [jQuery Masonry](http://masonry.desandro.com/)-powered index page layout (w/ opt-out to one-column and optional centered layout)
* infinite scrolling (automatic or user-invoked)
* fully customizable colors thanks to using `@font-face` for all theme icons
* customizable fonts – alernatively you may specify a web font family and style(s) from the [Google Web Fonts API](http://www.google.com/webfonts)
* one- or two-column navigation, left or right of the main content and on top or bottom of the viewport
* optional
  *  500-pixels wide posts (400 pixels are the default)
  *  view high-resolution versions of images in a lightbox, with optional slideshow
  *  display of tags, avatar, tumblr title, likes and "people i follow"
  *  syntax highlighting via [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
  *  [Google Analytics](http://www.google.com/analytics/) and [Clicky](http://getclicky.com/) integration
  *  [Disqus](http://disqus.com/) 2012 integration
* Vimeo-videos incorporating the "Accents"-color
* pretty YouTube-videos

### Credits

* originally based on [Off Franklin](http://somerandomdude.com/projects/off-franklin-tumblr-theme/) by [P.J. Onori](http://somerandomdude.com/)
* pretty YouTube- and Vimeo-videos thanks to [Matthew Buchanan’s and Hayden Hunter’s YouTube improvement script](http://matthewbuchanan.name/post/451892574/widescreen-youtube-embeds) plus [Better Vimeo Embeds](http://mattbu.ch/tumblr/vimeo-embeds/) by Matthew Buchanan
* layout powered by David DeSandro’s [jQuery Masonry](http://masonry.desandro.com/) v2.1.05
* lightbox and slideshow powered by Jack Moore’s [ColorBox](http://jacklmoore.com/colorbox/) v1.3.20.1
* infinite scrolling courtesy of the [Infinite Scroll jQuery plugin](http://www.infinite-scroll.com) v2.0b2.120519
* [jQuery](http://jquery.com/) v1.8.2
* icon-font generated with [IcoMoon](http://icomoon.io/) by [@Keyamoon](http://twitter.com/keyamoon/)

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

## Issues

Before submitting an issue, please take a moment and read the following paragraphs (adapted from David Desandro's [Issues Agreement](https://github.com/desandro/issues-agreement/)).

### Types of issues

[As @fat discusses](http://wordsbyf.at/2012/02/13/creating-issues/), an issue is typically one of the following:

* **Bugs** – when a feature of the project has been _identified as broken_
* **Feature requests** – when you ask for a _new feature_ to be added to a project
* **Personal support requests** – when you are having _trouble setting up_ a working instance of the project

### Avoid personal support requests

**Hey, I'm just one guy.** As such, I simply do not have the bandwidth to provide personal support for everyone's implementation issues. The issue tracker is best used for bugs and feature requests. 

But I don't want to leave you high and dry. If you can follow the steps below, I'll be best-suited to possibly provide a solution.

I reserve the right to close any issue I deem as an implementation issue, general development question, or personal support request.

### Isolate the issue

* Identify the conditions for the issue. When and how does it occur?
* Remove all customizations to the theme's HTML, and possible Custom CSS – does the issue still occur?

### Provide a live URL

If you have a live site, add the link. **Without seeing it in the browser, I don't have a good idea of what you're trying to achieve.**

**Pasting code does not help** as much as a live URL.

[Like @desandro sayz](http://twitter.com/desandro/status/105371678204366848):

> Describing a dev problem is like showing a picture of your car to a mechanic. If you want me to fix it, I need to put my own hands on it. 

### Search previous issues


## Branches, Contributing

Contributions are welcome!  
We use [git-flow](https://github.com/nvie/gitflow) and its branching model: the **master** branch always contains stable, production-ready code while the **develop** branch contains the latest development code.