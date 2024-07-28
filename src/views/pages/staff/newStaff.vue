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
                            <div class="field col-12 md:col-4">
                                <label>First Name<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.first_name" />
                                <small class="p-error" v-if="errors.first_name">{{ errors.first_name }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Last Name<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.last_name" />
                                <small class="p-error" v-if="errors.last_name">{{ errors.last_name }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Email Address<b class="text-red-500">*</b></label>
                                <InputText type="email" v-model="form.email" />
                                <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Gender<b class="text-red-500">*</b></label>
                                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name"
                                    placeholder="Select" />
                                <small class="p-error" v-if="errors.company_name">{{ errors.company_name }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Password <b class="text-red-500">*</b></label>
                                <InputText type="password" v-model="form.confirm_password" />
                                <small class="p-error" v-if="errors.confirm_password">{{ errors.confirm_password }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Re-enter Password <b class="text-red-500">*</b></label>
                                <InputText type="password" v-model="form.confirm_password" />
                                <small class="p-error" v-if="errors.confirm_password">{{ errors.confirm_password }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Address Line 1<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.addressLine1" />
                                <small class="p-error" v-if="errors.addressLine1">{{ errors.addressLine1 }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Address Line 2<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.addressLine2" />
                                <small class="p-error" v-if="errors.addressLine2">{{ errors.addressLine2 }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Town/City<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.townOrCity" />
                                <small class="p-error" v-if="errors.townOrCity">{{ errors.townOrCity }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Postcode<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.postCode" />
                                <small class="p-error" v-if="errors.postCode">{{ errors.postCode }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Date of Birth<b class="text-red-500">*</b></label>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="form.dob"></Calendar>
                                <small class="p-error" v-if="errors.dob">{{ errors.dob }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>National Insurance Number<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.ni_number" />
                                <small class="p-error" v-if="errors.ni_number">{{ errors.ni_number }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Phone Number<b class="text-red-500">*</b></label>
                                <InputText type="text" v-model="form.phone" />
                                <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Staff Image<b class="text-red-500">*</b></label>
                                <InputText type="file" v-model="form.image" />
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
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Licence Number<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.licenceNumber" />
                                <small class="p-error" v-if="errors.licenceNumber">{{ errors.licenceNumber }}</small>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label>Licence Expiry<b class="text-red-500"> *</b></label>
                                <InputText type="text" v-model="form.licenceExpiry" />
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
                                    <label>CPC CARD</label>
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
                                    <label>TACHO CARD</label>
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
                                <label>Does he have a DBS or EDBS (if applicable for your role)?<b class="text-red-500">
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
                                <InputText type="file" v-model="form.drivingLicence" />
                                <small class="p-error" v-if="errors.drivingLicence">{{ errors.drivingLicence }}</small>
                            </div>
                            <div class="field col-12 md:col-6">
                                <label>Upload Proof of Address<b class="text-red-500">*</b></label>
                                <InputText type="file" v-model="form.proofOfAddress" />
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
        const dbsValue = ref(null);
        const dbsValues = ref([
            { name: 'Yes' },
            { name: 'No' },
        ]);
        const dropdownValue = ref(null);
        const multiselectValues = ref([
            { name: 'Class B' },
            { name: 'Class C' },
            { name: 'Class D' },
            { name: 'Class D1' },
            { name: 'Class E' }
        ]);
        const multiselectValue = ref([]);
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
            role: '',
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
            role: null,
            ni_number: null,
            phone: null,
            licenceTypes: [],
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
            proofOfAddress: null,
            noCpcCard: null,
            noTachoCard: null,
            noPassport: null,
            noCPC: null,
            noTacho: null
        });
        const successMessage = ref('');

        function handleSubmit() {
            if (this.validateForm()) {
                axios.post('/staff/registration', this.form, {
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
        }

        return {
            dbsValues,
            dbsValue,
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
  