import { on } from "events";
import { useState, useCallback } from "react";

const useSpeechRecognition = ({
  onResult,
  onError,
}) => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const handleRecognition = useCallback(() => {
    if (!recognition) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            console.log("Recording started");
          };
          newMediaRecorder.ondataavailable = async e => {
            // eslint-disable-next-line no-undef
            const chunks = [];
            chunks.push(e.data);
            const audioBlob = new Blob(chunks, { type: "audio/wav" });
            const audioFile = new File([audioBlob], "audio.wav", {
              type: "audio/wav",
            });
            const formData = new FormData();
            formData.append("audio", audioFile, "audio.wav");
            try {
              const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/upload-audio", {
                method: "POST",
                body: formData,
              });
              const data = await response.json();
              if (response.status !== 200) {
                throw new Error(
                  data.error || `Request failed with status ${response.status}`
                );
              }
              onResult(data);
            } catch (error) {
              onError(error.message);
            }
          };
          newMediaRecorder.onstop = () => {
            console.log("Recording stopped");
            setIsListening(false);
          };
          setRecognition(newMediaRecorder);
          newMediaRecorder.start();
          setIsListening(true);
        })
        .catch(err => {
          onError("Error accessing microphone");
        });
    } else {
      if (!isListening) {
        setIsListening(true);
        recognition.start();
      } else {
        recognition.stop();
        setIsListening(false);
      }
    }
  }, [isListening, onError, onResult, recognition]);

  return {
    handleRecognition,
    isListening,
  };
};

export default useSpeechRecognition;