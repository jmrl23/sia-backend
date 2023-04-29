import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { readdirSync, statSync } from 'fs';

@Injectable()
export class DocsService {
  async getData(name: string) {
    const file = join(__dirname, '../../docs/', name);

    try {
      const data = await readFile(file, {
        encoding: 'utf-8',
      });
      return data;
    } catch (error: unknown) {
      throw new NotFoundException('Docs not found');
    }
  }

  async getList() {
    const location = join(__dirname, '../../docs/');
    const files = readdirSync(location).reduce((collection, file) => {
      const status = statSync(join(location, file));
      if (status.isFile() && file.endsWith('.md')) collection.push(file);
      return collection;
    }, []);

    return files;
  }
}
