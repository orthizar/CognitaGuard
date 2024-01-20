import Coordinates, { Coordinate3D } from "@/interfaces/Coordinate";

export interface FaceAnnotationBoundingPoly {
  vertices: Array<Coordinates>;
}

export interface FaceAnnotationLandmark {
  type: string;
  position: Coordinate3D;
}

export default interface FaceAnnotation {
  boundingPoly: FaceAnnotationBoundingPoly;
  fdBoundingPoly: FaceAnnotationBoundingPoly;
  landmarks: Array<FaceAnnotationLandmark>;
  rollAngle: number;
  panAngle: number;
  tiltAngle: number;
  detectionConfidence: number;
  landmarkingConfidence: number;
  joyLikelihood: string;
  sorrowLikelihood: string;
  angerLikelihood: string;
  surpriseLikelihood: string;
  underExposedLikelihood: string;
  blurredLikelihood: string;
  headwearLikelihood: string;
}
