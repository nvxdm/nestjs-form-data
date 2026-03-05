import { StoredFile } from '../classes/storage';
import { Type } from '@nestjs/common';

export interface FormDataInterceptorConfig {
  storage?: Type<StoredFile>,
  fileSystemStoragePath?: string;

  /**
   * @deprecated
   * Use `cleanupAfterSuccessHandle` and `cleanupAfterFailedHandle` instead;
   */
  autoDeleteFile?: boolean;

  /**
   * Indicates whether cleanup should be performed after successful handling.
   * If set to true, all processed and uploaded files will be deleted after successful processing by the final method.
   * This means that the `delete` method will be called on all files (StoredFile)
   * @type {boolean}
   * @default true
   */
  cleanupAfterSuccessHandle?: boolean;

  /**
   * Indicates whether cleanup should be performed after error handling.
   * If set to true, all processed and uploaded files will be deleted after unsuccessful processing by the final method.
   * This means that the `delete` method will be called on all files (StoredFile)
   * @type {boolean}
   * @default true
   */
  cleanupAfterFailedHandle?: boolean;


  /**
   * If true, the response will wait for file cleanup to complete before being sent.
   * If false, cleanup runs in the background (fire-and-forget) for faster response times.
   * @type {boolean}
   * @default true
   */
  awaitCleanup?: boolean;

  limits?: FormDataInterceptorLimitsConfig;
  /**
   * If you want the module to be available globally
   * Once you import the module and configure it, it will be available globally
   * Only for sync configuration
   */
  isGlobal?: boolean;

  /**
   * Callback function to customize the uploaded file's name.
   * This function receives the original file name as a parameter
   * and should return the new file name.
   *
   * @param originalName - The original name of the uploaded file
   * @returns The new file name
   */
  filename?: (originalName: string) => string;
}


export interface FormDataInterceptorLimitsConfig {
  fieldNameSize?: number;
  fieldSize?: number;
  fields?: number;
  fileSize?: number;
  files?: number;
  parts?: number;
  headerPairs?: number;
}



