let currentPage = 1;
let itemsPerPage = 10;

// Render employee cards to DOM
function renderEmployees(employees) {
  const container = document.getElementById("employee-list-container");
  container.innerHTML = "";

  if (employees.length === 0) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }

  employees.forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    `;
    container.appendChild(card);
  });

  attachCardEventHandlers();
}

// Handle Edit/Delete buttons
function attachCardEventHandlers() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      window.location.href = `form.html?editId=${id}`;
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      if (confirm("Are you sure you want to delete this employee?")) {
        const index = mockEmployees.findIndex((emp) => emp.id === id);
        if (index !== -1) {
          mockEmployees.splice(index, 1);
          applyAllFilters(); // Recalculate & paginate
        }
      }
    });
  });
}

// Apply search, filter, and sort
function applyAllFilters() {
  const searchVal = document.getElementById("searchInput").value.toLowerCase();
  const filterName = document.getElementById("filterName").value.toLowerCase();
  const filterDept = document.getElementById("filterDept").value.toLowerCase();
  const filterRole = document.getElementById("filterRole").value.toLowerCase();
  const sortBy = document.getElementById("sortBy").value;

  currentFiltered = mockEmployees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchVal) ||
      emp.lastName.toLowerCase().includes(searchVal) ||
      emp.email.toLowerCase().includes(searchVal);

    const matchesName = emp.firstName.toLowerCase().includes(filterName);
    const matchesDept = emp.department.toLowerCase().includes(filterDept);
    const matchesRole = emp.role.toLowerCase().includes(filterRole);

    return matchesSearch && matchesName && matchesDept && matchesRole;
  });

  if (sortBy) {
    currentFiltered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  currentPage = 1;
  renderPaginatedEmployees();
}

// Paginate currentFiltered array
function renderPaginatedEmployees() {
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = currentFiltered.slice(start, start + itemsPerPage);
  renderEmployees(paginated);

  const totalPages = Math.ceil(currentFiltered.length / itemsPerPage);
  document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;
}

// Event listeners setup
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", applyAllFilters);
  document.getElementById("applyFilterBtn").addEventListener("click", applyAllFilters);
  document.getElementById("clearFilterBtn").addEventListener("click", () => {
    document.getElementById("filterName").value = "";
    document.getElementById("filterDept").value = "";
    document.getElementById("filterRole").value = "";
    applyAllFilters();
  });

  document.getElementById("sortBy").addEventListener("change", applyAllFilters);

  document.getElementById("itemsPerPage").addEventListener("change", (e) => {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPaginatedEmployees();
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPaginatedEmployees();
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(currentFiltered.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPaginatedEmployees();
    }
  });

  applyAllFilters(); // Initial load
});
