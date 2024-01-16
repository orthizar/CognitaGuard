<template>
  <div class="card">
    <!-- Generate a score based on Object name and face properties -->
    <!-- 
      Individual score = sum of object scores * (1+facescore)/2
      Total score = sum of individual scores      
     -->
    <div class="score">
      <div class="score-title">Score</div>
      <div class="score-formula">
        <!-- Display formula with values and result -->
        <!-- For example: Max( 1, 0.75, 0.5 ) * 0.98 = 0.98 -->
        <span>Max(</span>
        {{
          [
            0.5,
            ...(objects
              ?.filter((object) => object.name in objectScores)
              ?.map((object) => objectScores[object.name]) ?? []),
          ].join(", ")
        }}
        <span>) &times </span>
        <span v-if="faces">{{ getFaceScore(faces[0]).toFixed(2) }}</span>
        <span> = </span>
        <span>{{ getScore().toFixed(4) }}</span>
      </div>
      <div>
        <span>Risiko: </span>
        <span>{{ (getScore() * 100).toFixed(2) }}</span>
        <span> %</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  faces: Array<Face> | undefined;
  objects: Array<Object> | undefined;
}>();
const faceObjects = ref<Array<{ face: Face; object: Object }>>([]);

const getScore = (): number => {
  const objectScore =
    [
      0.5,
      ...(props.objects
        ?.filter((object) => object.name in objectScores)
        ?.map((object) => objectScores[object.name]) ?? []),
    ].reduce((a, b) => Math.max(a, b), 0) || 0;
  const faceScore = props.faces ? getFaceScore(props.faces[0]) : 0;
  return objectScore * faceScore;
};

const getCenter = (polygon: Array<{ x: number; y: number }>): { x: number; y: number } => {
  const x = polygon.reduce((a, b) => a + b.x, 0) / polygon.length;
  const y = polygon.reduce((a, b) => a + b.y, 0) / polygon.length;
  return { x, y };
};

const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const isInside = (
  point: { x: number; y: number },
  polygon: Array<{ x: number; y: number }>
): boolean => {
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

const isOverlapping = (
  a: Array<{ x: number; y: number }>,
  b: Array<{ x: number; y: number }>
): boolean => {
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

const assignObjects = (): void => {
  // assign each object to a face
  // 1. if object and face overlap, assign object to face
  // 2. if multiple faces overlap with object, assign object to nearest face
  // 3. if no face overlaps with object, assign object to nearest face
  // 4. if no face exists, assign object to none
  const objects = props.objects ?? [];
  const faces = props.faces ?? [];
  const faceObjects: Array<{ face?: Face; object: Object }> = [];
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
      faceObjects.push({ face: nearestFace, object: object });
    } else if (faces.length > 0) {
      // assign object to nearest face
      const nearestFace = faces.reduce((a, b) =>
        getDistance(objectCenter, getCenter(a.boundingPoly)) <
        getDistance(objectCenter, getCenter(b.boundingPoly))
          ? a
          : b
      );
      faceObjects.push({ face: nearestFace, object: object });
    } else {
      // assign object to none
      faceObjects.push({ face: undefined, object: object });
    }
  });
};
const getFaceScore = (face: Face): number => {
  console.log(face);
  const faceScore =
    likelihoodFactor[face.joyLikelihood] * emotionFactor.joyLikelihood +
    likelihoodFactor[face.sorrowLikelihood] * emotionFactor.sorrowLikelihood +
    likelihoodFactor[face.angerLikelihood] * emotionFactor.angerLikelihood +
    likelihoodFactor[face.surpriseLikelihood] *
      emotionFactor.surpriseLikelihood +
    likelihoodFactor[face.underExposedLikelihood] *
      emotionFactor.underExposedLikelihood +
    likelihoodFactor[face.blurredLikelihood] * emotionFactor.blurredLikelihood +
    headwearLikelihoodFactor[face.headwearLikelihood] *
      emotionFactor.headwearLikelihood;
  return (1 + faceScore) / 2;
};

// map object names to scores
const objectScores: { [key: string]: number } = {
  Knife: 0.9,
  Fork: 0.5,
  Gun: 1,
  Hammer: 0.5,
  Scissors: 0.75,
  Screwdriver: 0.5,
  Wrench: 0.5,
  "Grooming trimmer": 0.9,
};

const likelihoodFactor: { [key: string]: number } = {
  VERY_UNLIKELY: 0.01,
  UNLIKELY: 0.5,
  POSSIBLE: 0.6,
  LIKELY: 0.75,
  VERY_LIKELY: 0.99,
};

const headwearLikelihoodFactor: { [key: string]: number } = {
  VERY_UNLIKELY: 0.01,
  UNLIKELY: 0.75,
  POSSIBLE: 0.8,
  LIKELY: 0.9,
  VERY_LIKELY: 0.99,
};

const emotionFactor: { [key: string]: number } = {
  joyLikelihood: -1,
  sorrowLikelihood: 0.25,
  angerLikelihood: 1,
  surpriseLikelihood: 0,
  underExposedLikelihood: 0,
  blurredLikelihood: 0,
  headwearLikelihood: 0.5,
};

interface Face {
  boundingPoly: Array<{ x: number; y: number }>;
  joyLikelihood: string;
  sorrowLikelihood: string;
  angerLikelihood: string;
  surpriseLikelihood: string;
  underExposedLikelihood: string;
  blurredLikelihood: string;
  headwearLikelihood: string;
  objects?: Object[];
}

interface Object {
  name: string;
  boundingPoly: Array<{ x: number; y: number }>;
}
</script>
<style scoped>
.tooltip {
  position: absolute;
  display: none;
  background-color: #000000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1;
  pointer-events: none;
}
.tooltip .tooltip-title {
  font-weight: bold;
}
.tooltip .tooltip-text {
  white-space: pre;
}
</style>
