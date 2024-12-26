function sendEmail()
{
    // کدهای مربوط به ارسال ایمیل در اینجا قرار می‌گیرند
}

document.addEventListener('DOMContentLoaded', function() {
    // بارگذاری داده‌های داروخانه‌ها
    if (document.getElementById('drugstoreTable')) {
        loadData('contents\\data\\drugstore.json', 'drugstoreTable', 'searchDrugstore', 'paginationDrugstore');
    }

    // بارگذاری داده‌های دارویی
    if (document.getElementById('drugTable')) {
        loadData('contents\\data\\drug.json', 'drugTable', 'searchDrug', 'paginationDrug');
    }

    // ارسال فرم تماس با ما
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            sendContactForm();
        });
    }
});

function loadData(jsonFile, tableId, searchId, paginationId) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            let currentPage = 1;
            const rowsPerPage = 10;
            const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
            const searchInput = document.getElementById(searchId);
            const pagination = document.getElementById(paginationId);

            function displayTable(rows) {
                table.innerHTML = '';
                const start = (currentPage - 1) * rowsPerPage;
                const end = start + rowsPerPage;
                const paginatedRows = rows.slice(start, end);

                paginatedRows.forEach((row, index) => {
                    const tr = document.createElement('tr');
                    Object.values(row).forEach((cell, i) => {
                        const td = document.createElement('td');
                        if (i === Object.values(row).length - 1 && tableId === 'drugstoreTable') {
                            const a = document.createElement('a');
                            a.href = `tel:${cell}`;
                            a.textContent = cell;
                            td.appendChild(a);
                        } else {
                            td.textContent = cell;
                        }
                        tr.appendChild(td);
                    });
                    table.appendChild(tr);
                });
            }

            function setupPagination(rows) {
                pagination.innerHTML = '';
                const pageCount = Math.ceil(rows.length / rowsPerPage);
                for (let i = 1; i <= pageCount; i++) {
                    const btn = document.createElement('button');
                    btn.textContent = i;
                    if (i === currentPage) btn.classList.add('active');
                    btn.addEventListener('click', () => {
                        currentPage = i;
                        displayTable(rows);
                        setupPagination(rows);
                    });
                    pagination.appendChild(btn);
                }
            }

            function filterData() {
                const query = searchInput.value.toLowerCase();
                const filteredData = data.filter(item =>
                    Object.values(item).some(
                        value => value.toString().toLowerCase().includes(query)
                    )
                );
                currentPage = 1;
                displayTable(filteredData);
                setupPagination(filteredData);
            }

            searchInput.addEventListener('input', filterData);

            displayTable(data);
            setupPagination(data);
        })
        .catch(error => console.error('Error loading data:', error));
}

function sendContactForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        firstName,
        lastName,
        phone,
        email,
        message
    };

    // ارسال داده‌ها به سرور یا سرویس ایمیل
    // این بخش نیاز به پیاده‌سازی سمت سرور دارد
    console.log('Sending contact form data:', formData);
    alert('پیام شما ارسال شد!');
    document.getElementById('contactForm').reset();
}
