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
                <div class="col-12">
                    <div class="card">
                        <div class="p-fluid formgrid grid">
                            <!-- Form Fields with Validation Messages -->
                            <div class="field col-12 md:col-6">
                                <label>Name<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.name" />
                                <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
                            </div>
                            
                            <div class="field col-12 md:col-6">
                                <label>Email Address<b class="text-red-500"> *</b></label>
                                <InputText type="email" v-model="form.email" />
                                <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                            </div>
                            
                            <div class="field col-12 md:col-6">
                                <label>Password <b class="text-red-500"> *</b></label>
                                <InputText type="password" v-model="form.password" />
                                <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label>Phone Number<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.phone" />
                                <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label>Image<b class="text-red-500"> *</b></label>
                                <InputText type="file" @change="handleImage" ref="staffImage" id="image" />
                                <small class="p-error" v-if="errors.image">{{ errors.image }}</small>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label>Administrative Role<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.administrative" />
                                <small class="p-error" v-if="errors.administrative">{{ errors.administrative }}</small>
                            </div>
                        </div>
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


export default {
    components: {
        Dropdown,
        InputText,
        
    },
    setup() {
        const form = ref({
            name: '',
            email: '',
            password: '',
            phone: '',
            image: null,
        });

        const errors = ref({
            name: null,
            email: null,
            password: null,
            phone: null,
            image: null,
        });

        const successMessage = ref('');

        const staffImage = ref(null);

        function handleImage(event) {
            const selectedImage = event.target.files[0];
            form.value.image = selectedImage;
        }

        function validateForm() {
            let valid = true;

            
            if (!form.value.name) {
                errors.value.name = 'Name is required.';
                valid = false;
            } else {
                errors.value.name = null;
            }

            
            if (!form.value.email) {
                errors.value.email = 'Email is required.';
                valid = false;
            } else {
                errors.value.email = null;
            }

            if (!form.value.password) {
                errors.value.password = 'Password is required.';
                valid = false;
            } else {
                errors.value.password = null;
            }

            if (!form.value.phone) {
                errors.value.phone = 'Phone Number is required.';
                valid = false;
            } else {
                errors.value.phone = null;
            }

            if (!form.value.image) {
                errors.value.image = 'Image is required.';
                valid = false;
            } else {
                errors.value.image = null;
            }
            if (!form.value.administrative) {
                errors.value.administrative = 'Administrative is required.';
                valid = false;
            } else {
                errors.value.administrative = null;
            }

            return valid;
        }

        function handleSubmit() {

            if (validateForm()) {
                axios.post('/staff/registration', form.value, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then(response => {
                        successMessage.value = "Registration successful";
                        resetForm();
                        setTimeout(() => {
                            successMessage.value = '';
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Error submitting form:', error);
                    });
            }
        }

        function resetForm() {
            Object.keys(form.value).forEach(key => {
                if (Array.isArray(form.value[key])) {
                    form.value[key] = [];
                } else {
                    form.value[key] = '';
                }
            });
        }

        return {
            handleImage,
            form,
            errors,
            successMessage,
            validateForm,
            handleSubmit,
            staffImage,
        };
    }
}
</script>
