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
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => addTaskToDOM(task));
  
    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const taskText = taskInput.value.trim();
      const timeText = timeInput.value.trim();
      const clientText = clientInput.value.trim();
      const phoneText = phoneInput.value.trim();
      const emailText = emailInput.value.trim();
      const dateText = dateInput.value;
  
      if (taskText !== "") {
        const newTask = { task: taskText, time: timeText, client: clientText, phone: phoneText, email: emailText, date: dateText };
        addTaskToDOM(newTask);
        saveTaskToLocalStorage(newTask);
  
        // Limpiar campos después de agregar tarea
        taskInput.value = "";
        timeInput.value = "";
        clientInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        dateInput.value = "";
      }
    });
  
    function addTaskToDOM(task) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.task}</span>
        <span>${task.time}</span>
        <span>${task.client}</span>
        <span>${task.phone}</span>
        <span>${task.email}</span>
        <span>${task.date}</span>
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      `;
      taskList.appendChild(li);
  
      li.querySelector(".edit").addEventListener("click", function () {
        editTask(li);
      });
  
      li.querySelector(".delete").addEventListener("click", function () {
        deleteTask(li);
      });
    }
  
    function saveTaskToLocalStorage(task) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      storedTasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  
    function editTask(li) {
        const spans = li.querySelectorAll("span");
        const fieldNames = ["Tarea", "Horario", "Cliente", "Número de Teléfono", "Correo Electrónico", "Fecha"];
        
        const newTexts = Array.from(spans).map((span, index) => {
          const fieldName = fieldNames[index];
          return prompt(`Editar ${fieldName}:`, span.textContent);
        });
      
        newTexts.forEach((newText, index) => {
          if (newText !== null) {
            spans[index].textContent = newText;
          }
        });
      
        // Actualizar la tarea editada en localStorage
        const editedTask = {
          task: spans[0].textContent,
          time: spans[1].textContent,
          client: spans[2].textContent,
          phone: spans[3].textContent,
          email: spans[4].textContent,
          date: spans[5].textContent,
        };
        updateTaskInLocalStorage(editedTask);
      }
      
  
    function updateTaskInLocalStorage(editedTask) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = storedTasks.map(task => (
        task.task === editedTask.task ? editedTask : task
      ));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  
    function deleteTask(li) {
      taskList.removeChild(li);
  
      // Eliminar la tarea de localStorage
      const deletedTask = {
        task: li.querySelector("span").textContent,
        time: li.querySelectorAll("span")[1].textContent,
        client: li.querySelectorAll("span")[2].textContent,
        phone: li.querySelectorAll("span")[3].textContent,
        email: li.querySelectorAll("span")[4].textContent,
        date: li.querySelectorAll("span")[5].textContent,
      };
      removeTaskFromLocalStorage(deletedTask);
    }
  
    function removeTaskFromLocalStorage(deletedTask) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const filteredTasks = storedTasks.filter(task => (
        task.task !== deletedTask.task
      ));
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    }
  });
  