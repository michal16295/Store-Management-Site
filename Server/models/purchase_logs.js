import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductLogSchema = new Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    direction: Boolean,
    date: Date
});

export default mongoose.model('ProductLog', ProductLogSchema);