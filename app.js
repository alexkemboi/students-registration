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
    console.log(err);
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
  searchValue = searchInput.value;
  console.log(searchValue);
  let obj = {};
  let key = "lastname";

  // Use the fetch method to send a GET request to the server
  fetch(`${BASE_URL}/search?searchTerm=${encodeURIComponent(searchValue)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Do something with the data
      console.log(data);
      if (data && data.length > 0) {
        // do something with the data
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
        //populate form inputs with data
        if (data && data.length > 0) {
          // do something with the data
          id.value = data[0].id;
          firstname.value = data[0].firstname;
          lastname.value = data[0].lastname;
          age.value = data[0].age;
          dob.value = data[0].dob;
          countries.value = data[0].countries;
          gender.value = data[0].gender;
        }
      } else {
        id.value = "";
        firstname.value = "";
        lastname.value = "";
        age.value = "";
        dob.value = "";
        countries.value = "";
        gender.value = "";
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

getDataAndShowInTable();
