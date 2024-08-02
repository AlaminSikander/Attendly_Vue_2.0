<script setup>
import { ref, onBeforeMount} from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { CustomerService } from '@/service/CustomerService';
import { ProductService } from '@/service/ProductService';

const customer1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const products = ref(null);

const customerService = new CustomerService();
const productService = new ProductService();

onBeforeMount(() => {
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    customerService.getstaffRequest().then((data) => {
        customer1.value = data;
        loading1.value = false;
    });
    loading2.value = false;
    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        user_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        number_of_staff: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        types_of_staff: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        job_type: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        funding_limit: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};

const clearFilter1 = () => {
    initFilters1();
};

const formatDate = (value) => {
    const date = new Date(value);
    if (isNaN(date)) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
</script>

<template>
    <div>
        <router-link :to="{ name: 'newClient' }" class="text-light">
            <Button label="Create +" rounded class="mb-2 mr-2" />
        </router-link>
    </div>

    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Client List</h5>
                <DataTable :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                    v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1"
                    :globalFilterFields="['name', 'company_name', 'user_name', 'email', 'funding_limit', 'number_of_staff', 'job_type', 'types_of_staff']"
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
                    <template #loading> Loading client data. Please wait. </template>

                    <Column header="Company name" :sortable="true" filterField="company_name"
                        :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.client.company_name }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column field="email" header="Client Email" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.client.email }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Email" />
                        </template>
                    </Column>

                    <Column field="number_of_staff" header="Number of Staff" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.number_of_staff }} Staff
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Number of Staff" />
                        </template>
                    </Column>

                    <Column field="types_of_staff" header="Types of Staff" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.types_of_staff }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Types of Staff" />
                        </template>
                    </Column>

                    <Column field="date" header="Date" :sortable="true" filterField="date"
                        dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                    </Column>

                    <Column field="job_type" header="Staff Job Type" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.job_type }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by Staff Job Type" />
                        </template>
                    </Column>

                    <Column field="status" header="Status" :sortable="true">
                        <template #body="{ data }">
                            <div class="text-center mt-2">
                                <template v-if="data.status === 'Cancel'">
                                    <p>Client Cancel the request</p>
                                </template>
                                <template v-else-if="data.status === 'adminCancel'">
                                    <p>You Cancel the request</p>
                                </template>
                                <template v-else>
                                    <template v-if="data.status === 'Approved'">
                                        <p class="text-success">{{ data.status }}</p>
                                    </template>
                                    <template v-else>
                                        {{ data.status }}
                                    </template>
                                </template>
                                <template v-if="data.status === 'Pending'">
                                    <a class="fs-5 me-3 ms-3" :href="`/staff/request/approved/${data.id}`" title="Approve your Client Request">
                                        <i class="fas fa-check"></i>
                                    </a>
                                    <a class="fs-5 me-3 ms-3" :href="`/staff/request/adminCancel/${data.id}`" title="Cancel your Client Request">
                                        <i class="fas fa-times text-danger"></i>
                                    </a>
                                </template>
                            </div>
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
