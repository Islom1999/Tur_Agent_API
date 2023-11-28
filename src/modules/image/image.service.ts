import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { unlinkSync, access, constants } from 'fs';

@Injectable()
export class ImageService {
  constructor(private _prisma: PrismaService) {}

  // controller
  async uploadImage(file: any, url: string): Promise<{ url: string }> {
    await this._prisma.image.create({ data: { imageName: file.filename } });
    return { url: `/api/image/${file.filename}` };
  }

  // utils
  async changeImageUsed(imageName: string): Promise<void> {
    try {
      await this._prisma.image.update({
        where: { imageName }, 
        data: { unused: false },
      });
    } catch (error) {      
    }
  }

  async changeImagesUsed(imageNames: string[]): Promise<void> {
    await this._prisma.image.updateMany({
      where: { imageName: { in: imageNames } },
      data: { unused: false },
    });
  }

  async deleteImage(imageName: string): Promise<void> {
    try {
      // image borligini tekshirish
      access(imageName, constants.F_OK, (err) => {
        if (!err) {
          unlinkSync(`uploads/${imageName}`);
        } else {
          console.log(`cannot image ${imageName}`);
        }
      });
      await this._prisma.image.delete({ where: { imageName } });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImages(imageNames: string[]): Promise<void> {
    try {
      imageNames.forEach((imageName) => {
        // image borligini tekshirish
        access(imageName, constants.F_OK, (err) => {
          if (!err) {
            unlinkSync(`uploads/${imageName}`);
          } else {
            console.log(`cannot image ${imageName}`);
          }
        });
        // unlinkSync(`uploads/${imageName}`);
      });
      await this._prisma.image.deleteMany({
        where: { imageName: { in: imageNames } },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
