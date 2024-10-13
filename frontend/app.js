document.getElementById('start').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64AudioMessage = reader.result.split(',')[1];
                    fetch('https://4fp3lzf207.execute-api.us-west-2.amazonaws.com/dev/stream', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: base64AudioMessage })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.transcript) {
                            document.getElementById('textOutput').textContent = data.transcript;
                        } else {
                            document.getElementById('textOutput').textContent = "No transcription available";
                        }
                    })
                    .catch(error => {
                        console.error("Error in fetch request:", error);
                        document.getElementById('textOutput').textContent = "Failed to get transcription";
                    });
                };
            });

            document.getElementById('stop').disabled = false;
            document.getElementById('stop').addEventListener('click', () => {
                mediaRecorder.stop();
                document.getElementById('stop').disabled = true;
            });
        });
});
