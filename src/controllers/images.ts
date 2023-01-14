import { Request, Response } from "express";
import { z } from "zod";
import * as cloudinaryImport from "cloudinary";

const cloudinary = cloudinaryImport.v2;
cloudinary.config({
  secure: true,
});

cloudinary.config({
  cloud_name: "dvkukzojb",
  api_key: "281552293762289",
  api_secret: "6MhuGLX83rs96z4kFWOSIt--rc4",
});

console.log(cloudinary.config());

const createSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const uploadImage = async (req: Request, res: Response) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const image = req.body.image;
    console.log(image);
    const result = await cloudinary.uploader.upload(image, options);
    console.log(result);
    res.status(200).json(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
    res.status(543).json(error);
  }
};

export default {
  uploadImage,
};
