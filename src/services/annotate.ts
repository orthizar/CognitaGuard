import AnnotateImageResponse from "@/interfaces/AnnotateImageResponse";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_VERCEL_ENV === "production"
    ? "https://cognitaguard.vercel.app"
    : "http://localhost:3000";

export const annotateImage = (image: string): Promise<AnnotateImageResponse> => {
  const response = axios.post(BASE_URL + "/api/annotate", {
    image: image.split(",")[1],
  });
  return response;
};
