import { Accessor, createSignal } from "solid-js";
import { Hand } from "~/types/core";

export default function HandImage(props: {
  hand: Accessor<Hand | undefined>
}) {

  const getSrc = (hand: Hand | undefined) => {
    switch (hand) {
      case "rock": return "/rock.png";
      case "paper": return "/paper.png";
      case "scissors": return "/scissors.png";
      case "trident": return "/trident.png";
      case "lizard": return "/lizard.png";
      case "gun": return "/gun.png";
      case undefined: return "";
    }
  }

  return (
    <img src={getSrc(props.hand())} class='size-12'></img>
  );
}