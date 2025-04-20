import express from "express";
import { Webhook } from "../Controllers/webhookController.js";

const router = express.Router();
router.use(express.raw({ type: 'application/json' }));

router.post('/', Webhook);

export default router;
