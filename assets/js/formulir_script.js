document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const currentYearSpan = document.getElementById("currentYearForm");
    const logoutButton = document.getElementById('logoutButtonSeeker_form');
    const navProfileIcon = document.getElementById('navProfileIconSeeker_form');

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll(".nav-link, .profile-button, .logout-button-nav").forEach(n => n.addEventListener("click", () => {
             if (window.innerWidth < 769) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }));
    }
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const storedUserData = JSON.parse(localStorage.getItem('userDataADAloker'));
    if (storedUserData && storedUserData.profilePicture && navProfileIcon) {
        navProfileIcon.src = storedUserData.profilePicture;
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (confirm("Apakah Anda yakin ingin keluar?")) {
                localStorage.removeItem('jobseekerLoggedIn');
                localStorage.removeItem('userDataADAloker');
                window.location.href = "/index.html";
            }
        });
    }

    const applicationForm = document.getElementById('applicationForm');
    const formJobTitle = document.getElementById('formJobTitle');
    const formCompanyName = document.getElementById('formCompanyName');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const resumeInput = document.getElementById('resume');
    const resumeFileNameSpan = document.getElementById('fileName');
    const coverLetterInput = document.getElementById('coverLetter');
    const coverLetterFileNameSpan = document.getElementById('coverLetterFileName');
    const dataConsentCheckbox = document.getElementById('dataConsent');
    const submitButton = document.getElementById('submitApplicationButton');
    const formSubmissionMessage = document.getElementById('formSubmissionMessage');
    const successModal = document.getElementById('successModal');
    const closeModalButton = document.querySelector('.modal .close-button-modal');
    const backToJobsButton = document.getElementById('backToJobsButton');
    const modalJobTitleSpan = document.getElementById('modalJobTitle');

    const jobDataForForm = {
        1: { title: "Frontend Developer", company: "PT. Anta Kirana" },
        2: { title: "UI/UX Designer", company: "Tech Solutions Inc." },
        3: { title: "Backend Developer (Node.js)", company: "PT. Anta Kirana" },
        4: { title: "Digital Marketing Specialist", company: "Creative Agency XYZ" },
        101: { title: "Senior Frontend Developer", company: "PT. Anta Kirana" },
        201: { title: "Fullstack Developer (React & Python)", company: "Tech Solutions Inc." },
        301: { title: "Graphic Designer", company: "Creative Agency XYZ" }
    };

    function getJobIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('job_id'));
    }

    const jobId = getJobIdFromUrl();
    if (jobId && jobDataForForm[jobId]) {
        const job = jobDataForForm[jobId];
        if (formJobTitle) formJobTitle.textContent = `Formulir Lamaran untuk ${job.title}`;
        if (formCompanyName) formCompanyName.textContent = `di ${job.company}`;
        if (modalJobTitleSpan) modalJobTitleSpan.textContent = job.title;
    } else {
        if (formJobTitle) formJobTitle.textContent = 'Formulir Lamaran';
        if (formCompanyName) formCompanyName.textContent = 'Posisi tidak ditemukan';
    }

    function updateFileName(fileInput, fileNameSpan) {
        const defaultText = fileNameSpan.dataset.defaultText || (fileNameSpan.textContent.includes("Opsional") ? "Pilih File (Opsional)" : "Pilih File");
        if (fileInput.files.length > 0) {
            fileNameSpan.textContent = fileInput.files[0].name;
        } else {
            fileNameSpan.textContent = defaultText;
        }
    }

    if (resumeInput && resumeFileNameSpan) {
        resumeFileNameSpan.dataset.defaultText = resumeFileNameSpan.textContent;
        resumeInput.addEventListener('change', () => updateFileName(resumeInput, resumeFileNameSpan));
    }
    if (coverLetterInput && coverLetterFileNameSpan) {
        coverLetterFileNameSpan.dataset.defaultText = coverLetterFileNameSpan.textContent;
        coverLetterInput.addEventListener('change', () => updateFileName(coverLetterInput, coverLetterFileNameSpan));
    }

    function validateForm() {
        let isValid = true;
        clearErrors();
        if (fullNameInput.value.trim() === '') { showError('fullNameError', 'Nama lengkap tidak boleh kosong.'); isValid = false; }
        const emailValue = emailInput.value.trim();
        if (emailValue === '') { showError('emailError', 'Alamat email tidak boleh kosong.'); isValid = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) { showError('emailError', 'Format email tidak valid.'); isValid = false; }
        if (phoneNumberInput.value.trim() === '') { showError('phoneNumberError', 'Nomor telepon tidak boleh kosong.'); isValid = false; }
        else if (!/^\d{10,15}$/.test(phoneNumberInput.value.trim())) { showError('phoneNumberError', 'Format nomor telepon tidak valid (10-15 digit angka).'); isValid = false; }
        if (resumeInput.files.length === 0) { showError('resumeError', 'CV/Resume wajib diunggah.'); isValid = false; }
        else {
            const resumeFile = resumeInput.files[0]; const allowedExt = /(\.pdf|\.doc|\.docx)$/i; const maxMB = 2;
            if (!allowedExt.exec(resumeFile.name)) { showError('resumeError', 'Format file tidak valid. Hanya PDF, DOC, DOCX.'); isValid = false; }
            else if (resumeFile.size > maxMB * 1024 * 1024) { showError('resumeError', `Ukuran file maksimal ${maxMB}MB.`); isValid = false; }
        }
        if (coverLetterInput.files.length > 0) {
            const clFile = coverLetterInput.files[0]; const allowedExt = /(\.pdf|\.doc|\.docx)$/i; const maxMB = 2;
            if (!allowedExt.exec(clFile.name)) { showError('coverLetterError', 'Format file tidak valid. Hanya PDF, DOC, DOCX.'); isValid = false; }
            else if (clFile.size > maxMB * 1024 * 1024) { showError('coverLetterError', `Ukuran file maksimal ${maxMB}MB.`); isValid = false; }
        }
        if (!dataConsentCheckbox.checked) { showError('consentError', 'Anda harus menyetujui kebijakan privasi.'); isValid = false; }
        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) { errorElement.textContent = message; }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    if (applicationForm) {
        applicationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            formSubmissionMessage.textContent = '';
            formSubmissionMessage.className = 'submission-message';

            if (validateForm()) {
                setTimeout(() => {
                    if (successModal) successModal.style.display = "block";
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Lamaran';
                }, 1500);
            } else {
                formSubmissionMessage.textContent = 'Mohon perbaiki kesalahan pada formulir.';
                formSubmissionMessage.classList.add('error');
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Lamaran';
                const firstError = document.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.closest('.input-group, .consent-group').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.onclick = function() {
            if (successModal) successModal.style.display = "none";
            if (applicationForm) applicationForm.reset();
            updateFileName(resumeInput, resumeFileNameSpan);
            updateFileName(coverLetterInput, coverLetterFileNameSpan);
        }
    }
    if (backToJobsButton) {
        backToJobsButton.onclick = function() {
            if (successModal) successModal.style.display = "none";
            window.location.href = '/cari_lowongan.html';
        }
    }
    window.onclick = function(event) {
        if (event.target == successModal) {
            if (successModal) successModal.style.display = "none";
            if (applicationForm) applicationForm.reset();
            updateFileName(resumeInput, resumeFileNameSpan);
            updateFileName(coverLetterInput, coverLetterFileNameSpan);
        }
    }
});
