import { serverInstance } from "@/lib/serverApi";

export async function POST(req, res) {
  try {
    const { id } = await req.json();
    console.log("id:::",id)
    const token = req.headers.get("Authorization");
    const response = await serverInstance.patch(`/blog/update/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log("response:::",response)
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const message = error.response
      ? error.response.data
      : { error: "Error update blog details" };
    return new Response(JSON.stringify(message), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
