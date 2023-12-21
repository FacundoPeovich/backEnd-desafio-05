import mongoose from 'mongoose';

const collection = 'Products';

const userSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: Number,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails:{
        type: Array,
        default: []
    },
})

const productsModel = mongoose.model(collection,userSchema);

export default productsModel;
