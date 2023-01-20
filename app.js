const btn = document.querySelector("#submitbtn");
let id = document.querySelector("#id");
let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let age = document.querySelector("#age");
let dob = document.querySelector("#dob");
let tableDiv = document.getElementById('tableData');

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
			alert('Data inserted successfully');
			console.log({status: "success", data: JSON.stringify(data)});
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
			html += `<tr>
			<td>${item.id}</td>
			<td>${item.firstname}</td>
			<td>${item.lastname}</td>
			<td>${item.age}</td>
			<td>${item.dob}</td>
			</tr>	`
		})		
		tableDiv.innerHTML = html;
	})

}

getDataAndShowInTable();
