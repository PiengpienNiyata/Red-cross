<template>
  <!-- <div class="user-pagination">
    <button
      class="user-pagination-button"
      id="prev-button"
      aria-label="Previous page"
      title="Previous page"
      v-on:click="prev()"
    >
      &lt;
    </button>
    <div
      class="user-pagination-index"
      id="pagination-numbers"
      v-for="i in num_pages()"
      :key="i"
      v-bind:class="[i == currentPage ? 'active' : '']"
      v-on:click="change_page(i)"
    >
      {{ i }}
    </div>
    <button
      class="user-pagination-button"
      id="next-button"
      aria-label="Next page"
      v-on:click="change()"
      title="Next page"
    >
      &gt;
    </button>
  </div> -->
  <div class="user-pagination">
    <!-- Previous Button -->
    <button
      class="user-pagination-button"
      :disabled="currentPage === 1"
      @click="prev()"
    >
      &lt;
    </button>

    <!-- Range Display -->
    <div class="user-range">
      {{ startIndex + 1 }}-{{ endIndex }} of {{ allData.length }}
    </div>

    <!-- Next Button -->
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
          <!-- <div class="form-check form-check-inline m-0">
                <input
                  class="form-check-input checkbox-primary"
                  id="checkedAll"
                  type="checkbox"
                  value="option1"
                />
                <label class="form-check-label" for="emailCheckbox1"></label>
              </div> -->

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

            <ul class="profile-dropdown onhover-show-div" >
              <li v-for="position in positions" :key="position" @click="filterPosition(position)">
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
              <i class="fa fa-pencil" style="font-size: 16px"> </i>
            </a>
            <a href="#">
              <i class="fa fa-trash" style="font-size: 16px"> </i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, defineProps } from "vue";
import { mockUsers } from "@/core/mockup/user";

// 📝 Accept search query prop
const props = defineProps<{ searchQuery: string }>();

let elementsPerPage = ref<number>(10);
let currentPage = ref<number>(1);
let allData = ref<any[]>([]);
const selectedPosition = ref<string>("all");
const positions = ["all", "system", "admin", "user"];

// Load mock data
onMounted(() => {
  allData.value = mockUsers;
});

// 🔎 Filter by position and search query
const filteredUsers = computed(() =>
  allData.value.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const query = props.searchQuery.toLowerCase().trim();

    // Check if fullName contains search query and matches position
    const nameMatch = fullName.includes(query);
    const positionMatch =
      selectedPosition.value === "all" ||
      user.position === selectedPosition.value;

    return nameMatch && positionMatch;
  })
);

// Position filter
function filterPosition(position: string) {
  selectedPosition.value = position;
  currentPage.value = 1;
}

// Computed display text for position
const displayPosition = computed(() =>
  selectedPosition.value === "all" ? "position" : selectedPosition.value
);

// Pagination logic
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

const startIndex = computed(() => (currentPage.value - 1) * elementsPerPage.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + elementsPerPage.value, filteredUsers.value.length)
);
</script>


