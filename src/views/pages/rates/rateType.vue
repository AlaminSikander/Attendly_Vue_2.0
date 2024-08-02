<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import axios from 'axios';
import { CustomerService } from '@/service/CustomerService';

const customer1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(true); // Initialize loading1 as true
const loading2 = ref(false); // Initialize loading2 as false

const customerService = new CustomerService();

const form = reactive({
    staff_type: '' // Add staff_type to the form object
});

const successMessage = ref('');
const errorMessage = ref('');

onBeforeMount(() => {
    fetchCustomerData();
});

function fetchCustomerData() {
    customerService.getStaffrole().then((data) => {
        customer1.value = data.map((customer, index) => ({
            ...customer,
            sn: index + 1, // Add the serial number field
            date: new Date(customer.date)
        }));
        loading1.value = false; // Set loading1 to false after data is loaded
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
                successMessage.value = "Registration successful";
                resetForm();
                fetchCustomerData(); // Refresh the data
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
</script>

<template>
    <div class="grid col-12">
        <div class="card">
            <h5>Inline</h5>
            <div class="formgroup-inline field col-12 md:col-12">
                <div class="field">
                    <label for="staff_type" class="p-sr-only">Staff Type</label>
                    <InputText id="staff_type" v-model="form.staff_type" type="text" placeholder="Staff Type" />
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
                    <Column field="staffRole" header="Staff Role" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.staff_type }}
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <Button icon="pi pi-trash" severity="danger" rounded outlined />
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
