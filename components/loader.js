export default function Loader(props) {
  return (
    <div
      className={`p-1 md:w-1/4 lg:w-1/5 ${props.loadingState == "loaded" && "hidden"} `}
    >
      <div className="h-full bg-white rounded-lg overflow-hidden shadow-lg shadow-pink-500/50">
        <img
          className="lg:h-72 md:h-72 w-full object-cover object-center"
          src="/images/loader.webp"
          alt="loader" />
        <div className="p-6 animate-pulse">
          <h2 className="mb-4">
            <div className="h-2 bg-zinc-600 w-16 rounded"></div>
          </h2>
          <h1 className="mb-4">
            <div className="h-5 bg-zinc-400 w-2/3 rounded"></div>
          </h1>
          <div className="my-3 pt-1">
            <div className="h-2 bg-zinc-400 w-full my-2 rounded"></div>
            <div className="h-2 bg-zinc-400 w-full my-2 rounded"></div>
            <div className="h-2 bg-zinc-400 w-full my-2 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
