const btn = document.querySelector("#submitbtn");
let id = document.querySelector("#id");
let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let age = document.querySelector("#age");
let dob = document.querySelector("#dob");
let tableDiv = document.querySelector('#students');

let BASE_URL = 'http://localhost:3000';

btn.addEventListener('click', (e) => {
	e.preventDefault();
	let data = {
		id: id.value,
		firstname: firstname.value,
		lastname: lastname.value,
		age: age.value,
		dob: dob.value,
	};

	postData(data);


})


function postData(data){
	try {
		fetch(`${BASE_URL}`, {
			method:'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {
			console.log({status: "success", data: JSON.stringify(data)})
			getDataAndShowInTable()
		})
	} catch (err) {
		console.log(err)
	}

	
}


function getDataAndShowInTable(){
	let result = fetch(`${BASE_URL}`).then(res => res.json()).then(data => {
		let html = '';
		data.forEach(item => {
			html += `
			<tr>
			<td>${item.id}</td>
			<td>${item.firstname}</td>
			<td>${item.lastname}</td>
			<td>${item.age}</td>
			<td>${item.dob}</td>
			</tr>
			`

		})
		
		tableDiv.innerHTML = html;
	})

}

getDataAndShowInTable();

// api url
// const api_url ="http://localhost:3000/select";
// btn.addEventListener("click",(e)=>{
// 	e.preventDefault();
//     console.log(username);
//     getapi(api_url);
// });



// // Defining async function
// async function getapi(api_url) {	
// 	// Storing response
// 	const response = await fetch(api_url);
// 	// Storing data in form of JSON
// 	var data = await response.json();
// 	console.log(data);
// 	if (!response) {
// 		hideloader();
// 	}
// 	show(data);
// }

// // Function to define innerHTML for HTML table
// function show(data) {
// 	let tab =
// 		`<tr>
// 		<th>id</th>
// 		<th>firstname</th>
// 		<th>secondname</th>
// 		<th>age</th>
//         <th>dob</th>
// 		</tr>`;
	
// 	// Loop to access all rows
// 	for (let r of data.list) {
// 		tab += `<tr>
// 	<td>${r.id} </td>
// 	<td>${r.firstname}</td>
// 	<td>${r.secondname}</td>
// 	<td>${r.age}</td>
//     <td>${r.dob}</td>d		
//     </tr>`;
// 	}
// 	// Setting innerHTML as tab variable
// 	document.getElementById("students").innerHTML = tab;
// }
