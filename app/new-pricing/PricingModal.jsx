import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCheckCircle } from "react-icons/fa";

const PricingModal = ({
  isDialogOpen,
  setIsDialogOpen,
  handleCloseAIDialog,
  pricingData,
}) => {

  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[800px]"
          showCloseButton={true}
          onClick={handleCloseAIDialog}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-3xl my-2">{pricingData?.cardTitle}</h2>
            </DialogTitle>
            <DialogDescription>
              <p>{pricingData?.cardDescription}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="modal_left">
                <div className="modal_list">
                  <ul className="space-y-2 flex-grow">
                    {pricingData?.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <FaCheckCircle
                          className="text-blue-950 mr-2"
                          style={{ minWidth: "15px", minHeight: "15px" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal_right bg-gray-100">
                <div className="">
                  <div className="container px-6 py-8 mx-auto">
                    <p className="text-xl text-center text-gray-500">
                      Choose your plan
                    </p>
                    <h1 className="mt-4 text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
                      Pricing Plan
                    </h1>
                    <div className="mt-6 space-y-8 xl:mt-12">
                      <div className="max-w-2xl px-8 py-5 mx-auto border cursor-pointer rounded-xl">
                        <div className="monthly_plan">
                          <div className="flex flex-row justify-between items-center">
                            <div class="subscription-panel-offer-commitment font-bold">
                              Monthly
                            </div>
                            <div class="subscription-panel-offer-commitment font-semibold">
                              {pricingData?.subscribe?.price?.monthly}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-2xl px-8 py-4 mx-auto border border-blue-500 cursor-pointer rounded-xl">
                        <div className="monthly_plan">
                          <div className="flex flex-row justify-between items-center">
                            <div class="subscription-panel-offer-commitment font-bold">
                              Yearly
                            </div>
                            <div class="subscription-panel-offer-commitment font-semibold">
                              {pricingData?.subscribe?.price?.yearly}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="bg-blue-950 text-white p-2 rounded-md text-sm">
              Buy Now
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PricingModal;
