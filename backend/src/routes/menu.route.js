import { createMenu, getAllMenu, updateMenuById, deleteMenuById } from "../controllers/menu.controller.js";
import express from "express"

const router = express.Router();

router.get("/", getAllMenu)
router.post("/", createMenu)
router.put("/:id", updateMenuById)
router.delete("/:id", deleteMenuById)


