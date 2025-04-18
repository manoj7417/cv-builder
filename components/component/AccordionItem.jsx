import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Collapse } from "react-collapse";
import parse from "html-react-parser";

const AccordionItem = ({ open, toggle, ques, ans, pathname }) => {
  const isResume =
    pathname === "/resume" ||
    pathname === "/resume-analyzer" ||
    pathname === "/new-coach";

  return (
    <>
      <div className="pt-[10px]">
        <div
          className={`bg-white ${
            isResume
              ? "border-t-4 border-[#D7DEF0]"
              : "border-l-4 border-blue-900"
          }  p-5 flex justify-between items-start cursor-pointer gap-5`}
          onClick={toggle}
        >
          <div>
            <p className="lg:text-base text-sm font-semibold">{ques}</p>
          </div>
          <div className="text-sm bg-[#f76918] text-white p-2">
            {open ? <FaMinus /> : <FaPlus />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <div className="bg-white lg:text-[15px] text-[12px] font-medium px-5 py-4 accordion_item">
            {ans}
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default AccordionItem;
