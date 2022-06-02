import { InjectModel } from "@nestjs/mongoose";
import { Image } from "../schemas/image.schema";
import { Model } from "mongoose";
import { ImageUploadDto } from "../dto/image-upload.dto";
import { ImageReturnDto } from "../dto/image-return.dto";

export class ImageRepository {
  constructor(@InjectModel("Image") readonly imageModel: Model<Image>) {}

  async uploadImg(image: ImageUploadDto): Promise<ImageReturnDto> {
    const fileNameOnUrl = `http://localhost:8001/uploads/${image.fileName}`;

    await this.imageModel.create({
      fileName: fileNameOnUrl,
      author: image.author,
      originalName: image.originalName,
    });

    return { name: image.originalName, url: fileNameOnUrl };
  }
}
