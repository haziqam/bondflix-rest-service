import fs from 'fs';
import path from 'path';

export const deleteFile = (filename: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(process.cwd(), '', filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
                return
            }
            resolve();
        });
    });
};
