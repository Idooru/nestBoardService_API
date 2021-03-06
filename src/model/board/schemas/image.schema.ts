import { Schema, SchemaOptions, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document, Types } from "mongoose";

const option: SchemaOptions = {
  autoIndex: true,
  versionKey: false,
  timestamps: true,
};

@Schema(option)
export class Image extends Document {
  @Prop({
    type: Types.ObjectId,
  })
  imgIdx: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @Prop({
    required: true,
    unique: true,
  })
  fileName: string;

  @IsNotEmpty()
  @IsString()
  @Prop({
    required: true,
  })
  author: string;

  @IsNotEmpty()
  @IsString()
  @Prop({
    required: true,
  })
  originalName: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
