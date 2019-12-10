import * as AzureStorageBlob from '@azure/storage-blob';
import Shooting from '../models/shooting.model';

class ShootingsService {
    private containerClient: AzureStorageBlob.ContainerClient;

    constructor() {
        const blobServiceClient = new AzureStorageBlob.BlobServiceClient(
            'https://clickr.blob.core.windows.net/?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2021-01-01T18:23:46Z&st=2019-12-07T10:23:46Z&spr=https&sig=mFvQ2fehDGKDFnLmaU0cZuWkFd%2BoglHL7lxPRLBfzk4%3D');

        this.containerClient = blobServiceClient.getContainerClient('shootings');
    }

    public async createShootingAsync(name: string) {
        const content = 'hello';

        const blobClient = this.containerClient.getBlobClient(name);
        const blockBlobClient = blobClient.getBlockBlobClient();
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    }

    public async getShootingsAsync(): Promise<Array<Shooting>> {
        const shootingNames: Array<Shooting> = [];

        for await (const blob of this.containerClient.listBlobsFlat()) {
            shootingNames.push({ name: blob.name, lastModified: blob.properties.lastModified });
        }

        return shootingNames;
    }
}

export default ShootingsService;
