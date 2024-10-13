# The Sweestest DubHacks Group
### Eli Haas, Luca Cero

## Roadmap:

# index.html documentation
# Live Audio Stream to Text

This HTML page provides a simple user interface to record live audio and transcribe it into text. It uses buttons to start and stop the recording, and displays the resulting transcription on the webpage.

## Code Structure

### HTML Document Structure

- **DOCTYPE Declaration**: Declares that the document is an HTML5 document.
- **`<html lang="en">`**: Defines the language of the webpage as English.
- **`<head>` Section**:
  - **`<meta charset="UTF-8">`**: Specifies the character encoding for the document (UTF-8).
  - **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Ensures the page is responsive by scaling the layout for different devices.
  - **`<title>`**: Sets the title of the webpage as "Live Audio Stream to Text."
  - **`<link rel="stylesheet" href="styles.css">`**: Links to an external CSS file (`styles.css`) for styling the webpage.

### Body Content

- **Container Div**: A `div` element with a class `container` that groups the buttons and output section.
  - **Start Recording Button**: A button with `id="start"` that triggers the start of the audio recording process.
  - **Stop Recording Button**: A button with `id="stop"` that stops the recording process. It is initially disabled.
  - **Text Output Div**: A `div` with `id="textOutput"` where the transcribed text will appear after processing.

### JavaScript Integration

- **`<script src="app.js">`**: Links to an external JavaScript file (`app.js`) that contains the logic for handling the audio recording and transcription functionality.

## Elements Summary

- **Start Recording Button**: Activates the audio recording feature.
  - **`<button id="start">Start Recording</button>`**
- **Stop Recording Button**: Stops the audio recording and triggers text processing.
  - **`<button id="stop" disabled>Stop Recording</button>`**
- **Text Output**: Displays the transcription result.
  - **`<div id="textOutput">Text will appear here after processing...</div>`**

## External Resources

- **`styles.css`**: This external stylesheet controls the visual layout and styling of the buttons and text output container.
- **`app.js`**: This external JavaScript file will contain the logic to:
  - Capture audio input.
  - Process and convert the audio into text.
  - Display the transcribed text in the `textOutput` div.


# CSS Styling Documentation

This CSS file defines the styling for a web page with a modern, clean, and centered layout. The page includes buttons, titles, and an output section for displaying transcribed text.

```css
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
    box-sizing: border-box;
}

body, html {
    height: 100%;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f4f8;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app-container {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
    margin: auto;
}

#title {
    font-size: 42px;
    color: #4A90E2;
    margin-bottom: 10px;
    font-weight: 700;
}

.subtitle {
    font-size: 20px;
    color: #555;
    margin-bottom: 40px;
}

.controls {
    margin-bottom: 30px;
}

button {
    padding: 15px 25px;
    font-size: 18px;
    margin: 10px;
    cursor: pointer;
    background-color: #4A90E2;
    color: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #357ABD;
    transform: scale(1.05);
}

button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
}

#textOutput {
    margin-top: 30px;
    padding: 30px;
    border-radius: 12px;
    border: 1px solid #e1e4e8;
    background-color: #f9fafb;
    font-size: 18px;
    min-height: 150px;
    color: #333;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

#textOutput:empty::before {
    content: "Your transcription will appear here...";
    color: #999;
    font-style: italic;
}


