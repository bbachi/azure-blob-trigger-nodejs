import { AzureFunction, Context } from "@azure/functions"
import { CSVReaderController } from '../src/controller';

const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
    
    context.log(typeof eventGridEvent);
    context.log(eventGridEvent);

    const csvReaderController = new CSVReaderController();
    
    let result: any;
    const HEADERS = {'Content-Type': 'application/json'}
    try {
        if (eventGridEvent.eventType === 'Microsoft.Storage.BlobCreated') {
            
            result = csvReaderController.readCSV({csvUrl: eventGridEvent.data.url});
        
        }
        
        context.res = {
            body: result,
            headers: HEADERS
        };

    } catch (err) {
        console.log("Exception occurred while reading CSV --> ", err);
        context.res = {
            status: 500,
            body: {message: err.message},
            headers: HEADERS
        };
    }
};

export default eventGridTrigger;