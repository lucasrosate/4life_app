import { Console } from 'console';
import { Dropbox } from 'dropbox';
const authKeys: authKeysInterface = require('../../dropboxConfig.json')

interface authKeysInterface {
    dropbox: {
        token: string
    }
}


const dbx = new Dropbox({
    accessToken: authKeys.dropbox.token,
})

const printFiles = async () => {
    return await dbx.filesListFolder({
        path: '',
    }).then(res => res)
        .catch(err => err);

}



export default printFiles;