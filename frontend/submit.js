

function handleJSON(response) {
    //console.log(response);
    const output = document.getElementById("output-text");

    output.innerHTML = "Found Query";
    if (!response["Status"]) {
        return;
    }
    const tableREF = document.getElementById("output-table");
    tableREF.innerHTML = "";
    //console.log(JSON.stringify(response["Status"]));
    Object.keys(response["Status"]).forEach(key => {
        let newRow = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        cell1.innerText = key;
        cell2.innerText = response["Status"][key];
        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        tableREF.append(newRow);
    });
    
}


async function submit() {
    const firstName = document.getElementById("firstname-form").value;
    const lastName = document.getElementById("lastname-form").value;
    const year = document.getElementById("year-form").value;
    const output = document.getElementById("output-text");
    const endpoint = "http://localhost:3000/search/firstName/"+firstName+"/lastName/"+lastName+"/year/"+year+"/";
    //console.log(endpoint);
    fetch(endpoint).then(response => response.json()).then(responseJson => {
        //console.log(responseJson);
        handleJSON(responseJson);
    }).catch((err) => {
        //console.log("Fetch failed" + err);
        output.innerHTML = "Fetch Failed. Please check spelling. ";
    });
    
}
