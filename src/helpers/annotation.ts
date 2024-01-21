import DemoFace from "@/interfaces/DemoFace";
import DemoObject from "@/interfaces/DemoObject";
import FaceAnnotation from "@/interfaces/FaceAnnotation";
import ObjectAnnotation from "@/interfaces/ObjectAnnotation";
import Dimensions from "@/interfaces/Dimensions";
import Coordinate from "@/interfaces/Coordinate";
import Annotation from "@/interfaces/Annotation";

const mapFaceAnnotations = (
  faceAnnotations: FaceAnnotation[] | null
): DemoFace[] => {
  if (!faceAnnotations) {
    return [];
  }
  return faceAnnotations.map((faceAnnotation: FaceAnnotation, i: number) => ({
    id: i + 1,
    boundingPoly: faceAnnotation.boundingPoly.vertices,
    joyLikelihood: faceAnnotation.joyLikelihood,
    sorrowLikelihood: faceAnnotation.sorrowLikelihood,
    angerLikelihood: faceAnnotation.angerLikelihood,
    surpriseLikelihood: faceAnnotation.surpriseLikelihood,
    underExposedLikelihood: faceAnnotation.underExposedLikelihood,
    blurredLikelihood: faceAnnotation.blurredLikelihood,
    headwearLikelihood: faceAnnotation.headwearLikelihood,
    score: 0,
  }));
};

const mapObjectAnnotations = (
  objectAnnotations: ObjectAnnotation[] | null,
  imageDimensions: Dimensions
): DemoObject[] => {
  if (!objectAnnotations) {
    return [];
  }

  return objectAnnotations.map((objectAnnotation: ObjectAnnotation) => ({
    boundingPoly: objectAnnotation.boundingPoly.normalizedVertices.map(
      (vertex: any) => {
        return {
          x: vertex.x * imageDimensions.width,
          y: vertex.y * imageDimensions.height,
        };
      }
    ),
    name: objectAnnotation.name,
    score: 0,
    face: null,
  }));
};

const getPolygonPoints = (polygon: Coordinate[]): string => {
  return polygon
    .map((vertex: Coordinate) => {
      return `${vertex.x || 0},${vertex.y || 0}`;
    })
    .join(" ");
};

const getZ = (object: Annotation): number => {
  const x = object.boundingPoly.map((vertex) => {
    return vertex.x || 0;
  });

  const y = object.boundingPoly.map((vertex) => {
    return vertex.y || 0;
  });

  const minX = Math.min.apply(null, x);
  const maxX = Math.max.apply(null, x);
  const minY = Math.min.apply(null, y);
  const maxY = Math.max.apply(null, y);

  const z = Math.sqrt(Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2));

  return z;
};

export { mapFaceAnnotations, mapObjectAnnotations, getPolygonPoints, getZ };
