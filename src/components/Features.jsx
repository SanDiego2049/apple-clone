import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsap("#features_title", {
      opacity: 1,
      y: 0,
      ease: "sine",
    });

    animateWithGsap(
      ".scale-150",
      {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "power1",
      },
      { scrub: 5.5 }
    );

    animateWithGsap(".g_text", {
      opacity: 1,
      y: 0,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="h-full sm:py-32 py-20 sm:px-10 px-5 bg-[#101010] overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1
            id="features_title"
            className="text-[#86868b] lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
          >
            Explore the full story.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>

          <div className="flex justify-center items-center flex-col sm:px-10">
            <div className="relative w-full h-[50vh] flex items-center">
              <video
                id="exploreVideo"
                src={exploreVideo}
                preload="none"
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                ref={videoRef}
                muted
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                <div className="overflow-hidden h-[50vh] flex-1">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="opacity-0 translate-y-[100px] w-full h-full object-cover object-center scale-150"
                  />
                </div>
                <div className="overflow-hidden h-[50vh] flex-1">
                  <img
                    src={explore2Img}
                    alt="titanium2"
                    className="opacity-0 translate-y-[100px] w-full h-full object-cover object-center scale-150"
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                <div className="flex-1 items-center justify-center">
                  <p className="text-[#86868b] max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                    iPhone 17 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      shell{" "}
                    </span>
                    using the same alloy that spacecrafts use for missions to
                    Jupiter.
                  </p>
                </div>

                <div className="flex-1 items-center justify-center">
                  <p className="text-[#86868b] max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                    Titanium has one of the best strength-to-weight ratio of any
                    metal, making these our{" "}
                    <span className="text-white">
                      lightest and most durable iPhone yet.{" "}
                    </span>
                    You can feel the difference when you hold it in your hand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
