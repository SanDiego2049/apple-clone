import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { animateWithGsap } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.from("#chip", {
      opacity: 0,
      duration: 3,
      ease: "power2.inOut",
      scale: 2,
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.inOut",
    });
  });

  return (
    <section className="sm:py-32 py-20 sm:px-10 px-5">
      <div className="screen-max-width">
        <div
          id="chip"
          className="flex items-center justify-center w-full my-20"
        >
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-semibold text-center">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h2>
          <p className="text-[#86868b] font-semibold text-xl md:text-2xl py-10 text-center">
            It's here, the biggest redesign in the history of Apple GPUs
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex items-center justify-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="absolute w-[95%] h-[90%] rounded-[56px] overflow-hidden">
              <video
                className="pointer-events-none"
                playsInline
                muted
                autoPlay
                preload="none"
                src={frameVideo}
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <p className="text-[#86868b] font-semibold mt-3 text-center">
            Honkai: Star Rail
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-start gap-24">
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[#86868b] text-xl font-normal md:font-semibold opacity-0 translate-y-[100px] g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">best graphic performance ever</span>
            </p>

            <p className="text-[#86868b] text-xl font-normal md:font-semibold opacity-0 translate-y-[100px] g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive{" "}
              </span>
              with incredibly detailed environments and characters
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center opacity-0 translate-y-[100px] g_fadeIn">
            <p className="text-[#86868b] text-xl font-normal md:font-semibold">
              New
            </p>
            <p className="text-white text-3xl md:text-5xl font-normal md:font-semibold my-2">
              Pro-class GPU
            </p>
            <p className="text-[#86868b] text-xl font-normal md:font-semibold">
              with 8 cores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

// text-[#86868b]
