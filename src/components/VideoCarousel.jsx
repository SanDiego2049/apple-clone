import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const [loadedData, setLoadedData] = useState([]);
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoIndex: 0,
    isPlaying: false,
    isLastVideo: false,
  });

  const { isEnd, startPlay, videoIndex, isPlaying, isLastVideo } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoIndex}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    videoRef.current.forEach((video) => {
      if (video) {
        gsap.to(video, {
          scrollTrigger: {
            trigger: video,
            scrub: true,
            toggleActions: "restart none none none",
            onComplete: () => {
              setVideo((prev) => ({
                ...prev,
                startPlay: true,
                isPlaying: true,
              }));
            },
          },
        });
      }
    });
  }, [isEnd, videoIndex]);

  useEffect(() => {
    if (!videoRef.current[videoIndex]) return;

    let currentProgress = 0;
    let span = videoSpanRef.current;
    let divs = videoDivRef.current;

    if (!span[videoIndex]) return;

    let anim = gsap.to(span[videoIndex], {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);
        if (progress !== currentProgress) {
          currentProgress = progress;
        }
        gsap.to(divs[videoIndex], {
          width:
            window.innerWidth < 768
              ? "10vw"
              : window.innerWidth < 1024
              ? "5vw"
              : "3vw",
        });
        gsap.to(span[videoIndex], {
          width: `${currentProgress}%`,
          backgroundColor: "white",
        });
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(divs[videoIndex], { width: "12px" });
          gsap.to(span[videoIndex], { backgroundColor: "#afafaf" });
        }
      },
    });

    // update the progress bar
    const animUpdate = () => {
      const currentTime = videoRef.current[videoIndex]?.currentTime || 0;
      const duration = hightlightsSlides[videoIndex].videoDuration || 1;
      anim.progress(currentTime / duration);
    };

    if (isPlaying) gsap.ticker.add(animUpdate);
    else gsap.ticker.remove(animUpdate);
  }, [videoIndex, isPlaying, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3 && isPlaying) {
      const currentVideo = videoRef.current[videoIndex];
      if (currentVideo) {
        currentVideo.play().catch(() => console.warn("Autoplay blocked"));
      }
    }
  }, [videoIndex, isPlaying, loadedData]);

  const handleLoadedMetaData = (i, e) => {
    setLoadedData((prev) => [...prev, e.target]);
    if (i === 0) {
      e.target.play().catch(() => {
        console.warn("Autoplay blocked");
      });
    }
  };

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoIndex: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((prev) => ({
          ...prev,
          videoIndex: 0,
          isLastVideo: false,
          isPlaying: true,
        }));
        videoRef.current[0]?.play().catch(() => {});
        break;
      case "video-play":
        setVideo((prev) => ({ ...prev, isPlaying: true }));
        videoRef.current[videoIndex]?.play().catch(() => {});
        break;
      case "video-pause":
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        videoRef.current[videoIndex]?.pause();
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex items-center rounded-3xl overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[i] = el)}
                  data-video-index={i}
                  onEnded={() => {
                    if (i < hightlightsSlides.length - 1) {
                      setVideo((prev) => ({
                        ...prev,
                        videoIndex: prev.videoIndex + 1,
                        isPlaying: true, // ensure the next video plays
                      }));
                    } else {
                      setVideo((prev) => ({
                        ...prev,
                        isLastVideo: true,
                        isPlaying: true, // don't loop back to first video
                      }));
                    }
                  }}
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  className={`w-full h-full object-contain ${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  src={list.video}
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="font-semibold text-xl  md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center gap-2 mt-10 w-fit mx-auto">
        <div className="py-5 px-7 bg-[#42424570] rounded-full backdrop-blur flex items-center">
          {hightlightsSlides.map((_, i) => (
            <span
              ref={(el) => (videoDivRef.current[i] = el)}
              key={i}
              className="mx-2 w-3 h-3 rounded-full relative cursor-pointer bg-[#afafaf]"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              ></span>
            </span>
          ))}
        </div>

        <button
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("video-play")
              : () => handleProcess("video-pause")
          }
          className="cursor-pointer p-4 rounded-full bg-[#42424570] backdrop-blur flex items-center"
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
