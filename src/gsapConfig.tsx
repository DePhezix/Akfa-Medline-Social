import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);

function fadeIn(element: RefObject<HTMLElement | null>) {
    gsap.fromTo(
      element.current,
      {
        scrollTrigger: element.current,
        opacity: 0,
        translateY: 50,
      },
      {
        scrollTrigger: element.current,
        opacity: 1,
        translateY: 0,
      }
    );
}

gsap.defaults({ duration: 1 });

export { gsap, ScrollTrigger, Draggable, useGSAP, fadeIn };
