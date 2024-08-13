import axios from 'axios';

export class CustomerService {
    getCustomersSmall() {
        return fetch('/demo/data/customers-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    getCustomersMedium() {
        return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersLarge() {
        return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    getClientList() {
        return axios.get('/client/index', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.user);
    }
    getStaffList() {
        return axios.get('/staff/list', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.data.data);
    }
    getStaffrole() {
        return axios.get('/staff/role', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.user);
    }
    getAssignmentList() {
        return axios.get('/assign/assign/list', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.data.data);
    }
    getstaffRequest() {
        return axios.get('/staff/request', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.data);
    }
    getRateTypes() {
        return axios.get('/rate/type/index', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.data.data);
    }
    getDayTypes() {
        return axios.get('/category/day/index?page=${page}', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.data.data.data);
    }

    // getDayTypes(page = 1) {
    //     return axios.get(`/category/day/index?page=${page}`, {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //         }
    //     }).then(response => {
    //         // Check the structure of the response
    //         if (response.data && Array.isArray(response.data.data)) {
    //             return response.data;  // Assuming the response has a `data` field with an array
    //         } else {
    //             throw new Error('Unexpected API response structure');
    //         }
    //     });
    // }


}
