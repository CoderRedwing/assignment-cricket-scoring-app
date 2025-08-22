import { Document } from 'mongoose';
export type MatchDocument = Match & Document;
export declare class Match {
    teamA: string;
    teamB: string;
    matchId: number;
}
export declare const MatchSchema: import("mongoose").Schema<Match, import("mongoose").Model<Match, any, any, any, Document<unknown, any, Match, any, {}> & Match & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Match, Document<unknown, {}, import("mongoose").FlatRecord<Match>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Match> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
