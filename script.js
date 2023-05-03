function getIOTD() {
	var url = "https://api.nasa.gov/planetary/apod?api_key=" + nasa_api_key;
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			var status = request.status;
			if (status === 0 || (status >= 200 && status < 400)) {
				var response = JSON.parse(request.responseText);
				updatePage(response);
			}
		}
	};
	request.send();
}
let infoContainer = document.getElementById("info-cont");

let image = document.getElementById("image");
let iframe = document.getElementById("iframe");

let date = document.getElementById("date");
let title = document.getElementById("title");
let description = document.getElementById("description");
let copyright = document.getElementById("copy");

let hideButton = document.getElementById("hide_btn");
let showButton = document.getElementById("show_btn");

function hideInfo() {
	infoContainer.style.display = "none";
	showButton.style.display = "block";
}
function showInfo() {
	infoContainer.style.display = "flex";
	showButton.style.display = "none";
}

function updatePage(response) {
	if (response.media_type === "image") {
		image.src = response.hdurl || response.url;
		image.style.display = "block";
		iframe.style.display = "none";
	} else {
		image.style.display = "none";
		iframe.style.display = "iframe";
	}

	copyright.innerText = response.copyright || "Public Domain Image";

	date.innerText = response.date || "";
	title.innerText = response.title || "";
	description.innerText = response.explanation || "";
}
getIOTD();
