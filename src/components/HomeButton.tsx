import { A } from '@solidjs/router';
import { FaSolidHouse } from 'solid-icons/fa';

export default function HomeButton() {
  return (
    <A href='/' class='btn w-fit font-mono text-base flex items-center space-x-2 p-2 transition-colors duration-300 hover:bg-gray-200 rounded-md'>
      <FaSolidHouse class='w-5 h-5' />
      <span class='hidden md:block'>Home</span>
    </A>
  );
}
