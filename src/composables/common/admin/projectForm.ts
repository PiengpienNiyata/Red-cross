// addProjectForm.ts

import { ref } from 'vue';
import { mockProjects, Project } from "@/core/mockup/project";

// -----------------------------
// Interfaces and Data
// -----------------------------

interface InputData {
  data: string;
  errorMessage: string;
}

interface ProjectInputs {
  project_name: InputData;
  department: InputData;
  start_date: InputData;
  ppr: InputData;
  status: InputData;
}

interface ErrorObject {
  message: string;
  code: number;
}

export const errors = ref<ErrorObject[]>([]);
// export const optionDepartments = ref<string[]>([
//   "Engineering", "IT", "Marketing", "Design", "Finance", "Operations", "Human Resources",
// ]);

export const optionStatuses = ref<Project["status"][]>([
  "pass", "waiting", "completed",
]);

export const inputs = ref<ProjectInputs>({
  project_name: { data: "", errorMessage: "" },
  department: { data: "", errorMessage: "" },
  start_date: { data: "", errorMessage: "" },
  ppr: { data: "", errorMessage: "" },
  status: { data: "", errorMessage: "" },
});

export const formSubmitted = ref<boolean>(false);
export const submitted = ref<boolean>(false);

// -----------------------------
// Validation Functions
// -----------------------------

const isValidDate = (date: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(date);
const isValidAccountId = (id: string): boolean => !isNaN(Number(id)) && Number(id) > 0;

export const validateInputs = (): boolean => {
  const values = inputs.value;
  let isValid = true;

  const validateField = (field: keyof ProjectInputs, condition: boolean, message: string) => {
    values[field].errorMessage = condition ? message : "";
    if (condition) isValid = false;
  };

  validateField("project_name", values.project_name.data.trim().length < 3, "Project name must be at least 3 characters.");
  validateField("department", values.department.data.trim().length < 3, "Select a valid department.");
  validateField("start_date", !isValidDate(values.start_date.data), "Date must be YYYY-MM-DD.");
  validateField("ppr", !isValidAccountId(values.ppr.data), "Invalid account ID.");
  validateField("status", !optionStatuses.value.includes(values.status.data as Project["status"]), "Invalid status.");

  return isValid;
};

// -----------------------------
// CRUD Operations
// -----------------------------

export const onSubmit = () => {
  submitted.value = true;
  formSubmitted.value = true;

  if (validateInputs()) {
    const newProject: Project = {
      id: mockProjects.length + 1,
      project_name: inputs.value.project_name.data.trim(),
      department: inputs.value.department.data.trim(),
      start_date: inputs.value.start_date.data.trim(),
      ppr: Number(inputs.value.ppr.data),
      status: inputs.value.status.data as Project["status"],
    };

    mockProjects.push(newProject);
    console.log("✅ Project created:", newProject);
    // resetInputs();
  } else {
    console.log("❌ Form has errors.");
  }
};

export const onEdit = async (projectId: number) => {
  submitted.value = true;
  formSubmitted.value = true;

  if (!validateInputs()) {
    console.log("❌ Validation failed.");
    return false;
  }

  const projectIndex = mockProjects.findIndex((p) => p.id === projectId);
  if (projectIndex !== -1) {
    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      project_name: inputs.value.project_name.data.trim(),
      department: inputs.value.department.data.trim(),
      start_date: inputs.value.start_date.data.trim(),
      ppr: Number(inputs.value.ppr.data),
      status: inputs.value.status.data as Project["status"],
    };
    console.log(`✅ Project ID ${projectId} updated.`);
    resetInputs();
    return true;
  }

  console.error(`❌ Project ID ${projectId} not found.`);
  return false;
};

export const onDelete = async (projectId: number) => {
  const projectIndex = mockProjects.findIndex((p) => p.id === projectId);

  if (projectIndex !== -1) {
    mockProjects.splice(projectIndex, 1);
    console.log(`✅ Project ID ${projectId} deleted.`);
    return true;
  } else {
    console.error(`❌ Project ID ${projectId} not found.`);
    return false;
  }
};

export const onChangeStatus = (projectId: number, newStatus: Project["status"]) => {
  const project = mockProjects.find((p) => p.id === projectId);
  if (project) {
    project.status = newStatus;
    console.log(`✅ Project ID ${projectId} status updated to '${newStatus}'.`);
    return true;
  } else {
    console.error(`❌ Project ID ${projectId} not found.`);
    return false;
  }
};

// -----------------------------
// Reset Inputs
// -----------------------------

export const resetInputs = () => {
  inputs.value.project_name.data = "";
  inputs.value.department.data = "";
  inputs.value.start_date.data = "";
  inputs.value.ppr.data = "";
  inputs.value.status.data = "";

  inputs.value.project_name.errorMessage = "";
  inputs.value.department.errorMessage = "";
  inputs.value.start_date.errorMessage = "";
  inputs.value.ppr.errorMessage = "";
  inputs.value.status.errorMessage = "";

  formSubmitted.value = false;
  submitted.value = false;
};
