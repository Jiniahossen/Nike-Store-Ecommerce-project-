import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Search = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    const startListeningHandler = () => {
        SpeechRecognition.startListening();
    };

    const stopListeningHandler = () => {
        SpeechRecognition.stopListening();
    };

    return (
        <div>
            <p>Transcript: {transcript}</p>
            <p>Listening: {listening ? 'Yes' : 'No'}</p>
            <button onClick={startListeningHandler}>Start Listening</button>
            <button onClick={stopListeningHandler}>Stop Listening</button>
            <button onClick={resetTranscript}>Reset Transcript</button>
        </div>
    );
};


export default Search;
