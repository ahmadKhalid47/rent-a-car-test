import { NextResponse } from "next/server";
import { write, utils } from "xlsx";

export async function POST(req: Request) {
  // Parse the incoming data from the request body
  const body = await req.json();

  // Ensure the body contains data
  if (!body || !body.data) {
    return new NextResponse("No data provided", { status: 400 });
  }

  // Convert the data to a worksheet
  const worksheet = utils.json_to_sheet(body.data);

  // Create a new workbook
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate a buffer for the workbook
  const buffer = write(workbook, { bookType: "xlsx", type: "buffer" });

  // Create a response with the file buffer and appropriate headers
  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": 'attachment; filename="data.xlsx"',
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
