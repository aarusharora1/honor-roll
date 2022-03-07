function Reset(ref) {
  ref.innerHTML = "";
}

function handleJSON(response) {
  //console.log(response);
  const output = document.getElementById("output-text");

  output.innerHTML = "Found Query";

  const tableREF = document.getElementById("output-table");
  Reset(tableREF);
  //console.log(JSON.stringify(response["Status"]));
  Object.keys(response["Status"]).forEach((key) => {
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
  const endpoint =
    "http://honor-roll.herokuapp.com/search/firstName/" +
    firstName +
    "/lastName/" +
    lastName +
    "/year/" +
    year +
    "/";
  const endpoint2 =
    "https://oroou9dk5i.execute-api.us-east-1.amazonaws.com/honorRoll?fName=" +
    firstName +
    "&lName=" +
    lastName +
    "&year=" +
    year;

  //console.log(endpoint);
  output.innerHTML = "Loading...";
  fetch(endpoint2).then((response) => {
    if (response.status == 200) {
      response
        .json()
        .then((responseJson) => {
          handleJSON(responseJson);
        })
        .catch((err) => {
          //console.log("Fetch failed" + err);
          output.innerHTML =
            "Fetch Failed. Please check spelling. Error Code:" + err;
        });
    } else {
      output.innerHTML = "Error";
      Reset(document.getElementById("output-table"));
    }
  });
}

function penis() {
  console.log("PENIS:");
}