
import { useEffect } from 'react';

const SyncUser = (user) => {
  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            username: user.username,
            imageUrl: user.imageUrl,
          }),
        });

        if (!res.ok) throw new Error('Failed to register user');
        console.log('✅ User synced to backend');
      } catch (err) {
        console.error('🚨 Error syncing user', err);
      }
    };

    syncUser();
  }, [user]);
};

export default SyncUser;
