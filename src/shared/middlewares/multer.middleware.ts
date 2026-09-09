import multer, {
  FileFilterCallback,
} from "multer";

import { Request } from "express";
import { getNoteContentType } from "@/infrastructure/storage/utils/getNoteContentType";


const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log("MULTER MIDDLEWARE REACHED")
  if (!getNoteContentType(file.mimetype)) {
    return cb(
      new Error("Unsupported file type")
    );
  }

  cb(null, true);
};

export const noteUpload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});