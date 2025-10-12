import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl font-bold text-gray-500 mb-4">404</h1>
      <div>
        <h1 className="text-3xl font-bold text-gray-500 mb-4">
          you&apos;re lost?
        </h1>
        <Link href="/" className="text-gray-700 font-bold py-2 px-4 text-3xl ">
          go home
        </Link>
      </div>
    </main>
  );
}
