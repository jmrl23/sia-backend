import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { renderFile, Data } from 'ejs';
import { existsSync } from 'fs';

@Injectable()
export class EJSService {
  private static templatesDir = join(__dirname, '../../../../templates/');

  getTemplate(name: string) {
    const template = join(EJSService.templatesDir, `${name}.ejs`);
    return template;
  }

  render<T extends Data>(templateName: string, data?: T) {
    const template = this.getTemplate(templateName);
    if (!existsSync(template)) {
      throw new InternalServerErrorException(
        `Cannot render template ${templateName}`,
      );
    }
    return renderFile(template, data);
  }
}
