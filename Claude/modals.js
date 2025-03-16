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

function openTaskModal() {
    document.getElementById("task-modal-title").textContent = "Ajouter une tâche";
    document.getElementById("edit-task-name").value = "";
    document.getElementById("edit-task-phase").value = "";
    document.getElementById("edit-task-responsible").value = "";
    document.getElementById("edit-task-start").value = "";
    document.getElementById("edit-task-end").value = "";
    document.getElementById("edit-task-progress").value = "0";
    document.getElementById("edit-task-status").value = "pending";

    openModal("task-modal");
}

function openPhaseModal() {
    document.getElementById("edit-phase-name").value = "";
    document.getElementById("edit-phase-start").value = "";
    document.getElementById("edit-phase-end").value = "";
    document.getElementById("edit-phase-progress").value = "0";
    document.getElementById("edit-phase-status").value = "pending";

    openModal("phase-modal"); // Vérifie que cette fonction existe bien
}
