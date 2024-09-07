import crypto from 'crypto';

// Function to compare a password with a hashed password
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
    const [salt, hash] = hashedPassword.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return verifyHash === hash;
};