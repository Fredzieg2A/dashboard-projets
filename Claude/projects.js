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