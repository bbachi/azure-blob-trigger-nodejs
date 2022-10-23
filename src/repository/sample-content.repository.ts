import { connect } from "../config/db.config";
import { SampleContentModel } from '../model';

export class SampleContentRepository {

    constructor() {
        console.log('In the Repository ::::::::')
        connect();
        console.log('In the Repository  :::::::::')
    }

    public createContent(data: any) {
        console.log("data ", data)
        let result = SampleContentModel.insertMany(data);
        if(result!=null){
            console.log('Created createContent::::', result)
        }
        return result;

    }
    
}