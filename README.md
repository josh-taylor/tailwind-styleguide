# Tailwind Styleguide for Laravel Mix

This extension adds a styleguide for your Tailwind apps in Mix.

![Tailwind Styleguide](/screenshot.png?raw=true)

## Usage

First install the extension

```sh
npm install laravel-mix-talilwind-styleguide
```

Then you can require it within your `webpack.mix.js` file

```js
let mix = require('laravel-mix');

require('laravel-mix-tailwind-styleguide');

mix.js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .tailwindStyleguide();
```

Once this has been done, running either `npm run watch` or `npm run dev` will start up a local HTTP server at 
[http://localhost:8888/](http://localhost:8888/).


