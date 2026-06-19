import { useEffect, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

// Isomorphic Layout Effect for Next.js SSR
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface UseGSAPOptions {
  dependencies?: React.DependencyList;
  scope?: React.RefObject<any>;
}

export const useGSAP = (
  callback: (context: gsap.Context) => void,
  options: UseGSAPOptions = {}
) => {
  const { dependencies = [], scope } = options;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      callback(self);
    }, scope?.current || undefined);

    return () => ctx.revert();
  }, dependencies);
};
