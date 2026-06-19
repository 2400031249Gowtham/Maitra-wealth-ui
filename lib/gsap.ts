import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, Observer, MotionPathPlugin);
}

// Export custom SplitText simulation to avoid paid package requirements while keeping exact visual fidelity
export const splitText = (text: string) => {
  return text.split(" ").map((word, i) => {
    return {
      index: i,
      word: word,
      chars: word.split(""),
    };
  });
};

export { gsap, ScrollTrigger, Flip, Observer, MotionPathPlugin };
