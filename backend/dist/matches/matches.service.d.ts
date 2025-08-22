import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { Commentary, CommentaryDocument } from './schemas/commentary.schema';
import { MatchesGateway } from './matches.gateway';
export declare class MatchesService {
    private matchModel;
    private commentaryModel;
    private gateway;
    constructor(matchModel: Model<MatchDocument>, commentaryModel: Model<CommentaryDocument>, gateway: MatchesGateway);
    startMatch(teamA: string, teamB: string): Promise<Match>;
    addCommentary(matchId: number, over: number, ball: number, eventType: string): Promise<Commentary>;
    getMatch(matchId: number): Promise<{
        match: import("mongoose").Document<unknown, {}, MatchDocument, {}, {}> & Match & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        commentary: (import("mongoose").Document<unknown, {}, CommentaryDocument, {}, {}> & Commentary & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | null>;
    getAllMatches(): Promise<(import("mongoose").Document<unknown, {}, MatchDocument, {}, {}> & Match & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
