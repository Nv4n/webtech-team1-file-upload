(() => {
	const form = document.getElementById("form");
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const returnData = await fetch("http://localhost:5501/upload", {
			body: formData,
			method: "POST",
		}).then((data) => data.json());
		alert(returnData.message);
	});
})();

(() => { 
	const response = document.getElementById("response");
	const form = document.getElementById("form-slow");
	console.log("form is", form);
	
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
	
		const responseData = await fetch("http://localhost:5501/upload-slow", {
			method: "POST",
			body: formData,
		});
		const data = await responseData.json();
	
		alert(data.message);
	});
})();

(() => {
	const outputList = document.getElementById("xhr-output");
	const btnStart = document.getElementById("btn-xhr-start");
	const btnReset = document.getElementById("btn-xhr-reset");

	let lastLength = 0;

	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 3) {
				const newData = xhr.responseText.slice(lastLength);
				lastLength = xhr.responseText.length;
				const item = document.createElement("li");
				item.innerText = `Chunk received: ${newData}`;
				outputList.appendChild(item);
			}
		};
	};
	btnStart.addEventListener("click", () => {
		XHRStartStreaming(xhr);
	});
	btnReset.addEventListener("click", () => {
		XHRResetStreaming(xhr, outputList);
	});
})();

/**
 *
 * @param {XMLHttpRequest} xhr
 */
function XHRStartStreaming(xhr) {
	xhr.open("GET", "http://localhost:5501/xhr-stream", true);

	xhr.send();
}

/**
 *
 * @param {XMLHttpRequest} xhr
 * @param {HTMLUListElement} outputList
 */
function XHRResetStreaming(xhr, outputList) {
	xhr.abort();
	outputList.replaceChildren();
}
