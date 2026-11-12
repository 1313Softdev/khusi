import nodemailer from 'nodemailer';
import { prisma } from './prisma';

export async function getTransporter() {
  const setting = await prisma.smtpSetting.findFirst();
  if (!setting || !setting.isEnabled) {
    return null;
  }

  const isSecure = setting.encryption === 'SSL' || setting.smtpPort === 465;

  return nodemailer.createTransport({
    host: setting.smtpHost,
    port: setting.smtpPort,
    secure: isSecure,
    auth: setting.smtpUsername && setting.smtpPassword ? {
      user: setting.smtpUsername,
      pass: setting.smtpPassword,
    } : undefined,
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendContactEmails(inquiry: {
  fullName: string;
  email: string;
  mobileNumber: string;
  subject: string;
  message: string;
}) {
  try {
    const smtpSetting = await prisma.smtpSetting.findFirst();
    if (!smtpSetting || !smtpSetting.isEnabled) {
      console.log('SMTP disabled or not configured. Skipping email dispatch.');
      return { success: false, reason: 'SMTP not enabled' };
    }

    const transporter = await getTransporter();
    if (!transporter) {
      return { success: false, reason: 'Could not create transport' };
    }

    // 1. Send notification to admin
    const adminTemplate = await prisma.emailTemplate.findUnique({
      where: { templateKey: 'contact_notification' },
    });

    const adminSubject = adminTemplate?.subject
      ? adminTemplate.subject
          .replace('{{subject}}', inquiry.subject)
          .replace('{{full_name}}', inquiry.fullName)
      : `New Public Inquiry from ${inquiry.fullName}: ${inquiry.subject}`;

    const adminHtml = adminTemplate?.bodyHtml
      ? adminTemplate.bodyHtml
          .replace('{{full_name}}', inquiry.fullName)
          .replace('{{email}}', inquiry.email)
          .replace('{{mobile_number}}', inquiry.mobileNumber)
          .replace('{{subject}}', inquiry.subject)
          .replace('{{message}}', inquiry.message.replace(/\n/g, '<br/>'))
      : `<p><strong>From:</strong> ${inquiry.fullName} (${inquiry.email}, ${inquiry.mobileNumber})</p><p><strong>Subject:</strong> ${inquiry.subject}</p><p><strong>Message:</strong></p><p>${inquiry.message}</p>`;

    const adminMailOptions = {
      from: `"${smtpSetting.senderName}" <${smtpSetting.senderEmail}>`,
      to: smtpSetting.adminNotificationEmail,
      subject: adminSubject,
      html: adminHtml,
    };

    if (smtpSetting.smtpPassword) {
      await transporter.sendMail(adminMailOptions);
    } else {
      console.log('SMTP password empty. Mocking admin notification email send.');
    }

    // 2. Send confirmation to visitor
    const visitorTemplate = await prisma.emailTemplate.findUnique({
      where: { templateKey: 'visitor_confirmation' },
    });

    if (visitorTemplate && visitorTemplate.isActive) {
      const visitorSubject = visitorTemplate.subject
        .replace('{{subject}}', inquiry.subject)
        .replace('{{full_name}}', inquiry.fullName);

      const visitorHtml = visitorTemplate.bodyHtml
        .replace(/\{\{full_name\}\}/g, inquiry.fullName)
        .replace(/\{\{subject\}\}/g, inquiry.subject);

      const visitorMailOptions = {
        from: `"${smtpSetting.senderName}" <${smtpSetting.senderEmail}>`,
        to: inquiry.email,
        subject: visitorSubject,
        html: visitorHtml,
      };

      if (smtpSetting.smtpPassword) {
        await transporter.sendMail(visitorMailOptions);
      } else {
        console.log('SMTP password empty. Mocking visitor confirmation email send.');
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error sending contact emails:', err.message);
    return { success: false, error: err.message };
  }
}

export async function testSmtp(testEmail: string) {
  const smtpSetting = await prisma.smtpSetting.findFirst();
  if (!smtpSetting) throw new Error('SMTP settings not found');

  const transporter = await getTransporter();
  if (!transporter) throw new Error('Unable to initialize SMTP transporter');

  await transporter.verify();

  const info = await transporter.sendMail({
    from: `"${smtpSetting.senderName}" <${smtpSetting.senderEmail}>`,
    to: testEmail,
    subject: 'Test Email - Official Portal of Sardar Khushinder Singh',
    html: `<h3>SMTP Connection Verified Successfully</h3>
<p>This is a test notification confirming that the SMTP email service for <strong>Sardar Khushinder Singh Jand Sahib</strong> is active and functional.</p>
<p>Timestamp: ${new Date().toLocaleString()}</p>`,
  });

  return info;
}
