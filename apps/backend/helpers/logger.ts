const config = require('../../../dms.config.json');

export class Logger {
    static log(message: string) {
        if(config.backendConfig.enviroment === 'dev') {
            console.log(message);
        }
    }

    static error(message: string, error: any, force: boolean = false) {
        if(error) {
            console.error(error);
        }else if(config.backendConfig.enviroment === 'dev' || force) {
            console.error(message);
        }
    }

    static warn(message: string) {
        if(config.backendConfig.enviroment === 'dev') {
            console.warn(message);
        }
    }

    static info(message: string) {
        if(config.backendConfig.enviroment === 'dev') {
            console.info(message);
        }
    }

    static debug(message: string) {
        if(config.backendConfig.enviroment === 'dev') {
            console.debug('' + message);
        }
    }

    static routeLog(route: string) {
        if(config.backendConfig.enviroment === 'dev') {
            if(route.toLowerCase().includes('middleware')) {
                console.log(`\x1b[1m\x1b[36mMiddleware: ${route}\x1b[0m`); // Cyan für Middleware
            } else {
                console.log(`\x1b[1m\x1b[31mRoute: ${route}\x1b[0m`); // Grün für normale Routen
            }
        }
    }
}