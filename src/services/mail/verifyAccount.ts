export const verifyAccountMail = (url: string, token: string): string => {
  return `<div>
  <p>You are receiving this email because you recently signed up to Football Stats</p>
  <p>Click <a href = '${url}/verify_email/${token}'>here</a> to confirm your email</p>
  <p>Thank you for joining Football Stats. Enjoy!</p>
  </div>`;
};
