import {
  Controller,
  UseInterceptors,
  Post,
  // UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  MulterModule,
} from '@nestjs/platform-express';

MulterModule.register({
  dest: './upload',
});

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(AnyFilesInterceptor({ dest: 'upload/' }))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    // return {
    //   files: files[0].buffer.toString(),
    // };
  }
}
