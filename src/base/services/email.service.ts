// src/mail/mail.service.ts
import { Global, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Global()
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'islomkarimovalisherovich7007@gmail.com',
        pass: 'ahrgiupkxkzuyxpa',
      },
    });
  }

  async sendVerificationEmail(userEmail: string, verificationCode: string) {
    const mailOptions = {
      from: 'your-email@example.com',
      to: userEmail,
      subject: 'Account Verification',
      text: `Your verification code is: ${verificationCode}`,
      // HTML versiyasini ham qo'shishingiz mumkin
    };

    await this.transporter.sendMail(mailOptions);
  }

  // src/mail/mail.service.ts

  async sendPasswordResetEmail(email: string, passwordResetCode: string) {
    const mailOptions = {
      from: 'islomkarimovalisherovich7007@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Your password reset code is: ${passwordResetCode}`,
      // HTML versiyasini ham qo'shishingiz mumkin
    };

    await this.transporter.sendMail(mailOptions);
  }
}
