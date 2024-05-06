const STEPS = [
  { title: "Add a Resume pdf", text: "or Create from Scratch" },
  { title: "Preview Design", text: "and Make Corrections" },
  { title: "Analyze your Resume", text: "and Get Instant Feedback" },
];

export const Steps = () => {
  return (
    <section className="mx-auto px-8 py-12 border-b-2 border-blue-500 ">
       <h2 className="text-3xl text-center font-semibold  max-w-2xl  mx-auto">Quickly Identify Errors in your Resume with Instant Analysis</h2>
      <h1 className="text-center text-3xl font-bold">3 Simple Steps</h1>
      <div className="mt-8 flex justify-center">
        <dl className="flex flex-col gap-y-10 lg:flex-row lg:justify-center lg:gap-x-20">
          {STEPS.map(({ title, text }, idx) => (
            <div className="relative self-start pl-14" key={idx}>
              <dt className="text-lg font-bold">
                <div className="bg-primary absolute left-0 top-1 flex h-10 w-10 select-none items-center justify-center rounded-full p-[3.5px] opacity-80">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <div className="text-primary -mt-0.5 text-2xl">
                      {idx + 1}
                    </div>
                  </div>
                </div>
                {title}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
