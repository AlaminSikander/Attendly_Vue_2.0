<template>
  <div class="content-wrapper">
    <div class="m-3 mt-5">
      <h2 class="text-center mt-5">Assign Staff to Client and Rate Types Amount</h2>
      <hr class="hr bg-warning" />
      <div class="block-container">
        <div class="">
          <form @submit.prevent="submitForm">
            <div class="mt-30" style="height:100%; padding-top:30px;">
              <div class="row justify-content-center m-2">
                <div class="card">
                  <div class="col-md-12 row d-flex justify-content-center mb-3">
                    <div class="col-lg-4 mb-3" style="position: relative;">
                      <label for="clientSearch">Select Company</label>
                      <input type="text" class="form-control" v-model="clientSearch" @input="filterClients" placeholder="Search or Select Company..." autocomplete="off">
                      <select v-if="filteredClients.length" class="form-control mt-2" v-model="selectedClient" size="5" @change="selectClient">
                        <option v-for="client in filteredClients" :key="client.slug" :value="client.slug">
                          {{ client.company_name }}
                        </option>
                      </select>
                      <small v-if="errors.client_slug" class="text-danger">{{ errors.client_slug }}</small>
                    </div>
                    <div class="col-lg-4 mb-2" style="position: relative;">
                      <label for="staffSearch">Select Staff</label>
                      <input type="text" class="form-control" v-model="staffSearch" @input="filterStaff" placeholder="Search or Select Staff" autocomplete="off">
                      <select v-if="filteredStaff.length" class="form-control mt-2" v-model="selectedStaff" size="5" @change="selectStaff">
                        <option v-for="staff in filteredStaff" :key="staff.slug" :value="staff.slug">
                          {{ staff.first_name }} {{ staff.last_name }} ({{ staff.driver_id }})
                        </option>
                      </select>
                      <small v-if="errors.driver_slug" class="text-danger">{{ errors.driver_slug }}</small>
                    </div>
                    <div class="col-md-4">
                      <label>Supervision<b class="text-danger ml-1">*</b></label>
                      <select v-model="form.supervision" class="form-control">
                        <option value="yes">Yes</option>
                        <option value="no">NO</option>
                      </select>
                      <small v-if="errors.supervision" class="text-danger">{{ errors.supervision }}</small>
                    </div>
                    <hr>
                  </div>
                </div>
                <div class="col-md-12">
                  <h3 class="ms-3">Work information</h3>
                  <div class="card">
                    <div class="row m-2">
                      <div class="col-md-4 mt-3">
                        <label>Location <b class="text-danger ml-1">*</b></label>
                        <input type="text" v-model="form.location" class="form-control" placeholder="Enter Your Location">
                        <small v-if="errors.location" class="text-danger">{{ errors.location }}</small>
                      </div>
                      <div class="col-md-4 mt-3">
                        <label>Working Hour<b class="text-danger ml-1">*</b></label>
                        <input type="number" v-model="form.working_hour" class="form-control" min="0" step="0.1" max="24" placeholder="Enter Working Time">
                        <small v-if="errors.working_hour" class="text-danger">{{ errors.working_hour }}</small>
                      </div>
                      <div class="col-md-4 mt-3">
                        <label>Start Date<b class="text-danger ml-1">*</b></label>
                        <input type="date" v-model="form.start_date" class="form-control">
                        <small v-if="errors.start_date" class="text-danger">{{ errors.start_date }}</small>
                      </div>
                      <div class="col-md-4 mt-3">
                        <label>End Date<b class="text-danger ml-1">*</b></label>
                        <input type="date" v-model="form.end_date" class="form-control">
                        <small v-if="errors.end_date" class="text-danger">{{ errors.end_date }}</small>
                      </div>
                      <div class="col-md-4 mt-3">
                        <label>Notice Period <small>(Week)</small> <b class="text-danger ml-1">*</b></label>
                        <input type="number" v-model="form.notice_period" class="form-control" min="0" placeholder="Enter notice period time">
                        <small v-if="errors.notice_period" class="text-danger">{{ errors.notice_period }}</small>
                      </div>
                      <div class="col-md-4 mt-3">
                        <label>IR35<b class="text-danger ml-1">*</b></label>
                        <select v-model="form.IR" class="form-control">
                          <option value="inside IR35">Inside IR35</option>
                          <option value="outside IR35">Outside IR35</option>
                        </select>
                        <small v-if="errors.IR" class="text-danger">{{ errors.IR }}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-2">
                  <div class="col-md-12">
                    <label for="additionalInfo" class="me-3">Additional Information<b class="text-danger ml-1">*</b></label>
                    <textarea v-model="form.additional_info" class="form-control" rows="5"></textarea>
                    <small v-if="errors.additional_info" class="text-danger">{{ errors.additional_info }}</small>
                  </div>
                </div>
                <div class="col-md-12 mt-3 mb-5">
                  <div class="card p-3">
                    <div id="categoryData" v-html="rateDetails"></div>
                  </div>
                  <div class="col-lg-12 text-center">
                  </div>
                </div>
              </div>
              <div class="col-12 text-center mb-5">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clients: {
      type: Array,
      required: true,
    },
    drivers: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      clientSearch: '',
      staffSearch: '',
      selectedClient: null,
      selectedStaff: null,
      filteredClients: [],
      filteredStaff: [],
      form: {
        supervision: '',
        location: '',
        working_hour: '',
        start_date: '',
        end_date: '',
        notice_period: 1,
        IR: 'inside IR35',
        additional_info: '',
      },
      errors: {},
      rateDetails: ''
    };
  },
  mounted() {
    this.filteredClients = this.clients;
    this.filteredStaff = this.drivers;

    document.getElementById('start_date').addEventListener('input', (event) => {
      const startDate = new Date(event.target.value);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 6);
      this.form.end_date = endDate.toISOString().split('T')[0];
    });
  },
  methods: {
    filterClients() {
      this.filteredClients = this.clients.filter(client =>
        client.company_name.toLowerCase().includes(this.clientSearch.toLowerCase())
      );
    },
    filterStaff() {
      this.filteredStaff = this.drivers.filter(staff =>
        staff.first_name.toLowerCase().includes(this.staffSearch.toLowerCase())
      );
    },
    selectClient() {
      const selected = this.filteredClients.find(client => client.slug === this.selectedClient);
      if (selected) {
        this.clientSearch = selected.company_name;
        this.fetchRateDetails();
      }
    },
    selectStaff() {
      const selected = this.filteredStaff.find(staff => staff.slug === this.selectedStaff);
      if (selected) {
        this.staffSearch = `${selected.first_name} ${selected.last_name} (${selected.driver_id})`;
      }
    },
    fetchRateDetails() {
      axios.get('/your-api-endpoint', {
        params: {
          client_slug: this.selectedClient
        }
      })
      .then(response => {
        this.rateDetails = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    submitForm() {
      axios.post('/your-submit-endpoint', this.form)
        .then(response => {
          console.log('Form submitted successfully!');
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
