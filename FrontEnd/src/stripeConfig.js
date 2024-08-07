// stripeConfig.js
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('tu-clave-publica-de-stripe');
