import { Console } from 'console';
import {Dropbox} from 'dropbox';

const dbx = new Dropbox({
    accessToken: 'sl.AlqCv8-P5hh9d-ZGzi8nUJOYZZzMg5LxCEukwv6p1hQ7Oxc5ub5U_LeO10WaOT6Sn3vYt_o1u_pgSnlCez8L61yXaiPAeaWNsjI5RGL0yPabrNykC3CmfdXBDPbD3J-M8xcwEC8'
})

const printFiles = async () => {
    return await dbx.filesListFolder({
        path: '',
    }).then(res=> res)
    .catch(err => err);

} 



export default printFiles;