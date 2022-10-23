import { model, Schema, Model, Document } from 'mongoose';

export interface ISampleContent extends Document {
    
    firstName: String;
    lastName: String;
    email: String;
    streetNum: String; 
    streetName: String;
    city: String;
    state: String,
    zipcode: String; 
}

const SampleContentSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    streetNum: { type: String, required: true },
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }, 
})

export const SampleContentModel: Model<ISampleContent> = model<ISampleContent>('sample-content', SampleContentSchema);