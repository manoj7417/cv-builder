/** @format */

import { serverInstance } from "@/lib/serverApi";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();
    const token = req.headers.get("Authorization");
    const response = await serverInstance.put(
      `/coach/editProgramByAdmin/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return new Response(JSON.stringify(response.data), {
      status: response.status || 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data
      : { error: "Error in updating coach program" };
    const statusCode = error.response ? error.response.status : 500;

    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
