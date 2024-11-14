// NOTE: Currently having issues with audio files being too small for 
// the speech-to-text API to transcribe. Need to investigate further.
// Likely an issue with how audio chunks are being sent to the API, as
// original intent was to process audio in real-time, however had to
// be adjusted to utilize S3 storage for audio files, which are then
// sent to the API for transcription.

// TODO: Invstigate issue with audio files being too small for API to transcribe

document.getElementById('start').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            const audioChunks = [];

            document.getElementById('stop').disabled = false;

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    const base64AudioMessage = reader.result.split(',')[1];
                
                    try {
                        const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ message: base64AudioMessage })
                        });
                
                        if (!response.ok) {
                            throw new Error(`Error in fetch request: ${response.statusText}`);
                        }
                
                        const data = await response.json();

                        if (data && data.transcript) {
                            document.getElementById('textOutput').textContent = data.transcript;
                        } else {
                            document.getElementById('textOutput').textContent = "No transcription available";
                        }
                
                    } catch (error) {
                        console.error("Error in fetch request:", error);
                        document.getElementById('textOutput').textContent = "Failed to get transcription";
                    }
                };
            });

            document.getElementById('stop').addEventListener('click', () => {
                mediaRecorder.stop();
                document.getElementById('stop').disabled = true;
            });
        })
        .catch(error => {
            console.error("Error accessing media devices.", error);
        });
});
