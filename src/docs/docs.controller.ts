import { Controller, Get, Header, Param } from '@nestjs/common';
import { DocsService } from './docs.service';
import { marked } from 'marked';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  @Header('Cache-Control', 'max-age=3600')
  async index() {
    const files = await this.docsService.getList();
    const html = this.docsService.render(
      'Docs',
      `
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
    );
    return html;
  }

  @Get(':name([a-zA-Z-_]+.md)')
  @Header('Cache-Control', 'max-age=3600')
  async fetchDocs(@Param('name') name: string) {
    const data = await this.docsService.getData(name);
    const html = this.docsService.render(`Docs | ${name}`, marked(data));
    return html;
  }
}
