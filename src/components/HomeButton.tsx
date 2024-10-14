import { A } from '@solidjs/router';
import { FaSolidHouse } from 'solid-icons/fa'

export default function HomeButton() {
  return (
    <A href='/' class='btn w-fit font-mono text-base'>
      <FaSolidHouse />
      Home
    </A>
  );
}