import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Match, MatchSchema } from './schemas/match.schema';
import { Commentary, CommentarySchema } from './schemas/commentary.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesGateway } from './matches.gateway';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Commentary.name, schema: CommentarySchema}
    ]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService, MatchesGateway]
})
export class MatchesModule {}
