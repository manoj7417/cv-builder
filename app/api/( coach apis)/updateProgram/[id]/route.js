import { serverInstance } from "@/lib/serverApi";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const token = req.headers.get("Authorization");
    const data = await req.json();
    const response = await serverInstance.put(
      `/coach/updateProgram/${id}`,
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
      : { error: "Error updating program" };
    const statusCode = error.response ? error.response.status : 500;
    return new Response(JSON.stringify(errorMessage), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}