import { createSignal, Show, onCleanup } from 'solid-js';

export default function Countdown() {
  const [countdown, setCountdown] = createSignal(3);

  const interval = setInterval(() => {
    setCountdown(prev => prev - 1);
  }, 1000);

  onCleanup(() => clearInterval(interval)); // Clear interval on cleanup

  return (
    <div class='mt-12 border-8 rounded-lg font-mono p-8 flex flex-col items-center'>
      <Show when={countdown() >= 0}>
        <span class="countdown text-9xl md:text-[10rem] lg:text-[12rem] text-slate-800">
          <span style={`--value:${countdown()};`}></span>
        </span>
      </Show>
      <Show when={countdown() < 0}>
        <span class="text-5xl md:text-6xl lg:text-7xl text-slate-800">SHOOT!</span>
      </Show>
    </div>
  );
}
