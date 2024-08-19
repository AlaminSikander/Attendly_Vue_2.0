<template>
    <div class="grid">
        <div class="d-flex justify-content-end">
            <div v-if="successMessage" class="alert alert-success mt-3 mb-3 col-lg-3 text-center">
                {{ successMessage }}
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <h4>Update Client Information</h4>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="firstname2">Full Name <b class="text-red-500">*</b></label>
                        <InputText id="firstname2" type="text" v-model="form.name" />
                        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Company Name <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.company_name" />
                        <small class="p-error" v-if="errors.company_name">{{ errors.company_name }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Company Registration Number <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.reg_number" />
                        <small class="p-error" v-if="errors.reg_number">{{ errors.reg_number }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Contact Number <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.phone" />
                        <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Address Line 1 <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.addressLine1" />
                        <small class="p-error" v-if="errors.addressLine1">{{ errors.addressLine1 }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Address Line 2 <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.addressLine2" />
                        <small class="p-error" v-if="errors.addressLine2">{{ errors.addressLine2 }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Town/City <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.city" />
                        <small class="p-error" v-if="errors.city">{{ errors.city }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Postcode <b class="text-red-500">*</b></label>
                        <InputText type="text" v-model="form.postCode" />
                        <small class="p-error" v-if="errors.postCode">{{ errors.postCode }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Funding Limit (If known)</label>
                        <InputText type="number" v-model="form.funding_limit" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Client Email <b class="text-red-500">*</b></label>
                        <InputText type="email" v-model="form.email" />
                        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Password </label>
                        <InputText type="password" v-model="form.password" />
                        <!-- <small class="p-error" v-if="errors.password">{{ errors.password }}</small> -->
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Re-enter Password</label>
                        <InputText type="password" v-model="form.confirm_password" />
                        <!-- <small class="p-error" v-if="errors.confirm_password">{{ errors.confirm_password }}</small> -->
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>Client Logo <b class="text-red-500">*</b></label>
                        <InputText type="file" ref="file" id="image" @change="handleImageChange" accept="image/*" />
                        <small class="p-error" v-if="errors.image">{{ errors.image }}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label>File <b>(PDF Only)</b> <b class="text-red-500">*</b></label>
                        <InputText type="file" ref="pdf" id="file" @change="handlePdf" accept=".pdf" />
                        <small class="p-error" v-if="errors.file">{{ errors.file }}</small>
                    </div>
                    <div class="field col-12">
                        <label for="description">Details <b class="text-red-500">*</b></label>
                        <Textarea id="description" rows="4" v-model="form.description" />
                        <small class="p-error" v-if="errors.description">{{ errors.description }}</small>
                    </div>
                    <div class="col-12">
                        <h4>Client Work Hours</h4>
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-4">
                                <label for="day_start_time">Day Shift Start <b>(If applicable)</b> <b
                                        class="text-red-500">*</b></label>
                                <InputText type="time" v-model="form.day_start_time" />
                                <small class="p-error" v-if="errors.day_start_time">{{ errors.day_start_time }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="day_end_time">Day Shift End <b>(If applicable)</b> <b
                                        class="text-red-500">*</b></label>
                                <InputText type="time" v-model="form.day_end_time" />
                                <small class="p-error" v-if="errors.day_end_time">{{ errors.day_end_time }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="break_time">Break Deduction <b>(Per Day in Minutes)</b> <b
                                        class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.break_time" />
                                <small class="p-error" v-if="errors.break_time">{{ errors.break_time }}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <button class="p-button" @click="handleSubmit">Update Client</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                slug: '', // Add this to hold the client's slug
                name: '',
                email: '',
                company_name: '',
                reg_number: '',
                phone: '',
                funding_limit: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                postCode: '',
                description: '',
                day_start_time: '',
                day_end_time: '',
                break_time: '',
                password: '',
                confirm_password: '',
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
                city: null,
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
            successMessage: ''
        };
    },
    methods: {
        handleSubmit() {
            if (this.validateForm()) {
                const slug = this.form.slug;
                axios.post(`/client/update/${slug}`, this.form, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then(response => {
                        this.successMessage = "Client updated successfully";
                        this.resetForm();
                        setTimeout(() => {
                            this.successMessage = '';
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Error updating client:', error);
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
                if (this.form[key] === '' && key !== 'slug') {
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
        },
        loadClientData(slug) {
            axios.get(`/client/single/view/${slug}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log('Client data loaded:', response.data.client);
                    this.form = { ...response.data.client}; 
                })
                .catch(error => {
                    console.error('Error loading client data:', error);
                });
        }
    },
    mounted() {
        const slug = this.$route.params.slug;
        this.loadClientData(slug);
    }
};
</script>
