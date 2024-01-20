import Coordinate from "@/interfaces/Coordinate";

export interface ObjectAnnotationBoundingPoly {
  normalizedVertices: Array<Coordinate>;
}

export default interface ObjectAnnotation {
  mid: string;
  languageCode: string;
  name: string;
  score: number;
  boundingPoly: ObjectAnnotationBoundingPoly;
}
