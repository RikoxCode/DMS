import {Logger} from "./helpers/logger";
const config = require('../../dms.config.json');
import express from 'express';

// Import the routes
import { authRoute } from './routes/auth.route';

const app = express();

app.use((express.json)()); // Dies parst JSON-Daten im Body

app.use(express.urlencoded({ extended: true }));


// Use the routes
const prefix: string = config.backendConfig.urlPrefix + '/' + config.backendConfig.version;
app.use(prefix + '/auth', authRoute);

// List all routes
app._router.stack.forEach(function(r: any) {

    if (r.name === 'router') {
        console.log('\n');
        const routePrefix = r.regexp.toString()
            .replace('/^\\', '')
            .replace('?(?=\\/|$)/i', '')
            .replace('\\', '')
            .replace('\\', '')
            .replace('\\', '');

        // Es ist eine Route
        r.handle.stack.forEach(function(route: any) {
            if (route.route) {
                Logger.routeLog(routePrefix + route.route.path.replace('/', ''));
            }
        });
    } else {
        // Es ist eine Middleware
        Logger.routeLog(('Middleware: ' + r.name || 'Unnamed Middleware'));
    }
});


app.listen(config.backendConfig.port, () => {
    console.log(`\nBackend running on port ${config.backendConfig.port}`);
});

// Export the app
export { app, prefix };