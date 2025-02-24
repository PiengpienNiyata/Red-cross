<template>
  <div class="user-pagination">
    <button
      class="user-pagination-button"
      :disabled="currentPage === 1"
      @click="prev()"
    >
      &lt;
    </button>
<!-- Delete Confirmation Modal -->
<div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-toggle-wrapper">
          <ul class="modal-img">
            <li>
              <img src="@/assets/images/gif/danger.gif" alt="error" />
            </li>
          </ul>
          <h4 class="text-center pb-2" v-if="selectedUser">
            Delete
            <span class="text-secondary fw-bold">
              {{ selectedUser.first_name }} {{ selectedUser.last_name }}
            </span>
            's account?
          </h4>
          <p class="text-center">
            This account will be disappeared after deleted permanently.
          </p>
<br>
          <div class="d-flex justify-content-center mt-3">
            <button
              class="btn btn-outline-dark m-2"
              type="button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-danger m-2"
              type="button"
              data-bs-dismiss="modal"

              @click="deleteing"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Success Modal -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-toggle-wrapper">
          <ul class="modal-img">
            <li>
              <img src="@/assets/images/gif/dashboard-8/successful.gif" alt="success" />
            </li>
          </ul>
          <h4 class="text-center pb-2">Account deleted successfully!</h4>
          <p class="text-center">Click on close button to continue.</p>
          <br>

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



    <div class="user-range">
      {{ startIndex + 1 }}-{{ endIndex }} of {{ allData.length }}
    </div>

    <button
      class="user-pagination-button"
      :disabled="currentPage >= num_pages()"
      @click="change()"
    >
      &gt;
    </button>
  </div>

  <div class="user-body-wrapper-header">
    <ul id="user-list-header" data-current-page="1" aria-live="polite">
      <li class="user-header-data">
        <div class="user-name">
          <p>name</p>
        </div>

        <div class="user-data-header">
          <li class="profile-nav onhover-dropdown px-0 py-0">
            <div class="user-position">
              {{ displayPosition }}
              <button class="user-dropdown-button">
                <i class="fa fa-angle-down"></i>
              </button>
            </div>

            <ul class="position-dropdown onhover-show-div">
              <li
                v-for="position in positions"
                :key="position"
                @click="filterPosition(position)"
              >
                <span>{{ position === "all" ? "All" : position }}</span>
              </li>
            </ul>
          </li>
        </div>

        <div class="user-data-header">
          <div class="user-email">email</div>
        </div>

        <div class="interaction"></div>
      </li>
    </ul>
  </div>
  <div
    class="tab-pane fade show active"
    id="inbox-pill"
    role="tabpanel"
    aria-labelledby="inbox-pill-tab"
  >
    <div class="user-body-wrapper">
      <ul id="user-list" data-current-page="1" aria-live="polite">
        <li v-for="(row, index) in get_rows()" :key="index" class="user-data">
          <div class="user-name">
            <!-- <div class="form-check form-check-inline m-0">
              <input
                class="form-check-input checkbox-primary"
                id="emailCheckbox1"
                type="checkbox"
                value="option1"
              />
              <label class="form-check-label" for="emailCheckbox1"></label>
            </div> -->

            <p>{{ row.first_name }} {{ row.last_name }}</p>
          </div>

          <div class="user-data">
            <div class="user-position">
              {{ row.position }}
            </div>
          </div>

          <div class="user-data">
            <div class="user-email">
              {{ row.email }}
            </div>
          </div>

          <div class="interaction">
            <a href="#">
              <router-link :to="{ name: 'edit', params: { userId: row.id } }">
                <i class="fa fa-pencil" style="font-size: 16px"> </i>
              </router-link>
            </a>
            <a href="#">
              <i
                class="fa fa-trash"
                style="font-size: 16px"
                :data-bs-toggle="'modal'"
                :data-bs-target="'#delModal'"
                @click="openDeleteModal(row)"
              ></i
            ></a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, defineProps } from "vue";
import { mockUsers } from "@/core/mockup/user";
import { useRouter } from "vue-router";
import { onDelete as deleteUser } from "@/composables/common/admin/addUserForm";
import { Modal } from "bootstrap";

const router = useRouter();

const props = defineProps<{ searchQuery: string }>();

let elementsPerPage = ref<number>(10);
let currentPage = ref<number>(1);
let allData = ref<any[]>([]);
const selectedPosition = ref<string>("all");
const positions = ["all", "system", "admin", "user"];
const selectedUser = ref<{ userid: number; first_name: string; last_name: string } | null>(null);

function openDeleteModal(user: { userid: number; first_name: string; last_name: string }) {
  selectedUser.value = user;
}

function openModal(modalId: string) {
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    new Modal(modalElement).show();
  }
}

async function deleteing() {
  if (!selectedUser.value) return;

  const success = await deleteUser(selectedUser.value.userid);
  if (success) {
    openModal("successModal");
  } else {
    console.error("❌ Failed to delete user.");
  }
}

onMounted(() => {
  allData.value = mockUsers;
});

const filteredUsers = computed(() =>
  allData.value.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const query = props.searchQuery.toLowerCase().trim();

    const nameMatch = fullName.includes(query);
    const positionMatch =
      selectedPosition.value === "all" ||
      user.position === selectedPosition.value;

    return nameMatch && positionMatch;
  })
);

function filterPosition(position: string) {
  selectedPosition.value = position;
  currentPage.value = 1;
}

const displayPosition = computed(() =>
  selectedPosition.value === "all" ? "position" : selectedPosition.value
);

function num_pages() {
  return Math.ceil(filteredUsers.value.length / elementsPerPage.value);
}

function get_rows() {
  const start = (currentPage.value - 1) * elementsPerPage.value;
  return filteredUsers.value.slice(start, start + elementsPerPage.value);
}

function change() {
  if (currentPage.value < num_pages()) currentPage.value++;
}

function prev() {
  if (currentPage.value > 1) currentPage.value--;
}

const startIndex = computed(
  () => (currentPage.value - 1) * elementsPerPage.value
);
const endIndex = computed(() =>
  Math.min(startIndex.value + elementsPerPage.value, filteredUsers.value.length)
);

const goBack = () => {
  router.back();
};
</script>
