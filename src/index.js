let mix = require('laravel-mix');
let TailwindStyleguide = require('./tailwind-styleguide');

mix.extend('tailwindStyleguide', new class {
    register(configPath = './tailwind.js') {
        this.configPath = configPath;
    }

    webpackPlugins() {
        return new TailwindStyleguide(this.configPath);
    }
});
