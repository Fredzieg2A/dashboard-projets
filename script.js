document.addEventListener("DOMContentLoaded", function () {
    initModals();
    initActionButtons();
    initTabs();
    loadProjectOptions();
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "none";
}

function initModals() {
    // Attacher les événements de fermeture aux boutons
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", function () {
            closeModal(this.closest(".modal").id);
        });
    });

    // Fermer la modale en cliquant en dehors
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            closeModal(event.target.id);
        }
    });

    // Gestion de l'ouverture des modales spécifiques
    document.getElementById("btn-add-task").addEventListener("click", function () {
        resetTaskModal();
        openModal("task-modal");
    });

    document.getElementById("save-task-btn").addEventListener("click", saveTask);

    // Ajout des événements pour les boutons "Initialiser un projet", "Modifier" et "Supprimer"
    document.getElementById("btn-init-project").addEventListener("click", function () {
        openModal("init-project-modal");
    });

    document.getElementById("btn-edit-project").addEventListener("click", function () {
        openModal("edit-project-modal");
        loadProjectOptions(); // Charger les options de projet lors de l'ouverture de la modale
    });

    document.getElementById("btn-delete-project").addEventListener("click", function () {
        openModal("delete-project-modal");
        loadDeleteProjectOptions(); // Charger les options de projet lors de l'ouverture de la modale de suppression
    });
}

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
    // Utiliser la délégation d'événements pour les boutons de suppression
    document.getElementById("tasks-table").addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-delete-task")) {
            event.target.closest("tr").remove();
        }
    });
}

function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(button.id.replace("btn-", "")).classList.add("active");
        });
    });
}

function createProject() {
    const projectName = document.getElementById("init-project-name").value;
    const projectManager = document.getElementById("init-project-manager").value;
    const startDate = document.getElementById("init-start-date").value;
    const endDate = document.getElementById("init-end-date").value;
    const projectBudget = document.getElementById("init-project-budget").value;
    const projectObjectives = document.getElementById("init-project-objectives").value;

    // Ajouter le projet à la liste des projets
    const project = {
        name: projectName,
        manager: projectManager,
        startDate: startDate,
        endDate: endDate,
        budget: projectBudget,
        objectives: projectObjectives
    };

    // Sauvegarder le projet dans le localStorage
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    // Mettre à jour l'affichage du projet
    document.getElementById("project-name").textContent = projectName;
    document.getElementById("project-manager").textContent = projectManager;
    document.getElementById("start-date").textContent = startDate;
    document.getElementById("end-date").textContent = endDate;
    document.getElementById("project-budget").textContent = projectBudget + " €";
    document.getElementById("project-objectives").textContent = projectObjectives;

    // Mettre à jour les options de sélection de projet
    loadProjectOptions();

    closeModal("init-project-modal");
}

function saveProjectInfo() {
    const projectName = document.getElementById("edit-project-name").value;
    const projectManager = document.getElementById("edit-project-manager").value;
    const startDate = document.getElementById("edit-start-date").value;
    const endDate = document.getElementById("edit-end-date").value;
    const projectBudget = document.getElementById("edit-project-budget").value;
    const projectObjectives = document.getElementById("edit-project-objectives").value;

    // Mettre à jour le projet sélectionné
    const selectedProjectIndex = document.getElementById("select-project").selectedIndex;
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects[selectedProjectIndex] = {
        name: projectName,
        manager: projectManager,
        startDate: startDate,
        endDate: endDate,
        budget: projectBudget,
        objectives: projectObjectives
    };
    localStorage.setItem("projects", JSON.stringify(projects));

    // Mettre à jour l'affichage du projet
    document.getElementById("project-name").textContent = projectName;
    document.getElementById("project-manager").textContent = projectManager;
    document.getElementById("start-date").textContent = startDate;
    document.getElementById("end-date").textContent = endDate;
    document.getElementById("project-budget").textContent = projectBudget + " €";
    document.getElementById("project-objectives").textContent = projectObjectives;

    closeModal("edit-project-modal");
}

function deleteProject() {
    const selectedProjectIndex = document.getElementById("select-delete-project").selectedIndex;
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(selectedProjectIndex, 1);
    localStorage.setItem("projects", JSON.stringify(projects));

    // Mettre à jour les options de sélection de projet
    loadProjectOptions();
    loadDeleteProjectOptions();

    // Réinitialiser l'affichage du projet
    document.getElementById("project-name").textContent = "[Nom du Projet]";
    document.getElementById("project-manager").textContent = "[Votre Nom]";
    document.getElementById("start-date").textContent = "[JJ/MM/AAAA]";
    document.getElementById("end-date").textContent = "[JJ/MM/AAAA]";
    document.getElementById("project-budget").textContent = "[Montant] €";
    document.getElementById("project-objectives").textContent = "[Description des objectifs principaux]";

    closeModal("delete-project-modal");
}

function loadProjectOptions() {
    const selectProject = document.getElementById("select-project");
    selectProject.innerHTML = ""; // Clear existing options

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.forEach((project, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;
        selectProject.appendChild(option);
    });
}

function loadDeleteProjectOptions() {
    const selectDeleteProject = document.getElementById("select-delete-project");
    selectDeleteProject.innerHTML = ""; // Clear existing options

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.forEach((project, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;
        selectDeleteProject.appendChild(option);
    });
}

function loadProjectData() {
    const selectedProjectIndex = document.getElementById("select-project").selectedIndex;
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects[selectedProjectIndex];

    document.getElementById("edit-project-name").value = project.name;
    document.getElementById("edit-project-manager").value = project.manager;
    document.getElementById("edit-start-date").value = project.startDate;
    document.getElementById("edit-end-date").value = project.endDate;
    document.getElementById("edit-project-budget").value = project.budget;
    document.getElementById("edit-project-objectives").value = project.objectives;
}

function confirmDeleteProject() {
    deleteProject();
}