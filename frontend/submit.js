

async function submit() {
    const firstName = document.getElementById("firstname-form").value;
const lastName = document.getElementById("lastname-form").value;
const year = document.getElementById("year-form").value;
    const output = document.getElementById("output-text");
    const endpoint = "http://localhost:3000/search/firstName/"+firstName+"/lastName/"+lastName+"/year/"+year+"/";
    console.log(endpoint);
    fetch(endpoint).then(response => response.json()).then(responseJson => {
        console.log(responseJson);
        output.innerHTML = "" + JSON.stringify(responseJson);
    });
    
}
