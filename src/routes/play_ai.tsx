import { FaSolidRobot } from "solid-icons/fa";
import CameraPlaceholder from "../components/CameraPlaceholder";
import Footer from "../components/Footer";
import Countdown from "../components/Countdown";
import Score from "~/components/Score";
import { createSignal, onCleanup } from "solid-js";
import calculateResult from "~/components/CalculateHvsAi";


export default function PlayAi() {
  const [h, setH] = createSignal(0);
  const [A, setA] = createSignal(0);

  const playerChoice = "rock"; //player input from camera

  const bastof = 3; // fome roundSelect

  const images = [
    "src/assets/rock.png",
    "src/assets/paper.png",
    "src/assets/scissors.png",
  ];

  let randomIndex = Math.floor(Math.random() * images.length);

  const incrementScores = () => {
    if (A() < bastof && h() < bastof) {
      randomIndex = Math.floor(Math.random() * images.length);
      switch (calculateResult(playerChoice, randomIndex)) {
        case 1:
          setH(h() + 1);
          break;
        case 2:
          setA(A() + 1);
          break;
        default:
          break;
      }
    }
  };

  const interval = setInterval(incrementScores, 5000);

  onCleanup(() => clearInterval(interval));

  return (
    <div class="flex flex-col min-h-screen items-center overflow-hidden font-mono">
      <div class="flex flex-col items-center gap-2">
        <Countdown isActive={A() < bastof && h() < bastof} />

        <div class="flex gap-96">
          {h() == bastof ? (
            <h2 class="text-7xl font-bold mr-48 ml-48">Win</h2>
          ) : A() == bastof ? (
            <h2 class="text-7xl font-bold mr-48 ml-48">Loss</h2>
          ) : (
            <Score score={h()} />
          )}

          {A() == bastof ? (
            <h2 class="text-7xl font-bold mr-48 ml-48">Win</h2>
          ) : h() == bastof ? (
            <h2 class="text-7xl font-bold mr-48 ml-48">Loss</h2>
          ) : (
            <Score score={A()} />
          )}
        </div>
      </div>

      <div class="flex grow gap-48 items-center">
        <CameraPlaceholder />
        <div class="flex items-center justify-center border-slate-800 border-8 md:size-[480px] size-[80vw] bg-slate-500 rounded-3xl">
          <div class="md:text-[12rem] text-[30vw] text-slate-800 text-center">
            {randomIndex === 4 ? (
              <FaSolidRobot />
            ) : (
              <img src={images[1]} class="size-48" />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
