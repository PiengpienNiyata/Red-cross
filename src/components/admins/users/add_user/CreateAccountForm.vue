<template>
  <Card3
    colClass="col-xl-12"
    pre="true"
    cardClass="height-equal"
    preClass="f-m-light mt-1"
    headerTitle="true"
    title="Create Account"
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
          :class="{
            'is-invalid': formSubmitted && inputs.position.errorMessage,
          }"
          v-model="inputs.position.data"
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
        >
          Set Password
        </button>

        <SetPassword
          ref="passwordModalRef"
          @passwordSubmitted="handlePasswordSubmit"
        />

        <span class="text-muted" v-if="inputs.password.data">
          ✅ Password set.
        </span>
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
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </Card3>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import {
  onSubmit,
  inputs,
  optionValues,
  formSubmitted,
} from "@/composables/common/admin/addUserForm";

const Card3 = defineAsyncComponent(
  () => import("@/components/common/card/CardData3.vue")
);

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
  passwordModalRef.value?.showModal();
};

const goBack = () => {
  router.back();
};
</script>
