import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";

function PrerequisitesFieldArray({ control, register, errors, name }) {
  const {
    fields: prerequisiteFields,
    append: appendPrerequisite,
    remove: removePrerequisite,
  } = useFieldArray({
    control,
    name,
  });
  const prerequisites = useWatch({
    control,
    name,
  });

  const [openAccordion, setOpenAccordion] = React.useState(
    prerequisiteFields.length > 0 ? "item-0" : null
  );

  const handleAddPrequisites = () => {
    const newIndex = prerequisiteFields.length;
    appendPrerequisite({
      type: "",
      description: "",
      attachmentUrl: "",
    });
    setOpenAccordion(`item-${newIndex}`);
  };

  const deletePrerequisite = (index) => {
    removePrerequisite(index);
    if (openAccordion === `item-${index}`) {
      setOpenAccordion(null);
    }
  };

  const handleAccordionToggle = (value) => {
    if (openAccordion === value) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(value);
    }
  };

  const getError = (name, index, field) => {
    const path = `${name}.${index}.${field}`;
    const errorPath = path.split(".");
    let errorObject = errors;
    for (const key of errorPath) {
      if (!errorObject) break;
      errorObject = errorObject[key];
    }
    return errorObject?.message;
  };

  return (
    <div className="py-6">
      <div className="flex w-full justify-between items-center">
        <p className="text-lg font-bold text-blue-950">Prerequisites</p>
      </div>
      <div className="py-4">
        {prerequisiteFields.length > 0 &&
          prerequisiteFields.map((prerequisite, index) => (
            <Accordion
              type="single"
              collapsible
              className="border my-4 rounded-lg border-gray-200"
              key={index}
              value={openAccordion}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger
                  className="w-full px-2 text-[#f76918] py-4"
                  onClick={() => handleAccordionToggle(`item-${index}`)}
                >
                  <div className="w-full flex items-center justify-between px-2">
                    <p>
                      {prerequisites?.[index]?.type
                        ? prerequisites[index].type
                        : "(Not specified)"}
                    </p>
                    <Button
                      className="hover:bg-gray-100 p-2 rounded-md bg-white"
                      type="button"
                      onClick={() => deletePrerequisite(index)}
                    >
                      <Trash2 className="h-4 text-red-500" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-2 px-8">
                    <div className="py-3">
                      <Label>
                        Type<span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        placeholder="Enter type of prerequisite"
                        className="my-2"
                        {...register(`${name}.${index}.type`)}
                      />
                      <p className="text-red-500 text-sm ml-2">
                        {" "}
                        {getError(name, index, "type")}
                      </p>
                    </div>
                    <div className="py-3">
                      <Label>
                        Description<span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea
                        placeholder="Enter description"
                        className="my-2"
                        {...register(`${name}.${index}.description`)}
                      />
                      <p className="text-red-500 text-sm ml-2">
                        {getError(name, index, "description")}
                      </p>
                    </div>
                    <div className="py-3">
                      <Label className="font-medium">Attachments</Label>
                      <Input
                        placeholder="Enter attachment url"
                        className="my-2"
                        {...register(`${name}.${index}.attachmentUrl`)}
                      />
                      <p className="text-red-500 text-sm ml-2">
                        {getError(name, index, "attachmentUrl")}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </div>
      <div>
        <Button onClick={handleAddPrequisites} type="button">
          Add Prerequisites
          <CirclePlus className="h-4 ml-1" />{" "}
        </Button>
      </div>
    </div>
  );
}

export default PrerequisitesFieldArray;
