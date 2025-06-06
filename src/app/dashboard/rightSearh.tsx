export default function RightSearch() {
  return (
    <div className="p-4">
      <form action="">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img
              src="/icons/search.svg"
              alt="search icon"
              className="w-5 h-5 text-white"
            />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 p-2 border border-gray-500 rounded-full focus:outline-none focus:border-blue-500 placeholder:text-white bg-transparent text-white"
          />
        </div>

          <button type="submit" className="hidden">Submit</button> {/* facultatif mais utile */}

      </form>

      <div></div>
    </div>
  );
}
