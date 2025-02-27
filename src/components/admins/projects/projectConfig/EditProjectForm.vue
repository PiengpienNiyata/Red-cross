<template>
  <Card3
    colClass="col-xl-12"
    pre="true"
    cardClass="height-equal"
    preClass="f-m-light mt-1"
    headerTitle="true"
    title="Edit Project"
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
          ✅ PPR is set to {{ getPPRname(Number(inputs.ppr.data)) }}
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
                    Please check your project data before sent.
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
                    Project edited successfully!
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
import { mockUsers } from "@/core/mockup/user";
import {
  validateInputs,
  onEdit as sendData,
  resetInputs,
  inputs,
  formSubmitted,
} from "@/composables/common/admin/projectForm";
import { mockProjects } from "@/core/mockup/project";

// Status options
const optionValues = ["pass", "waiting", "completed"];
const props = defineProps<{ projectId: string }>();

const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"));
const Selectppr = defineAsyncComponent(() => import("@/components/admins/projects/projectConfig/Selectppr.vue"));

const router = useRouter();
const pprModalRef = ref(null);

const handlePPRSubmit = (ppr: string) => {
  inputs.value.ppr.data = ppr;
  inputs.value.ppr.errorMessage = "";
};

const openPPRModal = () => {
  pprModalRef.value?.showModal();
};

const isFormValid = computed(() => validateInputs());
const isSubmitting = ref(false); // Track submission intent

const onSubmit = async () => {
  isSubmitting.value = true; // Prevent accidental navigation
  formSubmitted.value = true;

  if (isFormValid.value) {
    await sendData(Number(props.projectId));
    await nextTick(); // Ensure DOM updates before modal display

    const successModalElement = document.getElementById('successModal');
    if (successModalElement) {
      const successModal = new Modal(successModalElement);
      successModal.show(); // Show success modal
    }
  }
  isSubmitting.value = false; // Reset submission state
};

const closeAllModals = () => {
  document.querySelectorAll(".modal.show").forEach((modalElement) => {
    const modalInstance = Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
  });
};

const goBack = () => {
  if (isSubmitting.value) return; // Prevent navigation while submitting
  closeAllModals();
  router.back();
};

onMounted(() => {
  resetInputs(); // Ensure form resets only once

  // Load existing project data
  const project = mockProjects.find((project) => project.id === Number(props.projectId));

  if (project) {
    inputs.value.project_name.data = project.project_name.trim();
    inputs.value.department.data = project.department.trim();
    inputs.value.start_date.data = project.start_date.trim();
    inputs.value.ppr.data = String(project.ppr);
    inputs.value.status.data = project.status;
  } else {
    alert("Project not found. Redirecting to project list...");
    router.push({ name: "projects" });
  }
});

const getPPRname = (ppr: number): string => {
  const user = mockUsers.find(user => user.id === ppr);
  return user ? `${user.first_name} ${user.last_name}` : "Unknown PPR";
};

onUnmounted(() => {
  resetInputs(); // Ensure cleanup
});
</script>

