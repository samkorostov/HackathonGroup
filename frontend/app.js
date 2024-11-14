document.getElementById('start').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            const audioChunks = [];  // Store all the audio chunks

            // Enable the stop button as soon as recording starts
            document.getElementById('stop').disabled = false;

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);  // Push each chunk into the array
            });

            // When the recording stops, process the entire audio file
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); // Create one large audio Blob from the chunks
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);  // Convert the audio Blob to Base64
                reader.onloadend = async () => {
                    const base64AudioMessage = reader.result.split(',')[1];
                
                    try {
                        const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ message: base64AudioMessage })  // Send the Base64 audio
                        });
                
                        // Check if the HTTP response is OK (status in the range 200-299)
                        if (!response.ok) {
                            throw new Error(`Error in fetch request: ${response.statusText}`);
                        }
                
                        // Parse the response JSON if response was OK
                        const data = await response.json();
                
                        // Display the transcription result
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

            // Stop the recording when the stop button is clicked
            document.getElementById('stop').addEventListener('click', () => {
                mediaRecorder.stop();  // Stop the recording
                document.getElementById('stop').disabled = true;  // Disable the stop button again
            });
        })
        .catch(error => {
            console.error("Error accessing media devices.", error);
        });
});
