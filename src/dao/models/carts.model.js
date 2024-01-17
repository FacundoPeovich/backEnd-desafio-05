
import mongoose from 'mongoose';

const collection = 'Carts';

const userSchema = new mongoose.Schema({
    products: [
        {
          id: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true
          },
        },
      ],
})

const cartsModel = mongoose.model(collection,userSchema);

export default cartsModel;
