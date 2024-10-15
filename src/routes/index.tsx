import { FaSolidRobot } from 'solid-icons/fa'
import { IoPerson } from 'solid-icons/io'
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { A, useNavigate } from '@solidjs/router';
import { socket } from '~/lib/socket';
import { createEffect, createSignal, onMount } from 'solid-js';
import { Room, User } from '~/types/core';

function isEmptyString(s: string) {
  return s.trim() === ""
}

let userId: string;

export default function Home() {

  const [username, setUsername] = createSignal("");

  onMount(() => {
    userId = localStorage.getItem('userId') || "";
    socket.emit("request-user", userId, (user: User) => {
      userId = user.uuid
      localStorage.setItem('userId', userId);
      setUsername(user.name);
    });
  });

  createEffect(() => {
    socket.emit("change-username", userId, username());
  });

  const navigate = useNavigate();
  function goToRoom() {
    socket.emit("host-new-room", userId, (room: Room) => {
      navigate(`room/${room.id}`);
    });
  }

  return (
    <div class='flex flex-col min-h-screen w-screen items-center overflow-hidden font-mono'>

      <Logo />

      <div class='md:flex md:flex-row flex-col flex-wrap w-full my-12 justify-center items-center'>

        <div class='flex-1 flex self-start justify-center items-center flex-col gap-2'>
          <FaSolidRobot class='text-zinc-400 size-20' />
          <div class='h-8'></div>
          <A href='/ai' class='btn btn-primary text-base text-slate-800 mx-2 w-3/4'>
            Play against AI
          </A>
        </div>

        <div class="divider md:divider-horizontal my-12 mx-8">OR</div>

        <div class='flex-1 flex self-start justify-center items-center flex-col gap-2'>
          <IoPerson class='text-zinc-400 size-20' />
          <label class="input input-bordered font-sans flex items-center gap-2">
            Name:
            <input name="name" autocomplete='off' type="text" value={username()} onInput={(e) => setUsername(e.target.value)} class="grow text-slate-800" placeholder="Xie Zhaozhi" />
          </label>
          <div class='h-8'></div>
          <span class={`${isEmptyString(username()) ? "" : "hidden"} font-sans transition-all delay-200`}>Please enter your username first</span>
          <button onClick={goToRoom} class={`btn ${isEmptyString(username()) ? "btn-disabled" : ""} btn-secondary text-base text-slate-800 mx-2 w-3/4`}>
            Host a new match
          </button>

          <A href='/join' class={`btn ${isEmptyString(username()) ? "btn-disabled" : ""} btn-secondary text-base text-slate-800 mx-2 w-3/4`}>
            Join an existing match
          </A>
        </div>

      </div>

      <div class='md:h-0 h-12'></div>

      <Footer />

    </div>
  );
}
