import { Router } from "express";

import cartsModel from "../dao/models/carts.model.js";

const router = Router();

router.get("/", async (req, res) => {
 
  try {
    const carts = await cartsModel.find();
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
    const cart = await cartsModel.findById({ _id: cid });
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
    const carts = await cartsModel.create(cart);
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

  
    //Primer try/Cath por el find
    // console.log("----cart-----")
    // console.log(cart)
    try {
        const cart = await cartsModel.findById({ _id: cid });
        if (!cart) {
          //return res.status(400).send({ error: "Debe ingresar un Id. Product valido" });
          return res.status(404).send({
            status: "error",
            msg: `No se encontró ningún carrito con el ID: ${cid}`,
          });
        }
        const productIndex = cart.products.findIndex(
          (product) => product.id === pid
        );

        if (productIndex >= 0) {
          cart.products[productIndex].quantity += 1;
        } else {
          const product = {
            id: pid,
            quantity: 1,
          };
          cart.products.push(product);
        }
        const result = await cartsModel.updateOne({_id:cid},{$set:cart});
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
    let result = await cartsModel.deleteOne({_id:cid})
    res.send({
      status: "succes",
      msg: `Ruta DELETE de CART con ID: ${cid}`,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }

});

export { router as cartRouter };
