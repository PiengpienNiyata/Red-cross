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
import { ref, onMounted, defineProps, defineEmits, watch } from "vue";
import { Modal } from "bootstrap";

// ✅ Props: Accept the initial password (for editing scenario)
const props = defineProps<{ password: string }>();

// ✅ Emits event to parent component when password is submitted
const emit = defineEmits(["passwordSubmitted"]);

const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

// ✅ Initialize password fields
const password = ref<string>(props.password || "");      // Use prop value if editing
const confirmPassword = ref<string>("");

// ✅ Error states
const passwordError = ref<boolean>(false);
const confirmPasswordError = ref<boolean>(false);

// ✅ Initialize Bootstrap modal
onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value, { backdrop: "static", keyboard: false });
  }
});

// ✅ Show modal and reset confirmPassword on open
const showModal = () => {
  password.value = props.password;   // Pre-fill password field (for editing)
  confirmPassword.value = "";        // Clear confirm field
  passwordError.value = false;
  confirmPasswordError.value = false;
  modalInstance?.show();
};

// ✅ Hide modal
const hideModal = () => {
  modalInstance?.hide();
};

// ✅ Submit password with validation
const submitPassword = () => {
  passwordError.value = password.value.length < 6;
  confirmPasswordError.value = password.value !== confirmPassword.value;

  if (!passwordError.value && !confirmPasswordError.value) {
    emit("passwordSubmitted", password.value);  // 🔥 Send password to parent
    hideModal();
  }
};

// ✅ Expose methods to parent component
defineExpose({ showModal, hideModal });
</script>


