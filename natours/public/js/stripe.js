const stripe = Stripe('pk_test_51KFTftQaBwXpPqlqVXHuKS4V2LqBYAs2Y9Es3wH2BdjVxJ1fNaYh2wMXxxE9olEjFrQQJcphjm3mUtfw2EIZlA7W00I7J2nBmA')
import axios from 'axios'
import { showAlert } from './alert'


export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
    
        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
        sessionId: session.data.session.id
        })
    } catch (err) {
        console.log(err)
        showAlert('error', err)
    }
}