const STEPS = [
  { title: "Scan Your CV", text: "through the pdf CV Analyser" },
  { title: "Check CV Score", text: "for Clarity, Relevance, and Content" },
  { title: "Get Recommendations", text: " on how to make a perfect CV" },
];

export const Steps = () => {
  return (
    <section className="mx-auto px-8 py-12 border-b-2 border-blue-500 ">
       <h2 className="text-3xl text-center font-semibold  max-w-2xl  mx-auto">Identify Skill Gaps and Errors in your CV in Minutes</h2>
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
