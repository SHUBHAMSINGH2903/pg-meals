/* ===================================================
   Ghar Jaisa Khana — PG Meal Catalog JS
   =================================================== */

// Change this to your business WhatsApp number (with country code, e.g. 919876543210)
const WHATSAPP_NUMBER = "918449311016"; // Edit this line to put your real number

const modal = document.getElementById('orderModal');
const selectedPlanInput = document.getElementById('selectedPlan');
const planDisplayInput = document.getElementById('planDisplay');

function openOrderModal(planName, price) {
    selectedPlanInput.value = planName;
    planDisplayInput.value = `${planName}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        closeOrderModal();
    }
}

function sendWhatsAppOrder(event) {
    event.preventDefault();

    const plan = selectedPlanInput.value;
    const name = document.getElementById('userName').value;
    const address = document.getElementById('pgAddress').value;
    const timePref = document.getElementById('mealPreference').value;

    // Construct the WhatsApp message template
    const message = `Hello Ghar Jaisa Khana! 🍳\n\nI want to place an order from the PG Meal Catalog.\n\n👤 *Name*: ${name}\n📦 *Meal Plan*: ${plan}\n🏠 *PG Delivery Address*: ${address}\n⏰ *Time Preference*: ${timePref}\n\nPlease confirm my order and send payment details (UPI/Cash). Thanks!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal and reset form
    closeOrderModal();
    document.getElementById('orderForm').reset();
}
