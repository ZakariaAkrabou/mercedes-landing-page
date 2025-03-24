let currentStep = 0;
const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const progressBars = document.querySelectorAll(".progress-bar");

function openModal() {
    document.getElementById("modal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById("modal").style.display = "none";
        document.body.style.overflow = "auto";
    }
}

function updateProgress() {
    progressSteps.forEach((step, index) => {
        if (index <= currentStep) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });

    progressBars.forEach((bar, index) => {
        if (index < currentStep) {
            bar.classList.add("active");
        } else {
            bar.classList.remove("active");
        }
    });
}

function nextStep() {
    const currentFormStep = steps[currentStep];
    const inputs = currentFormStep.querySelectorAll("input[required], select[required]");
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = "#ff4444";
            isValid = false;
        } else {
            input.style.borderColor = "#ddd";
        }
    });

    if (!isValid) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    steps[currentStep].classList.remove("active");
    currentStep++;
    if (currentStep >= steps.length) {
        currentStep = steps.length - 1;
    }
    steps[currentStep].classList.add("active");
    updateProgress();
}

function prevStep() {
    steps[currentStep].classList.remove("active");
    currentStep--;
    if (currentStep < 0) {
        currentStep = 0;
    }
    steps[currentStep].classList.add("active");
    updateProgress();
}

document.getElementById("multiStepForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert("Votre demande de rendez-vous a bien été envoyée ! ");
        closeModal({target: document.getElementById('modal')});
        
        this.reset();
        currentStep = 0;
        steps.forEach(step => step.classList.remove("active"));
        steps[0].classList.add("active");
        updateProgress();
        
        submitBtn.textContent = "Confirmer la demande";
        submitBtn.disabled = false;
    }, 1500);
});

updateProgress();

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal({target: document.getElementById('modal')});
    }
});