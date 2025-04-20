import express from "express";
import { handleWebhook } from "../Controllers/webhookController.js";

const router = express.Router();
router.use(express.raw({ type: 'application/json' }));

router.post('/', handleWebhook);

export default router;
