import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { Commentary, CommentaryDocument } from './schemas/commentary.schema';
import { MatchesGateway } from './matches.gateway';

@Injectable()
export class MatchesService {
    constructor(
        @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
        @InjectModel(Commentary.name) private commentaryModel: Model<CommentaryDocument>,
        private gateway: MatchesGateway
    ) { }
    
    async startMatch(teamA: string, teamB: string): Promise<Match> {

        const lastMatch = await this.matchModel.findOne().sort({ matchId: -1 }).exec();
        const newId = lastMatch ? lastMatch.matchId + 1 : 1000;
        
        const match = new this.matchModel({ teamA, teamB, matchId: newId });
        return match.save();

    }

    async addCommentary(matchId: number, over: number, ball: number, eventType: string): Promise<Commentary> {
        const commentary = new this.commentaryModel({ matchId, over, ball, eventType });
        const saved = await commentary.save();
        this.gateway.sendCommentaryUpdate(saved);
        return commentary.save();
    }

    async getMatch(matchId: number) {
        const match = await this.matchModel.findOne({ matchId }).exec();
        if (!match) {
            return null;
        }

        const commentary = await this.commentaryModel.find({ matchId }).sort({ createdAt: 1 }).exec();
        return { match, commentary };
    }

    async getAllMatches() {
        return this.matchModel.find().sort({ createdAt: -1 }).exec();
    }
}
