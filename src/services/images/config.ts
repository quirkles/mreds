import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
} from '../../constants/constants';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export const uploadOptions = (folder: string) => ({
  quality: 'auto:best',
  eager: [{ format: 'jpg' }],
  width: 350,
  height: 350,
  crop: 'limit',
  folder: folder,
});

export { cloudinary };
