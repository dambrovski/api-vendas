import nodemailer from 'nodemailer';
import HandlerbarsMailTemplate from './HandlerbarsMailTemplate';

interface IEmailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IparseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IsendMail {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IparseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: IsendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlerbarsMailTemplate();

    const tranporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await tranporter.sendMail({
      from: {
        name: from?.name || 'Equipe API VENDAS',
        address: from?.email || 'teste@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
