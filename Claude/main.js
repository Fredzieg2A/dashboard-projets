document.addEventListener("DOMContentLoaded", function () {
    initModals();
    initActionButtons();
    initTabs(); // Assurez-vous que cette ligne est présente
    loadProjectOptions();
});

document.getElementById("btn-add-phase").addEventListener("click", function() {
    openPhaseModal();
});

function openPhaseModal() {
    document.getElementById("edit-phase-name").value = "";
    document.getElementById("edit-phase-progress").value = "0";
    document.getElementById("edit-phase-status").value = "pending";
    openModal("phase-modal");
}

document.addEventListener("DOMContentLoaded", function() {
    const addPhaseBtn = document.getElementById("btn-add-phase");
    if (addPhaseBtn) {
        addPhaseBtn.addEventListener("click", function() {
            openPhaseModal();
        });
    }
});