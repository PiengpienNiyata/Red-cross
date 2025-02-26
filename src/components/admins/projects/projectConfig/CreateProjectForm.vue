<template>
  <Card3
    colClass="col-xl-12"
    pre="true"
    cardClass="height-equal"
    preClass="f-m-light mt-1"
    headerTitle="true"
    title="Create Project"
  >
    <form
      class="row g-3 needs-validation custom-input"
      novalidate
      @submit.prevent="onSubmit()"
    >
      <div class="col-12">
        <label class="col-sm-12 col-form-label" for="validationCustom01"
          >Project name</label
        >
        <input
          type="text"
          class="form-control"
          placeholder="Project name 01"
          v-model="inputs.project_name.data"
          :class="{
            'is-invalid': formSubmitted && inputs.project_name.errorMessage,
          }"
        />

        <div
          class="invalid-feedback"
          v-if="inputs.project_name.errorMessage.length"
        >
          {{ inputs.project_name.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="validationCustom01">Department</label>
        <input
          type="text"
          class="form-control"
          :class="{
            'is-invalid': formSubmitted && inputs.department.errorMessage,
          }"
          placeholder="Department"
          v-model="inputs.department.data"
        />
        <div
          class="invalid-feedback"
          v-if="inputs.department.errorMessage.length"
        >
          {{ inputs.department.errorMessage }}
        </div>
      </div>

      <!-- Start Date -->
      <div class="col-md-6">
        <label class="form-label">Start Date</label>
        <input
          type="date"
          class="form-control"
          v-model="inputs.start_date.data"
          :class="{
            'is-invalid': formSubmitted && inputs.start_date.errorMessage,
          }"
        />
        <div class="invalid-feedback" v-if="inputs.start_date.errorMessage">
          {{ inputs.start_date.errorMessage }}
        </div>
      </div>

      <!-- <div class="col-md-6">
        <label class="form-label" for="validationCustom01">Last name</label>
        <input
          type="text"
          class="form-control"
          :class="{
            'is-invalid': formSubmitted && inputs.lastname.errorMessage,
          }"
          id="lastName"
          placeholder="Last name"
          v-model="inputs.lastname.data"
        />
        <div
          class="invalid-feedback"
          v-if="inputs.lastname.errorMessage.length"
        >
          {{ inputs.lastname.errorMessage }}
        </div>
      </div> -->

      <div class="col-md-6">
        <label class="form-label" for="validationCustom04">Status</label>
        <select
          class="form-select"
          id="validationCustom04"
          :class="{
            'is-invalid': formSubmitted && inputs.status.errorMessage,
          }"
          v-model="inputs.status.data"
          required
        >
          <option disabled value="">Select Status</option>
          <option v-for="value in optionValues" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
        <div class="invalid-feedback" v-if="inputs.status.errorMessage.length">
          {{ inputs.status.errorMessage }}
        </div>
      </div>


       <div class="col-md-6">
        <label class="form-label" for="validationCustom03">Primary Person Responsible (PPR)</label>
        <button
          class="btn btn-outline-light w-100"
          type="button"
          @click="openPPRModal"
        >
          Select PPR
        </button>
        <Selectppr
          ref="pprModalRef"
          @pprSubmitted="handlePPRSubmit"
        />

        <span class="text-muted" v-if="inputs.ppr.data">
          ✅ PPR is set to {{ inputs.ppr.data }}
        </span>
        <span class="text-muted" v-else> ❌ PPR not select. </span>
        <div class="invalid-feedback" v-if="inputs.ppr.errorMessage">
          {{ inputs.ppr.errorMessage }}
        </div>

        <div
          class="invalid-feedback"
          v-if="inputs.ppr.errorMessage.length"
        >
          {{ inputs.ppr.errorMessage }}
        </div>
      </div> 

      
      <div class="col-12" style="margin-top: 40px">
        <button
          class="btn btn-outline-dark"
          style="margin-right: 10px"
          @click="goBack"
        >
          Cancel
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          :data-bs-toggle="formSubmitted ? 'modal' : ''"
          :data-bs-target="
            formSubmitted ? (isFormValid ? '#successModal' : '#errorModal') : ''
          "
          @click="sendData"
        >
          Save
        </button>
        <div
          class="modal fade"
          id="errorModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-toggle-wrapper">
                  <ul class="modal-img">
                    <li>
                      <img src="@/assets/images/gif/danger.gif" alt="error" />
                    </li>
                  </ul>
                  <h4 class="text-center pb-2">Invalid input!</h4>
                  <p class="text-center">
                    Please check your account data before sent.
                  </p>
                  <br />
                  <button
                    class="btn btn-secondary d-flex m-auto"
                    type="button"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="successModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-toggle-wrapper">
                  <ul class="modal-img">
                    <li>
                      <img
                        src="@/assets/images/gif/dashboard-8/successful.gif"
                        alt="error"
                      />
                    </li>
                  </ul>
                  <h4 class="text-center pb-2">
                    Project created successfully!
                  </h4>
                  <p class="text-center">Click on close button to continue.</p>
                  <br />
                  <button
                    class="btn btn-secondary d-flex m-auto"
                    type="button"
                    data-bs-dismiss="modal"
                    @click="goBack"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Card3>
</template>

<script lang="ts" setup>
import {
  ref,
  defineAsyncComponent,
  computed,
  onMounted,
  onUnmounted,
  nextTick
} from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

// import {
//   validateInputs,
//   onSubmit as sendData,
//   resetInputs,
//   inputs,
//   optionValues,
//   formSubmitted,
// } from "@/composables/common/admin/userForm";

import {
  validateInputs,
  onSubmit as sendData,
  resetInputs,
  inputs,
  formSubmitted,
} from "@/composables/common/admin/projectForm";

const optionValues = ["pass", "waiting", "completed"];

const Card3 = defineAsyncComponent(
  () => import("@/components/common/card/CardData3.vue")
);

const router = useRouter();
const pprModalRef = ref(null);

const Selectppr = defineAsyncComponent(
  () => import("@/components/admins/projects/projectConfig/Selectppr.vue")
);

const handlePPRSubmit = (ppr: string) => {
  inputs.value.ppr.data = ppr;
  inputs.value.ppr.errorMessage = "";
};

const openPPRModal = () => {
  pprModalRef.value?.showModal();
};

const isFormValid = computed(() => validateInputs());

const onSubmit = async () => {
  formSubmitted.value = true;

  if (isFormValid.value) {
    await sendData(); // Call projectForm.ts for project creation
    await nextTick(); // Ensure DOM updates

    const successModalElement = document.getElementById('successModal');
    if (successModalElement) {
      const successModal = new Modal(successModalElement);

      // Reset form AFTER modal is hidden
      successModalElement.addEventListener('hidden.bs.modal', () => {
        resetInputs(); // Reset fields after user closes modal
      });

      successModal.show(); // Show modal
    }
  }
};


const closeAllModals = () => {
  document.querySelectorAll(".modal.show").forEach((modalElement) => {
    const modalInstance = Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
  });
};

const goBack = () => {
  closeAllModals();
  router.back();
};

// onMounted(() => {
//   resetInputs();
// });

// onUnmounted(() => {
//   resetInputs();
// });
</script>
