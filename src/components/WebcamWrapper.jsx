import { Webcam, getScreenshot } from 'solid-webcam';

export default function WebcamWrapper() {
  let webcamRef

  const capture = () => {
    const imageSrc = getScreenshot(webcamRef);
    console.log(imageSrc);
  };

  return (
    <>
      <Webcam audio={false} width={300} height={300} ref={webcamRef} />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
