let chartInstance = null;

window.onload = function () {
    const saved = localStorage.getItem("eco_result");

    if (saved) {
        updateUI(JSON.parse(saved));
    }
};

function calculate() {

    const data = {
        electricity: +document.getElementById("electricity").value || 0,
        petrol: +document.getElementById("petrol").value || 0,
        diesel: +document.getElementById("diesel").value || 0,
        lpg: +document.getElementById("lpg").value || 0,
        rice: +document.getElementById("rice").value || 0,
        wheat: +document.getElementById("wheat").value || 0,
        chicken: +document.getElementById("chicken").value || 0,
        veg: +document.getElementById("veg").value || 0
    };

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        localStorage.setItem("eco_result", JSON.stringify(result));
        updateUI(result);
    });
}

function updateUI(result) {

    const total = result.carbon.total_co2 + result.water;

    document.getElementById("co2").innerText = result.carbon.total_co2 + " kg";
    document.getElementById("water").innerText = result.water + " L";
    document.getElementById("total").innerText = total.toFixed(2);

    let level = document.getElementById("impactLevel");

    if (total < 50) level.innerText = "🟢 Low Impact";
    else if (total < 120) level.innerText = "🟡 Medium Impact";
    else level.innerText = "🔴 High Impact";

    let list = document.getElementById("suggestions");
    list.innerHTML = "";

    result.suggestions.forEach(s => {
        let li = document.createElement("li");
        li.innerText = "🌱 " + s;
        list.appendChild(li);
    });

    const ctx = document.getElementById("chart").getContext("2d");

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Energy", "Transport", "Household"],
            datasets: [{
                data: [
                    result.carbon.energy,
                    result.carbon.transport,
                    result.carbon.household
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function resetForm() {
    if (!confirm("Reset all data?")) return;

    document.querySelectorAll("input").forEach(i => i.value = "");

    document.getElementById("co2").innerText = "0";
    document.getElementById("water").innerText = "0";
    document.getElementById("total").innerText = "0";
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("impactLevel").innerText = "";

    localStorage.removeItem("eco_result");

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
}

function toggleInfoPanel() {
    const modal = document.getElementById("featureModal");
    modal.classList.toggle("show");
}

function closeInfoPanel(event) {
    if (event.target === event.currentTarget) {
        toggleInfoPanel();
    }
}
