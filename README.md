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




