document.addEventListener("DOMContentLoaded", function () { 
  const params = new URLSearchParams(window.location.search);
  const editId = Number(params.get("editId"));
  const form = document.getElementById("employeeForm");

  if (editId) {
    const emp = mockEmployees.find(e => e.id === editId);
    if (emp) {
      document.getElementById("employeeId").value = emp.id;
      document.getElementById("firstName").value = emp.firstName;
      document.getElementById("lastName").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = Number(document.getElementById("employeeId").value);
    const employee = {
      id: id || Date.now(),
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      department: document.getElementById("department").value.trim(),
      role: document.getElementById("role").value.trim(),
    };

    if (!employee.firstName || !employee.lastName || !employee.email || !employee.department || !employee.role) {
      alert("All fields are required.");
      return;
    }

    const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/;
    if (!emailPattern.test(employee.email)) {
      alert("Invalid email format.");
      return;
    }

    const existingIndex = mockEmployees.findIndex(emp => emp.id === id);
    if (existingIndex !== -1) {
      mockEmployees[existingIndex] = employee;
    } else {
      mockEmployees.push(employee);
    }

    window.location.href = "index.ftlh";
  });
});
