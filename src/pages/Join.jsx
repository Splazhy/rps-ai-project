import { CgDice6 } from 'solid-icons/cg'
import Footer from "../components/Footer";
import HomeButton from "../components/HomeButton";
import JoinButton from "../components/JoinButton";

export default function Join() {
  return (
    <div class='min-h-screen flex flex-col overflow-hidden'>

      <div class="flex flex-col mt-8 items-center gap-8">

        <div>
          <h1 class='text-center text-2xl font-mono'>Available Hosts</h1>
          <div class='w-fit max-h-[70vh] overflow-scroll'>
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Host name</th>
                  <th>Size</th>
                  <th>Join</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>1/2</td>
                  <td><JoinButton /></td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>1/2</td>
                  <td><JoinButton /></td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>2/2</td>
                  <td><JoinButton disabled={true} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class='flex flex-1 mt-auto items-end gap-2'>
          <HomeButton />
          {/* TODO: disable this button when there's zero host */}
          <a href='' class={'btn btn-wide btn-success font-mono text-base'}>
            <CgDice6 />
            Join a random match
          </a>
        </div>

      </div>

      <Footer />

    </div>
  );
}