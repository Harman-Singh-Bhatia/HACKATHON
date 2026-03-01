// Mock Global Constants
const globalBaseCo2 = 450000;
const globalBaseHomes = 15000;

// City Profiles with Mix data (Indian Cities Only)
const cityData = {
    mumbai: { required: 15400000, startAvailable: 6160000, growthRate: 0.1, mix: { solar: 55, wind: 25, bio: 20 }, status: 'Transitioning' },
    delhi: { required: 12200000, startAvailable: 3660000, growthRate: 0.08, mix: { solar: 40, wind: 50, bio: 10 }, status: 'High Emissions' },
    bengaluru: { required: 8800000, startAvailable: 4400000, growthRate: 0.15, mix: { solar: 30, wind: 60, bio: 10 }, status: 'Transitioning' },
    hyderabad: { required: 4500000, startAvailable: 4450000, growthRate: 0.01, mix: { solar: 60, wind: 30, bio: 10 }, status: 'Climate Positive' },
    indore: { required: 1500000, startAvailable: 1200000, growthRate: 0.05, mix: { solar: 70, wind: 10, bio: 20 }, status: 'Transitioning' }
};

let currentCity = 'mumbai';
let required = cityData[currentCity].required;
let available = cityData[currentCity].startAvailable;

// Market State
let activeListings = [
    { id: '1', type: 'Solar', amount: 2500, price: 12.5 },
    { id: '2', type: 'Wind', amount: 8000, price: 11.0 },
    { id: '3', type: 'Biogas', amount: 1200, price: 14.2 }
];

// User's Local State
let userWalletPurchased = 0;
let userWalletSold = 0;
let userWalletCo2 = 0;

// Global Aggregated State
let globalCo2 = globalBaseCo2;
let globalHomes = globalBaseHomes;
let globalGrowth = 4.2;

// DOM Elements - Primary
const citySelector = document.getElementById('city-selector');
const elRequired = document.getElementById('total-required');
const elAvailable = document.getElementById('current-available');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const successOverlay = document.getElementById('success-overlay');

// DOM Elements - Roles & Panels
const roleBuyerBtn = document.getElementById('role-buyer-btn');
const roleSellerBtn = document.getElementById('role-seller-btn');
const sellerForm = document.getElementById('seller-form');
const listingsContainer = document.getElementById('listings-container');

// DOM Elements - Global Impact
const elGlobalCo2 = document.getElementById('global-co2');
const elHomesPowered = document.getElementById('homes-powered');
const elGrowthPercent = document.getElementById('growth-percent');
const elClimateStatus = document.getElementById('climate-status');
const insightPanel = document.getElementById('insight-panel');

// DOM Elements - Wallet
const elWalletPurchased = document.getElementById('wallet-purchased');
const elWalletSold = document.getElementById('wallet-sold');
const elWalletCo2 = document.getElementById('wallet-co2');

const msSupporter = document.getElementById('ms-supporter');
const msCatalyst = document.getElementById('ms-catalyst');
const msBuilder = document.getElementById('ms-builder');

const flowPulse = document.getElementById('flow-pulse');

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    iconSun.classList.toggle('hidden');
    iconMoon.classList.toggle('hidden');
});

// Role Toggle Logic
const panelGroup = document.querySelector('.action-column');

roleBuyerBtn.addEventListener('click', () => {
    if (document.body.classList.contains('role-buyer-active')) return;

    // Add fade animation class to action panel
    if (panelGroup) {
        panelGroup.classList.remove('role-fade-enter');
        void panelGroup.offsetWidth; // trigger reflow
        panelGroup.classList.add('role-fade-enter');
    }

    document.body.classList.add('role-buyer-active');
    document.body.classList.remove('role-seller-active');
    roleBuyerBtn.classList.add('active');
    roleSellerBtn.classList.remove('active');
});

roleSellerBtn.addEventListener('click', () => {
    if (document.body.classList.contains('role-seller-active')) return;

    // Add fade animation class to action panel
    if (panelGroup) {
        panelGroup.classList.remove('role-fade-enter');
        void panelGroup.offsetWidth; // trigger reflow
        panelGroup.classList.add('role-fade-enter');
    }

    document.body.classList.add('role-seller-active');
    document.body.classList.remove('role-buyer-active');
    roleSellerBtn.classList.add('active');
    roleBuyerBtn.classList.remove('active');
});

// --- Chat Logic ---
const chatHistory = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function addChatMessage(sender, text, type = 'system') {
    if (!chatHistory) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message msg-${type} new-msg`;

    let contentHtml = '';
    if (type !== 'system') {
        contentHtml += `<strong>${sender}</strong><br>`;
    }
    contentHtml += `<span>${text}</span><span class="chat-time">${timeStr}</span>`;

    msgDiv.innerHTML = contentHtml;
    chatHistory.appendChild(msgDiv);

    // Auto-scroll
    setTimeout(() => {
        chatHistory.scrollTo({ top: chatHistory.scrollHeight, behavior: 'smooth' });
    }, 50);
}

// Initial system message
if (chatHistory) {
    setTimeout(() => {
        addChatMessage('System', 'Secure P2P energy connection established. Ready to trade.', 'system');
    }, 500);
}

if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        const isBuyer = document.body.classList.contains('role-buyer-active');
        addChatMessage(isBuyer ? 'You (Buyer)' : 'You (Seller)', text, 'user');
        chatInput.value = '';

        // Mock response for realism if they ask a question
        if (text.endsWith('?')) {
            setTimeout(() => {
                addChatMessage('System', 'Searching network for matching peers...', 'system');
            }, 1000);
        }
    });
}


// Real-time Clock
const clockEl = document.getElementById('realtime-clock');
setInterval(() => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}, 1000);

// Utilities
const formatNumber = (num) => new Intl.NumberFormat('en-US').format(Math.floor(num));
const calculateCO2 = (kWh) => kWh * 0.4;
const calculateHomes = (kWh) => kWh / 30;

// Initial Animation state
let targetAvailable = available;
let currentDisplayAvailable = available;
let primaryAnimFrameId = null;
let isComplete = false;

// Carbon Trend Graph State
const trendPoints = [50, 48, 49, 45, 47, 40, 42, 35, 30, 25, 20];

function updateTrendGraph() {
    const line = document.getElementById('trend-line');
    const area = document.getElementById('trend-area');
    if (!line || !area) return;

    let pointStr = '';
    const step = 200 / (trendPoints.length - 1);

    trendPoints.forEach((val, i) => {
        pointStr += `${i * step},${val} `;
    });

    line.setAttribute('points', pointStr.trim());
    area.setAttribute('points', `0,60 ${pointStr.trim()} 200,60`);
}

function pushTrendPoint() {
    trendPoints.shift();
    const lastVal = trendPoints[trendPoints.length - 1];
    const decrease = Math.max(2, lastVal - (Math.random() * 5));
    trendPoints.push(decrease);
    updateTrendGraph();
}


function updateRing(id, percentage) {
    const circle = document.getElementById(`${id}-ring`);
    const valText = document.getElementById(`${id}-val`);
    if (circle && valText) {
        valText.textContent = percentage;
        circle.setAttribute('stroke-dasharray', `${percentage}, 100`);
    }
}

function renderListings() {
    listingsContainer.innerHTML = '';

    if (activeListings.length === 0) {
        listingsContainer.innerHTML = '<p style="color:var(--text-secondary);font-size:0.9rem;text-align:center;padding:2rem 0;">No available listings at this time.</p>';
        return;
    }

    activeListings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <div class="listing-info">
                <span class="listing-type">${listing.type} Energy</span>
                <span class="listing-amt">${formatNumber(listing.amount)} <span>kWh</span></span>
            </div>
            <div class="listing-action">
                <span class="listing-price">${listing.price}¢ / kWh</span>
                <button class="purchase-btn" onclick="purchaseEnergy('${listing.id}')">Purchase</button>
            </div>
        `;
        listingsContainer.appendChild(card);
    });
}

function updatePrimaryDisplay() {
    elRequired.textContent = formatNumber(required);

    const pct = Math.min((currentDisplayAvailable / required) * 100, 100);
    progressFill.style.width = `${pct}%`;
    progressPercentage.textContent = `${pct.toFixed(1)}%`;
    elAvailable.textContent = formatNumber(currentDisplayAvailable);

    const remaining = required - currentDisplayAvailable;
    if (remaining <= 0) {
        insightPanel.textContent = "Grid fully sustained by renewables.";
        elClimateStatus.textContent = 'Climate Positive';
    } else {
        const potentialHomes = formatNumber(calculateHomes(required));
        insightPanel.textContent = `If this city reaches 100% renewable, ${potentialHomes} homes can run emission-free.`;
    }
}

function updateSecondaryDisplay() {
    elWalletPurchased.textContent = formatNumber(userWalletPurchased);
    elWalletSold.textContent = formatNumber(userWalletSold);
    elWalletCo2.textContent = formatNumber(userWalletCo2);

    // Milestones (based on total participation)
    const totalParticipation = userWalletPurchased + userWalletSold;
    if (totalParticipation >= 2500) msSupporter.classList.add('active');
    if (totalParticipation >= 10000) msCatalyst.classList.add('active');
    if (totalParticipation >= 50000) msBuilder.classList.add('active');

    // Global stats
    const dynamicCo2 = calculateCO2(currentDisplayAvailable);
    const dynamicHomes = calculateHomes(currentDisplayAvailable);

    elGlobalCo2.textContent = formatNumber(globalBaseCo2 + dynamicCo2);
    elHomesPowered.textContent = formatNumber(globalBaseHomes + dynamicHomes);
    elGrowthPercent.textContent = `+${globalGrowth.toFixed(1)}`;
}

function resetCityState() {
    const cd = cityData[currentCity];
    required = cd.required;
    available = cd.startAvailable;
    targetAvailable = available;
    currentDisplayAvailable = available;
    isComplete = false;

    elClimateStatus.textContent = cd.status;

    updateRing('mix-solar', cd.mix.solar);
    updateRing('mix-wind', cd.mix.wind);
    updateRing('mix-bio', cd.mix.bio);

    document.body.classList.remove('success-state');
    successOverlay.classList.remove('visible');

    cancelAnimationFrame(primaryAnimFrameId);
    updatePrimaryDisplay();
    updateSecondaryDisplay();
    renderListings();
}

citySelector.addEventListener('change', (e) => {
    currentCity = e.target.value;
    resetCityState();
});

function animateNumbers() {
    const diff = targetAvailable - currentDisplayAvailable;
    if (Math.abs(diff) < 2) {
        currentDisplayAvailable = targetAvailable;
        updatePrimaryDisplay();
        updateSecondaryDisplay();
        setTimeout(() => elAvailable.classList.remove('bump'), 100);
        return;
    }

    currentDisplayAvailable += diff * 0.08;
    updatePrimaryDisplay();
    updateSecondaryDisplay();
    primaryAnimFrameId = requestAnimationFrame(animateNumbers);
}

function triggerFlowAnimation() {
    progressFill.classList.remove('pulse');
    elAvailable.classList.remove('bump');
    document.body.classList.remove('pulse-glow');

    flowPulse.style.animation = 'none';
    flowPulse.offsetHeight; // force reflow
    flowPulse.style.animation = null;
    flowPulse.classList.add('animate');

    void progressFill.offsetWidth;

    progressFill.classList.add('pulse');
    elAvailable.classList.add('bump');
    document.body.classList.add('pulse-glow');

    if (Math.random() > 0.4) pushTrendPoint();
}


// --- P2P Logic ---

// Seller Action
sellerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isComplete) return;

    const energyType = document.getElementById('energy-type').value;
    const amount = parseInt(document.getElementById('energy-amount').value);
    const price = parseFloat(document.getElementById('energy-price').value);

    // 1. Update Market Listings
    const newId = Date.now().toString();
    activeListings.unshift({ id: newId, type: energyType, amount: amount, price: price });
    renderListings();

    // Add transaction to chat log
    addChatMessage('System', `Offer Listed: ${formatNumber(amount)} kWh ${energyType} at ${price}¢`, 'system');

    // 2. Add to City Grid securely
    const gap = required - targetAvailable;
    const actualContribution = Math.min(gap, amount);

    if (actualContribution > 0) {
        targetAvailable += actualContribution;
        globalGrowth += (amount / required) * 100 * 5; // mock growth bump

        // Update user sold state
        userWalletSold += amount;
        elWalletSold.classList.add('bump');
        setTimeout(() => elWalletSold.classList.remove('bump'), 300);

        triggerFlowAnimation();
        cancelAnimationFrame(primaryAnimFrameId);
        animateNumbers();

        if (targetAvailable >= required) {
            isComplete = true;
            triggerSuccessState();
        }
    }

    // Reset Form
    sellerForm.reset();
});

// Buyer Action (attached globally so inline onclick works)
window.purchaseEnergy = function (listingId) {
    if (isComplete) return;

    const listingIndex = activeListings.findIndex(l => l.id === listingId);
    if (listingIndex === -1) return;

    const listing = activeListings[listingIndex];

    // Process Purchase
    userWalletPurchased += listing.amount;
    userWalletCo2 += calculateCO2(listing.amount);

    // Remove from market
    activeListings.splice(listingIndex, 1);
    renderListings();

    // Animations
    elWalletPurchased.classList.add('bump');
    setTimeout(() => elWalletPurchased.classList.remove('bump'), 300);

    triggerFlowAnimation();
    updateSecondaryDisplay();

    // Add transaction to chat log sequence
    addChatMessage('System', `Offer Accepted: ${formatNumber(listing.amount)} kWh`, 'system');

    setTimeout(() => {
        addChatMessage('System', 'Processing Transaction...', 'system');
    }, 800);

    setTimeout(() => {
        addChatMessage('System', 'Transaction Completed', 'system');
    }, 2000);
};

function triggerSuccessState() {
    insightPanel.textContent = "Grid fully sustained by renewables.";
    elClimateStatus.textContent = 'Climate Positive';
    setTimeout(() => {
        document.body.classList.add('success-state');
        document.body.classList.remove('pulse-glow');
        successOverlay.classList.add('visible');
    }, 1200);
}

// Initialization
resetCityState();
updateTrendGraph();
