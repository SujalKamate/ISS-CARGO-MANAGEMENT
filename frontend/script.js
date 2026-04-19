const BASE_URL = "http://127.0.0.1:8000";

// SEARCH
async function searchItem() {
    let value = document.getElementById("searchInput").value;
    let res = await fetch(`${BASE_URL}/search/${value}`);
    let data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

// SMART SEARCH
async function smartSearch() {
    let value = document.getElementById("smartInput").value;
    let res = await fetch(`${BASE_URL}/smart-search/${value}`);
    let data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

// RETRIEVE
async function retrieveItem() {
    let value = document.getElementById("retrieveInput").value;
    let res = await fetch(`${BASE_URL}/retrieve/${value}`, {
        method: "POST"
    });
    let data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

// WASTE
async function getWaste() {
    let res = await fetch(`${BASE_URL}/waste`);
    let data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}