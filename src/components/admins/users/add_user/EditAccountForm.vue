<template>
  <Card3
    colClass="col-xl-12"
    pre="true"
    cardClass="height-equal"
    preClass="f-m-light mt-1"
    headerTitle="true"
    title="Edit Account"
  >
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
              <h4 class="text-center pb-2">Account edit successfully!</h4>
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
    <form
      class="row g-3 needs-validation custom-input"
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="col-12">
        <label class="col-sm-12 col-form-label" for="validationCustom01"
          >Email</label
        >
        <input
          type="email"
          class="form-control"
          v-model.trim="inputs.email.data"
          :class="{ 'is-invalid': formSubmitted && inputs.email.errorMessage }"
        />
        <div class="invalid-feedback" v-if="inputs.email.errorMessage.length">
          {{ inputs.email.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="inputs.firstname.data"
          :class="{
            'is-invalid': formSubmitted && inputs.firstname.errorMessage,
          }"
        />
        <div
          class="invalid-feedback"
          v-if="inputs.firstname.errorMessage.length"
        >
          {{ inputs.firstname.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Last name</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="inputs.lastname.data"
          :class="{
            'is-invalid': formSubmitted && inputs.lastname.errorMessage,
          }"
        />
        <div
          class="invalid-feedback"
          v-if="inputs.lastname.errorMessage.length"
        >
          {{ inputs.lastname.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Position</label>
        <select
          class="form-select"
          v-model="inputs.position.data"
          :class="{
            'is-invalid': formSubmitted && inputs.position.errorMessage,
          }"
          required
        >
          <option disabled value="">Select Position</option>
          <option v-for="value in optionValues" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
        <div
          class="invalid-feedback"
          v-if="inputs.position.errorMessage.length"
        >
          {{ inputs.position.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="validationCustom03">Set password</label>
        <button
          class="btn btn-outline-light w-100"
          type="button"
          @click="openPasswordModal"
          style="background-color: #ffffff"
        >
          Set Password
        </button>
        <SetPassword
          ref="passwordModalRef"
          :password="inputs.password.data"
          @passwordSubmitted="handlePasswordSubmit"
        />
        <span class="text-muted" v-if="inputs.password.data"
          >✅ Password set.</span
        >
        <span class="text-muted" v-else>❌ Password not set.</span>
        <div
          class="invalid-feedback"
          v-if="inputs.password.errorMessage.length"
        >
          {{ inputs.password.errorMessage }}
        </div>
      </div>

      <div class="col-12 mt-4">
        <button class="btn btn-outline-dark me-2" @click="goBack" type="reset">
          Cancel
        </button>
        <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Saving..." : "Save" }}
        </button>
      </div>

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
    </form>
  </Card3>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { mockUsers } from "@/core/mockup/user";
import { Modal } from "bootstrap";
import {
  validateInputs,
  inputs,
  onEdit as sendData,
  optionValues,
  formSubmitted,
} from "@/composables/common/admin/userForm";

const props = defineProps<{ userId: string }>();
const router = useRouter();
const passwordModalRef = ref(null);
const isSubmitting = ref(false);

const SetPassword = defineAsyncComponent(
  () => import("@/components/admins/users/add_user/SetPassword.vue")
);

const handlePasswordSubmit = (password: string) => {
  inputs.value.password.data = password.trim();
  inputs.value.password.errorMessage = "";
};

const openPasswordModal = () => passwordModalRef.value?.showModal?.();
const isFormValid = computed(() => validateInputs());

const onSubmit = async () => {
  formSubmitted.value = true;
  const success = await sendData();

  await nextTick();

  const successModalElement = document.getElementById("successModal");
  const errorModalElement = document.getElementById("errorModal");

  if (success) {
    if (successModalElement) {
      new Modal(successModalElement).show();
    } else {
      console.error("Success modal element not found.");
    }
  } else {
    if (errorModalElement) {
      new Modal(errorModalElement).show();
    } else {
      console.error("Error modal element not found.");
    }
  }
};

const closeAllModals = () => {
  document.querySelectorAll(".modal.show").forEach((modalElement) => {
    const modalInstance =
      Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();
    modalInstance.dispose();
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.remove();
  });

  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");
};

const goBack = () => {
  closeAllModals();
  router.back();
};

onMounted(() => {
  const user = mockUsers.find((user) => user.id === Number(props.userId));

  if (user) {
    inputs.value.firstname.data = user.first_name.trim();
    inputs.value.lastname.data = user.last_name.trim();
    inputs.value.email.data = user.email.trim();
    inputs.value.position.data =
      user.position.charAt(0).toUpperCase() +
      user.position.slice(1).toLowerCase();
    inputs.value.password.data = user.password ?? "";
  } else {
    alert("User not found. Redirecting to user list...");
    router.push({ name: "users" });
  }
});
</script>

<style scoped>
.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
