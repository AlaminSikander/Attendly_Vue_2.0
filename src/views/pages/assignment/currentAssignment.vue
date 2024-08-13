<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { CustomerService } from '@/service/CustomerService';
import { ProductService } from '@/service/ProductService';

const customer1 = ref([]);
const filters1 = ref(null);
const loading1 = ref(true);
const loading2 = ref(true);
const products = ref(null);

const customerService = new CustomerService();
const productService = new ProductService();

const toggleStatus = (customer) => {
    customer.status = customer.status === 'active' ? 'inActive' : 'active';
};

const getSeverity = (status) => {
    console.log("Status Received for Severity:", status);
    if (status.trim().toLowerCase() === 'active') {
        return 'success';
    } else if (status.trim().toLowerCase() === 'inactive') {
        return 'warning';
    } else {
        return 'error';
    }
};

const getStatusIcon = (status) => {
    console.log("Status Received for Icon:", status);
    if (status.trim().toLowerCase() === 'active') {
        return 'pi pi-times-circle';
    } else {
        return 'pi pi-check-circle';
    }
};

onBeforeMount(() => {
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    customerService.getAssignmentList().then((data) => {
        customer1.value = data.map((customer, index) => ({
            ...customer,
            sn: index + 1,
            company_name: customer.clients?.company_name || '',
            driver_id: customer.drivers?.driver_id || '',
            full_name: `${customer.drivers?.first_name || ''} ${customer.drivers?.last_name || ''}`
        }));
        loading1.value = false;
    });
    loading2.value = false;

    initFilters1();
});

const formatTime = (time) => {
    if (!time) return '';
    try {
        const [hours, minutes] = time.split(':');
        if (hours === undefined || minutes === undefined) {
            throw new Error('Invalid time format');
        }
        const period = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
        const formattedHours = parseInt(hours, 10) % 12 || 12;
        return `${formattedHours}:${minutes} ${period}`;
    } catch (error) {
        console.error('Error formatting time:', error);
        return time;
    }
};

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        assignment_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        full_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        driver_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};

const clearFilter1 = () => {
    initFilters1();
};

</script>
<template>
    <div>
        <router-link :to="{ name: 'createAssignment' }" class="text-light">
            <Button label="Create +" rounded class="mb-2 mr-2" />
        </router-link>
    </div>

    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Staff assign List</h5>
                <DataTable :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                    v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1"
                    :globalFilterFields="['assignment_number', 'company_name', 'full_name', 'driver_id', 'status']"
                    showGridlines>
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined
                                @click="clearFilter1()" />
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search"
                                    style="width: 100%" />
                            </IconField>
                        </div>
                    </template>
                    <template #empty> No client found. </template>
                    <!-- <template #loading> Loading client data. Please wait. </template> -->

                    <template #loading>
                        <div class="loading-container">
                            <i class="pi pi-spinner pi-spin"></i>
                            Loading client data. Please wait...
                        </div>
                    </template>

                    <Column field="sn" header="S/N" style="min-width: 4rem" />

                    <Column field="assignment_number" header="Assignment Number" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.assignment_number }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Assignment Number" />
                        </template>
                    </Column>

                    <Column field="company_name" header="Company name" :sortable="true" :showFilterMatchModes="false"
                        :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img alt="Company name" :src="data.image" style="width: 32px" />
                                <span>{{ data.company_name }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Company Name" />
                        </template>
                    </Column>

                    <Column field="full_name" header="Staff Name" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.full_name }} ({{ data.driver_id }})
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Staff Name" />
                        </template>
                    </Column>

                    <Column field="dset" header="Day Start and End Time" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ formatTime(data.start_time) }} - {{ formatTime(data.end_time) }}
                        </template>
                    </Column>

                    <Column field="status" header="Status" :sortable="true">
                        <template #body="{ data }">
                            <div class="status-tag">
                                <Tag :severity="getSeverity(data.status)" class="status-label">
                                    {{ data.status.toUpperCase() }}
                                </Tag>
                                <Button :icon="getStatusIcon(data.status)" @click="toggleStatus(data)"
                                    class="p-button-rounded p-button-outlined" :class="getSeverity(data.status)" />
                            </div>
                        </template>
                    </Column>

                    <Column header="Rate Details" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <router-link :to="{ name: 'newClient' }" class="text-light">
                                <Button icon="pi pi-eye" severity="success" rounded outlined class="mr-2" />
                            </router-link>
                            <router-link :to="{ name: 'newClient' }" class="text-light">
                                <Button icon="pi pi-file-edit" severity="success" rounded outlined class="" />
                            </router-link>
                        </template>
                    </Column>

                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <router-link :to="{ name: 'newClient' }" class="text-light">
                                <Button icon="pi pi-cog" severity="success" rounded outlined class="" />
                            </router-link>
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

:deep(.tag i) {
    margin-right: 5px;
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
}
</style>
