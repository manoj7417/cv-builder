"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
import ProgramSkeleton from "./ProgramSkeleton";
import { GetTokens } from "@/app/actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleGetPrograms = async () => {
    const { accessToken } = await GetTokens(true);
    try {
      const response = await axios.get("/api/getAllcoachProgram", {
        headers: { Authorization: `Bearer ${accessToken?.value}` },
      });
      if (response.status === 200) {
        setPrograms(response.data.programs);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProgram = async (id) => {
    const result = await Swal.fire({
      title: "Delete Program?",
      text: "Are you sure you want to delete this program?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    const { accessToken } = await GetTokens(true);
    if (result.isConfirmed) {
      toast.promise(
        axios
          .delete(`/api/deleteProgram/${id}`, {
            headers: { Authorization: `Bearer ${accessToken?.value}` },
          })
          .then((response) => {
            if (response.status) {
              handlefilterProgram(id);
            }
          })
          .catch((err) => {
            throw err;
          }),
        {
          pending: "Deleting program",
          success: "Program deleted",
          error: "Error deleting program",
        }
      );
    }
  };

  const handlefilterProgram = (id) => {
    setPrograms(programs.filter((program) => program._id !== id));
  };

  useEffect(() => {
    handleGetPrograms();
  }, []);

  return (
    <div className="w-full min-h-screen p-10">
      <div className="w-full h-full lg:mt-0 mt-10">
        <div className="w-full flex justify-end">
          <Link href="/coach-dashboard/programs/create">
            <Button>
              New Program <CirclePlus className="h-5 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {isLoading ? (
            <>
              <ProgramSkeleton />
              <ProgramSkeleton />
              <ProgramSkeleton />
            </>
          ) : (
            <>
              {programs.length > 0 ? (
                programs.map((program) => (
                  <Card
                    key={program.id}
                    className="flex flex-col overflow-hidden  w-[330px]"
                  >
                    <div className="relative h-[220px]">
                      <img
                        src={program.programImage}
                        alt={program.title}
                        className="w-full h-full border object-cover"
                      />
                      {program.isapproved ? (
                        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                          Approved
                        </span>
                      ) : (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs">
                          Pending
                        </span>
                      )}
                    </div>
                    <CardHeader className="px-5 py-2">
                      <CardTitle className="text-lg ">
                        {program.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow h-20 overflow-hidden">
                      {/* <p className="text-sm text-muted-foreground h-full line-clamp-3">
                        {program.description}
                      </p> */}
                      <div
                        dangerouslySetInnerHTML={{ __html: program.description }}
                      ></div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 items-center py-4">
                      <Link
                        href={`/coach-dashboard/programs/edit/${program._id}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-950 hover:bg-blue-950 hover:text-white"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => handleDeleteProgram(program._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="flex flex-col overflow-hidden ">
                  <CardContent className="flex items-center justify-center h-[200px]">
                    <p className="text-lg text-muted-foreground font-bold ">
                      No Programs found
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Programs;
