import { FaSolidDoorOpen } from 'solid-icons/fa'

export default function KickButton(props) {
  return (
    <button class={'font-mono text-base btn btn-error btn-sm' + (props.disabled ? ' btn-disabled' : '')}>
      <FaSolidDoorOpen />
      Kick
    </button>
  );
}