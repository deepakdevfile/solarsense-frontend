import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Hello, Welcome to Solar Sense</h1>
        <p>Solar monitoring, made clear</p>
        <p>Track installation and prepare your energy data for forecasting</p>
        <Link href="/login">
          Log in
        </Link> <br />
        <Link href="/register">
          Register
        </Link>
      </main>
    </div>
  );
}
