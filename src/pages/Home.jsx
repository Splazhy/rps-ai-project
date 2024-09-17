import { FaSolidRobot } from 'solid-icons/fa'
import { IoPerson } from 'solid-icons/io'
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div class='flex flex-col min-h-screen items-center overflow-hidden font-mono'>

      <div class='my-12'>
        <div class='text-center font-display text-3xl text-accent'>
          <p>ROCK PAPER SCISSORS</p>
          <p>& AI <span class='font-sans text-xs'>by ReLU</span></p>
        </div>
        <div class='flex gap-12 mt-4 justify-center'>
          <img src='src/assets/rock.png' class='size-12 animate-[sine_3s_ease-in-out_infinite]'></img>
          <img src='src/assets/paper.png' class='size-12 animate-[sine_3s_ease-in-out_infinite_-500ms]'></img>
          <img src='src/assets/scissors.png' class='size-12 animate-[sine_3s_ease-in-out_infinite_-1000ms]'></img>
        </div>
      </div>

      <div class='md:flex flex-wrap w-full 2xl:flex-col my-12 justify-center items-center'>

        <div class='flex-1 flex self-start justify-center items-center flex-col gap-2'>
          <FaSolidRobot class='text-zinc-400 size-20' />
          <div class='h-8'></div>
          <a href='/ai' class='btn btn-primary text-base text-slate-800 mx-2 w-3/4'>
            Play against AI
          </a>
        </div>

        <div class="divider md:divider-horizontal my-12 mx-8">OR</div>

        <div class='flex-1 flex self-start justify-center items-center flex-col gap-2'>
          <IoPerson class='text-zinc-400 size-20' />
          <label class="input input-bordered font-sans flex items-center gap-2">
            Name:
            <input type="text" class="grow text-slate-800" placeholder="Xie Zhaozhi" />
          </label>
          <div class='h-8'></div>
          <a href='/host' class='btn btn-secondary text-base text-slate-800 mx-2 w-3/4'>
            Host a new match
          </a>
          <a href='/join' class='btn btn-secondary text-base text-slate-800 mx-2 w-3/4'>
            Join an existing match
          </a>
        </div>

      </div>

      <div class='md:h-0 h-12'></div>

      <Footer />

    </div>
  );
}
