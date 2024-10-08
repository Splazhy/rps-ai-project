import { FaSolidRobot } from 'solid-icons/fa'
import { IoPerson } from 'solid-icons/io'
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { createSignal } from 'solid-js';

export default function Home() {

  let [name, setName] = createSignal("");

  return (
    <div class='flex flex-col min-h-screen w-screen items-center overflow-hidden font-mono'>

      <Logo />

      <div class='md:flex md:flex-row flex-col flex-wrap w-full my-12 justify-center items-center'>

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
            <input type="text" value={name()} onInput={(e) => setName(e.target.value)} class="grow text-slate-800" placeholder="Xie Zhaozhi" />
          </label>
          <div class='h-8'></div>
          <span class={`${name() === "" ? "" : "hidden"} font-sans transition-all delay-200`}>Please enter your name first</span>
          <a href='/host' class={`btn ${name() === "" ? "btn-disabled" : ""} btn-secondary text-base text-slate-800 mx-2 w-3/4`}>
            Host a new match
          </a>
          <a href='/join' class={`btn ${name() === "" ? "btn-disabled" : ""} btn-secondary text-base text-slate-800 mx-2 w-3/4`}>
            Join an existing match
          </a>
          <span>{name()}</span>
        </div>

      </div>

      <div class='md:h-0 h-12'></div>

      <Footer />

    </div>
  );
}
