import { Injectable } from '@angular/core';

@Injectable()
export class UploadDataService {
  chunkSize = 256;
  chunk: Uint16Array;
  blob: Blob;

  constructor(kb) {
    this.chunk = new Uint16Array(this.chunkSize);
    this.generate(kb);
  }

  generate(kb): Blob {
    const chunks = kb * 2;
    const buff = new Array(chunks);
    for (let index = 0; index < chunks; index++) {
      buff[index] = this.chunk;
    }
    this.blob = new Blob(buff, { type: 'application/octet-stream' });
    return this.blob;
  }
}
