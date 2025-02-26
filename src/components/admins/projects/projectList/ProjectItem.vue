<template>
  <div
    class="project-pagination"
    style="justify-content: space-between; align-content: center"
  >
    <h1>status</h1>

    <div style="display: flex">
      <button
        class="project-pagination-button"
        :disabled="currentPage === 1"
        @click="prev()"
        style="margin: 5px"
      >
        &lt;
      </button>

      <div class="project-range" style="margin: 5px">
        {{ startIndex + 1 }}-{{ endIndex }} of {{ allData.length }}
      </div>

      <button
        class="project-pagination-button"
        :disabled="currentPage >= num_pages()"
        @click="change()"
        style="margin: 5px"
      >
        &gt;
      </button>
    </div>
  </div>

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
          <h4 class="text-center pb-2" v-if="selectedProject">
            Delete project 
            <span class="text-secondary fw-bold">
              {{ selectedProject.project_name }}
            </span>?
          </h4>
          <p class="text-center">
            This project will be disappeared after deleted permanently.
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
          <h4 class="text-center pb-2">Project deleted successfully!</h4>
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

  <div class="project-body-wrapper-header">
    <ul id="project-list-header" data-current-page="1" aria-live="polite">
      <li class="project-data-header">
        <div class="project-name">
          <p>project</p>
        </div>

        <div class="project-name">
          <p>department</p>
        </div>

        <div class="project-name">
          <p>start-date</p>
        </div>

        <div class="project-name">
          <p>PPR</p>
        </div>

        <div class="project-data-header">
          <li class="profile-nav onhover-dropdown px-0 py-0">
            <div class="project-status">
              {{ displayPosition }}
              <button class="project-dropdown-button" style="border: unset;">
                <i class="fa fa-angle-down"></i>
              </button>
            </div>

            <ul class="status-dropdown onhover-show-div">
              <li
                v-for="status in status"
                :key="status"
                @click="filterPosition(status)"
              >
                <span>{{ status === "all" ? "All" : status }}</span>
              </li>
            </ul>
          </li>
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
    <div class="project-body-wrapper">
      <ul id="project-list" data-current-page="1" aria-live="polite">
        <li
          v-for="(row, index) in get_rows()"
          :key="index"
          class="project-data"
        >
        <div class="project-name">
          <p>{{ row.project_name }}</p>
        </div>

        <div class="project-name">
          <p>{{ row.department }}</p>
        </div>

        <div class="project-name">
          <p>{{ row.start_date }}</p>
        </div>

        <div class="project-name">
          <p>{{ ppr_name(row.ppr) }}</p>
        </div>

        <div class="project-data">
        <div class="project-status">
              {{ row.status }}
            </div>
          </div>

          <div class="interaction">
            <a href="#">
              <router-link :to="{ name: 'editProjects', params: { projectId: row.id } }">
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
import { mockProjects } from '@/core/mockup/project';
import { useRouter } from "vue-router";
// import { onDelete as deleteUser } from "@/composables/common/admin/userForm";
import { onDelete as deleteProject } from "@/composables/common/admin/projectForm";
import { useSearchStore } from "@/store/searchStore";

import { Modal } from "bootstrap";

const router = useRouter();
const searchStore = useSearchStore();

const props = defineProps<{ searchQuery: string }>();

let elementsPerPage = ref<number>(7);
let currentPage = ref<number>(1);
let allData = ref<any[]>([]);
let userData = ref<any[]>([]);
const selectedPosition = ref<string>("all");
const status = ["all", "waiting", "pass", "completed"];
// const selectedUser = ref<{
//   userid: number;
//   first_name: string;
//   last_name: string;
// } | null>(null);

const selectedProject = ref<{
  id: number;
  project_name: string;
} | null>(null);

function openDeleteModal(project: {
  id: number;
  project_name: string;
}) {
  selectedProject.value = project;
}

function openModal(modalId: string) {
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    new Modal(modalElement).show();
  }
}

async function deleteing() {
  if (!selectedProject.value) return;

  const success = await deleteProject(selectedProject.value.id);
  if (success) {
    openModal("successModal");
  } else {
    console.error("❌ Failed to delete project.");
  }
}

onMounted(() => {
  userData.value = mockUsers;
  allData.value = mockProjects;
});

const filteredProjects = computed(() =>
  allData.value.filter((project) => {
    const projectName = `${project.project_name}`.toLowerCase();
    const query = searchStore.query.toLowerCase().trim();

    const nameMatch = projectName.includes(query);
    const statusMatch =
      selectedPosition.value === "all" ||
      project.status === selectedPosition.value;

    return nameMatch && statusMatch;
  })
);

function filterPosition(status: string) {
  selectedPosition.value = status;
  currentPage.value = 1;
}

const displayPosition = computed(() =>
  selectedPosition.value === "all" ? "status" : selectedPosition.value
);

function ppr_name(pprid: number): string {
  const user = mockUsers.find(user => user.id === pprid);
  return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
}

function num_pages() {
  return Math.ceil(filteredProjects.value.length / elementsPerPage.value);
}

function get_rows() {
  const start = (currentPage.value - 1) * elementsPerPage.value;
  return filteredProjects.value.slice(start, start + elementsPerPage.value);
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
  Math.min(startIndex.value + elementsPerPage.value, filteredProjects.value.length)
);

const goBack = () => {
  router.back();
};
</script>
