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
          <h5 class="modal-title" id="exampleModalLabel">Select PPR</h5>
          <button class="btn-close" type="button" @click="hideModal"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitPPR">
            <Card3
              pre="true"
              preClass="f-m-light mt-1"
            >
            <!-- <SearchBar /> -->
            <div class="users-search d-flex align-items-center mb-3">
                <input
                  class="form-control"
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search..."
                />
                <!-- <i class="fa fa-search ms-2"></i> -->
              </div>

              <perfect-scrollbar
                class="vertical-scroll scroll-demo scroll-b-none"
                :settings="settings3"
              >
                <div class="list-group">
                  <a
                    class="list-group-item list-group-item-action list-hover-primary"
                    v-for="(item, index) in filteredUsers"
                    :key="index"
                    @click="selectPPR(item)"
                  >
                    <!-- <img
                      class="rounded-circle"
                      :src="getImages(item.img)"
                      alt="user"
                    /> -->
                    {{ item.first_name }} {{ item.last_name }}
                    </a>
                </div>
              </perfect-scrollbar>
            </Card3>

            <!-- <div class="mb-3">
              <input
                class="form-control"
                type="password"
                placeholder="PPR"
                v-model="password"
                :class="{ 'is-invalid': passwordError }"
              />
              <div class="invalid-feedback" v-if="passwordError">
                PPR must be at least 6 characters.
              </div>
            </div>

            <div class="mb-3">
              <input
                class="form-control"
                type="password"
                placeholder="Confirm PPR"
                v-model="confirmPPR"
                :class="{ 'is-invalid': confirmPPRError }"
              />
              <div class="invalid-feedback" v-if="confirmPPRError">
                PPRs do not match.
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
            </div>-->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, defineEmits, watch, computed } from "vue";
import { mockUsers } from "@/core/mockup/user";
import { Modal } from "bootstrap";
// const SearchBar = defineAsyncComponent(() => import("@/components/admins/projects/projectList/SearchBar.vue"))
const props = defineProps<{ ppr: string }>();
const searchQuery = ref<string>(""); // 🔎 Local search query


const emit = defineEmits(["pprSubmitted"]);

const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;
let allData = ref<any[]>([]);

const ppr = ref<string>(props.ppr || "");
const confirmPPR = ref<string>("");

const pprError = ref<boolean>(false);
const confirmPPRError = ref<boolean>(false);


const filteredUsers = computed(() =>
  allData.value.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.value.trim().toLowerCase());
  })
);

const selectPPR = (user: { id: number; first_name: string; last_name: string }) => {
  emit("pprSubmitted", user.id.toString());
  hideModal();
};

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value, {
      backdrop: "static",
      keyboard: false,
    });
    allData.value = mockUsers;
  }
});

const showModal = () => {
  ppr.value = props.ppr;
  confirmPPR.value = "";
  pprError.value = false;
  confirmPPRError.value = false;
  modalInstance?.show();
};

const hideModal = () => {
  modalInstance?.hide();
};

const submitPPR = () => {
  pprError.value = ppr.value.length < 6;
  confirmPPRError.value = ppr.value !== confirmPPR.value;

  if (!pprError.value && !confirmPPRError.value) {
    emit("pprSubmitted", ppr.value); // 🔥 Send ppr to parent
    hideModal();
  }
};

defineExpose({ showModal, hideModal });








import { defineAsyncComponent } from "vue";
import { profile } from "@/core/data/scrollable";
import { getImages } from "@/composables/common/getImages";
const Card3 = defineAsyncComponent(
  () => import("@/components/common/card/CardData3.vue")
);
let desc = ref<string>(
  " Use the <code>.list-group-item </code>through made profile and with used <code>.vertical-scroll </code>."
);
const settings3 = {
  maxScrollbarLength: 60,
  suppressScrollY: true,
  suppressScrollX: false,
};
</script>
