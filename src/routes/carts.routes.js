import { Router } from "express";
import { CartManagerDB } from "../dao/managers/dbMangers/CartManagerDB.js";

//import cartsModel from "../dao/models/carts.model.js";

const cartManagerDB = new CartManagerDB();

const router = Router();

router.get("/", async (req, res) => {
 
  try {
    //const carts = await cartsModel.find();
    const carts = await cartManagerDB.getCarts();
    res.send({
      status: "succes",
      carts,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }


});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  
  try {
    //const cart = await cartsModel.findById({ _id: cid });
    const cart = await cartManagerDB.getIdCart(cid);

    res.send({
      status: "succes",
      msg: `Ruta GET ID CART con ID: ${cid}`,
      cart,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }

});

//Se crea el Carrito, con array products vacio
router.post("/", async (req, res) => {
  const cart = {
    products: [],
  };
  
  try {
    //const carts = await cartsModel.create(cart);
    const carts = await cartManagerDB.createCarts(cart);
    res.send({
      status: "succes",
      msg: "Ruta POST CART",
      carts,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }

});

router.post("/:cid/product/:pid", async (req, res) => {
  //creo
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
    try {
        const result = await cartManagerDB.updateCart(cid, pid, quantity);
        //console.log(result);
        res.send({
            status: "succes",
            msg: `Ruta POST CART - Agrego producto al carrito. CID: ${cid} - PID: ${pid}`,
            result,
          });
       }
        catch {
        //console.log("Error en lectura de archivos!!");
        res.status(500).send({
          status: "error",
          msg: "Error interno del servidor al procesar la solicituud",
        });
      }
});

router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  res.send({
    status: "succes",
    msg: `Ruta PUT de CART con ID: ${cid}`,
  });
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    //let result = await cartsModel.deleteOne({_id:cid})
    const result = await cartManagerDB.deleteCart(cid)
    res.send({
      status: "succes",
      msg: `Ruta DELETE de CART con ID: ${cid}`,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }

});

export { router as cartRouter };
