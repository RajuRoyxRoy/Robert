const employees = [
    { id: 1, name: 'John Doe', totalAttendance: 0, totalExtraHours: 0, dates: [] },
    { id: 2, name: 'Jane Smith', totalAttendance: 0, totalExtraHours: 0, dates: [] },
    { id: 3, name: 'Alice Johnson', totalAttendance: 0, totalExtraHours: 0, dates: [] },
    { id: 4, name: 'Bob Brown', totalAttendance: 0, totalExtraHours: 0, dates: [] }
];

// Function to Mark Attendance
function markAttendance() {
    const empId = document.getElementById('employee-select').value;
    const date = document.getElementById('attendance-date').value;
    const extraHours = parseInt(document.getElementById('extra-hours').value) || 0;

    if (!date) {
        alert('Please select a date');
        return;
    }

    const employee = employees.find(emp => emp.id == empId);
    const attendanceRecord = employee.dates.find(record => record.date === date);

    // Check for duplicate attendance on the same day
    if (attendanceRecord) {
        alert(`Attendance for ${employee.name} on ${date} is already recorded.`);
        return;
    }

    // Mark attendance
    employee.dates.push({ date, extraHours });
    employee.totalAttendance += 1;
    employee.totalExtraHours += extraHours;

    alert(`Attendance marked for ${employee.name}`);

    // Update reports
    updateTotalReport();
    updateAttendanceDates();
    loadMonthlyReport();
}

// Update Total Attendance Report
function updateTotalReport() {
    const tbody = document.getElementById('total-report').querySelector('tbody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const row = `<tr>
            <td>${emp.name}</td>
            <td>${emp.totalAttendance}</td>
            <td>${emp.totalExtraHours}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Update Attendance Dates Table
function updateAttendanceDates() {
    const tbody = document.getElementById('attendance-dates').querySelector('tbody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        emp.dates.forEach(record => {
            const row = `<tr>
                <td>${emp.name}</td>
                <td>${record.date}</td>
                <td>${record.extraHours}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    });
}

// Load Monthly Attendance Chart
function loadMonthlyReport() {
    const ctx = document.getElementById('monthly-chart').getContext('2d');
    const data = {
        labels: employees.map(emp => emp.name),
        datasets: [{
            label: 'Total Attendance Days',
            data: employees.map(emp => emp.totalAttendance),
            backgroundColor: '#007bff'
        }]
    };

    if (window.attendanceChart) {
        window.attendanceChart.destroy();
    }

    window.attendanceChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true }
            }
        }
    });
}

// Print Attendance Report
function printReport() {
    window.print();
}

// Initial Load
updateTotalReport();
updateAttendanceDates();
loadMonthlyReport();
