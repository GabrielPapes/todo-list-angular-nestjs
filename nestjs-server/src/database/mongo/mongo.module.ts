import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

const MONGO_HOST_IP = process.env.MONGO_HOST_IP || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'todo';

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb://${MONGO_HOST_IP}:${MONGO_PORT}/${MONGO_DATABASE}`)
    ]
})
export class MongoDatabaseModule {}