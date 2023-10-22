
import { ReactMediaRecorder } from "react-media-recorder";


export default function TestPage() {


    return (
        <div className="test-page">
            <div>
                <ReactMediaRecorder
                    audio={true}
                    video={false}
                    onStop={(blobUrl, blob)=>{
                        console.log(blob)
                    }}

                    render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                        <div>
                            <p>{status}</p>
                            <button onClick={startRecording}>Start Recording</button>
                            <button onClick={stopRecording}>Stop Recording</button>
                            <audio src={mediaBlobUrl} controls autoPlay />
                        <a download href={mediaBlobUrl}>DOWNLOAD</a>
                        </div>
                    )}
                />
            </div>
        </div>
    )
};
