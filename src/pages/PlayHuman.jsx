import CameraPlaceholder from "../components/CameraPlaceholder";
import Footer from "../components/Footer";
import Countdown from '../components/Countdown';

export default function PlayHuman() {
  return (
    <div class='flex flex-col min-h-screen items-center overflow-hidden font-mono'>

      <Countdown />

      <div class='flex grow gap-48 items-center'>
        <CameraPlaceholder />
        <CameraPlaceholder />
      </div>

      <Footer />
    </div>
  );
}