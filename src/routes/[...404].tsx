import HomeButton from "../components/HomeButton";

export default function PageNotFound() {
  return (
    <div class='text-3xl text-center m-4 flex flex-col items-center gap-8 h-[50vh] justify-center'>
      Sorry, it seems like the page you're looking for doesn't exist
      <HomeButton />
    </div>
  );
}