import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { readdirSync, statSync } from 'fs';
import { EJSService } from 'src/common/services/ejs/ejs.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocsService {
  constructor(
    private readonly ejsService: EJSService,
    private readonly configService: ConfigService,
  ) {}

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

  async render(title: string, content: string) {
    const nonce = this.configService.get<string>('NONCE');
    const html = this.ejsService.render('docs', {
      title,
      nonce,
      content,
    });
    return html;
  }
}
