const Hero = () => {
  return (
    <>
      <div className="pt-24">
        <div className="container mx-auto flex flex-col flex-wrap items-center justify-around px-3 text-gray-800 md:flex-row">
          <div className="flex w-full flex-col items-start justify-center px-8 text-center md:w-2/5 md:text-left">
            <h1 className="my-4 text-5xl font-bold leading-tight ">
              Your personal gardener
            </h1>
            <p className="mb-8 text-2xl leading-normal">
              Giving the floor to manage your flora on your office floor!
            </p>
            <a href="flowers" className="z-20">
              <button className="focus:shadow-outline z-20 mx-auto my-6 transform rounded-full bg-white py-4 px-8 font-bold text-gray-800 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:underline focus:outline-none lg:mx-0">
                Manage flowers!
              </button>
            </a>
          </div>
          <div className="ml-6 w-full text-center md:w-2/5">
            <img
              alt="yikes"
              className="z-10 w-full md:w-4/5"
              src="./cactus.png"
            />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Hero;
