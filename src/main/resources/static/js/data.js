const mockEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    department: "HR",
    role: "Manager",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    department: "IT",
    role: "Developer",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    role: "Analyst",
  },
  // Add more entries if you want
];

// Used throughout app.js and form.js
let currentFiltered = [...mockEmployees];
