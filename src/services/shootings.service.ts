import * as AzureStorageBlob from '@azure/storage-blob';
import Shooting from '../models/shooting.model';
import Photo from '../models/photo.model';

class ShootingsService {
    private blobServiceClient: AzureStorageBlob.BlobServiceClient;

    constructor() {
        this.blobServiceClient = new AzureStorageBlob.BlobServiceClient(
            'https://chewthingsstorage.blob.core.windows.net/?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2021-12-01T20:37:39Z&st=2019-12-10T12:37:39Z&spr=https&sig=%2BpHHdFP3qdTRJTyhN9f63v5vkEmnRaWhD7uNXvrnINI%3D');
    }

    public async createShootingAsync(name: string) {
        const createContainerResponse = await this.blobServiceClient.getContainerClient(name).create();
    }

    public async AddPhotoAsync(shootingName: string, name: string, file: File) {
        await this.blobServiceClient
            .getContainerClient(shootingName)
            .getBlobClient(name)
            .getBlockBlobClient()
            .uploadBrowserData(file);
    }

    public async getShootingsAsync(): Promise<Array<Shooting>> {
        const shootingNames: Array<Shooting> = [];

        for await (const container of this.blobServiceClient.listContainers()) {
            shootingNames.push({ name: container.name, lastModified: container.properties.lastModified });
        }

        return shootingNames;
    }

    public async getShootingPhotosAsync(shootingName: string) {
        const shootingNames: Array<Photo> = [];
        const containerClient = this.blobServiceClient.getContainerClient(shootingName);

        for await (const blob of containerClient.listBlobsFlat()) {
            shootingNames.push({
                uid: blob.name,
                size: blob.properties.contentLength || 0,
                name: blob.name,
                lastModified: blob.properties.lastModified
            });
        }

        return shootingNames;
    }
}

export default ShootingsService;
