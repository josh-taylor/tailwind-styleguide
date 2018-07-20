let http = require('http');
let express = require('express');
let path = require('path');
let _ = require('lodash');

// TODO make this configurable!
let tailwindConfigFile = path.resolve(__dirname, '../tailwind.js');
let tailwindConfig = require(tailwindConfigFile);
let projectRoot = path.resolve(__dirname, '..');

async function startServer(configPath) {
    let viewData = getViewData();

    let app = express();

    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views', `${projectRoot}/views`);
    app.use(express.static(`${projectRoot}/public`));

    app.use('/', (req, res) => {
        res.render('viewer', {
            viewData: JSON.stringify(viewData),
        });
    });

    let server = http.createServer(app);

    await new Promise(resolve => {
        server.listen(8888, '127.0.0.1', () => {
            resolve();

            let url = 'http://127.0.0.1:8888/';

            console.info(
                `TailwindCSS Styleguide is started at ${url}\n`,
                `Use Ctrl+C to close it`
            );
        })
    })
}

function getViewData() {
    return {
        colors: getTailwindColors(),
        screenSizes: getTailwindScreenSizes(),
        enabledModules: getEnabledTailwindModules(),
    }
}

function getTailwindColors() {
    return tailwindConfig.colors;
}

function getTailwindScreenSizes() {
    return _.map(tailwindConfig.screens, (size, label) => ({ label, size }));
}

function getEnabledTailwindModules() {
    let filtered = _.pickBy(tailwindConfig.modules, variants => ! _.isEmpty(variants));
    return _.map(filtered, (variants, name) => ({name, variants}));
}

module.exports = {
    startServer,
};
