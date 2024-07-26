
<script>
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
export default {
    components: {
        Dropdown,
        InputText,
    },
    setup() {
        const dropdownValues = ref([
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ]);
        const dropdownValue = ref(null);},
    data() {
        return {
            form: {
                name: '',
                email: '',
                company_name: '',
                reg_number: '',
                phone: '',
                funding_limit: '',
                addressLine1: '',
                addressLine2: '',
                townOrCity: '',
                postCode: '',
                confirm_password: '',
                description: '',
                day_start_time: '',
                day_end_time: '',
                break_time: '',
                password: '',
                image: null,
                file: null,
            },
            errors: {
                name: null,
                email: null,
                company_name: null,
                reg_number: null,
                phone: null,
                funding_limit: null,
                addressLine1: null,
                addressLine2: null,
                townOrCity: null,
                postCode: null,
                description: null,
                day_start_time: null,
                day_end_time: null,
                break_time: null,
                password: null,
                confirm_password: null,
                image: null,
                file: null,
            },
            successMessage: '',
            dropdownValues,
            dropdownValue,
        };
    },
    methods: {
        handleSubmit() {
            if (this.validateForm()) {
                axios.post('/client/registration', this.form, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then(response => {
                        this.successMessage = "Registration successful";
                        this.resetForm();
                        setTimeout(() => {
                            this.successMessage = '';
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Error submitting form:', error);
                    });
            }
        },
        handleImageChange() {
            const selectedImage = this.$refs.file.files[0];
            this.form.image = selectedImage;
        },
        handlePdf() {
            const selectedPdf = this.$refs.pdf.files[0];
            this.form.file = selectedPdf;
        },
        validateForm() {
            let valid = true;
            for (const key in this.form) {
                if (this.form[key] === '') {
                    this.errors[key] = `${this.formatKey(key)} is Required`;
                    valid = false;
                } else {
                    this.errors[key] = null;
                }
            }
            if (this.form.password !== this.form.confirm_password) {
                this.errors.confirm_password = "Passwords do not match";
                valid = false;
            }
            return valid;
        },
        formatKey(key) {
            return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        },
        resetForm() {
            for (let key in this.form) {
                this.form[key] = (typeof this.form[key] === 'string' ? '' : null);
            }
            for (let key in this.errors) {
                this.errors[key] = null;
            }
        }
    }
};
</script>

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
                        <label>Company Name <b class="text-red-500">*</b></label>
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name"
                            placeholder="Select" />
                        <small class="p-error" v-if="errors.company_name">{{ errors.company_name }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="firstname2">First Name <b class="text-red-500">*</b></label>
                        <InputText id="firstname2" type="text" v-model="form.name" />
                        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="firstname2">Last Name <b class="text-red-500">*</b></label>
                        <InputText id="firstname2" type="text" v-model="form.name" />
                        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Email Address<b class="text-red-500">*</b></label>
                        <InputText type="email" v-model="form.email" />
                        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Gender<b class="text-red-500">*</b></label>
                        <InputText type="email" v-model="form.email" />
                        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Password <b class="text-red-500">*</b></label>
                        <InputText type="password" v-model="form.password" />
                        <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Re-enter Password <b class="text-red-500">*</b></label>
                        <InputText type="password" v-model="form.confirm_password" />
                        <small class="p-error" v-if="errors.confirm_password">{{ errors.confirm_password }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Address Line 1 <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.addressLine1" />
                        <small class="p-error" v-if="errors.addressLine1">{{ errors.addressLine1 }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Address Line 2 <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.addressLine2" />
                        <small class="p-error" v-if="errors.addressLine2">{{ errors.addressLine2 }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Town/City <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.townOrCity" />
                        <small class="p-error" v-if="errors.townOrCity">{{ errors.townOrCity }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Postcode <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.postCode" />
                        <small class="p-error" v-if="errors.postCode">{{ errors.postCode }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Date of Brith<b class="text-red-500">*</b></label>
                        <InputText type="date" v-model="form.reg_number" />
                        <small class="p-error" v-if="errors.reg_number">{{ errors.reg_number }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>National Insurance Number <b class="text-red-500">*</b></label>
                        <InputText type="number" v-model="form.phone" />
                        <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Phone Number <b class="text-red-500">*</b></label>
                        <InputText type="number" v-model="form.phone" />
                        <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label>Staff Image <b class="text-red-500">*</b></label>
                        <InputText type="file" ref="file" id="image" @change="handleImageChange" accept="image/*" />
                        <small class="p-error" v-if="errors.image">{{ errors.image }}</small>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-4">
                                <label>National Insurance Number <b class="text-red-500">*</b></label>
                                <InputText type="number" v-model="form.phone" />
                                <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Phone Number <b class="text-red-500">*</b></label>
                                <InputText type="number" v-model="form.phone" />
                                <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Staff Image <b class="text-red-500">*</b></label>
                                <InputText type="file" ref="file" id="image" @change="handleImageChange" accept="image/*" />
                                <small class="p-error" v-if="errors.image">{{ errors.image }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <button class="p-button" @click="handleSubmit">Submit Registration</button>
            </div>
        </div>
    </div>
</div></template>
