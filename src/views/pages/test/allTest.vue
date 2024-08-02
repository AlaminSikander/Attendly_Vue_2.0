<script setup>
import { ref, onBeforeMount, reactive, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { CustomerService } from '@/service/CustomerService';
import { ProductService } from '@/service/ProductService';

const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const products = ref(null);
const statuses = reactive(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

const customerService = new CustomerService();
const productService = new ProductService();

const toggleStatus = (customer) => {
    customer.status = customer.status === 'approved' ? 'disabled' : 'approved';
};

const getSeverity = (status) => {
    console.log("Status Received for Severity:", status); // Debug log
    if (status.trim().toLowerCase() === 'approved') {
        return 'success';
    } else if (status.trim().toLowerCase() === 'disabled') {
        return 'warning';
    } else {
        return 'error'; // Handle unexpected cases
    }
};

const getStatusIcon = (status) => {
    console.log("Status Received for Icon:", status); // Debug log
    if (status.trim().toLowerCase() === 'approved') {
        return 'pi pi-times-circle';
    } else {
        return 'pi pi-check-circle';
    }
};

onBeforeMount(() => {
    initFilters1();
    productService.getProductsWithOrdersSmall().then(data => {
        products.value = data;
    });
    customerService.getStaffList().then(data => {
        customer1.value = data;
        loading1.value = false;
    });
    loading2.value = false;
});


const initFilters1 = () => {
    filters1.value = {
        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        company_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        user_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        gender: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        roleType: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        funding_limit: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};

const clearFilter1 = () => {
    initFilters1();
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};


</script>

<template>
    <div>
        <router-link :to="{ name: 'newStaff' }" class="text-light">
            <Button label="Create +" rounded class="mb-2 mr-2" />
        </router-link>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Client List</h5>
                <DataTable :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                    v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1"
                    :globalFilterFields="['name', 'first_name', 'last_name', 'email', 'first_name','user_name', 'phone', 'gender', 'roleType', 'status']"
                    showGridlines>
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined
                                @click="clearFilter1()" />

                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </IconField>
                        </div>
                    </template>
                    <template #empty> No client found. </template>
                    <template #loading> Loading client data. Please wait. </template>


                    <Column field="name" header="Name" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                          <div class="flex align-items-center gap-2">
                          <img alt="Name" :src="data.image" style="width: 32px" />
                            <span>{{ data.first_name }} {{ data.last_name }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Name" />
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

:deep(.tag i) {
    margin-right: 5px; // Add some spacing between the icon and the text
}

.status-tag {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-label {
    font-weight: bold;
}

.p-button-outlined.success {
    border-color: orange;
    color: orange;
}

.p-button-outlined.warning {
    border-color: green;
    color: green;
}

.Tag.success {
    background-color: green;
    color: white;
}

.Tag.warning {
    background-color: orange;
    color: white;
}</style>
