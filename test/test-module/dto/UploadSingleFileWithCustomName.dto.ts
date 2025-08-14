import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize, MinFileSize } from '../../../src';

export class UploadSingleFileWithCustomNameDto {

  @IsFile()
  @HasMimeType(['text/plain'])
  @MaxFileSize(5)
  @MinFileSize(3)
  file: FileSystemStoredFile;

}