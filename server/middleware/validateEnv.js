import dotenv from 'dotenv';

dotenv.config();

export function validateEnv(requiredVars = []) {
    const missingVars = requiredVars.filter((key) => !process.env[key]);

    if (missingVars.length > 0) {
        throw new Error(
        `Följande miljövariabler saknas: ${missingVars.join(', ')}`
        );
    }
}
