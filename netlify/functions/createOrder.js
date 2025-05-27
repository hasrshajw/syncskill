// netlify/functions/createOrder.js
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.handler = async function(event, context) {
  try {
    const { amount } = JSON.parse(event.body);

    const options = {
      amount: amount, // amount in paise
      currency: "INR",
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
