import { nextConnect } from 'next-connect';
import multer from "multer";
import * as XLSX from "xlsx";

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error: any, req: any, res: any) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req: any, res: any) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req: any, res: any) => {
  const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  res.status(200).json({ data: jsonData });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
