let BASE_URL = 'http://localhost:3000';
const btn = document.querySelector("#submitbtn");
let tableDiv = document.getElementById('tableData');
btn.addEventListener('click', (e) => {
	let id = document.querySelector("#id");
	let firstname = document.querySelector("#firstname");
	let lastname = document.querySelector("#lastname");
	let age = document.querySelector("#age");
	let dob = document.querySelector("#dob");
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



function searchRecord() {
	const searchValue=document.getElementById("search").value;

	console.log(searchValue);
    // Use the fetch method to send a GET request to the server
    fetch(`${BASE_URL}/search?searchTerm=${encodeURIComponent(searchValue)}`,{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
        .then(response => response.json())
        .then(data => {
            // Do something with the data
			if(data.length>0){
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
            console.log(data);
	}else{
		let html = '';
			html += `No similar record`;
			tableDiv.innerHTML = html;
	}
        })
        .catch(error => {
            console.error(error);
        });
}

function deleteSearchTerm() {
    const searchValue=document.getElementById("search").value;

    // Use the fetch method to send a DELETE request to the server
    fetch(`${BASE_URL}/delete?searchTerm=${searchValue}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.status === 200) {
            console.log("Search term deleted successfully!");
			let html = '';
			html += `Search term deleted successfully!`;
			tableDiv.innerHTML = html;
	
        } else {
            console.log("Error deleting search term: ", response.status);
        }
    })
    .catch(error => {
        console.error(error);
    });
}
getDataAndShowInTable();
