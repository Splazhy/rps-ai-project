import { Accessor, createEffect, onCleanup, onMount, Setter } from 'solid-js';
import { createSignal } from 'solid-js';
import './CameraFeed.css'; // Import the CSS file

export default function CameraFeed(props: {
  setDisable: Accessor<boolean>
  captureImage?: Setter<string | undefined>
}) {
  const [videoStream, setVideoStream] = createSignal<MediaStream | null>(null);
  const [imageDataURL, setImageDataURL] = createSignal<string>();
  let videoRef: HTMLVideoElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;

  createEffect(() => {
    if (props.captureImage) {
      props.captureImage(imageDataURL());
    }
  });

  // NOTE: For security, camera must be access within https only,
  //       so this can only be test on localhost and https.
  onMount(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      if (videoRef) {
        videoRef.srcObject = stream;
        videoRef.play();
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  });

  onCleanup(() => {
    if (videoStream()) {
      videoStream()?.getTracks().forEach(track => track.stop());
    }
  });

  const captureImage = () => {
    if (videoRef && canvasRef) {
      const context = canvasRef.getContext("2d");
      if (context) {
        // Set the canvas size to match the video size
        canvasRef.width = videoRef.videoWidth;
        canvasRef.height = videoRef.videoHeight;
        // Draw the current frame of the video onto the canvas
        context.drawImage(videoRef, 0, 0, videoRef.videoWidth, videoRef.videoHeight);
        // Convert the canvas drawing to a Blob
        setImageDataURL(canvasRef.toDataURL()); // You can change the MIME type if needed
      }
    }
  };

  return (
    <div class='text-center'>
      <video ref={videoRef} autoplay playsinline class="responsive-video"></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button onClick={captureImage} class={`btn btn-primary ${(props.setDisable()) ? 'btn-disabled' : ''}`}>Capture</button>
    </div>
  );
}
