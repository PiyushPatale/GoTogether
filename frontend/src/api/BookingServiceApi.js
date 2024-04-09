/* Booking service APIs */
import axios from 'axios';
import UserServiceApi from './UserServiceApi';
//require('dotenv').config();
const api_url = "http://localhost:7000/api/bookings";

class BookingServiceApi {
    getNextBooking() {
        return axios.get(`${api_url}/customers/next`, { headers: { authorization: UserServiceApi.getUserToken() } });
    }

    createBooking(booking) {
        return axios.post(api_url, booking);
    }

    getUserBookings(userId) {
        console.log(userId);
        return axios.post(`${api_url}/customers/all/id`, userId);
    }

    getUserBooking(bookingId) {
        return axios.get(`${api_url}/customers/${bookingId}`, { headers: { authorization: UserServiceApi.getUserToken() } });
    }

    modifyBooking(booking) {
        return axios.patch(`${api_url}/customers/${booking.id}`, booking);
    }

    getAllBookings() {
        return axios.get(`${api_url}/customers/all`);
    }

    getBooking(bookingId) {
        return axios.get(`${api_url}/${bookingId}`);
    }
}

const bsa = new BookingServiceApi();
export default bsa;
// export default BookingServiceApi();
