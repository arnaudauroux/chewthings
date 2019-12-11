import { UploadFile } from 'antd/lib/upload/interface';

interface Photo {
    uid: string;
    size: number;
    name: string;
    lastModified?: Date;
}

export default Photo;
