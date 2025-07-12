document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("employee-list-container");
  const searchInput = document.getElementById("searchInput");

  let currentFiltered = [...mockEmployees];
  let currentPage = 1;
  let itemsPerPage = 10;

  function renderEmployees(employees) {
    container.innerHTML = "";
    employees.forEach((emp) => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.innerHTML = `
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      `;
      container.appendChild(card);
    });
  }

  function renderPaginatedEmployees() {
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = currentFiltered.slice(start, start + itemsPerPage);
    renderEmployees(paginated);

    const totalPages = Math.ceil(currentFiltered.length / itemsPerPage);
    document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;
  }

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
    if (currentPage < Math.ceil(currentFiltered.length / itemsPerPage)) {
      currentPage++;
      renderPaginatedEmployees();
    }
  });

  // Basic Search + Filter
  function applySearchAndFilters() {
    const keyword = searchInput.value.toLowerCase();
    const filterName = document.getElementById("filterName").value.toLowerCase();
    const filterDept = document.getElementById("filterDept").value.toLowerCase();
    const filterRole = document.getElementById("filterRole").value.toLowerCase();
    const sortBy = document.getElementById("sortBy").value;

    currentFiltered = mockEmployees.filter(emp => {
      return (
        (!keyword || emp.firstName.toLowerCase().includes(keyword) || emp.lastName.toLowerCase().includes(keyword) || emp.email.toLowerCase().includes(keyword)) &&
        (!filterName || emp.firstName.toLowerCase().includes(filterName)) &&
        (!filterDept || emp.department.toLowerCase().includes(filterDept)) &&
        (!filterRole || emp.role.toLowerCase().includes(filterRole))
      );
    });

    if (sortBy) {
      currentFiltered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    currentPage = 1;
    renderPaginatedEmployees();
  }

  document.getElementById("applyFilterBtn").addEventListener("click", applySearchAndFilters);
  document.getElementById("clearFilterBtn").addEventListener("click", () => {
    document.getElementById("filterName").value = "";
    document.getElementById("filterDept").value = "";
    document.getElementById("filterRole").value = "";
    applySearchAndFilters();
  });

  document.getElementById("sortBy").addEventListener("change", applySearchAndFilters);
  searchInput.addEventListener("input", applySearchAndFilters);

  window.deleteEmployee = function (id) {
    const index = mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      mockEmployees.splice(index, 1);
      applySearchAndFilters(); // Reapply filters after delete
    }
  };

  window.editEmployee = function (id) {
    window.location.href = `form.ftlh?editId=${id}`;
  };

  applySearchAndFilters(); // Initial load
});
