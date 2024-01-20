import { AxiosResponse } from "axios";
import FaceAnnotation from "./FaceAnnotation";
import ObjectAnnotation from "./ObjectAnnotation";

export default interface AnnotateImageResponse
  extends AxiosResponse<{
    responses: {
      faceAnnotations: FaceAnnotation[];
      localizedObjectAnnotations: ObjectAnnotation[];
    }[];
  }> {}
