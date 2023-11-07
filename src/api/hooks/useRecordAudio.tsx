import { useState } from 'react';

export default function useRecordAudio() {
    const [isRecording, setIsRecording] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [result, setResult] = useState<Blob | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [newRecorder, setNewRecorder] = useState<MediaRecorder | null>(null);

    const clearState = ()=>{
        setIsRecording(false);
        setRecordedChunks([]);
        setResult(null);
        setRecordingTime(0);
        setTimerInterval(null);
        setStream(null)
    }

    const startRecording = async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
            const speakerStream = await (navigator as any).mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            const audioContext = new (window as any).AudioContext();
            const micSource = audioContext.createMediaStreamSource(audioStream);
            const speakerSource = audioContext.createMediaStreamSource(speakerStream);

            const destination = audioContext.createMediaStreamDestination();
            micSource.connect(destination);
            speakerSource.connect(destination);

            setIsRecording(true);
            setStream(destination.stream);

            const mimeTypes = ["audio/mp4", "audio/webm"].filter((type) =>
                MediaRecorder.isTypeSupported(type)
            );

            if (mimeTypes.length === 0) {
                return alert("Browser not supported");
            }

            setTimerInterval(
                setInterval(() => {
                    if(recordingTime > 3){
                        setTimerInterval(null);
                        stopRecording();
                        return;
                    }
                    setRecordingTime((t) => t + 1);
                }, 1000)
            );

            let recorder = new MediaRecorder(destination.stream, {mimeType: mimeTypes[0]});
            setNewRecorder(recorder)
            recorder.addEventListener("dataavailable", async (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks(prev => {
                        return [...prev, event.data] // Сохраните чанк данных
                    })
                }
            });
            recorder.start(1000);

        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    const stopRecording = () => {
        if (recordingTime <= 1) {
            clearState()
            return;
        }

        newRecorder?.stop();
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }


        setIsRecording(false);
        clearInterval(timerInterval!);

        if (recordedChunks.length > 0) {
            const resultBlob = new Blob(recordedChunks, {type: recordedChunks[0].type});
            setResult(resultBlob);
        }
        setRecordedChunks([])
    };

    return {
        isRecording,
        startRecording,
        stopRecording,
        result,
        recordingTime,
        clearState
    }
};
