// src/components/VideoFeed.tsx
import React, { useEffect, useRef } from 'react';

const VideoFeed: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const signalingServerRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // Create a new RTCPeerConnection
                    peerConnectionRef.current = new RTCPeerConnection();

                    // Add the video track to the peer connection
                    stream.getTracks().forEach((track) => {
                        peerConnectionRef.current?.addTrack(track, stream);
                    });

                    // Handle incoming ICE candidates
                    peerConnectionRef.current.onicecandidate = (event) => {
                        if (event.candidate && signalingServerRef.current) {
                            signalingServerRef.current.send(JSON.stringify({ candidate: event.candidate }));
                        }
                    };

                    // Handle remote stream
                    peerConnectionRef.current.ontrack = (event) => {
                        const remoteVideo = document.createElement('video');
                        remoteVideo.srcObject = event.streams[0];
                        remoteVideo.autoplay = true;
                        document.body.appendChild(remoteVideo);
                    };
                }
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        startVideo();

        // Set up signaling server connection
        signalingServerRef.current = new WebSocket('ws://localhost:3000');
        signalingServerRef.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            if (data.offer) {
                // Handle incoming offer
                if (peerConnectionRef.current) {
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                    const answer = await peerConnectionRef.current.createAnswer();
                    await peerConnectionRef.current.setLocalDescription(answer);
                    signalingServerRef.current?.send(JSON.stringify({ answer }));
                }
            } else if (data.answer) {
                // Handle incoming answer
                await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if (data.candidate) {
                // Handle incoming ICE candidate
                await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        };
    }, []);

    return <video ref={videoRef} autoPlay playsInline />;
};

export default VideoFeed;