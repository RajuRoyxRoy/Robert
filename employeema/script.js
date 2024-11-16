let employees = JSON.parse(localStorage.getItem('employees')) || [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    populateDropdowns();
    displayEmployeeList();
}

function addEmployee(event) {
    event.preventDefault();
    const newEmployee = {
        id: Date.now(),
        name: document.getElementById('name').value,
        fatherName: document.getElementById('fatherName').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value,
        pan: document.getElementById('pan').value,
        aadhar: document.getElementById('aadhar').value,
        salary: parseFloat(document.getElementById('salary').value),
        deductions: []
    };
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    alert("Employee added successfully!");
    location.reload();
}

function deleteEmployee() {
    const index = document.getElementById('delete-employee-list').value;
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    alert("Deleted successfully!");
    location.reload();
}

function applyDeduction() {
    const index = document.getElementById('deduct-employee-list').value;
    const amount = parseFloat(document.getElementById('deduction-amount').value);
    const date = document.getElementById('deduction-date').value;
    employees[index].deductions.push({ amount, date });
    localStorage.setItem('employees', JSON.stringify(employees));
    alert("Deduction applied!");
}

function displayEmployeeList() {
    const list = document.getElementById('employee-list');
    list.innerHTML = employees.map((emp, index) => 
        `<li onclick="showEmployeeDetails(${index})">${emp.name}</li>`
    ).join('');
}

function showEmployeeDetails(index) {
    const emp = employees[index];
    document.getElementById('employee-details-display').innerHTML = `
        <p>Name: ${emp.name}</p>
        <p>Father's Name: ${emp.fatherName}</p>
        <p>Address: ${emp.address}</p>
        <p>Salary: ₹${emp.salary}</p>
        <p>Deductions: ${emp.deductions.map(d => `<br>- ₹${d.amount} on ${d.date}`).join('')}</p>
    `;
}

function calculateFinalSalary() {
    const index = document.getElementById('salary-employee-list').value;
    const emp = employees[index];
    const totalDeductions = emp.deductions.reduce((sum, d) => sum + d.amount, 0);
    const finalSalary = emp.salary - totalDeductions;
    document.getElementById('salary-output').innerHTML = `
        <h3>${emp.name}'s Salary Details</h3>
        <p>Base Salary: ₹${emp.salary}</p>
        <p>Total Deductions: ₹${totalDeductions}</p>
        <p>Final Salary: ₹${finalSalary}</p>
    `;
}

function populateDropdowns() {
    const options = employees.map((emp, index) => `<option value="${index}">${emp.name}</option>`).join('');
    document.getElementById('delete-employee-list').innerHTML = options;
    document.getElementById('deduct-employee-list').innerHTML = options;
    document.getElementById('salary-employee-list').innerHTML = options;
}

window.onload = () => {
    populateDropdowns();
    displayEmployeeList();
};
