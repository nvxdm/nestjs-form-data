import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Express - Custom file name upload', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Valid file upload with custom filename', () => {
    const testFile = path.resolve(__dirname, 'test-files', 'file.txt');

    return request
      .default(app.getHttpServer())
      .post('/custom-file-name')
      .attach('file', testFile)
      .expect(200)
      .expect({
        filename: 'custom-file.txt',
        mimetype: 'text/plain',
      });
  });

  it('Invalid file upload - multiple files', () => {
    const testFile = path.resolve(__dirname, 'test-files', 'file.txt');

    return request
      .default(app.getHttpServer())
      .post('/custom-file-name')
      .attach('file', testFile)
      .attach('file', testFile)
      .expect(400);
  });

  it('HTTP request with empty form data', () => {
    return request
      .default(app.getHttpServer())
      .post('/custom-file-name')
      .set(
        'content-type',
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      )
      .expect(400);
  });
});

describe('Fastify - Custom file name upload', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({ fastify: true })) as NestFastifyApplication;
  });

  it('Valid file upload with custom filename', () => {
    const testFile = path.resolve(__dirname, 'test-files', 'file.txt');

    return request
      .default(app.getHttpServer())
      .post('/custom-file-name')
      .attach('file', testFile)
      .expect(200)
      .expect({
        filename: 'custom-file.txt',
        mimetype: 'text/plain'
      });
  });

  it('Invalid file upload - multiple files', () => {
    const testFile = path.resolve(__dirname, 'test-files', 'file.txt');

    return request
      .default(app.getHttpServer())
      .post('/custom-file-name')
      .attach('file', testFile)
      .attach('file', testFile)
      .expect(400);
  });

  it('HTTP request with empty form data', () => {
    return request
      .default(app.getHttpServer())
      .post('/custom-file-name')
      .set(
        'content-type',
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      )
      .expect(400);
  });
});
