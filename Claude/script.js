// Script complet pour la gestion du tableau de bord de projet avec l'onglet "Tâches"

let projectData = {
    info: {
        name: "",
        manager: "",
        startDate: "",
        endDate: "",
        budget: "",
        objectives: ""
    },
    tasks: [],
    resources: [],
    risks: []
};

document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    initApp();
    initTabButtons();
    initActionButtons();
});

function initActionButtons() {
    document.getElementById('btn-init-project').addEventListener('click', initProject);
    document.getElementById('btn-edit-project').addEventListener('click', editProjectInfo);
    document.getElementById('btn-add-task').addEventListener('click', showAddTaskModal);
}

function initTabButtons() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            openTab(this.id.replace('btn-', ''));
        });
    });
}

function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.getElementById(`btn-${tabName}`).classList.add('active');
}

function initProject() {
    projectData.info = {
        name: "Nouveau Projet",
        manager: "Nom du Chef de Projet",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        budget: "100000",
        objectives: "Définir et atteindre les objectifs du projet."
    };
    projectData.tasks = [];
    saveToStorage();
    loadProjectInfo();
    loadTasks();
    showNotification("Projet initialisé avec succès. Vous pouvez maintenant le modifier et ajouter des tâches.");
}

function loadProjectInfo() {
    document.getElementById('project-name').textContent = projectData.info.name || "[Nom du Projet]";
    document.getElementById('project-manager').textContent = projectData.info.manager || "[Votre Nom]";
    document.getElementById('start-date').textContent = projectData.info.startDate || "[JJ/MM/AAAA]";
    document.getElementById('end-date').textContent = projectData.info.endDate || "[JJ/MM/AAAA]";
    document.getElementById('project-budget').textContent = projectData.info.budget ? `${projectData.info.budget} €` : "[Montant] €";
    document.getElementById('project-objectives').textContent = projectData.info.objectives || "[Description des objectifs principaux]";
}

function loadTasks() {
    const table = document.getElementById("tasks-table");
    table.innerHTML = `<tr><th>ID</th><th>Tâche</th><th>Responsable</th><th>Date Début</th><th>Date Fin</th><th>Progression</th><th>Statut</th><th>Actions</th></tr>`;
    
    projectData.tasks.forEach(task => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.responsible}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate}</td>
            <td>${task.progress}%</td>
            <td>${task.status}</td>
            <td>
                <button class='btn btn-blue' onclick='editTask(${task.id})'>Modifier</button>
                <button class='btn btn-red' onclick='deleteTask(${task.id})'>Supprimer</button>
            </td>
        `;
    });
}

function showAddTaskModal() {
    document.getElementById("edit-task-name").value = "";
    document.getElementById("edit-task-responsible").value = "";
    document.getElementById("edit-task-start").value = "";
    document.getElementById("edit-task-end").value = "";
    document.getElementById("edit-task-progress").value = "0";
    document.getElementById("edit-task-status").value = "pending";
    document.getElementById("edit-task-id").value = "";
    openModal("task-modal");
}

function saveTask() {
    const taskId = document.getElementById("edit-task-id").value;
    const newTask = {
        id: taskId ? parseInt(taskId) : getNextTaskId(),
        name: document.getElementById("edit-task-name").value,
        responsible: document.getElementById("edit-task-responsible").value,
        startDate: document.getElementById("edit-task-start").value,
        endDate: document.getElementById("edit-task-end").value,
        progress: parseInt(document.getElementById("edit-task-progress").value),
        status: document.getElementById("edit-task-status").value
    };
    
    if (taskId) {
        const index = projectData.tasks.findIndex(t => t.id === parseInt(taskId));
        projectData.tasks[index] = newTask;
    } else {
        projectData.tasks.push(newTask);
    }
    
    saveToStorage();
    loadTasks();
    closeModal("task-modal");
}

function getNextTaskId() {
    return projectData.tasks.length > 0 ? Math.max(...projectData.tasks.map(t => t.id)) + 1 : 1;
}

function saveToStorage() {
    localStorage.setItem("projectData", JSON.stringify(projectData));
}

function loadFromStorage() {
    const savedData = localStorage.getItem("projectData");
    if (savedData) {
        projectData = JSON.parse(savedData);
    }
}

function initApp() {
    loadProjectInfo();
    loadTasks();
}

document.addEventListener("DOMContentLoaded", function () {
    // Récupérer le bouton "Ajouter une tâche"
    const addTaskButton = document.getElementById("btn-add-task");
    const taskModal = document.getElementById("task-modal");

    // Vérifier si le bouton et la modale existent
    if (addTaskButton && taskModal) {
        addTaskButton.addEventListener("click", function () {
            taskModal.style.display = "block";
        });
    }

    // Fermer la modale en cliquant sur le bouton de fermeture
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", function () {
            button.closest(".modal").style.display = "none";
        });
    });

    // Fermer la modale en cliquant en dehors de la fenêtre
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });
});
