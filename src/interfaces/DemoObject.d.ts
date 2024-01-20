import Annotation from "./Annotation";

export default interface DemoObject extends Annotation {
  name: string;

  score: number;

  face: number | null;
}
