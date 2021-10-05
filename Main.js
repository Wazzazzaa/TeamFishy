const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
      {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
}

const holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  }});
holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
holistic.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({image: videoElement});
  },
  width: 320,
  height: 180
});
camera.start();