import handlebars from 'handlebars';
import fs from 'fs';
import { encode } from 'punycode';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IparseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}
export default class handlebarsMailTemplate {
  public async parse({ file, variables }: IparseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
