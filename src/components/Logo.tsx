export default function Logo() {
  return (
    <div class='my-12'>
      <div class='text-center font-mono font-extrabold text-3xl text-accent'>
        <p>ROCK PAPER SCISSORS</p>
        <p>& AI <span class='font-sans font-normal text-xs'>by ReLU</span></p>
      </div>
      <div class='flex gap-12 mt-4 justify-center'>
        <img src='/rock.png' class='size-12 animate-[sine_3s_ease-in-out_infinite]'></img>
        <img src='/paper.png' class='size-12 animate-[sine_3s_ease-in-out_infinite_-500ms]'></img>
        <img src='/scissors.png' class='size-12 animate-[sine_3s_ease-in-out_infinite_-1000ms]'></img>
      </div>
    </div>
  );
}