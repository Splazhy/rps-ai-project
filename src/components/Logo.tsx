export default function Logo() {
  return (
    <div class='my-12'>
      <div class='text-center font-mono font-extrabold text-3xl sm:text-4xl lg:text-5xl text-accent'>
        <p>ROCK PAPER SCISSORS</p>
        <p>& AI <span class='font-sans font-normal text-xs sm:text-sm'>by ReLU</span></p>
      </div>
      <div class='flex gap-6 sm:gap-12 mt-4 justify-center'>
        <img src='/rock.png' class='w-12 sm:w-16 lg:w-20 animate-[sine_3s_ease-in-out_infinite]' alt="Rock" />
        <img src='/paper.png' class='w-12 sm:w-16 lg:w-20 animate-[sine_3s_ease-in-out_infinite_-500ms]' alt="Paper" />
        <img src='/scissors.png' class='w-12 sm:w-16 lg:w-20 animate-[sine_3s_ease-in-out_infinite_-1000ms]' alt="Scissors" />
      </div>
    </div>
  );
}
