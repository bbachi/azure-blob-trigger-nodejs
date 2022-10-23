import { SampleContentRepository } from '../repository';
import { ContentResponse } from '../response';
import { StorageService } from './storage.service'
const CSVToJSON = require('csvtojson')

export class CSVReaderService {

    sampleContentRepository: SampleContentRepository;
    storageService: StorageService

    constructor() {
        this.sampleContentRepository = new SampleContentRepository();
        this.storageService = new StorageService();
    }

    public async readCSV(req: any) {
        const contentResponse = new ContentResponse();

        try {
            console.log("req.csvUrl ", req.csvUrl)

            const urlArray = req.csvUrl.split("/");
            const containerName = urlArray[3];
            const blobName = urlArray[4];

            console.log(containerName)
            console.log(blobName)

            const response = await this.storageService.downloadContent(containerName, blobName);

            console.log('response csv' , response);

            const data = await CSVToJSON().fromString(response)

            contentResponse.result = await this.sampleContentRepository.createContent(data);
            contentResponse.isDataAvailable = true;
        } catch(ex) {
            console.log("Exception Occured while readPDF()  ", ex);
            contentResponse.error = {message: ex.message};
            contentResponse.isDataAvailable = false;
        }
        return contentResponse
    }

}