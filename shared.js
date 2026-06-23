/**
 * Shared Functions - PT KSMA
 * Digunakan untuk komponen yang ada di setiap halaman (Navbar)
 */

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('navIcon');

    if (!menu || !icon) return;

    menu.classList.toggle('hidden');

    // Animasi Ikon Hamburger ke Close (X)
    const isHidden = menu.classList.contains('hidden');
    icon.setAttribute('d', isHidden ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12');
}

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

    // index.html passes only the filename (e.g. "NIB.pdf").
    // Ensure it always loads from local /pdf directory.
    const normalizedSrc = (pdfSrc && !String(pdfSrc).startsWith('http'))
        ? `pdf/${String(pdfSrc).replace(/^\.?\/?/, '')}`
        : pdfSrc;

    pdfViewerElement.src = normalizedSrc;
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

window.onclick = function (event) {
    const legalModalElement = document.getElementById('legalModal');
    if (event.target === legalModalElement) {
        closeModal();
    }
};

window.addEventListener('DOMContentLoaded', updateCompanyStats);


/**
 * Contact Logic - PT KSMA
 * Integrasi pengiriman pesan via WhatsApp dan Email.
 */

const WHATSAPP_PHONE_NUMBER = "6287828680690";
const COMPANY_EMAIL_ADDRESS = "karyasinarmandiriabadi@outlook.co.id";

/**
 * Helper: Membangun isi pesan
 */
function buildMessageBody(name, email, message, fileCount) {
    const fileNote = fileCount > 0 ? `\n\n[SAYA AKAN MELAMPIRKAN ${fileCount} FILE]` : "";
    return `Halo PT KSMA,\n\nNama: *${name}*\nEmail: ${email}\n\nPesan:\n"${message}"${fileNote}`;
}

function showSuccessNotification(method) {
    const successMessageElement = document.getElementById('successMessage');
    const successDetailElement = document.getElementById('successDetail');

    if (successDetailElement) {
        successDetailElement.innerText = method === 'whatsapp' ? 'Mengarahkan Anda ke WhatsApp...' : 'Mengarahkan ke Aplikasi Email...';
    }

    if (successMessageElement) {
        successMessageElement.classList.remove('hidden');
        setTimeout(() => {
            successMessageElement.classList.add('hidden');
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const fileCount = document.getElementById('attachments').files.length;
        const submissionMethod = e.submitter.value; // 'whatsapp' or 'email'

        const fullMessage = buildMessageBody(name, email, message, fileCount);

        if (submissionMethod === 'whatsapp') {
            window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(fullMessage)}`, '_blank');
        } else { // method === 'email'
            const subject = encodeURIComponent(`Pesan dari Website - ${name}`);
            const emailBody = encodeURIComponent(fullMessage);
            window.location.href = `mailto:${COMPANY_EMAIL_ADDRESS}?subject=${subject}&body=${emailBody}`;
        }

        showSuccessNotification(submissionMethod);
        this.reset();
    });
});

