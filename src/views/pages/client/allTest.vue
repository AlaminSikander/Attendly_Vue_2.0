<template>
    <div class="grid">
        <div class="d-flex justify-content-end">
            <div v-if="successMessage" class="alert alert-success mt-3 mb-3 col-lg-3 text-center">
                {{ successMessage }}
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <h4>Client Registration</h4>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label>Gender<b class="text-red-500">*</b></label>
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name"
                            placeholder="Select" />
                        <small class="p-error" v-if="errors.company_name">{{ errors.company_name }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Email Address<b class="text-red-500">*</b></label>
                        <InputText type="email" v-model="form.email" />
                        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Confirm Password <b class="text-red-500">*</b></label>
                        <InputText type="password" v-model="form.confirm_password" />
                        <small class="p-error" v-if="errors.confirm_password">{{ errors.confirm_password }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Preferred Countries<b class="text-red-500">*</b></label>
                        <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="name"
                            placeholder="Select Countries" :filter="true">
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
                    </div>
                </div>
                <div class="text-center mt-5">
                    <button class="p-button" @click="handleSubmit">Submit Registration</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';

export default {
    components: {
        Dropdown,
        InputText,
        MultiSelect
    },
    setup() {
        const dropdownValues = ref([
            { name: 'Male' },
            { name: 'Female' },
            { name: 'Other' }
        ]);
        const dropdownValue = ref(null);
        const multiselectValues = ref([
            { name: 'Australia' },
            { name: 'Brazil' },
            { name: 'China' },
            { name: 'Egypt' }
        ]);
        const multiselectValue = ref([]);
        const form = ref({
            email: '',
            password: '',
            confirm_password: '',
        });
        const errors = ref({
            email: null,
            password: null,
            confirm_password: null,
        });
        const successMessage = ref('');

        function handleSubmit() {
            console.log('Form Submitted', form.value);
        }

        return {
            dropdownValues,
            dropdownValue,
            multiselectValues,
            multiselectValue,
            form,
            errors,
            successMessage,
            handleSubmit
        };
    }
};
</script>
  
<style scoped>
/* Add your CSS styles here */
</style>
  