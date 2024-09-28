import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: Number(587),
  auth: {
    user: '7cdc6d001@smtp-brevo.com',
    pass: 'XNahSvsZC8KHQ5Gp',
  },
});

const options = {
  from: 'okolomanov@gmail.com',
  to: 'bewagi8338@sgatra.com',
  subject: 'Reset your password',
  html: `<p>Click <a href="/">here</a> to reset ypur password</p>`,
};

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};

await sendEmail(options);
