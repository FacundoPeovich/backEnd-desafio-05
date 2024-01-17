
import cartsModel from "../../models/carts.model.js";

class CartManagerDB {
  getCarts = async () => {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch {}
  };

  getIdCart = async (idCart) => {
    try {
      const cart = await cartsModel.findById({ _id: idCart });
      return cart;
    } catch {}
  };

  createCarts = async (cart) => {
    try {
      const carts = await cartsModel.create(cart);
      return carts;
    } catch {}
  };

  updateCart = async (idCart, idProduct, quantity = 1) => {
    
    try {
      const cart = await cartsModel.findById({ _id: idCart });
      
      if (!cart) {
        
        return res.status(404).send({
          status: "error",
          msg: `No se encontró ningún carrito con el ID: ${idCart}`,
        });
      }
   
    
    const productIndex = cart.products.findIndex((product) => product.id === idProduct);
    
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      const product = {
        id: idProduct,
        quantity: quantity,
      };
      cart.products.push(product);
    }
    const result = await cartsModel.updateOne({_id:idCart},{$set:cart});
    return result
  } catch {"Error en BD!!"}
  };


  deleteCart = async (idCart) => {
    try {
      const result = await cartsModel.deleteOne({ _id: idCart });
      return result;
    } catch {

    }
  }

} //Fin Clase CartManagerDB
export { CartManagerDB };
