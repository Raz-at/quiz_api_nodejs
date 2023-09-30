import { authenticate, registerAdmin } from "../controller/AdminController.js";
import express from 'express'

const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', authenticate)

export default router;

