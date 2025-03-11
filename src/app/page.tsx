import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">🎸🥁🎹 VR Studio</h1>
      <p className="mt-2 text-lg">
        Грай на барабанах, гітарі та піаніно у віртуальній реальності!
      </p>

      <Link
        href="/vr"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg"
      >
        🎧 Увійти в VR
      </Link>
    </main>
  );
}
