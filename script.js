document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("task");
    const timeInput = document.getElementById("time");
    const clientInput = document.getElementById("client");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date");
    const taskList = document.getElementById("taskList");

    // Recuperar tareas almacenadas en localStorage al cargar la página
    let data = JSON.parse(localStorage.getItem("tasks")) || [];

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        const timeText = timeInput.value.trim();
        const clientText = clientInput.value.trim();
        const phoneText = phoneInput.value.trim();
        const emailText = emailInput.value.trim();
        const dateText = dateInput.value;

        if (taskText !== "") {
            const newTask = { task: taskText, time: timeText, client: clientText, phone: phoneText, email: emailText, date: dateText };
            data.push(newTask);
            saveDataToLocalStorage();
            renderTable();

            taskForm.reset();
        } else {
            alert('Por favor, llena todos los campos');
        }
    });

    function saveDataToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(data));
    }

    function renderTable() {
        taskList.innerHTML = '';

        data.forEach(function (item, index) {
            const tr = document.createElement('tr');
            const taskCell = document.createElement('td');
            const timeCell = document.createElement('td');
            const clientCell = document.createElement('td');
            const phoneCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const dateCell = document.createElement('td');
            const actionCell = document.createElement('td');

            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            taskCell.textContent = item.task;
            timeCell.textContent = item.time;
            clientCell.textContent = item.client;
            phoneCell.textContent = item.phone;
            emailCell.textContent = item.email;
            dateCell.textContent = item.date;

            editButton.textContent = 'Editar';
            deleteButton.textContent = 'Eliminar';

            editButton.classList.add('edit');
            deleteButton.classList.add('delete');

            editButton.addEventListener('click', function () {
                if (editButton.textContent === 'Editar') {
                    editTask(index);
                    editButton.textContent = 'Guardar';
                } else {
                    saveEditedTask(index);
                    editButton.textContent = 'Editar';
                }
            });

            deleteButton.addEventListener('click', function () {
                deleteTask(index);
            });

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            tr.appendChild(taskCell);
            tr.appendChild(timeCell);
            tr.appendChild(clientCell);
            tr.appendChild(phoneCell);
            tr.appendChild(emailCell);
            tr.appendChild(dateCell);
            tr.appendChild(actionCell);

            taskList.appendChild(tr);
        });
    }

    function editTask(index) {
        const item = data[index];
        taskInput.value = item.task;
        timeInput.value = item.time;
        clientInput.value = item.client;
        phoneInput.value = item.phone;
        emailInput.value = item.email;
        dateInput.value = item.date;
    }

    function saveEditedTask(index) {
        const editedTask = {
            task: taskInput.value,
            time: timeInput.value,
            client: clientInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            date: dateInput.value,
        };

        data[index] = editedTask;
        saveDataToLocalStorage();
        renderTable();
        taskForm.reset();
    }

    function deleteTask(index) {
        data.splice(index, 1);
        saveDataToLocalStorage();
        renderTable();
    }

    renderTable();
});
