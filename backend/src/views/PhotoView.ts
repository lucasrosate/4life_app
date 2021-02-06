import { IPhoto } from "../../interfaces";

const photoView = (photo: IPhoto) => {
    return {
        filename: photo.filename
    }
}

export default photoView;