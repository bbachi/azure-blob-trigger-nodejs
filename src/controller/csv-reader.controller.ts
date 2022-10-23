import { CSVReaderService } from '../service';
import { ContentResponse } from '../response';

export class CSVReaderController {

    private csvReaderService: CSVReaderService;

    constructor() {
        this.csvReaderService = new CSVReaderService();
    }

    public async readCSV(req: any): Promise<ContentResponse> {
        return await this.csvReaderService.readCSV(req);
    }

}