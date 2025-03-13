document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');
            
            this.classList.add('active');
            const target = this.getAttribute('href');
            document.querySelector(target).style.display = 'block';
        });
    });
    
    document.querySelector('.tab-button.active').click();

    // Gestion de la modification des informations du projet
    document.querySelector('.btn-blue').addEventListener('click', function() {
        const name = prompt("Entrez le nom du projet:", document.getElementById("project-name").innerText);
        const manager = prompt("Entrez le nom du chef de projet:", document.getElementById("project-manager").innerText);
        const startDate = prompt("Entrez la date de début:", document.getElementById("start-date").innerText);
        const endDate = prompt("Entrez la date de fin:", document.getElementById("end-date").innerText);
        const budget = prompt("Entrez le budget du projet:", document.getElementById("project-budget").innerText);
        const objectives = prompt("Entrez les objectifs du projet:", document.getElementById("project-objectives").innerText);
        
        if (name && manager && startDate && endDate && budget && objectives) {
            document.getElementById("project-name").innerText = name;
            document.getElementById("project-manager").innerText = manager;
            document.getElementById("start-date").innerText = startDate;
            document.getElementById("end-date").innerText = endDate;
            document.getElementById("project-budget").innerText = budget + " €";
            document.getElementById("project-objectives").innerText = objectives;
        }
    });

    // Mise à jour des barres de progression
    function updateProgressBars() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            let percentage = bar.getAttribute('data-progress') || "0";
            bar.style.width = percentage + '%';
            bar.innerText = percentage + '%';
            bar.style.display = 'flex';
            bar.style.alignItems = 'center';
            bar.style.justifyContent = 'center';
            bar.style.backgroundColor = '#4CAF50';
            bar.style.height = '20px';
            bar.style.borderRadius = '5px';
            bar.style.transition = 'width 0.5s ease-in-out';
        });
    }

    updateProgressBars();
});
