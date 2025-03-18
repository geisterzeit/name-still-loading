import { Behaviour, Text } from "@needle-tools/engine";
import { MongoClient, ServerApiVersion } from "mongodb";

const DATABASE_URL =  "mongodb+srv://admin:admin@cluster-still-loading.doubh.mongodb.net/?retryWrites=true&w=majority&appName=cluster-still-loading"

export class Database extends Behaviour {
    private client: MongoClient | undefined;

    async init() : Promise<void> {
        // this.client = new MongoClient(DATABASE_URL)
        // this.client.connect()
        // await this.client.connect()
        // this.client = new MongoClient(DATABASE_URL, {
        //     serverApi: {
        //         version: ServerApiVersion.v1,
        //         strict: true,
        //         deprecationErrors: true,
        //     }
        // });
        // await this.client.connect()
    }

    public async getUserKillCountForTowerId(userId : string, towerId : string) : Promise<number> {
        return 0;
        // try {
        //     // Connect the client to the server	(optional starting in v4.7)
        //     await this.client.connect();
        //     // Send a ping to confirm a successful connection
        //     await client.db("admin").command({ ping: 1 });
        //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // } finally {
        //     // Ensures that the client will close when you finish/error
        //     await client.close();
        // }
    }
}