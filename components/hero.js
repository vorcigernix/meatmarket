import Link from "next/link";

const Hero = () => {
  return (
    <section className="text-zinc-400  ">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="font-title sm:text-4xl text-3xl mb-4 text-white">
            Hiring market
            <br className="hidden lg:inline-block" />
            is wrong
          </h1>
          <p className="mb-8 leading-relaxed">
            <b className=" text-pink-400">You are non-fungible</b>. Way we discuss job opportunities
            is based on centuries old model. It was build in times of factory
            workers begging for a barely paid job. A human resources departments
            were created on the idea of handling humans as a <b className=" text-pink-400">resources</b>.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button>
            <button className="ml-4 inline-flex text-zinc-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              Button
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
