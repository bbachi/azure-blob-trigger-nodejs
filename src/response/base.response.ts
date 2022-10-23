import { IResponse } from './response';

export class BaseResponse implements IResponse {
    
    statusCode: Number;
    result: any;
    isDataAvailable: boolean;
    error: any;

}