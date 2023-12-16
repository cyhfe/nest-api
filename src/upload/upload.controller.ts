import {
  Controller,
  UseInterceptors,
  Post,
  // UploadedFile,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  MulterModule,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname, resolve } from 'node:path';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

// const storage = MulterModule.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const user = req.user as User;
          const destination = resolve(`./upload/${user.id}`);
          const exists = existsSync(destination);
          if (!exists) {
            await mkdir(destination);
          }
          return callback(null, destination);
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);

          callback(null, `${name}-${Date.now()}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    // return {
    //   files: files[0].buffer.toString(),
    // };
  }
}
