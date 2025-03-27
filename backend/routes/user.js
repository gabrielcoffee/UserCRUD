import express from "express" 
import { getUsers, editUser, deleteUser } from "../controllers/user.js"

const router = express.Router();

router.get("/",getUsers);
router.post("/edit/", editUser);
router.post("/del/", deleteUser);

export default router;