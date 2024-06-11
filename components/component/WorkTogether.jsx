import Image from "next/image";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const WorkTogether = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 place-items-center py-10">
        <div className="work-content">
          <h2 className="text-blue-900 text-5xl font-bold">
            Work together,
            <br /> Wherever you work
          </h2>
          <p className="text-sm mt-3 w-3/4">
            In the office, remote, or a mix of the two, with Miro, your team can
            connect, collaborate, and co-create in one space no matter where you
            are.
          </p>
          <div className="learn-more flex gap-1 items-center mt-5">
            <div className="text-blue-400 underline underline-offset-8">
              Learn More{" "}
            </div>
            <GoArrowRight className="text-blue-400" />
          </div>
        </div>
        <div className="work_image">
          <Image src={"/hybridwork.png"} width={500} height={500} alt="work" />
        </div>
      </div>
    </>
  );
};

export default WorkTogether;
