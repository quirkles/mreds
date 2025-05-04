import { UploadApiResponse } from 'cloudinary';
import express, { Request, Response } from 'express';
const router = express.Router();
import formidable from 'express-formidable';
import { cloudinary, uploadOptions } from './config';
import { PATHS } from './constants';
import { teamAdmin } from '../../middleware';

router.post(
  PATHS.UPLOAD_PLAYER_PHOTO,
  teamAdmin,
  formidable(),
  (req: Request, res: Response) => {
    const { files } = req;
    const path = (files?.file as any).path;
    const options = uploadOptions('players');
    cloudinary.uploader.upload(path, options, (err, result) => {
      if (err) return res.json({ err });
      const { public_id, secure_url } = result as UploadApiResponse;
      const url = secure_url;
      return res.json({
        public_id,
        url,
      });
    });
  }
);

router.delete(
  PATHS.DELETE_PLAYER_PHOTO,
  teamAdmin,
  (req: Request, res: Response) => {
    const { public_id } = req.query;
    cloudinary.uploader.destroy(public_id as string, (err) => {
      if (err) return res.json({ err });
      return res.status(200).json('Successfully removed image!');
    });
  }
);

export { router };
