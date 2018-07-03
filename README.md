# Weback4 Real Zero Configure Setup with Multiple entry point
**React Ready (ie9+ Supported), Babel, SASS, HTML Partials, External jQuery CDN**

Webpack 4 comes with a new idea, 0 configuration setting. If you have only one entry point then you don't need this setup. Webpack 4 will compile your project without any regression. But, if you are working on a project which has multiple entry point then 0 configuration setting will not work and that is where you can take benefit of this project.

This setup will detect all entry points automatically from **'src/js'** folder. You should remember that this folder should not contain any other file other than entry points in its root, though you can always create sub folders and put any other javascript files there.

You do not need to access any core setting file if you neeed to change any configuration. 

All options has been enlisted to **[config/public.options.js](config/public.options.js)** file. Check this file. All options are quite self explanatory and has comments with all.

jQuery is an external module. We have used CDN version of it and we pull that into bottom of html code. Internal modules can access this module as a dependancy.




