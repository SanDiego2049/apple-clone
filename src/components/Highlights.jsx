import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "sine",
    });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.5,
      ease: "sine",
    });
  });

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-[#101010]"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1
            id="title"
            className="text-[#86868b] lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
          >
            Get the highlights
          </h1>

          <div className="flex  items-end gap-5">
            <p className="text-[#2997FF] hover:underline cursor-pointer flex items-center lg:text-xl opacity-0 translate-y-20 gap-2 transition-all link">
              Watch the film
              <img src={watchImg} alt="Watch icon" />
            </p>
            <p className="text-[#2997FF] hover:underline cursor-pointer flex items-center lg:text-xl transition-all  opacity-0 translate-y-20 gap-2 link">
              Watch the event
              <img src={rightImg} alt="Right icon" />
            </p>
          </div>
        </div>

        {/* Video Carousel */}
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
