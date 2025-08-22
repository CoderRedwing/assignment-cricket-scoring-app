import { MatchesService } from './matches.service';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    startMatch(body: {
        teamA: string;
        teamB: string;
    }): Promise<import("./schemas/match.schema").Match>;
    addCommentary(id: number, body: {
        over: number;
        ball: number;
        eventType: string;
    }): Promise<import("./schemas/commentary.schema").Commentary>;
    getMatch(id: number): Promise<{
        match: import("mongoose").Document<unknown, {}, import("./schemas/match.schema").MatchDocument, {}, {}> & import("./schemas/match.schema").Match & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        commentary: (import("mongoose").Document<unknown, {}, import("./schemas/commentary.schema").CommentaryDocument, {}, {}> & import("./schemas/commentary.schema").Commentary & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | null>;
    getAllMatches(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/match.schema").MatchDocument, {}, {}> & import("./schemas/match.schema").Match & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
