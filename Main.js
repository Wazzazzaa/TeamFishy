const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  console.log(results.poseLandmarks[1].x);
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      {color: '#56e4ff', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
      {color: '#3364ff', lineWidth: 2});
  /**drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
      {color: '#56e4ff', lineWidth: 1});**/
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
      {color: '#56e4ff', lineWidth: 5});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
      {color: '#3364ff', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
      {color: '#56e4ff', lineWidth: 5});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
      {color: '#3364ff', lineWidth: 2});
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
  width: 100,
  height: 100
});
camera.start();