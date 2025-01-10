// src/components/VideoFeed.tsx
import React, { useEffect, useRef } from 'react';

const VideoFeed: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    // const [useUSBStream, setUseUSBStream] = useState(false); // State to toggle between methods

    useEffect(() => {
        // getUserMedia streaming logic
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    console.log('Using getUserMedia stream');
                }
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        startVideo();
    }, []); // No dependency on useUSBStream

    return (
        <div className="flex flex-col items-center">
            <video ref={videoRef} autoPlay playsInline className="mt-4 border rounded-lg" />
        </div>
    );
};

export default VideoFeed;