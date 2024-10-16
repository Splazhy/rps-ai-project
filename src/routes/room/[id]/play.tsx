import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { predict } from "~/backend/gradio";
import CameraFeed from "~/components/CameraFeed";
import Footer from "~/components/Footer";
import HandImage from "~/components/HandImage";
import { socket } from "~/lib/socket";
import { Hand, Match, RoundResult, User } from "~/types/core";

let userId: string = "";

export default function PlayHuman() {
  let roomId = useParams().id;
  let navigate = useNavigate();

  const [roundWonA, setRoundWonA] = createSignal(0);
  const [roundWonB, setRoundWonB] = createSignal(0);
  const [handA, setHandA] = createSignal<Hand>();
  const [handB, setHandB] = createSignal<Hand>();

  const [useCamera, setUseCamera] = createSignal(false);
  const [hasPlayed, setHasPlayed] = createSignal(false);
  const [roundHasEnded, setRoundHasEnded] = createSignal(false);
  const [matchHasEnded, setMatchHasEnded] = createSignal(false);
  const [won, setWon] = createSignal(true);
  const [capture, setCaptureDataURL] = createSignal<string>();
  const [opponentImageURL, setOpponentImageURL] = createSignal<string>();

  socket.on("image-sent", async (imageURL) => {
    setOpponentImageURL(imageURL);
  });

  socket.on("match-aborted", () => {
    navigate("../");
  });

  socket.on("match-ended", (winnerId: string) => {
    if (winnerId === userId) {
      setWon(true); // congrats! :D
      setTimeout(() => {
        socket.emit("abort-match", roomId);
      }, 3000);
    } else {
      setWon(false); // sucks to suck
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
    socket.emit("get-match-data", userId, (match: Match) => {
      let round = match.rounds[match.rounds.length - 2]; // -2 because new round was added
      let handA = round.handA.hand as Hand;
      let handB = round.handB.hand as Hand;
      if (round.handA.userId === userId) {
        setHandA(handA);
        setHandB(handB);
      } else {
        setHandA(handB);
        setHandB(handA);
      }
    });
    setRoundHasEnded(true);
    setCaptureDataURL(undefined);
    setTimeout(() => {
      setRoundHasEnded(false);
      setHasPlayed(false);
    }, 3000);
  });

  onMount(() => {
    userId = sessionStorage.getItem('userId') || "";
    socket.emit("request-user", userId, (user: User) => {
      sessionStorage.setItem('userId', user.uuid);
    });
    socket.emit("get-match-data", userId, (match: Match) => {
      setUseCamera(match.settings.use_camera);
    });
  });

  onCleanup(() => {
    socket.emit("abort-match", roomId);
  });

  function playHand(hand: Hand) {
    setHasPlayed(true);
    socket.emit("play-hand", userId, hand);
    if (useCamera()) {
      let capturedURL = capture();
      if (capturedURL && useCamera()) {
        socket.emit("send-captured-image", userId, capturedURL);
      }
    }
  }

  createEffect(async () => {
    if (!hasPlayed()) {
      let captureImg = capture();
      if (!captureImg)
        return;
      let prediction = await predict(captureImg);
      let maxConfidence = -1;
      let maxConfidenceHand: string = '';
      for (const key in prediction) {
        const value = prediction[key as Hand]; // Type assertion
        if (value > maxConfidence) {
          maxConfidence = value;
          maxConfidenceHand = key;
        }
      }
      let hand: Hand = maxConfidenceHand as Hand;
      playHand(hand);
    }
  });

  return (
    <div class='flex flex-col min-h-screen items-center overflow-hidden font-mono'>
      <div class='flex text-center text-[4em]'>
        <div class='flex flex-col'>
          <div>{roundWonA()}</div>
          <Show when={roundHasEnded()}>
            <div><HandImage hand={handA}/></div>
          </Show>
        </div>
        <div>:</div>
        <div class='flex flex-col'>
          <div>{roundWonB()}</div>
          <Show when={roundHasEnded()}>
            <div><HandImage hand={handB}/></div>
          </Show>
        </div>
      </div>
      <Show when={matchHasEnded()}>
        <div class='text-[4em]'>{won() ? "You Won!" : "You Lost!"}</div>
      </Show>
      <Show when={!useCamera()}>
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
        <div class='flex items-center justify-center border-slate-800 border-8 md:size-[480px] size-[80vw] bg-slate-500 rounded-3xl'>
          <CameraFeed setDisable={hasPlayed} captureImage={setCaptureDataURL} />
        </div>
        <div class='flex items-center justify-center border-slate-800 border-8 md:size-[480px] size-[80vw] bg-slate-500 rounded-3xl'>
          <Show when={roundHasEnded()}>
            <img src={opponentImageURL()}></img>
          </Show>
        </div>
      </Show>
      <Footer />
    </div>
  );
}
