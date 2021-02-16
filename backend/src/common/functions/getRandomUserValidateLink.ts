import crypto from 'crypto';
import { IUserModel } from "../../models/UserModel";


const getRandomUserValidateLink = async (username: string): Promise<string> => {
    const randomKey = crypto.randomBytes(16).toString('hex').slice(0, 16);

    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        process.env.ENCRYPT_TOKEN || 'YG2PbtxxB4e5OFiZJR1YOnBjT4oavOFb',
        randomKey
    );

    return (Buffer.concat([cipher.update(username), cipher.final()])).toString('hex');
}

export default getRandomUserValidateLink;