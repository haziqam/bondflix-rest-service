import bcrypt from 'bcrypt';

export async function hashString(str: string) {
    const SALT_ROUNDS = process.env.SALT_ROUNDS;
    if (SALT_ROUNDS !== null && SALT_ROUNDS !== undefined){
        // @ts-ignore
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        return await bcrypt.hash(str, saltRounds);
    }
}

export async function compareHashedString(str: string, hashedString: string) {
    return await bcrypt.compare(str, hashedString);
}
