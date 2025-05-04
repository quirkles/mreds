export const passwordResetMail = (url: string, token: string): string => {
  return `<div>
  <p>You are receiving this email because you recently requested a password reset at Football Stats</p>
  <p>Click <a href = '${url}/reset_password/${token}'>here</a> to reset your password</p>
  <p>Thank you for using Football Stats. Enjoy!</p>
  </div>`;
};
