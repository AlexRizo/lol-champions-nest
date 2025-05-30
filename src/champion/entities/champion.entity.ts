import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Champion extends Document {
  // ? el Id es proporcionado por mongo;
  @Prop({ unique: true, index: true })
  championId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ unique: true, index: true })
  key: number;
}

export const ChampionSchema = SchemaFactory.createForClass(Champion);
