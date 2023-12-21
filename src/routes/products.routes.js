import { Router } from "express";

import productsModel from "../dao/models/products.model.js";

const router = Router();

router.get("/", async (req, res) => {
  
  try {
    let products = await productsModel.find();
    res.send({
      status: "succes",
      products,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  if (!pid) {
    return res.status(400).send({ error: "Debe ingresar Id. Product" });
  }
  
  try {
    const product = await productsModel.findById(pid);
    res.send({
      status: "succes",
      msg: "Product hallado",
      product,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body; //json con el producto
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category
  ) {
    return res.status(400).send({ error: "Datos incompletos" });
  }

  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  
  try {
    const result = await productsModel.create(product);
    res.send({
      status: "succes",
      msg: "Producto creado",
      result,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;

  if (!pid) {
    return res.status(400).send({ error: "Debe ingresar Id. Product" });
  }

  //const product = req.body;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body; //json con el producto
  if (
    !title || !description ||!code || !price || !status || !stock || !category) {
    return res.status(400).send({ error: "Datos incompletos" });
  }
  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  
  try {
    const result = await productsModel.updateOne({ _id: pid }, { $set: product });
    res.send({
      status: "succes",
      msg: `Ruta PUT de PRODUCTS con ID: ${pid}`,
      result,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

//Para ingresar un array de Productos desde el body
router.post("/insert", async (req, res) => {
  const product = req.body;
  
  try {
    const result = await productsModel.insertMany(product);
    res.send({ result });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;

  if (!pid) {
    return res.status(400).send({ error: "Debe ingresar Id. Product" });
  }
  try {
    const result = await productsModel.deleteOne({ _id: pid });
    res.send({
      status: "succes",
      msg: `Ruta DELETE de PRODUCTS con ID: ${pid}`,
      result,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

export { router as productRouter };
