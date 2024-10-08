<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { CustomerService } from '@/service/CustomerService';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';

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
const multiselectValues = ref([
    { name: 'Monday', label: 'Monday' },
    { name: 'Tuesday', label: 'Tuesday' },
    { name: 'Wednesday', label: 'Wednesday' },
    { name: 'Thursday', label: 'Thursday' },
    { name: 'Friday', label: 'Friday' },
    { name: 'Saturday', label: 'Saturday' },
    { name: 'Sunday', label: 'Sunday' },
]);

const customer1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(true);
const customerService = new CustomerService();

onBeforeMount(() => {
    fetchCustomerData();
});

function fetchCustomerData() {
    customerService.getDayTypes().then((data) => {
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
        axios.post('/category/day/type', {
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
                    <div class="field col-12 md:col-4">
                        <label for="dayType"><b> Days Type</b></label>
                        <InputText id="dayType" v-model="form.dayType" type="text"
                            placeholder="Enter Day Type" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <div class="row">
                            <div class="label-section">
                                <label v-show="!form.isSpecialDay" id="dayText">Select Day</label>
                                <label v-show="form.isSpecialDay" id="dateText" style="font-size:13px">Select Date (Only for
                                    Special day)</label>
                            </div>
                            <div class="checkbox-section">
                                <input type="checkbox" v-model="form.isSpecialDay" id="specialDayCheckbox" />
                                <label for="specialDayCheckbox" class="special-date-label">Special Date</label>
                            </div>
                        </div>
                        <div class="mt-2">
                            <MultiSelect v-model="form.dayName" v-show="!form.isSpecialDay"
                                :options="multiselectValues" optionLabel="name" placeholder="Select up to 7 Days"
                                :filter="true">
                                <template #value="slotProps">
                                    <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2"
                                        v-for="option in slotProps.value" :key="option.name">
                                        <div>{{ option.name }}</div>
                                    </div>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </MultiSelect>
                            <div v-show="form.isSpecialDay">
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="form.date"></Calendar>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="dayType"><b>Select Day Or Night</b></label>
                        <div class="col-12 md:col-4">
                            <RadioButton id="option1" name="dayOrNight" value="0" v-model="form.radioValue"
                                class="mr-2" />
                            <label for="option1">Day</label>
                        </div>
                        <div class="col-12 md:col-4 mt-3">
                            <RadioButton id="option2" name="dayOrNight" value="1" v-model="form.radioValue"
                                class="mr-2" />
                            <label for="option2">Night</label>
                        </div>
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
                    <Column field="companyName" header="Day Type Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.dayType }}
                        </template>
                    </Column>
                    <Column field="dayTypes" header="Available Days" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.dayName }} {{ data.specialDay }}
                        </template>
                    </Column>
                    <Column field="dayOrNight" header="Day Or Night" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.dayOrNight }}
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
    color: #ffffff; /* Customize this color */
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
