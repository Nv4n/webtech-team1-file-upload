(async () => {
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
	const btnStart = document.getElementById("btn-xhr-start");
	const btnReset = document.getElementById("btn-xhr-reset");
	btnReset.addEventListener("click", () => {});
	btnStart.addEventListener("click", () => {});
})();

function XHRStreaming() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/streaming-endpoint", true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 3) {
			console.log("Chunk received:", xhr.responseText);
		}
	};
	xhr.send();
}
