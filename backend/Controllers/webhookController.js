// webhook.js
import express from 'express';
import { Webhook } from 'svix';
import { User } from '../Models/User.js'; 

const router = express.Router();
router.use(express.raw({ type: 'application/json' }));

router.post('/', async (req, res) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  const svix = new Webhook(secret);
  const payload = req.body;
  const headers = req.headers;

  let evt;
  try {
    evt = svix.verify(payload, headers);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send('Invalid signature');
  }

  const { type, data } = evt;

  try {
    if (type === 'user.created') {
        const newUser = {
            clerkUserId: data.id,
            email: data.email_addresses[0].email_address,
            imageUrl: data.image_url,
            username: data.username,
        };
        await User.create(newUser);
      }
      
      console.log('✅ User created in DB');
    

    if (type === 'user.updated') {
        const updatedUser = {
            clerkUserId: data.id,
            email: data.email_addresses[0].email_address,
            imageUrl: data.image_url,
            username: data.username,
        };
        await User.update(updatedUser, {
            where: { clerkUserId: data.id },
        });
      console.log('🔄 User updated in DB');
    }

    if (type === 'user.deleted') {
        await User.destroy({
            where: { clerkUserId: data.id },
        });
      console.log('🗑️ User deleted from DB');
    }

    res.status(200).send('Webhook handled');
  } catch (err) {
    console.error('🔥 Error handling webhook:', err.message);
    res.status(500).send('Internal error');
  }
});

export default router;
