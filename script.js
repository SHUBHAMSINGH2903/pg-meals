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
    const userPhone = prompt("कृपया अपना WhatsApp नंबर दर्ज करें (Instant Order Confirmation के लिए):", "");

    // 1. Trigger Webhook to Central Database (Auto Add Subscriber)
    const masterApi = localStorage.getItem('googleSheetApiUrl') || "";
    if (masterApi) {
        fetch(`${masterApi}?action=new_subscriber&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(userPhone || '')}&address=${encodeURIComponent(address)}&plan=${encodeURIComponent(plan)}`, { mode: 'no-cors' });
    }

    // 2. Smart YES Tap Link Generator for Customer
    const yesTapLink = `https://wa.me/${WHATSAPP_NUMBER}?text=YES_${encodeURIComponent(name.trim().replace(/\s+/g, '_'))}`;

    const replyText = `Hi ${name}, your order for "${plan}" is CONFIRMED for ${timePref}. We will deliver to: ${address}. Please pay via UPI. Thank you!`;
    const encodedReply = encodeURIComponent(replyText);
    const quickConfirmLink = `https://wa.me/?text=${encodedReply}`;

    const message = `Hello Ghar Jaisa Khana! 🍳\n\nI want to place an order / subscribe.\n\n👤 *Name*: ${name}\n📦 *Meal Plan*: ${plan}\n🏠 *PG Delivery Address*: ${address}\n⏰ *Time Preference*: ${timePref}\n\n👉 *Your Daily 1-Tap YES Link* (Daily Dinner Confirmation):\n${yesTapLink}\n\nPlease confirm my subscription and send payment details (UPI/Cash). Thanks!\n\n------------------------\n👉 *Owner Reply Helper* (Tap to auto-draft confirmation):\n${quickConfirmLink}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal and reset form
    closeOrderModal();
    document.getElementById('orderForm').reset();
}
