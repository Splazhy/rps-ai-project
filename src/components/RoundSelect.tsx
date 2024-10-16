import { createEffect, createSignal, Setter } from "solid-js";

export default function RoundSelect(props: {
  roundChanged: Setter<number>
}) {
  const [numberValue, setNumberValue] = createSignal("");
  const [round, setRound] = createSignal(3);

  const defaultRound: number = 3;


  createEffect(() => {
    if (numberValue() === "") {
      setRound(defaultRound);
    } else {
      setRound(Math.max(+numberValue(), 1));
      setNumberValue(round().toString());
    }
  });

  createEffect(() => {
    props.roundChanged(round());
  });

  return (
    <div class='flex flex-col w-fit font-mono p-8 rounded-3xl border border-slate-800'>
      <div>Rounds to win:</div>
      <input type="number" name="rounds-to-win" placeholder={defaultRound.toString()} value={numberValue()} onInput={(e) => setNumberValue(e.target.value)} class="textarea textarea-bordered w-24 rounded-xl text-base" />
    </div>
  );
}