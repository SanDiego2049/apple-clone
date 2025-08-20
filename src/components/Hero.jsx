import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("reisze", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 4,
      ease: "sine",
    });
    gsap.to("#CTA", {
      y: -120,
      opacity: 1,
      delay: 4,
      ease: "sine",
    });
  }, []);

  return (
    <section className="w-full mb-20 h-[calc(100vh-120px)] relative">
      <div className="w-full h-full flex justify-center flex-col items-center">
        <p
          id="hero"
          className="text-center font-semibold text-3xl text-[#94928d] opacity-0 max-md:mb-10"
        >
          iPhone 17
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            src={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="CTA"
        className="flex flex-col items-center opacity-0 translate-y-20 max-md:my-10"
      >
        <a
          href="#highlights"
          className="px-5 py-2 rounded-3xl bg-[#2997FF] transition-all duration-300 my-5 hover:bg-transparent border border-transparent hover:text-[#2997FF] hover:border-[#2997FF]"
        >
          Shop Now
        </a>
        <p>From $199/mo. or $999</p>
      </div>
    </section>
  );
};

export default Hero;
