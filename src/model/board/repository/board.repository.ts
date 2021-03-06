import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Board } from "../schemas/board.schema";
import { Model, Types } from "mongoose";
import { BoardCreateUpdateDto } from "../dto/board-create-update.dto";
import { Comments } from "../../comments/schemas/comments.schema";

@Injectable()
export class BoardRepository {
  constructor(
    @InjectModel("boards") readonly boardModel: Model<Board>,
    @InjectModel("comments") readonly commentsModel: Model<Comments>,
  ) {}

  async findBoardWithId(id: Types.ObjectId | string): Promise<Board> {
    return await this.boardModel
      .findById(id)
      .populate("commentList", this.commentsModel);
  }

  async findBoardsWithName(name: string): Promise<Board[]> {
    return await this.boardModel.find().where("author").equals(name);
  }

  async findBoards(): Promise<Board[]> {
    return this.boardModel
      .find()
      .populate("comments_detail", this.commentsModel);
  }

  async existBoardId(id: Types.ObjectId | string): Promise<boolean> {
    return await this.boardModel.exists({ _id: id });
  }

  async existBoardTitle(title: string): Promise<boolean> {
    return await this.boardModel.exists({ title });
  }

  async create(board: BoardCreateUpdateDto): Promise<Board> {
    return await this.boardModel.create(board);
  }

  async update(
    id: Types.ObjectId | string,
    board: BoardCreateUpdateDto,
  ): Promise<void> {
    await this.boardModel.updateOne({ _id: id }, board);
  }

  async delete(id: Types.ObjectId | string): Promise<void> {
    await this.boardModel.deleteOne({ _id: id });
  }

  async deleteAllBoards(name: string): Promise<void> {
    await this.boardModel.deleteMany().where("author").equals(name);
  }
}
