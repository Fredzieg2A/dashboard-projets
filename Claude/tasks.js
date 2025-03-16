function resetTaskModal() {
    document.getElementById("task-modal-title").textContent = "Ajouter une tâche";
    document.getElementById("edit-task-name").value = "";
    document.getElementById("edit-task-responsible").value = "";
    document.getElementById("edit-task-start").value = "";
    document.getElementById("edit-task-end").value = "";
    document.getElementById("edit-task-progress").value = "0";
    document.getElementById("edit-task-status").value = "pending";
    document.getElementById("edit-task-id").value = "";
}

function saveTask() {
    const taskId = document.getElementById("edit-task-id").value;
    const taskName = document.getElementById("edit-task-name").value;
    const taskStart = document.getElementById("edit-task-start").value;
    const taskEnd = document.getElementById("edit-task-end").value;
    const taskProgress = document.getElementById("edit-task-progress").value;
    const taskStatus = document.getElementById("edit-task-status").value;

    if (!taskName) {
        alert("Veuillez entrer un nom de tâche.");
        return;
    }

    const taskTable = document.getElementById("tasks-table");
    const newRow = taskTable.insertRow(-1);

    newRow.innerHTML = `
        <td>${taskTable.rows.length - 1}</td>
        <td>${taskName}</td>
        <td>-</td>
        <td>${taskStart}</td>
        <td>${taskEnd}</td>
        <td>${taskProgress}%</td>
        <td>${taskStatus}</td>
        <td><button class="btn btn-red btn-delete-task">Supprimer</button></td>
    `;

    closeModal("task-modal");
}

function initActionButtons() {
    document.getElementById("tasks-table").addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-delete-task")) {
            event.target.closest("tr").remove();
        }
    });
}

function initTabs() {
    console.log("Initialisation des onglets...");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length === 0 || tabContents.length === 0) {
        console.error("Erreur: Aucun onglet trouvé.");
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Clic sur l'onglet: ", button.id);
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            const targetId = button.id.replace("btn-", "");
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.add("active");
                console.log("Onglet activé: ", targetId);
            } else {
                console.error("Erreur: L'élément cible n'existe pas pour", targetId);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initTabs();
});

function createTask() {
    const taskName = document.getElementById("edit-task-name").value.trim();
    const taskPhase = document.getElementById("edit-task-phase").value;
    const taskResponsible = document.getElementById("edit-task-responsible").value;
    const taskStart = document.getElementById("edit-task-start").value;
    const taskEnd = document.getElementById("edit-task-end").value;
    const taskProgress = document.getElementById("edit-task-progress").value;
    const taskStatus = document.getElementById("edit-task-status").value;

    if (!taskName || !taskResponsible || !taskStart || !taskEnd || !taskPhase) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        phase: taskPhase,
        responsible: taskResponsible,
        start: taskStart,
        end: taskEnd,
        progress: taskProgress,
        status: taskStatus
    };

    tasks.push(newTask);
    saveTasks();
    updateTaskTable();
    closeModal("task-modal");
}

function updateTaskTable() {
    const taskTable = document.getElementById("tasks-table");
    taskTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Tâche</th>
            <th>Phase</th>
            <th>Responsable</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Progression</th>
            <th>Statut</th>
            <th>Actions</th>
        </tr>`;

    tasks.forEach(task => {
        const row = taskTable.insertRow();
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.phase}</td>
            <td>${task.responsible}</td>
            <td>${task.start}</td>
            <td>${task.end}</td>
            <td>${task.progress}%</td>
            <td class="task-status ${getStatusClass(task.status)}">${task.status}</td>
            <td>
                <button class="btn btn-blue" onclick="editTask(${task.id})">Modifier</button>
                <button class="btn btn-red" onclick="deleteTask(${task.id})">Supprimer</button>
            </td>
        `;
    });
}
let phases = [];

function savePhase() {
    const phaseIndex = document.getElementById("edit-phase-index").value;
    const phaseName = document.getElementById("edit-phase-name").value.trim();
    const phaseStart = document.getElementById("edit-phase-start").value;
    const phaseEnd = document.getElementById("edit-phase-end").value;
    const phaseProgress = document.getElementById("edit-phase-progress").value;
    const phaseStatus = document.getElementById("edit-phase-status").value;

    if (!phaseName || !phaseStart || !phaseEnd) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    if (phaseIndex !== "") {
        // Mise à jour de la phase existante
        phases[phaseIndex] = {
            name: phaseName,
            start: phaseStart,
            end: phaseEnd,
            progress: phaseProgress,
            status: phaseStatus
        };
    } else {
        // Création d'une nouvelle phase
        phases.push({
            name: phaseName,
            start: phaseStart,
            end: phaseEnd,
            progress: phaseProgress,
            status: phaseStatus
        });
    }

    updatePhaseTable();
    closeModal("phase-modal");
}

function updatePhaseTable() {
    const phaseTable = document.getElementById("phase-progress-table");
    phaseTable.innerHTML = `
        <tr>
            <th>Phase</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Progression</th>
            <th>Statut</th>
            <th>Actions</th>
        </tr>`;

    phases.forEach((phase, index) => {
        const row = phaseTable.insertRow();
        row.innerHTML = `
            <td>${phase.name}</td>
            <td>${phase.start || "Non défini"}</td>
            <td>${phase.end || "Non défini"}</td>
            <td>${phase.progress}%</td>
            <td class="task-status ${getStatusClass(phase.status)}">${phase.status}</td>
            <td>
                <button class="btn btn-blue" onclick="editPhase(${index})">Modifier</button>
                <button class="btn btn-red" onclick="deletePhase(${index})">Supprimer</button>
            </td>
        `;
    });
}

function getStatusClass(status) {
    switch(status) {
        case "pending": return "status-pending";
        case "progress": return "status-progress";
        case "completed": return "status-completed";
        case "delayed": return "status-delayed";
        default: return "";
    }
}

function deletePhase(index) {
    if (confirm("Voulez-vous vraiment supprimer cette phase ?")) {
        phases.splice(index, 1); // Supprime la phase
        updatePhaseTable(); // Rafraîchit l'affichage
    }
}

function editPhase(index) {
    const phase = phases[index];

    document.getElementById("edit-phase-name").value = phase.name;
    document.getElementById("edit-phase-start").value = phase.start || "";
    document.getElementById("edit-phase-end").value = phase.end || "";
    document.getElementById("edit-phase-progress").value = phase.progress;
    document.getElementById("edit-phase-status").value = phase.status;
    document.getElementById("edit-phase-index").value = index; // Stocker l'index pour mise à jour

    openModal("phase-modal");
}
