import Annotation from "./Annotation";

export default interface DemoFace extends Annotation {
  id: number;

  joyLikelihood: string;
  sorrowLikelihood: string;
  angerLikelihood: string;
  surpriseLikelihood: string;
  underExposedLikelihood: string;
  blurredLikelihood: string;
  headwearLikelihood: string;

  score: number;
}
