<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { CustomerService } from '@/service/CustomerService';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const form = ref({
    dayType: '',
    dayName: [],
    isSpecialDay: false,
    radioValue: null,
    date: null,
});

const errors = ref({});
const successMessage = ref('');
const errorMessage = ref('');


const customer1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(true);
const customerService = new CustomerService();

onBeforeMount(() => {
    fetchCustomerData();
});

function fetchCustomerData() {
    customerService.getRateTypes().then((data) => {
        customer1.value = data.map((customer, index) => {
            let dayName = customer.dayName !== null && customer.dayName !== 'null' ?
                customer.dayName.replace(/[\[\]"]/g, '') : '';
            let specialDay = customer.date ? `Special Day ${customer.date}` : '';
            let dayOrNight = customer.dayOrNight == 1 ? 'Night' : 'Day';

            return {
                ...customer,
                sn: index + 1,
                dayName: dayName,
                specialDay: specialDay,
                dayOrNight: dayOrNight,
                date: customer.date ? new Date(customer.date).toLocaleDateString() : ''
            };
        });
        loading1.value = false;
    });
}

function validateForm() {
    if (!form.value.dayType) {
        errors.value.dayType = 'Day type is required';
    } else {
        delete errors.value.dayType;
    }

    if (form.value.isSpecialDay) {
        if (!form.value.date) {
            errors.value.date = 'Date is required for special day';
        } else {
            delete errors.value.date;
        }
    } else {
        if (!form.value.dayName.length) {
            errors.value.dayName = 'At least one day must be selected';
        } else {
            delete errors.value.dayName;
        }
    }

    if (form.value.radioValue === null) {
        errors.value.radioValue = 'Day or Night selection is required';
    } else {
        delete errors.value.radioValue;
    }

    return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
    if (validateForm()) {
        axios.post('/rate/type/store', {
            ...form.value,
            dayOrNight: form.value.radioValue
        }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                successMessage.value = "Rate Type added successfully";
                resetForm();
                fetchCustomerData();
                setTimeout(() => {
                    successMessage.value = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                errorMessage.value = error.response?.data || 'An error occurred';
            });
    } else {
        errorMessage.value = 'Please fill in all required fields.';
    }
}

function resetForm() {
    form.value = { dayType: '', dayName: [], isSpecialDay: false, radioValue: null, date: null };
}

function handleDelete(id) {
    axios.delete(`/staff/role/delete/${id}`, {
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
            errorMessage.value = error.response?.data || 'Failed to delete';
        });
}
</script>

<template>
    <div class="col-12">
        <div class="card">
            <h5>Create Staff Role</h5>
            <div class="col-12">
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-3">
                        <label for="dayType"><b> Select Company Name</b></label>
                        <InputText id="dayType" v-model="form.dayType" type="text" placeholder="Enter Day Type" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="dayType"><b> Day Types</b></label>
                        <InputText id="dayType" v-model="form.dayType" type="text" placeholder="Enter Day Type" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="dayType"><b> Charge Rate</b></label>
                        <InputText id="dayType" v-model="form.dayType" type="text" placeholder="Enter Day Type" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="dayType"><b> Pay Rate</b></label>
                        <InputText id="dayType" v-model="form.dayType" type="text" placeholder="Enter Day Type" />
                    </div>
                    
                </div>
            </div>
            <div class="submit-container">
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
                    <!-- <template #loading> Loading customers data. Please wait. </template> -->
                    <template #loading>
                        <div class="loading-container">
                            <i class="pi pi-spinner pi-spin"></i>
                            Loading client data. Please wait...
                        </div>
                    </template>
                    <Column field="sn" header="S/N" style="min-width: 4rem" />
                    <Column field="companyName" header="Company Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.clients?.company_name }}
                        </template>
                    </Column>
                    <Column field="days_name" header="Day Types" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.days_name }}
                        </template>
                    </Column>
                    <Column field="date" header="Date" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span v-if="data.date">{{ data.date }}</span>
                            <span v-else>-</span>
                        </template>
                    </Column>
                    <Column field="days_hour_salary" header="Charge Rate" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.days_hour_salary }}
                        </template>
                    </Column>
                    <Column field="pay_hour_salary" header="Pay Rate" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.pay_hour_salary }}
                        </template>
                    </Column>
                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body="{ data }">
                            <Button icon="pi pi-trash" severity="danger" rounded outlined @click="handleDelete(data.id)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* Loading State Styling */
.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 1.5rem;
    color: #ffffff;
    /* Customize this color */
    font-weight: bold;
}

.pi-spinner {
    margin-right: 10px;
    font-size: 2rem;
}

:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

.field .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label-section {
    flex: 1;
}

.checkbox-section {
    display: flex;
    align-items: center;
    margin-left: auto;
    /* Ensures the checkbox and label align to the right */
}

.special-date-label {
    margin-left: 5px;
    /* Space between checkbox and label */
    white-space: nowrap;
    /* Ensures the label stays on a single line */
}

.mt-2 {
    margin-top: 10px;
}

#dayText,
#dateText {
    font-weight: bold;
}

.submit-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    /* Adjust as needed */
}
</style>
