<script setup>
import { ref, onBeforeMount} from 'vue';
import { CustomerService } from '@/service/CustomerService';
import { ProductService } from '@/service/ProductService';

const customer1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const products = ref(null);

const customerService = new CustomerService();
const productService = new ProductService();


onBeforeMount(() => {
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    customerService.getClientList().then((data) => {
        customer1.value = data;
        loading1.value = false;
    });
    loading2.value = false;

});




</script>

<template>
    <div>
        <router-link :to="{ name: 'createAdministratorUser' }" class="text-light">
            <Button label="Create Administrator User" rounded class="mb-2 mr-2" />
        </router-link>
    </div>



    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Administrator Users List</h5>
                <DataTable :value="customer1" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
                    :loading="loading1" 
                    showGridlines>
                    
                    <template #empty> No client found. </template>
                    <template #loading> Loading client data. Please wait. </template>

                    <Column header="Image">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img alt="Company name" :src="data.image" style="width: 32px" />
                            </div>
                        </template>
                    </Column>

                    <Column header="User Name">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.company_name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Administrative Role">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.company_name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column header="Email">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.company_name }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column header="Action" bodyClass="text-center" style="min-width: 8rem">
                        <template #body>
                            <router-link :to="{ name: 'newClient' }" class="text-light">
                                <Button icon="pi pi-file-edit" severity="success" rounded outlined class="mr-2" />
                            </router-link>
                            <router-link :to="{ name: 'newClient' }" class="text-light">
                                <Button icon="pi pi-trash" severity="danger" rounded outlined class="" />
                            </router-link>
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
