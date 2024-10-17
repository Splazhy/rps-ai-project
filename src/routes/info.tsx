import Footer from "~/components/Footer";
import HomeButton from "~/components/HomeButton";


export default function Info() {
  return (
    <>
      <div class='min-h-screen flex flex-col overflow-hidden'>

        <div class='fixed bottom-[6vh] left-[4vw] text-center'>
          <HomeButton />
        </div>

        <div class='text-center w-screen mt-8 text-[3em] font-bold'>
          How to Play
          <img class='max-w-[80vw] m-auto my-4 border-4 border-neutral-400' src="/info/homepage.jpg"/>
          <img class='max-w-[80vw] m-auto my-4 border-4 border-neutral-400' src="/info/join.jpg"/>
          <img class='max-w-[80vw] m-auto my-4 border-4 border-neutral-400' src="/info/host.jpg"/>
          <img class='max-w-[80vw] m-auto my-4 border-4 border-neutral-400' src="/info/play1.jpg"/>
          <img class='max-w-[80vw] m-auto my-4 border-4 border-neutral-400' src="/info/play2.jpg"/>
          <div class='my-24'>Have fun!</div>
        </div>

      </div>
      <Footer />
    </>
  );
}