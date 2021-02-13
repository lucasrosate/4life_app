import mongoose from 'mongoose';
import { IDiet } from '../../interfaces';

interface IDietModel extends mongoose.Document, IDiet { };

const DietSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    weight_unit: {
        type: String,
        require: true
    },
    calories: {
        type: Number,
        require: true
    }
});

const Diet: mongoose.Model<IDietModel> = mongoose.model("Diet", DietSchema)