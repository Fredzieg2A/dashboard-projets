document.addEventListener("DOMContentLoaded", function () {
    initModals();
    initActionButtons();
    initTabs();
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

    // Ajout des événements pour les boutons "Initialiser un projet" et "Modifier"
    document.getElementById("btn-edit-project").addEventListener("click", function () {
        openModal("edit-project-modal");
    });

    document.getElementById("btn-init-project").addEventListener("click", function () {
        openModal("init-project-modal");
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
    // Logique pour créer un projet
    closeModal("init-project-modal");
}

function saveProjectInfo() {
    // Logique pour sauvegarder les informations du projet
    closeModal("edit-project-modal");
}