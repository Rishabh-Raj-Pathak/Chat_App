import  express  from "express";
import { Login, Logout, Signup } from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/login",Login)

router.post("/logout",Logout)

router.post("/signup",Signup)
 
export default router;