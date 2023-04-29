import { Controller, Get, Header, Param } from '@nestjs/common';
import { join } from 'path';
import { DocsService } from './docs.service';
import { renderFile } from 'ejs';
import { ConfigService } from '@nestjs/config';
import { marked } from 'marked';

@Controller('docs')
export class DocsController {
  constructor(
    private readonly docsService: DocsService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Header('Cache-Control', 'max-age=604800')
  async index() {
    const files = await this.docsService.getList();
    const template = join(__dirname, '../../templates/docs.ejs');
    const NONCE = this.configService.get<string>('NONCE');
    const html = renderFile(template, {
      title: `Docs`,
      nonce: NONCE,
      content: `
      <h1>Docs</h1>
        <p>Documentation for development</p>
        <ul>
          ${files
            .map((file) => {
              return `<li>
              <a href="./docs/${file}">${file.replace(/\.md$/, '')}</a>
            </li>`;
            })
            .join('')}
        </ul>
        `,
    });

    return html;
  }

  @Get(':name([a-zA-Z-_]+.md)')
  @Header('Cache-Control', 'max-age=604800')
  async fetchDocs(@Param('name') name: string) {
    const data = await this.docsService.getData(name);
    const template = join(__dirname, '../../templates/docs.ejs');
    const NONCE = this.configService.get<string>('NONCE');
    const html = renderFile(template, {
      title: `Docs | ${name}`,
      nonce: NONCE,
      content: marked(data),
    });

    return html;
  }
}
