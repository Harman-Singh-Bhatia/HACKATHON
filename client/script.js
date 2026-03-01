// ===============================
// GreenGrid Buyer Match Logic
// ===============================

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

// Wait until DOM ready
document.addEventListener("DOMContentLoaded", () => {
    setupBuyerMatch();
    setupSellerForm();
});

// ===============================
// Setup Buyer Match Button
// ===============================

function setupBuyerMatch() {
    const matchBtn = document.getElementById("matchBtn");
    if (!matchBtn) return;

    matchBtn.addEventListener("click", handleMatchClick);
}

// ===============================
// Handle Match Click
// ===============================

async function handleMatchClick() {
    const city = document.getElementById("city-selector")?.value;
    const energy = document.getElementById("energy-type-buyer")?.value || "solar";
    const matchBtn = document.getElementById("matchBtn");

    if (!city) {
        alert("Please select a city");
        return;
    }

    try {
        // Loading state with Spinner
        if (matchBtn) {
            matchBtn.disabled = true;
            matchBtn.innerHTML = '<span class="loading-spinner"></span> Searching...';
        }
        showToast("Finding best green match...");

        // Simulate network delay for effect if local
        await new Promise(resolve => setTimeout(resolve, 800));

        const res = await fetch(`${API_BASE}/match`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                city: city,
                energy_type: energy.toLowerCase(),
            }),
        });

        const data = await res.json();
        console.log("MATCH RESULT:", data);

        renderMatches(data.matches || []);
    } catch (err) {
        console.error("Match API error:", err);
        showToast("Network Error: Could not connect to API", "error");
    } finally {
        // Restore button state
        if (matchBtn) {
            matchBtn.disabled = false;
            matchBtn.innerHTML = 'Find Best Match';
        }
    }
}

// ===============================
// Render Matches into Buyer Panel
// ===============================

function renderMatches(matches) {
    const container = document.getElementById("listings-container");
    if (!container) return;

    container.innerHTML = "";

    if (!matches.length) {
        container.innerHTML = `
      <div class="listing-card">
        <div class="listing-info">
          <span class="listing-type">No match found</span>
          <span class="listing-amt">Try another city or energy type</span>
        </div>
      </div>
    `;
        return;
    }

    matches.forEach((m, index) => {
        const card = document.createElement("div");
        card.className = "listing-card animate-listing";
        card.style.animationDelay = `${index * 80}ms`; // Staggered fade up

        card.innerHTML = `
      <div class="listing-info">
        <span class="listing-type">
          ${m.energy_type.toUpperCase()} Energy
          ${index === 0 ? '<span style="color:#16a34a;font-weight:600;"> ⭐ Recommended</span>' : ''}
        </span>

        <span class="listing-amt">
          ${m.seller_name} — ${m.city}
        </span>

        <span style="font-size:0.8rem;color:var(--text-secondary);">
          Price: ₹${m.price_per_unit}/kWh
        </span>
      </div>

      <div class="listing-action">
        <button class="purchase-btn action-btn" onclick="handleConnectClick('${m.seller_name}')">
          Connect
        </button>
      </div>
    `;

        container.appendChild(card);
    });
}

// ===============================
// Simple Toast (fallback safe)
// ===============================

function showToast(msg, type = "info") {
    console.log("TOAST:", msg);

    // Create toast container if it doesn't exist
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        // Basic styling for a fixed toast in the top right
        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    // Style based on type
    const bgColor = type === "error" ? "rgba(239, 68, 68, 0.9)" : "rgba(22, 163, 74, 0.9)";
    toast.style.background = bgColor;
    toast.style.color = "white";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    toast.style.fontSize = "0.9rem";
    toast.style.fontWeight = "500";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    toast.style.transition = "all 0.3s ease";

    toast.innerText = msg;
    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===============================
// Seller Registration Logic
// ===============================

function setupSellerForm() {
    const sellerForm = document.getElementById("seller-form");
    if (!sellerForm) return;

    sellerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const energyType = document.getElementById("energy-type").value;
        const availableKwh = parseInt(document.getElementById("energy-amount").value, 10);
        const pricePerUnit = parseFloat(document.getElementById("energy-price").value);
        const city = document.getElementById("city-selector")?.value || "mumbai";

        // Dummy seller name for the prototype
        const sellerName = "CarbonSphere User";

        const submitBtn = sellerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;

        try {
            submitBtn.disabled = true;
            submitBtn.innerText = "Listing...";

            const res = await fetch(`${API_BASE}/listings/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    seller_name: sellerName,
                    energy_type: energyType.toLowerCase(),
                    city: city,
                    price_per_unit: pricePerUnit,
                    available_kwh: availableKwh
                })
            });

            if (!res.ok) throw new Error("Server rejected the listing");

            const data = await res.json();
            console.log("Listing Created:", data);

            showToast("Energy listed successfully!", "success");
            sellerForm.reset();

        } catch (err) {
            console.error("Failed to create listing:", err);
            showToast("Network Error: Could not connect to API", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });
}

// ===============================
// Buyer Connection Logic
// ===============================

// Make it global so the inline onclick can find it
window.handleConnectClick = function (sellerName) {
    showToast(`Initiating connection with ${sellerName}...`, "success");
    // In a real app, this might open a chat window or direct to a payment flow
};

// ===============================
// Carbon Investment Portfolio Logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    setupPortfolio();
});

function setupPortfolio() {
    const solarSlider = document.getElementById('solar-slider');
    const windSlider = document.getElementById('wind-slider');
    const biogasSlider = document.getElementById('biogas-slider');

    if (!solarSlider || !windSlider || !biogasSlider) return;

    const sliders = [
        { el: solarSlider, key: 'solar' },
        { el: windSlider, key: 'wind' },
        { el: biogasSlider, key: 'biogas' }
    ];

    sliders.forEach(s => {
        s.el.addEventListener('input', (e) => {
            handleSliderChange(s.key, parseInt(e.target.value), sliders);
        });
    });

    // Initial update
    updatePortfolioVisuals();
}

function handleSliderChange(changedKey, newValue, sliders) {
    const otherSliders = sliders.filter(s => s.key !== changedKey);
    let remaining = 100 - newValue;

    // Calculate current sum of other sliders to distribute the remaining proportionately
    const otherSum = otherSliders.reduce((sum, s) => sum + parseInt(s.el.value), 0);

    otherSliders.forEach((s, index) => {
        if (otherSum === 0) {
            // evenly split if others were 0
            s.el.value = (remaining / otherSliders.length).toFixed(0);
        } else {
            // proportional split
            // To ensure they strictly sum to 100 even with rounding, give remainder to the last one
            if (index === otherSliders.length - 1) {
                const updatedOthersSum = otherSliders.slice(0, index).reduce((acc, curr) => acc + parseInt(curr.el.value), 0);
                s.el.value = remaining - updatedOthersSum;
            } else {
                s.el.value = Math.round((parseInt(s.el.value) / otherSum) * remaining);
            }
        }
    });

    updatePortfolioVisuals();
}

function updatePortfolioVisuals() {
    const solar = parseInt(document.getElementById('solar-slider').value);
    const wind = parseInt(document.getElementById('wind-slider').value);
    const biogas = parseInt(document.getElementById('biogas-slider').value);

    // Update Text Values
    document.getElementById('solar-pct-val').textContent = `${solar}%`;
    document.getElementById('wind-pct-val').textContent = `${wind}%`;
    document.getElementById('biogas-pct-val').textContent = `${biogas}%`;

    document.getElementById('portfolio-summary-text').textContent =
        `Portfolio Allocation: ${solar}% Solar | ${wind}% Wind | ${biogas}% Biogas`;

    // Update Donut Chart
    const donutSolar = document.getElementById('donut-solar');
    const donutWind = document.getElementById('donut-wind');
    const donutBiogas = document.getElementById('donut-biogas');

    donutSolar.setAttribute('stroke-dasharray', `${solar}, 100`);
    donutSolar.setAttribute('stroke-dashoffset', `0`);

    donutWind.setAttribute('stroke-dasharray', `${wind}, 100`);
    donutWind.setAttribute('stroke-dashoffset', `-${solar}`);

    donutBiogas.setAttribute('stroke-dasharray', `${biogas}, 100`);
    donutBiogas.setAttribute('stroke-dashoffset', `-${solar + wind}`);

    // Update Metrics
    const totalInvested = 50000;
    const offset = (totalInvested * ((solar * 0.8) + (wind * 0.9) + (biogas * 0.95)) / 100000).toFixed(1);
    const efficiency = Math.round((solar * 0.8) + (wind * 0.75) + (biogas * 0.95));

    document.getElementById('portfolio-invested').textContent = totalInvested.toLocaleString();
    document.getElementById('portfolio-offset').textContent = offset;
    document.getElementById('portfolio-efficiency').textContent = `${efficiency}/100`;

    // Update Insights & Ratings
    const aiInsight = document.getElementById('portfolio-ai-insight');
    const ratingLabel = document.getElementById('portfolio-rating');

    if (biogas > 60) {
        aiInsight.textContent = "High base-load dependency. Biogas offers high efficiency but limits scalability and rapid green transition compared to solar/wind.";
        ratingLabel.textContent = "High Efficiency";
        ratingLabel.style.background = "rgba(22, 163, 74, 0.1)";
        ratingLabel.style.color = "#16a34a";
    } else if (wind > 60) {
        aiInsight.textContent = "High volatility profile. Wind generates large offsets during peaks but requires solar or biogas for baseline grid stability.";
        ratingLabel.textContent = "Moderate Growth";
        ratingLabel.style.background = "rgba(245, 158, 11, 0.1)";
        ratingLabel.style.color = "#f59e0b";
    } else if (solar > 60) {
        aiInsight.textContent = "Solar-heavy investment provides predictable, stable generation during daytime, excellent for consistent moderate returns.";
        ratingLabel.textContent = "Stable Output";
        ratingLabel.style.background = "rgba(59, 130, 246, 0.1)";
        ratingLabel.style.color = "#3b82f6";
    } else {
        aiInsight.textContent = "A highly balanced portfolio. Stable solar output covers wind volatility, while biogas ensures baseline load matching.";
        ratingLabel.textContent = "Low Risk (Balanced)";
        ratingLabel.style.background = "rgba(139, 92, 246, 0.1)";
        ratingLabel.style.color = "#8b5cf6";
    }

    // Animate Graph (simple simulation of projection line)
    const graphLine = document.getElementById('portfolio-projection-line');
    // adjust curve dynamically
    const p1 = 50 - (solar * 0.1);
    const p2 = 47 - (wind * 0.1);
    const p3 = 2 - (biogas * 0.05);
    graphLine.setAttribute('points', `0,${p1} 20,${p2} 40,43 60,38 80,35 100,28 120,22 140,18 160,11 180,6 200,${p3}`);
}
// ===============================
// 🔎 FIND BEST MATCH BUTTON
// ===============================

const matchBtn = document.getElementById("matchBtn");

if (matchBtn) {
    matchBtn.addEventListener("click", async () => {
        const city = document.getElementById("city-selector").value;
        const energyType = document.getElementById("energy-type-buyer").value;

        try {
            const res = await fetch(`${API_BASE}/match`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    city: city,
                    energy_type: energyType
                })
            });

            const data = await res.json();
            console.log("MATCHES:", data);

            renderListings(data.matches || []);

        } catch (err) {
            console.error("Match error:", err);
        }
    });
}

// ===============================
// 🎨 RENDER LISTINGS IN UI
// ===============================

function renderListings(matches) {
    const container = document.getElementById("listings-container");
    if (!container) return;

    container.innerHTML = "";

    // ❌ No matches
    if (!matches.length) {
        container.innerHTML = `
      <div class="listing-card">
        <div class="listing-info">
          <span class="listing-type">No match found</span>
          <span class="listing-amt">Try another city or energy type</span>
        </div>
      </div>
    `;
        return;
    }

    // ✅ Render each seller
    matches.forEach((m, index) => {
        const card = document.createElement("div");
        card.className = "listing-card";

        card.innerHTML = `
      <div class="listing-info">
        <span class="listing-type">
          ${m.energy_type.toUpperCase()} Energy
          ${index === 0 ? '<span style="color:#16a34a;font-weight:600;"> ⭐ Best Deal</span>' : ''}
        </span>

        <span class="listing-amt">
          ${m.seller_name} — ${m.city}
        </span>

        <span style="font-size:0.8rem;color:var(--text-secondary);">
          Price: ₹${m.price_per_unit}/kWh
        </span>
      </div>

      <div class="listing-action">
        <button class="purchase-btn action-btn" onclick="handleConnectClick('${m.seller_name}')">
          Connect
        </button>
      </div>
    `;

        container.appendChild(card);
    });
}