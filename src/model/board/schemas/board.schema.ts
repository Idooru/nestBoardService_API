import { SchemaOptions, Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

const option: SchemaOptions = {
  autoIndex: true,
  timestamps: true,
};

@Schema(option)
export class Board extends Document {
  @IsNotEmpty()
  @IsString()
  @Prop({
    required: true,
    unique: true,
    length: 20,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Prop({
    required: true,
    unique: true,
  })
  writer: string;

  @IsNotEmpty()
  @IsString()
  @Prop({
    required: true,
    length: 100,
  })
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @Prop({
    required: true,
  })
  isPublic: boolean;

  readonly readOnlyData: {
    id: string;
    title: string;
    writer: string;
    description: string;
    isPublic: boolean;
  };
}

export const BoardSchema = SchemaFactory.createForClass(Board);

BoardSchema.virtual("readOnlyData").get(function (this: Board) {
  return {
    id: this.id,
    title: this.title,
    writer: this.writer,
    description: this.description,
    isPublic: this.isPublic,
  };
});