import CameraPlaceholder from "../components/CameraPlaceholder";
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import RoundSelect from "../components/RoundSelect";

export default function Ai() {
  return (
    <div class='min-h-screen flex flex-col overflow-hidden'>
      <div class='flex flex-wrap basis-0 grow gap-8 justify-center items-center py-8'>

      <CameraPlaceholder/>

      <form>
        <RoundSelect />
        <div class='flex items-center gap-2 my-4'>
          <HomeButton />
          {/* <input type='submit' class='btn btn-wide btn-primary font-mono text-base' value="Start"></input> */}
          <a href='/play_ai' class='btn btn-wide btn-primary font-mono text-base'>Start</a>
        </div>
      </form>

      </div>

      <Footer />

    </div>
  );
}