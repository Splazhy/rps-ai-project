import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import RoundSelect from "../components/RoundSelect";

export default function Ai() {
  return (
    <div class='min-h-screen flex flex-col overflow-hidden'>
      <div class='flex basis-0 grow justify-center items-center py-8'>

      <form>
        <RoundSelect />
        <div class='flex items-center gap-2 my-4'>
          <HomeButton />
          <input type='submit' class='btn btn-wide btn-primary font-mono text-base' value="Start"></input>
        </div>
      </form>

      </div>

      <Footer />

    </div>
  );
}