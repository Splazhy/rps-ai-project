import { createSignal } from "solid-js";

export default function RoundSelect() {
  const [selectedRadio, setSelectedRadio] = createSignal(3);
  const [numberValue, setNumberValue] = createSignal("");
  const uncheckRadio = () => {
    setSelectedRadio(-1);
  }
  const changeRadio = (num) => {
    setSelectedRadio(num);
    setNumberValue("");
  }
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
        <input type="number" name="first-to" onclick={uncheckRadio} value={numberValue()} oninput={(e) => setNumberValue(e.target.value)} class="textarea textarea-bordered rounded-xl text-base w-24" />
      </div>
    </div>
  );
}