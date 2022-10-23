const { BlobServiceClient } = require("@azure/storage-blob");

export class StorageService {

    constructor() {}

    public async downloadContent(containerName: string, blobName: string): Promise<any> {

        let content = "";
        try {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobClient = containerClient.getBlobClient(blobName);
            const downloadBlockBlobResponse = await blobClient.download();
            content = (await this.streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString();
        } catch(ex) {
            console.log("Exception Occured while downloadContent()  ", ex);
           
        }
        return content;
    }


    // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
    private async streamToBuffer(readableStream) {
        
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on("data", (data) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on("end", () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on("error", reject);
        });
    }

}