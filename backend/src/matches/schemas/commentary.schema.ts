import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentaryDocument = Commentary & Document;

@Schema({ timestamps: true })

export class Commentary {
    @Prop({ required: true })
    matchId: number;

    @Prop({ required: true })
    over: number;

    @Prop({ required: true })
    ball: number;

    @Prop({ required: true })
    eventType: string;
}


export const CommentarySchema = SchemaFactory.createForClass(Commentary);