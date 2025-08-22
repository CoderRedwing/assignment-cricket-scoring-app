import { Module } from '@nestjs/common';
import { MatchesModule } from './matches/matches.module';
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('your-MONGO_URI=mongodb://localhost:27017/cricket-scoring-app'),
    MatchesModule],
})
export class AppModule {}
