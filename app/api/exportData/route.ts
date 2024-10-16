import { NextResponse } from "next/server";
import { write, utils } from "xlsx";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body || !body.data) {
    return new NextResponse("No data provided", { status: 400 });
  }
  const worksheet = utils.json_to_sheet(body.data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const buffer = write(workbook, { bookType: "xlsx", type: "buffer" });
  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": 'attachment; filename="data.xlsx"',
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
