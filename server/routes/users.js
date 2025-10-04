import express from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router();

// Define user-related routes here
router.get("/test", getUser);
// router.get("find/:userId", getUser); // this is for particular id(user)

export default router;
