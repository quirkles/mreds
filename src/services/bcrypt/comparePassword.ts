import bcrypt from 'bcrypt';

export const comparePassword = async (
  candidatePassword: string,
  dbPassword: string
): Promise<boolean> => await bcrypt.compare(candidatePassword, dbPassword);
