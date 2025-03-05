import express from 'express'
const router = express.Router();

router.post('/orders', (req, res) => {
  console.log('Received Shopify Webhook:', req.body);
  res.status(200).send('Webhook received');
});

export default router;