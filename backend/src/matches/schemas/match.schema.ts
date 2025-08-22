import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema({ timestamps: true })

export class Match{
    @Prop({ required: true })
    teamA: string;

    @Prop({ required: true })
    teamB: string;

    @Prop({ unique: true })
    matchId: number;
}


export const MatchSchema = SchemaFactory.createForClass(Match);