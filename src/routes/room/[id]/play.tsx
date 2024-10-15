import { useNavigate, useParams } from "@solidjs/router";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import CameraPlaceholder from "~/components/CameraPlaceholder";
import Countdown from "~/components/Countdown";
import Footer from "~/components/Footer";
import { socket } from "~/lib/socket";
import { Hand, Match, RoundResult, User } from "~/types/core";

let userId: string = "";

export default function PlayHuman() {
  let roomId = useParams().id;
  let navigate = useNavigate();

  const [roundWonA, setRoundWonA] = createSignal(0);
  const [roundWonB, setRoundWonB] = createSignal(0);

  const [useCamera, setUseCamera] = createSignal(false);
  const [hasPlayed, setHasPlayed] = createSignal(false);
  const [matchHasEnded, setMatchHasEnded] = createSignal(false);

  socket.on("match-aborted", () => {
    navigate("../");
  });

  socket.on("match-ended", (winnerId: string) => {
    if (winnerId === userId) {
      console.log("you won!");
    } else {
      console.log("you lost!");
    }
    setMatchHasEnded(true);
  });

  socket.on("round-done", (result: RoundResult) => {
    switch (result) {
      case "win": setRoundWonA(roundWonA() + 1);
        break;
      case "lose": setRoundWonB(roundWonB() + 1);
        break;
    }
    setHasPlayed(false);
  })

  onMount(() => {
    userId = localStorage.getItem('userId') || "";
    socket.emit("request-user", userId, (user: User) => {
      localStorage.setItem('userId', user.uuid);
    });
  });

  onCleanup(() => {
    socket.emit("abort-match", roomId);
  });

  function playHand(hand: Hand) {
    setHasPlayed(true);
    socket.emit("play-hand", userId, hand);
  }

  return (
    <div class='flex flex-col min-h-screen items-center overflow-hidden font-mono'>
      <div class='text-[4em]'>{roundWonA()}:{roundWonB()}</div>
      <Show when={!useCamera() && !matchHasEnded()}>
        <span class='flex flex-wrap my-auto mx-4 justify-center gap-8'>
          <button onClick={() => playHand("rock")} class={`btn btn-circle btn-lg ${hasPlayed() ? 'btn-disabled' : ''}`}><img src="/rock.png" class='size-12' /></button>
          <button onClick={() => playHand("paper")} class={`btn btn-circle btn-lg ${hasPlayed() ? 'btn-disabled' : ''}`}><img src="/paper.png" class='size-12' /></button>
          <button onClick={() => playHand("scissors")} class={`btn btn-circle btn-lg ${hasPlayed() ? 'btn-disabled' : ''}`}><img src="/scissors.png" class='size-12' /></button>
          <button onClick={() => playHand("lizard")} class={`btn btn-circle btn-lg ${hasPlayed() ? 'btn-disabled' : ''}`}><img src="/lizard.png" class='size-12' /></button>
          <button onClick={() => playHand("trident")} class={`btn btn-circle btn-lg ${hasPlayed() ? 'btn-disabled' : ''}`}><img src="/trident.png" class='size-12' /></button>
          <button onClick={() => playHand("gun")} class={`btn btn-circle btn-lg ${hasPlayed() ? 'btn-disabled' : ''}`}><img src="/gun.png" class='size-12' /></button>
        </span>
      </Show>
      <Show when={useCamera()}>
        Use Cam
      </Show>
      <Show when={matchHasEnded()}>
        <div class='text-[4em]'>Match has Ended</div>
      </Show>
      <Footer />
    </div>
  );
}