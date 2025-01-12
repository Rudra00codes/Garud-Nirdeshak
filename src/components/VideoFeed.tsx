import React, { useEffect, useRef, useState } from 'react';

interface Mode {
    id: string;
    name: string;
}

const VideoFeed: React.FC = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [currentMode, setCurrentMode] = useState<string>('default');
    const [isStreaming, setIsStreaming] = useState(false);

    const modes: Mode[] = [
        { id: 'default', name: 'Normal' },
        { id: 'grayscale', name: 'Grayscale' },
        { id: 'night_vision', name: 'Night Vision' },
        { id: 'thermal', name: 'Thermal' },
        { id: 'infrared', name: 'Infrared' }
    ];

    useEffect(() => {
        if (isStreaming && imageRef.current) {
            // Add timestamp to prevent caching
            imageRef.current.src = `http://localhost:5000/video_feed?t=${new Date().getTime()}`;
        }
    }, [isStreaming]);

    const changeMode = async (modeId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/change_mode/${modeId}`, {
                method: 'POST'
            });
            if (response.ok) {
                setCurrentMode(modeId);
            }
        } catch (error) {
            console.error('Error changing mode:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="mb-4 flex flex-wrap gap-2">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => changeMode(mode.id)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                            currentMode === mode.id 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {mode.name}
                    </button>
                ))}
            </div>
            <div className="relative">
                <img 
                    ref={imageRef}
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    alt="Video Feed"
                    style={{ display: isStreaming ? 'block' : 'none' }}
                />
                <button
                    onClick={() => setIsStreaming(!isStreaming)}
                    className={`absolute top-2 right-2 px-4 py-2 rounded-md ${
                        isStreaming 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white transition-colors`}
                >
                    {isStreaming ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default VideoFeed;