import Coordinate from "@/interfaces/Coordinate";
import type DemoFace from "@/interfaces/DemoFace";
import type DemoObject from "@/interfaces/DemoObject";

// map object names to scores
const OBJECT_SCORES: { [key: string]: number } = {
  Knife: 0.9,
  Fork: 0.5,
  Gun: 1,
  Hammer: 0.5,
  Scissors: 0.75,
  Screwdriver: 0.5,
  Wrench: 0.5,
  "Grooming trimmer": 0.9,
};

const LIKELIHOOD_FACTOR: { [key: string]: number } = {
  VERY_UNLIKELY: 0.01,
  UNLIKELY: 0.5,
  POSSIBLE: 0.6,
  LIKELY: 0.75,
  VERY_LIKELY: 0.99,
};

const HEADWEAR_LIKELIHOOD_FACTOR: { [key: string]: number } = {
  VERY_UNLIKELY: 0.01,
  UNLIKELY: 0.75,
  POSSIBLE: 0.8,
  LIKELY: 0.9,
  VERY_LIKELY: 0.99,
};

const EMOTION_FACTOR: { [key: string]: number } = {
  joyLikelihood: -1,
  sorrowLikelihood: 0.25,
  angerLikelihood: 1,
  surpriseLikelihood: 0,
  underExposedLikelihood: 0,
  blurredLikelihood: 0,
  headwearLikelihood: 0.5,
};

const getCenter = (polygon: Coordinate[]): Coordinate => {
  const x = polygon.reduce((a, b) => a + b.x, 0) / polygon.length;
  const y = polygon.reduce((a, b) => a + b.y, 0) / polygon.length;
  return { x, y };
};

const getDistance = (a: Coordinate, b: Coordinate): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const isInside = (point: Coordinate, polygon: Coordinate[]): boolean => {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html/pnpoly.html
  const x = point.x;
  const y = point.y;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
};

const isOverlapping = (a: Coordinate[], b: Coordinate[]): boolean => {
  // check if any point of a is inside b
  for (const point of a) {
    if (isInside(point, b)) {
      return true;
    }
  }
  // check if any point of b is inside a
  for (const point of b) {
    if (isInside(point, a)) {
      return true;
    }
  }
  return false;
};

/**
 * assign each object to a face
 * 1. if object and face overlap, assign object to face
 * 2. if multiple faces overlap with object, assign object to nearest face
 * 3. if no face overlaps with object, assign object to nearest face
 * 4. if no face exists, assign object to none
 */
const assignObjectsToFaces = (faces: DemoFace[], objects: DemoObject[]) => {
  objects.forEach((object) => {
    const objectCenter = getCenter(object.boundingPoly);
    const overlappingFaces = faces.filter((face) =>
      isOverlapping(object.boundingPoly, face.boundingPoly)
    );

    if (overlappingFaces.length > 0) {
      // assign object to nearest face
      const nearestFace = overlappingFaces.reduce((a, b) =>
        getDistance(objectCenter, getCenter(a.boundingPoly)) <
        getDistance(objectCenter, getCenter(b.boundingPoly))
          ? a
          : b
      );
      object.face = nearestFace.id;
    } else if (faces.length > 0) {
      // assign object to nearest face
      const nearestFace = faces.reduce((a, b) =>
        getDistance(objectCenter, getCenter(a.boundingPoly)) <
        getDistance(objectCenter, getCenter(b.boundingPoly))
          ? a
          : b
      );
      object.face = nearestFace.id;
    }
  });
};

const getFaceScore = (face: DemoFace): number => {
  const joyFactor =
    LIKELIHOOD_FACTOR[face.joyLikelihood] * EMOTION_FACTOR.joyLikelihood;
  const sorrowFactor =
    LIKELIHOOD_FACTOR[face.sorrowLikelihood] * EMOTION_FACTOR.sorrowLikelihood;
  const angerFactor =
    LIKELIHOOD_FACTOR[face.angerLikelihood] * EMOTION_FACTOR.angerLikelihood;
  const surpriseFactor =
    LIKELIHOOD_FACTOR[face.surpriseLikelihood] *
    EMOTION_FACTOR.surpriseLikelihood;
  const underExposedFactor =
    LIKELIHOOD_FACTOR[face.underExposedLikelihood] *
    EMOTION_FACTOR.underExposedLikelihood;
  const blurredFactor =
    LIKELIHOOD_FACTOR[face.blurredLikelihood] *
    EMOTION_FACTOR.blurredLikelihood;
  const headwearFactor =
    HEADWEAR_LIKELIHOOD_FACTOR[face.headwearLikelihood] *
    EMOTION_FACTOR.headwearLikelihood;

  const faceScore =
    joyFactor +
    sorrowFactor +
    angerFactor +
    surpriseFactor +
    underExposedFactor +
    blurredFactor +
    headwearFactor;

  return (1 + faceScore) / 2;
};

const assignScoresToFaces = (faces: DemoFace[]) => {
  faces.forEach((face) => {
    face.score = getFaceScore(face);
  });
};

const getObjectScore = (object: DemoObject): number => {
  return object.name in OBJECT_SCORES ? OBJECT_SCORES[object.name] : 0;
};

const assignScoresToObjects = (objects: DemoObject[]) => {
  objects.forEach((object) => {
    object.score = getObjectScore(object);
  });
};

const assignScores = (faces: DemoFace[], objects: DemoObject[]) => {
  assignScoresToFaces(faces);
  assignScoresToObjects(objects);

  const remainingObjects = assignObjectsToFaces(faces, objects);
  return remainingObjects;
};

export { LIKELIHOOD_FACTOR, assignScores };
