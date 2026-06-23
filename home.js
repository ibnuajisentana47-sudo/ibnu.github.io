/**
 * Home Page Logic - PT KSMA
 * Mengelola statistik dinamis dan modal dokumen legal.
 */

const COMPANY_ESTABLISHED_DATE = '2025-06-08';
const TOTAL_PROJECTS_COMPLETED = 1;

/**
 * Updates the company's experience and project statistics on the page.
 */
function updateCompanyStats() {
    const experienceCountElement = document.getElementById('exp-count');
    const projectsCountElement = document.getElementById('proj-count');

    const startDate = new Date(COMPANY_ESTABLISHED_DATE);
    const today = new Date();
    const yearsExperience = Math.floor((today - startDate) / (1000 * 60 * 60 * 24 * 365.25));

    if (experienceCountElement) experienceCountElement.innerText = yearsExperience;
    if (projectsCountElement) projectsCountElement.innerText = TOTAL_PROJECTS_COMPLETED;
}

/**
 * Manajemen Modal Legalitas
 */
function openModal(pdfSrc, title) {
    const legalModalElement = document.getElementById('legalModal');
    const pdfViewerElement = document.getElementById('pdfViewer');
    const modalTitleElement = document.getElementById('modalTitle');

    if (!legalModalElement || !pdfViewerElement || !modalTitleElement) return;

    pdfViewerElement.src = pdfSrc;
    modalTitleElement.innerText = title;
    legalModalElement.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeModal() {
    const legalModalElement = document.getElementById('legalModal');
    if (!legalModalElement) return;
    legalModalElement.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

window.onclick = function(event) {
    const legalModalElement = document.getElementById('legalModal');
    if (event.target === legalModalElement) {
        closeModal();
    }
};

window.addEventListener('DOMContentLoaded', updateCompanyStats);


