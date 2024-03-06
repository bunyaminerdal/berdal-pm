import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const emailHtml = `<!DOCTYPE html>
  <html lang="en">  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bünyamin Erdal</title>
      <meta>
      <meta content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 20px;">
                  <h1 style="color: #333;">Two Factor Authentication</h1>
                  <p style="color: #777;">Your 2FA code: <strong>${token}</strong></p>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px; text-align: center;">
                  <p style="color: #777;">&copy; 2023 <span style="font-size: 12px;"></span><a href="https://bunyaminerdal.dev" target="_blank">Bünyamin Erdal</a></p>
              </td>
          </tr>
      </table>
  </body>  
  </html> `;
  await resend.emails.send({
    from: 'Bünyamin Erdal <noreply@bunyaminerdal.dev>',
    to: email,
    subject: '2FA Code',
    html: emailHtml,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const emailHtml = `<!DOCTYPE html>
  <html lang="en">  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bünyamin Erdal</title>
      <meta>
      <meta content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 20px;">
                  <h1 style="color: #333;">Reset Your Password</h1>
                  <p style="color: #777;">Click <a href="${resetLink}">here</a> to reset password.</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px; text-align: center;">
                  <p style="color: #777;">&copy; 2023 <span style="font-size: 12px;"></span><a href="https://bunyaminerdal.dev" target="_blank">Bünyamin Erdal</a></p>
              </td>
          </tr>
      </table>
  </body>  
  </html> `;
  await resend.emails.send({
    from: 'Bünyamin Erdal <noreply@bunyaminerdal.dev>',
    to: email,
    subject: 'Reset your password',
    html: emailHtml,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const emailHtml = `<!DOCTYPE html>
  <html lang="en">  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bünyamin Erdal</title>
      <meta>
      <meta content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 20px;">
                  <h1 style="color: #333;">Confirm Email</h1>
                  <p style="color: #777;">Click <a href="${confirmLink}">here</a> to confirm email.</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px; text-align: center;">
                  <p style="color: #777;">&copy; 2023 <span style="font-size: 12px;"></span><a href="https://bunyaminerdal.dev" target="_blank">Bünyamin Erdal</a></p>
              </td>
          </tr>
      </table>
  </body>  
  </html> `;

  await resend.emails.send({
    from: 'Bünyamin Erdal <noreply@bunyaminerdal.dev>',
    to: email,
    subject: 'Confirm your email',
    html: emailHtml,
  });
};

export const sendContactMail = async (
  email: string,
  name: string,
  subject: string,
  context: string
) => {
  const emailHtml = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bünyamin Erdal</title>
      <meta>
      <meta content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 20px;">
                  <h1 style="color: #333;">Contact Email</h1>
                  <p style="color: #777;">Email Sender: <strong>${name}</strong>, (${email})</p>
                  <p style="color: #777;">Email Subject: <strong>${subject}</strong></p>
                  <p style="color: #777;">Email Context: ${context}</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px; text-align: center;">
                  <p style="color: #777;">&copy; 2023 <span style="font-size: 12px;"></span><a href="https://bunyaminerdal.dev" target="_blank">Bünyamin Erdal</a></p>
              </td>
          </tr>
      </table>
  </body>
  
  </html>
  `;

  await resend.emails.send({
    from: 'Bünyamin Erdal <noreply@bunyaminerdal.dev>',
    to: process.env.CONTACT_EMAIL ?? '',
    subject: 'Contact Me',
    html: emailHtml,
  });
};
