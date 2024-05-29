import Link from "next/link";

const TypePage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex space-x-5">
        <Link href="/dashboard/account">
          <button className="border-white border rounded-sm px-20 py-6 tracking-wider uppercase font-bold text-xl hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
            Student
          </button>
        </Link>
        <Link href="/institution/account">
          <button className="border-white border rounded-sm px-20 py-6 tracking-wider uppercase font-bold text-xl hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
            Institution
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TypePage;
