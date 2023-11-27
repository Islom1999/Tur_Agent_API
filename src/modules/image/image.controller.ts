import { Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.util';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';
import { Public } from 'src/common/decorators';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Images')
@Controller('image')
export class ImageController {

    constructor(private service: ImageService) { }

    @Public()
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }), fileFilter: imageFileFilter
        }))
    @HttpCode(HttpStatus.OK)
    async uploadFile(@UploadedFile() file: any, @Req() request: Request): Promise<{ url: string }> {
        const url = request.protocol + '://' + request.get('host');
        return this.service.uploadImage(file, url);
    }

    @Public()
    @Get(':filename')
    async getImage(@Param('filename',) filename: string, @Res() res: Response) {
        res.sendFile(filename, { root: './uploads' });
    }
}
