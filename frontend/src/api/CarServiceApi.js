/* Car service APIs */
import axios from 'axios';
//require('dotenv').config();
const api_url = "http://localhost:7000/api/cars";

class CarServiceApi {
    createNewCar(newCar) {
        return axios.post(api_url, newCar);
    }

    getAllCars() {
        return axios.get(api_url);
    }

    getCar(carId) {
        return axios.get(`${api_url}/${carId}`);
    }

    searchAvailableCars(search) {
        return axios.post(api_url + '/availability', search);
    }

    filterCars(filter) {
        return axios.post(api_url + '/filter', filter);
    }

    updateCar(car) {
        return axios.patch(api_url + `/${car._id}`, car);
    }
}

const csa = new CarServiceApi();
export default csa;
// export default CarServiceApi();
