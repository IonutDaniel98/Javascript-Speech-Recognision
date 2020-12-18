window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end");

let p = document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result", (e) => {
	const transcript = Array.from(e.results)
	.map(result => result[0])
	.map(result => result.transcript)
	.join("");

	if (transcript.startsWith("Gideon")) {
		p.textContent = transcript;
		if (e.results[0].isFinal) {
			p = document.createElement("p");
			p.textContent = transcript;
			transcript_element.appendChild(p);
			p.textContent = "";
		}
	}
});

recognition.addEventListener("end", recognition.start);

recognition.start();