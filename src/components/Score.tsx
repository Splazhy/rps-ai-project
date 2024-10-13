import { createSignal } from 'solid-js';

function Score(props: { score: any; }) {
  // You can directly use the score passed from props
  const score = () => props.score || 0; // Default to 0 if no score is provided

  return (
    <div class="flex flex-col items-center">
      <h2 class="text-7xl font-bold mr-20 ml-20">Score: {score()}</h2>
    </div>
  );
}

export default Score;