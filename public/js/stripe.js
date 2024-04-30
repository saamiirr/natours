import axios from 'axios';
import { showAlert } from './alerts';
export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51PAluHRwdfFFcpzMpImXoqUYxeKr2vQg4sHcRReAnDZXrBB8eLYyomEaHbdOjn4FlSeds0vgY0EQ4NLp5H0CXV3p00vM4XScdq',
  );
  try {
    // 1) Get checkout session from API

    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
