document.addEventListener("DOMContentLoaded", function () {
    initModals();
    initActionButtons();
    initTabs(); // Assurez-vous que cette ligne est présente
    loadProjectOptions();
});

function updateProgressBar(progress) {
    const progressBar = document.getElementById("global-progress-bar");

    if (progress === 0) {
        progressBar.style.width = "0%";
        progressBar.textContent = "0%";
    } else {
        progressBar.style.width = progress + "%";
        progressBar.textContent = progress + "%";
    }
}

// Exemple : mettre à jour la barre une fois le projet initié
function initProject() {
    // Code d'initialisation du projet ici...
    
    // Mise à jour de la barre de progression
    updateProgressBar(0); // Démarrage à 0%
}
document.addEventListener("DOMContentLoaded", function () {
    let projectInitiated = false; // Remplace par une vérification réelle
    
    if (!projectInitiated) {
        updateProgressBar(0);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let editingTaskIndex = null;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    function loadTasks() {
        const table = document.getElementById("tasks-table");
        table.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Tâche</th>
                <th>Responsable</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Progression</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        `;
    
        tasks.forEach((task, index) => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.name}</td>
                <td>${task.responsible}</td>
                <td>${task.start}</td>
                <td>${task.end}</td>
                <td>${task.progress}%</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn btn-blue edit-task" data-index="${index}">Modifier</button>
                    <button class="btn btn-red delete-task" data-index="${index}">Supprimer</button>
                </td>
            `;
        });
    
        // Réattacher les événements après l'ajout des boutons
        document.querySelectorAll(".edit-task").forEach(button => {
            button.addEventListener("click", function () {
                editTask(this.getAttribute("data-index"));
            });
        });
    
        document.querySelectorAll(".delete-task").forEach(button => {
            button.addEventListener("click", function () {
                deleteTask(this.getAttribute("data-index"));
            });
        });
    }
   

    function openTaskModal(editingIndex = null) {
        document.getElementById("task-modal").style.display = "block";
        if (editingIndex !== null) {
            editingTaskIndex = editingIndex;
            const task = tasks[editingIndex];
            document.getElementById("task-name").value = task.name;
            document.getElementById("task-responsible").value = task.responsible;
            document.getElementById("task-start").value = task.start;
            document.getElementById("task-end").value = task.end;
            document.getElementById("task-progress").value = task.progress;
            document.getElementById("task-status").value = task.status;
        } else {
            document.getElementById("task-name").value = "";
            document.getElementById("task-responsible").value = "";
            document.getElementById("task-start").value = "";
            document.getElementById("task-end").value = "";
            document.getElementById("task-progress").value = "";
            document.getElementById("task-status").value = "pending";
        }
    }

    function closeModal(id) {
        document.getElementById(id).style.display = "none";
    }

    function saveTask() {
        const name = document.getElementById("task-name").value;
        const responsible = document.getElementById("task-responsible").value;
        const start = document.getElementById("task-start").value;
        const end = document.getElementById("task-end").value;
        const progress = document.getElementById("task-progress").value;
        const status = document.getElementById("task-status").value;

        if (name.trim() === "" || responsible.trim() === "" || start.trim() === "" || end.trim() === "" || progress.trim() === "") {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const taskData = { name, responsible, start, end, progress, status };

        if (editingTaskIndex !== null) {
            tasks[editingTaskIndex] = taskData;
            editingTaskIndex = null;
        } else {
            tasks.push(taskData);
        }

        saveTasks();
        closeModal("task-modal");
    }

    function editTask(index) {
        index = parseInt(index);
        const task = tasks[index];
    
        document.getElementById("task-name").value = task.name;
        document.getElementById("task-responsible").value = task.responsible;
        document.getElementById("task-start").value = task.start;
        document.getElementById("task-end").value = task.end;
        document.getElementById("task-progress").value = task.progress;
        document.getElementById("task-status").value = task.status;
    
        editingTaskIndex = index;
        document.getElementById("task-modal").style.display = "block";
    }
    
    function deleteTask(index) {
        index = parseInt(index);
        if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        }
    }
    
    document.getElementById("btn-add-task").addEventListener("click", function () {
        editingTaskIndex = null;
        openTaskModal();
    });

    document.getElementById("save-task-btn").addEventListener("click", saveTask);

    loadTasks();
});

document.addEventListener("DOMContentLoaded", function () {
    let phases = JSON.parse(localStorage.getItem("phases")) || [];
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function savePhases() {
        localStorage.setItem("phases", JSON.stringify(phases));
        loadPhases();
        updatePhaseDropdown();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        updatePhaseProgress();
    }

    function loadPhases() {
        const table = document.getElementById("phase-table");
        table.innerHTML = `
            <tr>
                <th>Phase</th>
                <th>Progression</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        `;

        phases.forEach((phase, index) => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${phase.name}</td>
                <td id="progress-phase-${index}">0%</td>
                <td>${phase.status || "À venir"}</td>
                <td>
                    <button class="btn btn-blue" onclick="editPhase(${index})">Modifier</button>
                    <button class="btn btn-red" onclick="deletePhase(${index})">Supprimer</button>
                </td>
            `;
        });

        updatePhaseProgress();
    }

    function updatePhaseDropdown() {
        const phaseSelect = document.getElementById("task-phase");
        phaseSelect.innerHTML = `<option value="">Sélectionner une phase</option>`;

        phases.forEach((phase, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = phase.name;
            phaseSelect.appendChild(option);
        });
    }

    function updatePhaseProgress() {
        phases.forEach((phase, index) => {
            let associatedTasks = tasks.filter(task => task.phase == index);
            let completedTasks = associatedTasks.filter(task => task.progress == 100);
            let progress = associatedTasks.length ? (completedTasks.length / associatedTasks.length) * 100 : 0;

            document.getElementById(`progress-phase-${index}`).textContent = Math.round(progress) + "%";
        });
    }

    function openPhaseModal(editingIndex = null) {
        document.getElementById("phase-modal").style.display = "block";
        if (editingIndex !== null) {
            document.getElementById("phase-name").value = phases[editingIndex].name;
            document.getElementById("phase-id").value = editingIndex;
        } else {
            document.getElementById("phase-name").value = "";
            document.getElementById("phase-id").value = "";
        }
    }

    function savePhase() {
        let name = document.getElementById("phase-name").value;
        let phaseId = document.getElementById("phase-id").value;

        if (name.trim() === "") {
            alert("Veuillez entrer un nom de phase.");
            return;
        }

        if (phaseId !== "") {
            phases[phaseId].name = name;
        } else {
            phases.push({ name, status: "À venir" });
        }

        savePhases();
        closeModal("phase-modal");
    }

    function editPhase(index) {
        openPhaseModal(index);
    }

    function deletePhase(index) {
        if (confirm("Voulez-vous vraiment supprimer cette phase ?")) {
            phases.splice(index, 1);
            savePhases();
        }
    }

    function loadTasks() {
        const table = document.getElementById("tasks-table");
        table.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Tâche</th>
                <th>Responsable</th>
                <th>Phase</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Progression</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        `;

        tasks.forEach((task, index) => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.name}</td>
                <td>${task.responsible}</td>
                <td>${phases[task.phase]?.name || "Non assignée"}</td>
                <td>${task.start}</td>
                <td>${task.end}</td>
                <td>${task.progress}%</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn btn-blue" onclick="editTask(${index})">Modifier</button>
                    <button class="btn btn-red" onclick="deleteTask(${index})">Supprimer</button>
                </td>
            `;
        });

        updatePhaseProgress();
    }

    document.getElementById("btn-add-phase").addEventListener("click", () => openPhaseModal());
    document.getElementById("save-phase-btn").addEventListener("click", savePhase);

    savePhases();
    saveTasks();
});
