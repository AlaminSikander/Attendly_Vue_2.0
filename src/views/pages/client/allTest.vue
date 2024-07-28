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
                            <div class="field col-12 md:col-4">
                                <label>First Name<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.first_name" />
                                <small class="p-error" v-if="errors.first_name">{{ errors.first_name }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Last Name<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.last_name" />
                                <small class="p-error" v-if="errors.last_name">{{ errors.last_name }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Email Address<b class="text-red-500"> *</b></label>
                                <InputText type="email" v-model="form.email" />
                                <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Gender<b class="text-red-500"> *</b></label>
                                <Dropdown v-model="form.gender" :options="dropdownValues" optionLabel="name"
                                    placeholder="Select" />
                                <small class="p-error" v-if="errors.gender">{{ errors.gender }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Password <b class="text-red-500"> *</b></label>
                                <InputText type="password" v-model="form.password" />
                                <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Re-enter Password <b class="text-red-500"> *</b></label>
                                <InputText type="password" v-model="form.confirm_password" />
                                <small class="p-error" v-if="errors.confirm_password">{{ errors.confirm_password }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Address Line 1<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.addressLine1" />
                                <small class="p-error" v-if="errors.addressLine1">{{ errors.addressLine1 }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Address Line 2<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.addressLine2" />
                                <small class="p-error" v-if="errors.addressLine2">{{ errors.addressLine2 }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Town/City<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.townOrCity" />
                                <small class="p-error" v-if="errors.townOrCity">{{ errors.townOrCity }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Postcode<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.postCode" />
                                <small class="p-error" v-if="errors.postCode">{{ errors.postCode }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Date of Birth<b class="text-red-500"> *</b></label>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="form.dob"></Calendar>
                                <small class="p-error" v-if="errors.dob">{{ errors.dob }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>National Insurance Number<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.ni_number" />
                                <small class="p-error" v-if="errors.ni_number">{{ errors.ni_number }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Phone Number<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.phone" />
                                <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Staff Image<b class="text-red-500"> *</b></label>
                                <InputText type="file" v-model="form.image" @change="handleImage" ref="staffImage" id="image"/>
                                <small class="p-error" v-if="errors.image">{{ errors.image }}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-4">
                                <label>Licence Type<b class="text-red-500"> *</b></label>
                                <MultiSelect v-model="form.licenceTypes" :options="multiselectValues" optionLabel="name"
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
                                <small class="p-error" v-if="errors.licenceTypes">{{ errors.licenceTypes }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Licence Number<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.licenceNumber" />
                                <small class="p-error" v-if="errors.licenceNumber">{{ errors.licenceNumber }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Licence Expiry<b class="text-red-500"> *</b></label>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="form.licenceExpiry"></Calendar>
                                <small class="p-error" v-if="errors.licenceExpiry">{{ errors.licenceExpiry }}</small>
                            </div>
                            <div class="field col-12 md:col-12">
                                <label>Any points/endorsements on your licence?<b class="text-red-500"> *</b></label>
                                <Textarea type="text" v-model="form.licenceEndorsements" />
                                <small class="p-error" v-if="errors.licenceEndorsements">{{ errors.licenceEndorsements
                                }}</small>
                            </div>

                            <div class="field col-12 md:col-4 d-flex align-items-center justify-content-around">
                                <div class="col-lg-6">
                                    <label><b>CPC CARD</b></label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="checkbox" class="form-check-input" id="noCpcCard" v-model="form.noCpcCard">
                                    <label class="form-check-label" for="noCpcCard">I don’t have
                                        one</label>
                                </div>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>CPC Number</label>
                                <InputText type="text" v-model="form.cpcNumber" class="form-control mt-2"
                                    placeholder="Enter CPC Number" :disabled="form.noCpcCard" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>CPC Expiry</label>
                                <Calendar :showIcon="true" :showButtonBar="true" class="form-control mt-2"
                                    v-model="form.cpcExpiry" :disabled="form.noCpcCard"></Calendar>
                            </div>
                            <div class="field col-12 md:col-4 d-flex align-items-center justify-content-around">
                                <div class="col-lg-6">
                                    <label><b>TACHO CARD</b></label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="checkbox" class="form-check-input" id="noTachoCard"
                                        v-model="form.noTachoCard">
                                    <label class="form-check-label" for="noTachoCard">I don’t have
                                        one</label>
                                </div>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Tacho Number</label>
                                <InputText type="text" v-model="form.tachoNumber" class="form-control mt-2"
                                    placeholder="Enter Tacho Number" :disabled="form.noTachoCard" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-4">
                                <label>Does he have a Right to Work in the UK?<b class="text-red-500"> *</b></label>
                                <Dropdown v-model="form.rightToWorkUK" :options="dbsValues" optionLabel="name"
                                    placeholder="Select" />
                                <small class="p-error" v-if="errors.rightToWorkUK">{{ errors.rightToWorkUK }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Does he have a DBS or EDBS (if applicable for your role)?<b class="text-red-500">
                                        *</b></label>
                                <Dropdown v-model="form.dbsCheck" :options="dbsValues" optionLabel="name"
                                    placeholder="Select" />
                                <small class="p-error" v-if="errors.dbsCheck">{{ errors.dbsCheck }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Does he want to opt out of the Pension Scheme?<b class="text-red-500">
                                        *</b></label>
                                <Dropdown v-model="form.optOutOfPension" :options="dbsValues" optionLabel="name"
                                    placeholder="Select" />
                                <small class="p-error" v-if="errors.optOutOfPension">{{ errors.optOutOfPension }}</small>
                            </div>
                            <div class="field col-12 md:col-12">
                                <label>Do you have any Medical Conditions that we should be aware of?<b
                                        class="text-red-500"> *</b></label>
                                <Textarea type="text" v-model="form.medicalConditions" />
                                <small class="p-error" v-if="errors.medicalConditions">{{ errors.medicalConditions
                                }}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-6">
                                <label>Upload Driving Licence<b class="text-red-500">*</b></label>
                                <InputText type="file" v-model="form.drivingLicence" ref="licence" @change="handleDrivingLicence" id="drivingLicence"/>
                                <small class="p-error" v-if="errors.drivingLicence">{{ errors.drivingLicence }}</small>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label>Upload Proof of Address<b class="text-red-500">*</b></label>
                                <InputText type="file" v-model="form.proofOfAddress" ref="staffProofOfAddress" @change="handleProofOfAddress" id="proofOfAddress"/>
                                <small class="p-error" v-if="errors.proofOfAddress">{{ errors.proofOfAddress }}</small>
                            </div>
                            <div class="field col-12 md:col-4 mt-2 mb-4 custom-file">
                                <div class="col-lg-12 d-flex justify-content-around">
                                    <label for="passport"><b>Upload Passport</b></label>
                                    <input type="checkbox" class="form-check-input" id="noPassport"
                                        v-model="form.noPassport">
                                    <label class="form-check-label" for="noPassport">I don’t have
                                        one</label>
                                </div>
                                <InputText type="file" ref="staffPassport" @change="handlePassport"
                                    class="form-control mt-2" id="passport" :disabled="form.noPassport" />
                            </div>
                            <div class="field col-12 md:col-4 mt-2 mb-4 custom-file">
                                <div class="col-lg-12 d-flex justify-content-around">
                                    <label for="cpc"><b>Upload CPC</b></label>
                                    <input type="checkbox" class="form-check-input" id="noCPC" v-model="form.noCPC">
                                    <label class="form-check-label" for="noCPC">I don’t have one</label>
                                </div>
                                <InputText type="file" ref="staffCpc" @change="handleCpc" class="form-control mt-2" id="cpc"
                                    :disabled="form.noCPC" />
                            </div>
                            <div class="field col-12 md:col-4 mt-2 mb-4 custom-file">
                                <div class="col-lg-12 d-flex justify-content-around">
                                    <label for="tacho"><b>Upload Tacho</b></label>
                                    <input type="checkbox" class="form-check-input" id="noTacho" v-model="form.noTacho">
                                    <label class="form-check-label" for="noTacho">I don’t have one</label>
                                </div>
                                <InputText type="file" ref="staffTacho" @change="handleTacho" class="form-control mt-2"
                                    id="tacho" :disabled="form.noTacho" />
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
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';

export default {
    components: {
        Dropdown,
        InputText,
        MultiSelect,
        Calendar,
        Textarea
    },
    setup() {

        function handleImage() {
            const selectedImage = this.$refs.staffImage.files[0];
            form.value.image = selectedImage;
        }

        function handleDrivingLicence() {
            const selectedDrivingLicence = this.$refs.licence.files[0];
            form.value.drivingLicence = selectedDrivingLicence;
        }

        function handleProofOfAddress() {
            const selectedProofOfAddress = this.$refs.staffProofOfAddress.files[0];
            form.value.proofOfAddress = selectedProofOfAddress;
        }

        function handlePassport() {
            const selectedPassport = this.$refs.staffPassport.files[0];
            form.value.passport = selectedPassport;
        }

        function handleCpc() {
            const selectedCpc = this.$refs.staffCpc.files[0];
            form.value.cpc = selectedCpc;
        }

        function handleTacho() {
            const selectedTacho = this.$refs.staffTacho.files[0];
            form.value.tacho = selectedTacho;
        }
        const dropdownValues = ref([
            { name: 'Male' },
            { name: 'Female' },
            { name: 'Other' }
        ]);
        const dbsValues = ref([
            { name: 'Yes' },
            { name: 'No' },
        ]);
        const multiselectValues = ref([
            { name: 'Class B' },
            { name: 'Class C' },
            { name: 'Class D' },
            { name: 'Class D1' },
            { name: 'Class E' }
        ]);
        const form = ref({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            gender: '',
            addressLine1: '',
            addressLine2: '',
            townOrCity: '',
            postCode: '',
            dob: '',
            ni_number: '',
            phone: '',
            licenceTypes: [],
            licenceNumber: '',
            licenceExpiry: '',
            licenceEndorsements: '',
            cpcNumber: '',
            cpcExpiry: '',
            tachoNumber: '',
            rightToWorkUK: '',
            dbsCheck: '',
            optOutOfPension: '',
            medicalConditions: '',
            image: null,
            drivingLicence: null,
            passport: null,
            cpc: null,
            tacho: null,
            proofOfAddress: '',
            noCpcCard: false,
            noTachoCard: false,
            noPassport: false,
            noCPC: false,
            noTacho: false
        });
        const errors = ref({
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            confirm_password: null,
            gender: null,
            addressLine1: null,
            addressLine2: null,
            townOrCity: null,
            postCode: null,
            dob: null,
            ni_number: null,
            phone: null,
            licenceTypes: null,
            licenceNumber: null,
            licenceExpiry: null,
            licenceEndorsements: null,
            cpcNumber: null,
            cpcExpiry: null,
            tachoNumber: null,
            rightToWorkUK: null,
            dbsCheck: null,
            optOutOfPension: null,
            medicalConditions: null,
            image: null,
            drivingLicence: null,
            passport: null,
            cpc: null,
            tacho: null,
            proofOfAddress: null
        });
        const successMessage = ref('');

        function validateForm() {
            let valid = true;

            // Validation logic for each field
            if (!form.value.first_name) {
                errors.value.first_name = 'First name is required.';
                valid = false;
            } else {
                errors.value.first_name = null;
            }

            if (!form.value.last_name) {
                errors.value.last_name = 'Last name is required.';
                valid = false;
            } else {
                errors.value.last_name = null;
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

            if (form.value.password !== form.value.confirm_password) {
                errors.value.confirm_password = 'Passwords do not match.';
                valid = false;
            } else {
                errors.value.confirm_password = null;
            }

            if (!form.value.gender) {
                errors.value.gender = 'Gender is required.';
                valid = false;
            } else {
                errors.value.gender = null;
            }

            if (!form.value.addressLine1) {
                errors.value.addressLine1 = 'Address Line 1 is required.';
                valid = false;
            } else {
                errors.value.addressLine1 = null;
            }

            if (!form.value.addressLine2) {
                errors.value.addressLine2 = 'Address Line 2 is required.';
                valid = false;
            } else {
                errors.value.addressLine1 = null;
            }

            if (!form.value.townOrCity) {
                errors.value.townOrCity = 'Town/City is required.';
                valid = false;
            } else {
                errors.value.townOrCity = null;
            }

            if (!form.value.postCode) {
                errors.value.postCode = 'Postcode is required.';
                valid = false;
            } else {
                errors.value.postCode = null;
            }

            if (!form.value.dob) {
                errors.value.dob = 'Date of Birth is required.';
                valid = false;
            } else {
                errors.value.dob = null;
            }

            if (!form.value.ni_number) {
                errors.value.ni_number = 'National Insurance Number is required.';
                valid = false;
            } else {
                errors.value.ni_number = null;
            }

            if (!form.value.phone) {
                errors.value.phone = 'Phone Number is required.';
                valid = false;
            } else {
                errors.value.phone = null;
            }

            if (!form.value.image) {
                errors.value.image = 'Staff Image is required.';
                valid = false;
            } else {
                errors.value.image = null;
            }

            if (!form.value.drivingLicence) {
                errors.value.drivingLicence = 'Driving Licence is required.';
                valid = false;
            } else {
                errors.value.drivingLicence = null;
            }

            if (!form.value.proofOfAddress) {
                errors.value.proofOfAddress = 'Proof of Address is required.';
                valid = false;
            } else {
                errors.value.proofOfAddress = null;
            }

            if (!form.value.licenceTypes.length) {
                errors.value.licenceTypes = 'Licence Type is required.';
                valid = false;
            } else {
                errors.value.licenceTypes = null;
            }

            if (!form.value.licenceNumber) {
                errors.value.licenceNumber = 'Licence Number is required.';
                valid = false;
            } else {
                errors.value.licenceNumber = null;
            }

            if (!form.value.licenceExpiry) {
                errors.value.licenceExpiry = 'Licence Expiry is required.';
                valid = false;
            } else {
                errors.value.licenceExpiry = null;
            }

            if (!form.value.licenceEndorsements) {
                errors.value.licenceEndorsements = 'Licence Endorsements is required.';
                valid = false;
            } else {
                errors.value.licenceEndorsements = null;
            }

            if (!form.value.rightToWorkUK) {
                errors.value.rightToWorkUK = 'Right to Work in the UK is required.';
                valid = false;
            } else {
                errors.value.rightToWorkUK = null;
            }

            if (!form.value.dbsCheck) {
                errors.value.dbsCheck = 'DBS or EDBS Check is required.';
                valid = false;
            } else {
                errors.value.dbsCheck = null;
            }

            if (!form.value.optOutOfPension) {
                errors.value.optOutOfPension = 'Pension Scheme is required.';
                valid = false;
            } else {
                errors.value.dbsCheck = null;
            }

            if (!form.value.medicalConditions) {
                errors.value.medicalConditions = 'Medical Conditions information is required.';
                valid = false;
            } else {
                errors.value.medicalConditions = null;
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
            handleDrivingLicence,
            handleProofOfAddress,
            handlePassport,
            handleCpc,
            handleTacho,
            dbsValues,
            dropdownValues,
            multiselectValues,
            form,
            errors,
            successMessage,
            validateForm,
            handleSubmit
        };
    }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
