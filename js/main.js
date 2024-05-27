// select elements
var websiteName = document.getElementById("name");
var websiteUrl = document.getElementById("url");
var allData;
if (localStorage.getItem("allData") != null) {
  allData = JSON.parse(localStorage.getItem("allData"));
  console.log(allData);
  displayData();
} else {
  allData = [];
}

// get values
function getValues() {
  if (validateUrl() == true && websiteName.value != "") {
    var websiteData = {
      name: websiteName.value,
      url: websiteUrl.value,
    };
    validateUrl();
    allData.push(websiteData);
    localStorage.setItem("allData", JSON.stringify(allData));
    displayData();
    console.log(allData);
    console.log(websiteData);
    clearData();
  } else {
    Swal.fire({
      title: "Invalid Data",
      text: `${websiteName.value == "" ? "'please enter site name'" : ""} ${
        validateUrl() == true ? "" : "'please enter site url'"
      }`,
      icon: "error",
    });
  }
}

// clear data
function clearData() {
  websiteName.value = "";
  websiteUrl.value = "";
}

// display data
function displayData() {
  document.getElementById("demo").innerHTML = "";
  for (var i = 0; i < allData.length; i++) {
    document.getElementById("demo").innerHTML += ` 
    <tr>
    <td>${i + 1}</td>
    <td>${allData[i].name}</td>
    <td><a href="${
      allData[i].url
    }" target="_blank"><button class="btn btn-info text-white"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
    <td><button onclick="deleteData(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
   </tr>
`;
  }
}

// delete data
function deleteData(index) {
  console.log("delte");
  allData.splice(index, 1);
  localStorage.setItem("allData", JSON.stringify(allData));
  console.log(allData);
  displayData();
}

// validate url
function validateUrl() {
  var pattern =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  return pattern.test(websiteUrl.value);
}
