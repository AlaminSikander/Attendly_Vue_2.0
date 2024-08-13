<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import axios from 'axios';
import { CustomerService } from '@/service/CustomerService';

const customer1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(true);
const customerService = new CustomerService();

const form = reactive({
    staff_type: ''
});

const successMessage = ref('');
const errorMessage = ref('');

onBeforeMount(() => {
    fetchCustomerData();
});

function fetchCustomerData() {
    customerService.getRateTypes().then((data) => {
        customer1.value = data.map((customer, index) => ({
            ...customer,
            sn: index + 1, 
            date: new Date(customer.date)
        }));
        loading1.value = false; 
    });
}


function validateForm() {

    return form.staff_type !== '';
}

function handleSubmit() {
    if (validateForm()) {
        axios.post('/staff/role/create', form, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                successMessage.value = "Rate Type added successful";
                resetForm();
                fetchCustomerData();
                setTimeout(() => {
                    successMessage.value = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (error.response && error.response.data) {
                    errorMessage.value = error.response.data;
                }
            });
    } else {
        errorMessage.value = 'Please fill in all required fields.';
    }
}

function resetForm() {
    form.staff_type = '';
}

function handleDelete(id) {
    axios.get(`/staff/role/delete/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    })
        .then(response => {
            successMessage.value = "Deletion successful";
            fetchCustomerData();
            setTimeout(() => {
                successMessage.value = '';
            }, 3000);
        })
        .catch(error => {
            console.error('Error deleting record:', error);
            if (error.response && error.response.data) {
                errorMessage.value = error.response.data;
            }
        });
}
</script>

<template>
    <div class="grid col-12">
        <div class="card">
            <h5>Create Staff Role</h5>
            <div class="formgroup-inline field col-12 md:col-12">

                <div class="field">
                    <label for="staff_type" class="p-sr-only">Staff Role Type</label>
                    <InputText id="staff_type" v-model="form.staff_type" type="text" placeholder="Enter Staff Role Type" />
                </div>
                <Button label="Submit" @click="handleSubmit"></Button>
            </div>
            <div v-if="successMessage">{{ successMessage }}</div>
            <div v-if="errorMessage">{{ errorMessage }}</div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataTable :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                    filterDisplay="menu" :loading="loading1" :filters="filters1" showGridlines>
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="sn" header="S/N" style="min-width: 4rem" />
                    <Column field="companyName" header="Company Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.clients?.company_name }}
                        </template>
                    </Column>
                    <Column field="dayTypes" header="Day Types" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.days_name }}
                        </template>
                    </Column>
                    <Column field="date" header="date" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.date }}
                        </template>
                    </Column>
                    <Column field="chargeRate" header="Charge Rate" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.days_hour_salary }}
                        </template>
                    </Column>
                    <Column field="payRate" header="Pay Rate" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.pay_hour_salary }}
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <Button icon="pi pi-file-edit" severity="danger" rounded outlined />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
