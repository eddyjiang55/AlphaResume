import WaveSurfer from "wavesurfer.js";
import { useState, useRef, useEffect } from "react";

const audioSegment = ({ sender, audioId }) => {
  const [play, setPlay] = useState(false);
  const wavesurferRef = useRef(null);
  const waveformContainerRef = useRef(null);

  useEffect(() => {
    if (waveformContainerRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: "#1d80a7",
        progressColor: "#a8ddf5",
        height: 40,
        width: 200,
      });

      // Fetch and load the audio
      const fetchAndLoadAudio = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/get-audio/${audioId}`
          );
          if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          const audioBlob = await response.blob();
          wavesurferRef.current.loadBlob(audioBlob);
        } catch (error) {
          console.error("Error fetching audio:", error);
        }
      };

      fetchAndLoadAudio();
    }

    // Cleanup Wavesurfer instance on unmount
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioId]);

  const handlePlay = () => {
    if (wavesurferRef.current) {
      if (play) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setPlay(!play);
    }
  };

  return (
    <div className="flex justify-end">
      <div className="relative max-w-[864px] w-full p-3 rounded-lg border border-solid border-[#1D80A7] my-2 bg-white">
        <div className="flex flex-row justify-center items-center gap-x-4">
          <button
            onClick={handlePlay}
            className="bg-alpha-blue text-white p-2 rounded-full"
          >
            {play ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-player-pause-filled w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
                  stroke-width="0"
                  fill="currentColor"
                />
                <path
                  d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
                  stroke-width="0"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-player-play-filled w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
                  stroke-width="0"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <div
            ref={waveformContainerRef}
            id={"audio-" + audioId}
            className="w-full"
          />
        </div>
        <div className="absolute w-3 h-3 bg-white right-0 top-[40%] -mr-[7px] rotate-45 border-t border-r border-[#1D80A7]"></div>
      </div>
    </div>
  );
};

export default audioSegment;
