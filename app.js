let BASE_URL = "http://localhost:3000";
const btn = document.querySelector("#submitbtn");
let tableDiv = document.getElementById("tableData");
let formMessage = document.getElementById("formMessage");
let id = document.querySelector("#id");
let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let age = document.querySelector("#age");
let dob = document.querySelector("#dob");
let countries = document.querySelector("#countries");
let gender = document.querySelector("#gender");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    id: id.value,
    firstname: firstname.value,
    lastname: lastname.value,
    age: age.value,
    dob: dob.value,
    countries: countries.value,
    gender: gender.value,
  };

  postData(data);
});

function postData(data) {
  console.log(data);
  try {
    fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        html += `<p class="text-success">Data inserted successfully!</p>`;
        formMessage.innerHTML = html;
        console.log({ status: "success", data: JSON.stringify(data) });
        getDataAndShowInTable();
      });
  } catch (err) {
    if (err.message === "Conflict") {
      console.log("Duplicate Error: " + err);
      let html = "";
      html += `<p class="text-danger">Duplicate date found!</p>`;
    } else {
      console.log("Error: " + err);
    }
  }
}

function getDataAndShowInTable() {
  let result = fetch(`${BASE_URL}`)
    .then((res) => res.json())
    .then((data) => {
      let currentPage = 1;
      let pageSize = 5;

      function displayPage(data, pageNumber, pageSize) {
        let startIndex = (pageNumber - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let currentData = data.slice(startIndex, endIndex);

        let html = "";
        currentData.forEach((item) => {
          html += `<tr>
			<td>${item.id}</td>
			<td>${item.firstname}</td>
			<td>${item.lastname}</td>
			<td>${item.age}</td>
			<td>${item.dob}</td>
			<td>${item.countries}</td>			
			<td>${item.gender}</td>
			</tr>	`;
        });
        // insert the generated html into the appropriate element
        tableDiv.innerHTML = html;

        let totalPages = Math.ceil(data.length / pageSize);
        for (let i = 1; i <= totalPages; i++) {
          let button = document.createElement("button");
          button.classList.add("btn-dark");
          button.innerHTML = i;
          button.addEventListener("click", () => {
            currentPage = i;
            displayPage(data, currentPage, pageSize);
          });
          tableDiv.appendChild(button);
        }
      }

      displayPage(data, currentPage, pageSize);
    });
}

function searchRecord() {
  const searchInput = document.getElementById("search");
  const searchTerm = searchInput.value;
  console.log(searchTerm);

  // Use the fetch method to send a GET request to the server
  fetch(`${BASE_URL}/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data);
      if (data && data.length > 0) {
        // populate the table data
        let html = "";
        data.forEach((item) => {
          html += `<tr>
			<td>${item.id}</td>
			<td>${item.firstname}</td>
			<td>${item.lastname}</td>
			<td>${item.age}</td>
			<td>${item.dob}</td>
			<td>${item.countries}</td>			
			<td>${item.gender}</td>
			</tr>	`;
        });

        tableDiv.innerHTML = html;
      } else {
        console.log("No results found");
        let html = "";
        html += `<p class="text-danger text-centre">No  record found</p>`;
        tableDiv.innerHTML = html;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//fetch data values from database and append on the select
const selectedStudent = document.getElementById("selectedValue");
fetch(`${BASE_URL}`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((id) => {
      const option = document.createElement("option");
      option.value = id.id;
      option.innerHTML = id.id;
      option.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedOption = option.value;
        getDataAndpopulateForm(selectedOption);
      });
      selectedStudent.appendChild(option);
    });
  });

//populate data values on the form controls
function getDataAndpopulateForm(searchTerm) {
  console.log(searchTerm);
  // Use the fetch method to send a GET request to the server
  fetch(`${BASE_URL}/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //populate form inputs with data
      id.value = data[0].id;
      firstname.value = data[0].firstname;
      lastname.value = data[0].lastname;
      age.value = data[0].age;
      dob.value = data[0].dob;
      countries.value = data[0].countries;
      gender.value = data[0].gender;
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteSearchTerm() {
  const searchValue = document.getElementById("search").value;
  // Use the fetch method to send a DELETE request to the server
  fetch(`${BASE_URL}/delete?searchTerm=${searchValue}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Search term deleted successfully!");
        let html = "";
        html += `<p class="text-success">Search term deleted successfully!</p>`;
        tableDiv.innerHTML = html;
      } else {
        console.log("Error deleting search term: ", response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//fetch data values from API and append on the countries
const selectElement = document.getElementById("countries");
fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.innerHTML = country.name;
      selectElement.appendChild(option);
    });
  });

function updateRecord() {
  let updateData = {
    id: id.value,
    firstname: firstname.value,
    lastname: lastname.value,
    age: age.value,
    dob: dob.value,
    countries: countries.value,
    gender: gender.value,
  };
  try {
    fetch(`${BASE_URL}/update`, {
      method: "POST",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updateData) => {
        let html = "";
        html += `<p class="text-success">Data updated successfully!</p>`;
        formMessage.innerHTML = html;
        console.log({ status: "success", data: JSON.stringify(updateData) });
        getDataAndShowInTable();
      });
  } catch (err) {
    console.log(err);
  }
}

function signUp() {
  //get values from the form controls
  const signUpFirstname = document.getElementById("signUpFirstname");
  const signUpLastname = document.getElementById("signUpSecondname");
  const signUpEmail = document.getElementById("signUpEmail");
  const signUpPassword = document.getElementById("signUpPassword");
  const signUpUsername = document.getElementById("signUpUsername");
  const signUpConfirmPassword = document.getElementById(
    "signUpConfirmPassword"
  );
  const signUpData = {
    signUpFirstname: signUpFirstname.value,
    signUpLastname: signUpLastname.value,
    signUpEmail: signUpEmail.value,
    signUpUsername: signUpUsername.value,
    signUpPassword: signUpPassword.value,
  };
  if (signUpPassword.value == signUpConfirmPassword.value) {
    console.log(signUpData);
    try {
      fetch(`${BASE_URL}/signUp`, {
        method: "POST",
        body: JSON.stringify(signUpData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert("User sign up successful");
        });
    } catch (err) {
      console.log("Error:" + err);
    }
  } else {
    alert("Passwords do not match");
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    fetch(`${BASE_URL}/login?username=${encodeURIComponent(username)}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.length>0){
          if (data[0].username == username) {
            if (data[0].password == password) {
              alert("Log in succefully");
            } else {
              alert("wrong password");
            }
          } else {
            alert("wrong username");
          }

        }else{
          alert("wrong username");

        }
        
      });
  } catch (err) {
    console.log(err);
  }
}

getDataAndShowInTable();
