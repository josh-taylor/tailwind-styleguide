let viewer = require('./viewer');

class TailwindStyleguide {
    constructor(configPath) {
        this.configPath = configPath;
    }

    apply(compiler) {
        compiler.plugin('done', () => this.startServer());
    }

    startServer() {
        viewer.startServer(this.configPath);
    }
}

module.exports = TailwindStyleguide;
