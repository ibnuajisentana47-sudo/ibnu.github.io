/**
 * Contact Logic - PT KSMA
 * Integrasi pengiriman pesan via WhatsApp dan Email.
 */

const WHATSAPP_PHONE_NUMBER = "6287828680690";
const COMPANY_EMAIL_ADDRESS = "karyasinarmandiriabadi@outlook.co.id";

/**
 * Helper: Membangun isi pesan
 */
function buildMessageBody(name, email, message) {
    return `Halo PT KSMA,\n\nNama: *${name}*\nEmail: ${email}\n\nPesan:\n"${message}"`;
}

function trimForWhatsApp(text, maxChars = 1400) {
    if (text === undefined || text === null) return '';
    const s = String(text);
    if (s.length <= maxChars) return s;
    return s.slice(0, maxChars).trim() + '…';
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

        const submissionMethod = 'whatsapp'; // paksa kirim via WhatsApp

        const fullMessage = buildMessageBody(name, email, message);

        if (submissionMethod === 'whatsapp') {
            const trimmedMessage = trimForWhatsApp(fullMessage);
            const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(trimmedMessage)}`;

            // Penting: lakukan sekali saja dengan window.open untuk menghindari double redirect/stuck
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        } else {
            const subject = encodeURIComponent(`Pesan dari Website - ${name}`);
            const emailBody = encodeURIComponent(fullMessage);
            window.location.href = `mailto:${COMPANY_EMAIL_ADDRESS}?subject=${subject}&body=${emailBody}`;
        }

        showSuccessNotification(submissionMethod);
        this.reset();
    });
});

