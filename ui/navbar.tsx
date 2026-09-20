import { LogoutButton } from "./buttons";

export default function NavBar(){
    return (
      <>
        <div>
          <h1>Solar Sense</h1>
          <p>Monitor your solar installations</p>
        </div>
        <LogoutButton />
      </>
    );
}