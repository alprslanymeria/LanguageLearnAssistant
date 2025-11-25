import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-800 px-4 pt-10">

      <h1 className="text-7xl sm:text-8xl font-extrabold animate-bounce">
        404
      </h1>

      <p className="mt-4 text-xl sm:text-2xl font-semibold text-center">
        Oops! Sayfa bulunamadı.
      </p>

      <p className="mt-2 text-center text-gray-700 max-w-md">
        Aradığınız sayfa uçmuş gibi görünüyor 🕊️
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transition"
      >
        Anasayfaya Dön
      </Link>

      <div className="mt-10">
        <img
          src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
          alt="Cute lost animation"
          className="w-56 sm:w-64 rounded-lg shadow-lg"
        />
      </div>

    </div>
  );
}
