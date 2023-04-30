import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class GmailService {
  private transport = null;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  getTransport(): Transporter<SMTPTransport.SentMessageInfo> {
    if (this.transport) return this.transport;
    const url = this.configService.get<URL>('SMTP_TRANSPORT_URL');
    const transport = createTransport({
      host: url.hostname,
      port: parseInt(url.port, 10),
      secure: url.port === '465',
      service: 'gmail',
      auth: {
        type: 'oauth2',
        user: decodeURIComponent(url.username),
        clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
        clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
      },
    });
    this.transport = transport;
    return this.getTransport();
  }

  async sendEmail(mailOptions: MailOptions = {}) {
    const transport = this.getTransport();
    const result = await transport.sendMail(mailOptions);
    return result;
  }
}
