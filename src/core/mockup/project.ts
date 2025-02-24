// project.ts

export interface Project {
  id: number;
  project_name: string;
  department: string;
  start_date: string; // Format: 'YYYY-MM-DD'
  ppr: number;        // Account ID
  status: 'pass' | 'waiting' | 'finished';
}

export const mockProjects: Project[] = [
  {
    id: 1,
    project_name: "Solar Plant Expansion",
    department: "Engineering",
    start_date: "2024-03-15",
    ppr: 2,
    status: "pass",
  },
  {
    id: 2,
    project_name: "New Data Center",
    department: "IT",
    start_date: "2024-04-01",
    ppr: 1,
    status: "waiting",
  },
  {
    id: 3,
    project_name: "Product Launch Q2",
    department: "Marketing",
    start_date: "2024-02-20",
    ppr: 4,
    status: "finished",
  },
  {
    id: 4,
    project_name: "Website Redesign",
    department: "Design",
    start_date: "2024-01-10",
    ppr: 3,
    status: "pass",
  },
  {
    id: 5,
    project_name: "Internal Audit 2024",
    department: "Finance",
    start_date: "2024-03-01",
    ppr: 5,
    status: "waiting",
  },
  {
    id: 6,
    project_name: "New Office Construction",
    department: "Operations",
    start_date: "2024-05-05",
    ppr: 6,
    status: "waiting",
  },
  {
    id: 7,
    project_name: "HR System Upgrade",
    department: "Human Resources",
    start_date: "2024-04-20",
    ppr: 7,
    status: "finished",
  },
];
