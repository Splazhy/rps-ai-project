import { createSignal, onCleanup, Show } from 'solid-js';

export default function Countdown(props: { isActive: boolean }) {
  const [countdown, setCountdown] = createSignal(3);

  setInterval(() => {
    if(props.isActive){
      setCountdown(countdown() - 1);
      if(countdown()<-1){
        setCountdown(countdown() + 5);
      }
    }
  }, 1000);

  
 
  return (
    <div class='mt-12 border-8 rounded-box font-mono text-9xl text-slate-800 flex flex-col p-8'>
      <Show when={countdown() >= 0}>
        <span class="countdown">
          <span style={`--value:${countdown()};`}></span>
        </span>
      </Show>
      <Show when={countdown() < 0}>
        <span>SHOOT!</span>
      </Show>
    </div>
  );
}