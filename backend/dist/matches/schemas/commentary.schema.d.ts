import { Document } from 'mongoose';
export type CommentaryDocument = Commentary & Document;
export declare class Commentary {
    matchId: number;
    over: number;
    ball: number;
    eventType: string;
}
export declare const CommentarySchema: import("mongoose").Schema<Commentary, import("mongoose").Model<Commentary, any, any, any, Document<unknown, any, Commentary, any, {}> & Commentary & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Commentary, Document<unknown, {}, import("mongoose").FlatRecord<Commentary>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Commentary> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
