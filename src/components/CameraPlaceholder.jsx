import { IoCamera } from 'solid-icons/io'

export default function CameraPlaceholder() {
  return (
    <div class='flex items-center justify-center border-slate-800 border-8 md:size-[480px] size-[80vw] bg-slate-500 rounded-3xl'>
      <div class='md:text-[12rem] text-[30vw] text-slate-800 text-center'>
        <IoCamera />
      </div>
    </div>
  );
}