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
}
