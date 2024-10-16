import { createEffect, createSignal, Setter } from "solid-js";

export default function RoundSelect(props: {
  roundChanged: Setter<number>
}) {
  const [selectedRadio, setSelectedRadio] = createSignal(3);
  const [numberValue, setNumberValue] = createSignal("");
  const [round, setRound] = createSignal(2);

  const changeRadio = (num: number) => {
    setSelectedRadio(num);
    setNumberValue("");
  }

  createEffect(() => {
    if (selectedRadio() !== -1) {
      setRound(Math.floor(selectedRadio() / 2) + 1);
    }
  });

  createEffect(() => {
    if (numberValue()) {
      setRound(+numberValue());
    }
  });

  createEffect(() => {
    props.roundChanged(round());
  });

  createEffect(() => {
    if (numberValue() !== '') {
      setSelectedRadio(-1);
    } else {
      setSelectedRadio(3);
    }
  });

  return (
    <div class='flex font-mono p-8 rounded-3xl border border-slate-800'>
      <div>
        Best of:
        <div class='flex gap-2 items-end'>
          <div class='flex gap-2 items-start'>
            <div class='flex flex-col text-center'>
              1
              <input type="radio" value={1} name="best-of" class="radio"
                onclick={() => changeRadio(1)}
                checked={selectedRadio() === 1} />
            </div>
            <div class='flex flex-col text-center'>
              3
              <input type="radio" value={3} name="best-of" class="radio"
                onclick={() => changeRadio(3)}
                checked={selectedRadio() === 3} />
            </div>
            <div class='flex flex-col text-center'>
              5
              <input type="radio" value={5} name="best-of" class="radio"
                onclick={() => changeRadio(5)}
                checked={selectedRadio() === 5} />
            </div>
            <div class='flex flex-col text-center'>
              7
              <input type="radio" value={7} name="best-of" class="radio"
                onclick={() => changeRadio(7)}
                checked={selectedRadio() === 7} />
            </div>
          </div>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class='flex flex-col'>
        First to:
        <input type="number" name="first-to" value={numberValue()} onInput={(e) => setNumberValue(e.target.value)} class="textarea textarea-bordered rounded-xl text-base w-24" />
      </div>
    </div>
  );
}