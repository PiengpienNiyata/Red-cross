<template>
  <Card3
    colClass="col-xl-12"
    pre="true"
    cardClass="height-equal"
    preClass="f-m-light mt-1"
    headerTitle="true"
    title="Edit Account"
  >
    <form
      class="row g-3 needs-validation custom-input"
      novalidate
      @submit.prevent="onSubmit()"
    >
      <div class="col-12">
        <label class="col-sm-12 col-form-label" for="validationCustom01"
          >Email</label
        >
        <input
          type="email"
          class="form-control"
          v-model="inputs.email.data"
          :class="{ 'is-invalid': formSubmitted && inputs.email.errorMessage }"
        />

        <div class="invalid-feedback" v-if="inputs.email.errorMessage.length">
          {{ inputs.email.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label" for="validationCustom01">First name</label>
        <input
          type="text"
          class="form-control"
          :class="{
            'is-invalid': formSubmitted && inputs.firstname.errorMessage,
          }"
          id="firstName"
          placeholder="First name"
          v-model="inputs.firstname.data"
        />
        <div
          class="invalid-feedback"
          v-if="inputs.firstname.errorMessage.length"
        >
          {{ inputs.firstname.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
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
      </div>

      <div class="col-md-6">
  <label class="form-label" for="validationCustom04">Position</label>
  <select
    class="form-select"
    id="validationCustom04"
    v-model="inputs.position.data"
    :class="{ 'is-invalid': formSubmitted && inputs.position.errorMessage }"
    required
  >
    <option disabled value="">Select Position</option>
    <option v-for="value in optionValues" :key="value" :value="value">
      {{ value }}
    </option>
  </select>

  <div class="invalid-feedback" v-if="inputs.position.errorMessage.length">
    {{ inputs.position.errorMessage }}
  </div>
</div>

      <div class="col-md-6">
        <label class="form-label" for="validationCustom03">Set password</label>

        <button
          class="btn btn-outline-light w-100"
          type="button"
          @click="openPasswordModal"
        >
          Set Password
        </button>

        <SetPassword
          ref="passwordModalRef"
          :password="inputs.password.data"
          @passwordSubmitted="handlePasswordSubmit"
        />

        <span class="text-muted" v-if="inputs.password.data">
          ✅ Password set.
        </span>
        <span class="text-muted" v-else> ❌ Password not set. </span>
        <div class="invalid-feedback" v-if="inputs.password.errorMessage">
          {{ inputs.password.errorMessage }}
        </div>

        <div
          class="invalid-feedback"
          v-if="inputs.password.errorMessage.length"
        >
          {{ inputs.password.errorMessage }}
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
                    Account created successfully!
                  </h4>
                  <p class="text-center">Click on close button to user list</p>
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
import { ref, defineAsyncComponent, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mockUsers } from "@/core/mockup/user";
import {
  validateInputs,
  inputs,
  onSubmit as sendData,
  optionValues,
  formSubmitted,
} from "@/composables/common/admin/addUserForm";

// Props: Receive userId from router
const props = defineProps<{ userId: string }>();

const router = useRouter();
const passwordModalRef = ref(null);


const SetPassword = defineAsyncComponent(
  () => import("@/components/admins/users/add_user/SetPassword.vue")
);

const handlePasswordSubmit = (password: string) => {
  inputs.value.password.data = password;
  inputs.value.password.errorMessage = "";
};

const openPasswordModal = () => {
  passwordModalRef.value?.showModal?.();
};

const isFormValid = computed(() => validateInputs());

const onSubmit = () => {
  formSubmitted.value = true;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  const user = mockUsers.find((user) => user.id === Number(props.userId));

  if (user) {
    inputs.value.firstname.data = user.first_name;
    inputs.value.lastname.data = user.last_name;
    inputs.value.email.data = user.email;
    inputs.value.position.data = user.position.charAt(0).toUpperCase() + user.position.slice(1).toLowerCase();
    inputs.value.password.data = user.password?user.password:"";
  } else {
    alert("User not found. Redirecting to user list...");
    router.push({ name: "users" });
  }
});
</script>
