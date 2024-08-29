// @ts-ignore
import * as config from '../../../dms.config.json';
// @ts-ignore
import {Collection, MongoClient} from 'mongodb';

export class DbController {
    private connectionString;
    protected client: MongoClient;
    protected dbName: string = '';
    protected collection: Collection | null = null;
    protected collectionName: string = '';

    constructor() {
        this.connectionString = config.backendConfig.dbConfig.connectionString;
        this.dbName = config.backendConfig.dbConfig.databaseName;
        this.client = new MongoClient(this.connectionString);
    }

    private async connect() {
        // Connect to the database
        await MongoClient.connect(this.connectionString).then(async (client: any) => {
            this.client = client;
            this.collection = await this.client.connect().then(() => {
                return this.client!.db(this.dbName).collection(this.collectionName);
            });
        });
    }

    private async disconnect(){
        // Disconnect from the database
        await this.client!.close();
    };

    public async query(queryMethod: any, collectionName: string = 'users'){
        this.collectionName = collectionName;
        try {
            await this.connect();
            const result = await queryMethod();
            await this.disconnect();
            return result;
        } catch (err) {
            return err;
        }
    };
}