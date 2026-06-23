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

    contactForm.addEventListener('submit', function(e) {
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