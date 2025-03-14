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
