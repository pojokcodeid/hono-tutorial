import { Hono } from "hono";
import { existsSync, mkdirSync, createWriteStream, unlinkSync } from "fs";
import path from "path";
import { createHash } from "crypto";

const uploadDir = path.join(process.cwd(), "uploads");
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

export const uploadRoute = new Hono();

uploadRoute.post("/", async (c) => {
  const body = await c.req.parseBody();
  const files = body.photo;
  // check file
  if (!files || (Array.isArray(files) && files.length === 0)) {
    return c.json({ message: "no files" }, 400);
  }

  // if file is not array
  const fileArray = Array.isArray(files) ? files : [files];

  const processImages = await Promise.all(
    fileArray.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        buffer,
      };
    })
  );
  // upload image to directory
  let fileName="";
  processImages.forEach((image) => {
    // Generate MD5 hash for file name
    const hash = createHash("md5").update(image.name).digest("hex");
    const ext = path.extname(image.name);
    fileName = `${hash}${ext}`;
    // delete if image already exist
    if (existsSync(path.join(uploadDir, fileName))) {
      unlinkSync(path.join(uploadDir, fileName));
    }
    const filePath = path.join(uploadDir, fileName);
    const writeStream = createWriteStream(filePath);
    writeStream.write(image.buffer);
    writeStream.end();
  });
  // disini process save data ke database terkait image
  // setelah save berhasil kembalikan response
  return c.json(
    {
      message: "hello Hono form image route",
      files: {
        name: "uploads/"+fileName,
        type: processImages[0].type,
        size: processImages[0].size,
      },
    },
    200
  );
});
