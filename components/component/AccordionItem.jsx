import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Collapse } from "react-collapse";
import parse from 'html-react-parser';

const AccordionItem = ({ open, toggle, ques, ans }) => {
  return (
    <>
      <div className="pt-[10px]">
        <div
          className="bg-white border-l-4 border-blue-900 p-5 flex justify-between items-start cursor-pointer gap-5"
          onClick={toggle}
        >
          <div>
            <p className="text-base font-semibold">{ques}</p>
          </div>
          <div className="text-sm bg-blue-900 text-white p-2">
            {open ? <FaMinus /> : <FaPlus />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <div className="bg-white text-[15px] font-medium px-5 py-4 accordion_item">{ans}</div>
        </Collapse>
      </div>
    </>
  );
};

export default AccordionItem;
