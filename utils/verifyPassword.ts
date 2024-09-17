import crypto from 'crypto'

// Function to verify the password using crypto
const verifyPassword = (
    password: string,
    storedHash: string
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const [salt, hash] = storedHash.split(":");
        crypto.pbkdf2(
            password,
            salt,
            1000, // Number of iterations
            64, // Key length
            "sha512", // Digest algorithm
            (err, derivedKey) => {
                if (err) return reject(err);
                resolve(hash === derivedKey.toString("hex"));
            }
        );
    });
};

export default verifyPassword