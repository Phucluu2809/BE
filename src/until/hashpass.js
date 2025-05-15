import crypto from 'crypto'; // có sẵn hàm hash sha256

export const hashpass = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

export const comparePassword = (inputPassword, hashedPassword) => {
  return hashpass(inputPassword) === hashedPassword;
};
