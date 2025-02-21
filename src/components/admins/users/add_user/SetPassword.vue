<template>
  <div
    class="modal fade modal-bookmark"
    id="passwordmodal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Set Password</h5>
          <button
            class="btn-close"
            type="button"
            @click="hideModal"
                      ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitPassword">
            <div class="mb-3">
              <input
                class="form-control"
                type="password"
                placeholder="Password"
                v-model="password"
                :class="{ 'is-invalid': passwordError }"
              />
              <div class="invalid-feedback" v-if="passwordError">
                Password must be at least 6 characters.
              </div>
            </div>

            <div class="mb-3">
              <input
                class="form-control"
                type="password"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                :class="{ 'is-invalid': confirmPasswordError }"
              />
              <div class="invalid-feedback" v-if="confirmPasswordError">
                Passwords do not match.
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <button
                class="btn btn-outline-dark me-2"
                type="button"
                @click="hideModal"
              >
                Cancel
              </button>
              <button class="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

const password = ref<string>("");
const confirmPassword = ref<string>("");

const passwordError = ref<boolean>(false);
const confirmPasswordError = ref<boolean>(false);

const emit = defineEmits(["passwordSubmitted"]);

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value, { backdrop: "static", keyboard: false });
  }
});

const showModal = () => {
  modalInstance?.show();
};

const hideModal = () => {
  modalInstance?.hide();
};

const submitPassword = () => {
    passwordError.value = password.value.length < 6;
    confirmPasswordError.value = password.value !== confirmPassword.value;
  if (password.value.length >= 6 && password.value === confirmPassword.value) {
    emit("passwordSubmitted", password.value);
    hideModal();
  }
};

defineExpose({ showModal });
</script>

