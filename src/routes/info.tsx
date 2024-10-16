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
        </div>


      </div>
      <Footer />
    </>
  );
}