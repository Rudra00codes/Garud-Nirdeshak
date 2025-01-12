# app.py
from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

class VideoProcessor:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        self.model = YOLO('yolov8n.pt')
        self.current_mode = 'default'
        
    def apply_night_vision_effect(self, frame):
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        equalized_frame = cv2.equalizeHist(gray_frame)
        color_frame = cv2.cvtColor(equalized_frame, cv2.COLOR_GRAY2BGR)
        night_vision_frame = np.zeros_like(color_frame)
        night_vision_frame[:, :, 1] = color_frame[:, :, 0]
        return night_vision_frame

    def apply_thermal_effect(self, frame):
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        return cv2.applyColorMap(gray_frame, cv2.COLORMAP_JET)

    def apply_grayscale_effect(self, frame):
        return cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    def apply_infrared_effect(self, frame):
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        return cv2.applyColorMap(gray_frame, cv2.COLORMAP_BONE)

    def process_frame(self):
        while True:
            ret, frame = self.cap.read()
            if not ret:
                continue

            if self.current_mode == 'default':
                display_frame = frame
            elif self.current_mode == 'grayscale':
                gray_frame = self.apply_grayscale_effect(frame)
                gray_frame_rgb = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)
                results = self.model(gray_frame_rgb)
                display_frame = results[0].plot()
            elif self.current_mode == 'night_vision':
                night_vision_frame = self.apply_night_vision_effect(frame)
                results = self.model(night_vision_frame)
                display_frame = results[0].plot()
            elif self.current_mode == 'thermal':
                thermal_frame = self.apply_thermal_effect(frame)
                results = self.model(thermal_frame)
                display_frame = results[0].plot()
            elif self.current_mode == 'infrared':
                infrared_frame = self.apply_infrared_effect(frame)
                results = self.model(infrared_frame)
                display_frame = results[0].plot()

            # Encode the frame for streaming
            ret, buffer = cv2.imencode('.jpg', display_frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

video_processor = VideoProcessor()

@app.route('/video_feed')
def video_feed():
    return Response(video_processor.process_frame(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/change_mode/<mode>', methods=['POST'])
def change_mode(mode):
    video_processor.current_mode = mode
    return jsonify({'status': 'success', 'mode': mode})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)