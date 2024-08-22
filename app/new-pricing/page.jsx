import Image from "next/image";
import React from "react";

const Pricing = () => {
  return (
    <>
      <section className="w-full h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-start">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] 2xl:text-8xl font-extrabold mb-4 sm:mb-6 xs:text-start text-center">
              Genies<span className="text-blue-700">Pricing</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium mb-4 sm:mb-10 lg:mb-5 max-w-3xl text-center xs:text-start mx-auto">
              Get the services like CV Studio Resume Builder generative AI
              features. ( ADD ALL SERVICES NAME ) Get the Subscription now on
              monthly incl. GST.
            </p>
            <div className="flex justify-center xs:justify-start gap-5">
              <button className="bg-blue-950 text-white py-3 px-8 rounded border-2 border-transparent">
                View Subscription Plan
              </button>
              <button className="bg-sky-100  text-blue-950 py-3 px-8 rounded border-2 border-blue-950">
                Go For Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="w-[300px] rounded-md border">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">About Macbook</h1>
        <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi, debitis?
        </p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
    {/* Repeat for other cards */}
    <div className="w-[300px] rounded-md border">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">About Macbook</h1>
        <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi, debitis?
        </p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
    <div className="w-[300px] rounded-md border">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">About Macbook</h1>
        <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi, debitis?
        </p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
    <div className="w-[300px] rounded-md border">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">About Macbook</h1>
        <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi, debitis?
        </p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Pricing;
