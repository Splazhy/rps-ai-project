import { onCleanup, onMount } from 'solid-js';
import { createSignal } from 'solid-js';
import './CameraFeed.css'; // Import the CSS file

export default function CameraFeed() {
  const [videoStream, setVideoStream] = createSignal<MediaStream | null>(null);
  let videoRef: HTMLVideoElement | undefined;

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

  return (
    <div class="camera-feed-container">
      <video ref={videoRef} autoplay playsinline class="responsive-video"></video>
    </div>
  );
}
