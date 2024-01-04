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
        <!-- For example: ( 1 + 0.75 + 0.5 ) * 0.98 = 2.23 -->
        <span>Max(</span>
        {{
          objects
            ?.filter((object) => object.name in objectScores)
            ?.map((object) => objectScores[object.name])
            .join(", ")
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

const getScore = (): number => {
  const objectScore =
    props.objects
      ?.filter((object) => object.name in objectScores)
      ?.map((object) => objectScores[object.name])
      .reduce((a, b) => Math.max(a, b), 0) || 0;
  const faceScore = props.faces ? getFaceScore(props.faces[0]) : 0;
  return objectScore * faceScore;
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
  Knife: 0.75,
  Fork: 0.5,
  Gun: 1,
  Hammer: 0.5,
  Scissors: 0.75,
  Screwdriver: 0.5,
  Wrench: 0.5,
  "Grooming trimmer": 0.75,
};

const likelihoodFactor: { [key: string]: number } = {
  VERY_UNLIKELY: 0.01,
  UNLIKELY: 0.25,
  POSSIBLE: 0.5,
  LIKELY: 0.75,
  VERY_LIKELY: 0.99,
};

const headwearLikelihoodFactor: { [key: string]: number } = {
  VERY_UNLIKELY: 0.01,
  UNLIKELY: 0.5,
  POSSIBLE: 0.75,
  LIKELY: 0.90,
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
  joyLikelihood: string;
  sorrowLikelihood: string;
  angerLikelihood: string;
  surpriseLikelihood: string;
  underExposedLikelihood: string;
  blurredLikelihood: string;
  headwearLikelihood: string;
}

interface Object {
  name: string;
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
