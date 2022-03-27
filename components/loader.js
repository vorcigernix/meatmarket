export default function Loader(props) {
  return (
    <>
      <div
        className={`p-4 lg:w-1/4 md:w-1/2 ${
          props.loadingState == "loaded" && "hidden"
        }`}
      >
        <div className="h-full flex flex-col items-center text-center">
          <img
            alt="loader"
            className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
            src="/images/loader.webp"
          />
          <div className="w-full">
            <h2 className="title-font font-medium text-lg text-zinc-900">
              
            </h2>
            <h3 className="text-zinc-500 mb-3">Loading</h3>
            <p className="mb-4">
              
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
