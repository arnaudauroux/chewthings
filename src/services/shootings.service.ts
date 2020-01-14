import * as AzureStorageBlob from '@azure/storage-blob';
import Shooting from '../models/shooting.model';
import Photo from '../models/photo.model';

class ShootingsService {
    private blobServiceClient: AzureStorageBlob.BlobServiceClient;

    private blobStorageUrl: string;

    private blobStorageUrlParameters: string;

    constructor() {
        this.blobStorageUrl = 'https://chewthingsstorage.blob.core.windows.net';
        this.blobStorageUrlParameters = 'sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2021-12-01T20:37:39Z&st=2019-12-10T12:37:39Z&spr=https&sig=%2BpHHdFP3qdTRJTyhN9f63v5vkEmnRaWhD7uNXvrnINI%3D';
        this.blobServiceClient = new AzureStorageBlob.BlobServiceClient(`${this.blobStorageUrl}/?${this.blobStorageUrlParameters}`);
    }

    public async createShootingAsync(name: string) {
        await this.blobServiceClient.getContainerClient(name).create();
    }

    public async getShootingsAsync(): Promise<Array<Shooting>> {
        const shootingNames: Array<Shooting> = [];

        for await (const container of this.blobServiceClient.listContainers()) {
            shootingNames.push({ name: container.name, lastModified: container.properties.lastModified });
        }

        return shootingNames;
    }

    public async getShootingPhotosAsync(shootingName: string): Promise<Array<Photo>> {
        const shootingNames: Array<Photo> = [];
        const containerClient = this.blobServiceClient.getContainerClient(shootingName);

        for await (const blob of containerClient.listBlobsFlat()) {
            shootingNames.push({
                uid: blob.name,
                size: blob.properties.contentLength || 0,
                name: blob.name,
                lastModified: blob.properties.lastModified,
                url: `${this.blobStorageUrl}/${shootingName}/${blob.name}?${this.blobStorageUrlParameters}`
            });
        }

        return shootingNames;
    }

    public async AddPhotoAsync(shootingName: string, file: File) {
        await this.blobServiceClient
            .getContainerClient(shootingName)
            .getBlobClient(file.name)
            .getBlockBlobClient()
            .uploadBrowserData(file);
    }

    public async GetPhotoAsync(shootingName: string, name: string): Promise<Blob | undefined> {
        const downloadBlockBlobResponse: AzureStorageBlob.BlobDownloadResponseModel = await this.blobServiceClient
            .getContainerClient(shootingName)
            .getBlobClient(name)
            .download();

        return await downloadBlockBlobResponse.blobBody;
    }

    public async DeletePhotoAsync(shootingName: string, fileName: string) {
        await this.blobServiceClient
            .getContainerClient(shootingName)
            .getBlobClient(fileName)
            .delete();
    }

    public async DeleteShootingAsync(shootingName: string) {
        await this.blobServiceClient
            .getContainerClient(shootingName)
            .delete();
    }
}

export default ShootingsService;
