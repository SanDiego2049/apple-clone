import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelViewer from "./ModelViewer";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 17 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });

  //camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation
  const [rotationSmall, setRotationSmall] = useState(0);
  const [rotationLarge, setRotationLarge] = useState(0);

  //create timeline
  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(
        tl,
        small,
        rotationSmall,
        { transform: "translateX(-100%)", duration: 2 },
        "#view1",
        "#view2"
      );
    }

    if (size === "small") {
      animateWithGsapTimeline(
        tl,
        large,
        rotationLarge,
        { transform: "translateX(0)", duration: 2 },
        "#view2",
        "#view1"
      );
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1,
    });
  }, []);

  return (
    <section className="sm:py-32 py-20 sm:px-10 px-5">
      <div className="screen-max-width">
        <h1
          id="heading"
          className="text-[#86868b] lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
        >
          Take a closer look.
        </h1>

        <div className="flex flex-col mt-5 items-center">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelViewer
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setRotationSmall}
              item={model}
              size={size}
            />

            <ModelViewer
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setRotationLarge}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex items-center justify-center gap-2">
              <ul className="flex items-center justify-center px-4 py-4 rounded-full bg-[#42424570] backdrop-blur">
                {models.map((model, index) => (
                  <li
                    key={index}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: model.color[0] }}
                    onClick={() => setModel(model)}
                  />
                ))}
              </ul>

              <button className="flex items-center justify-center p-1 rounded-full bg-[#42424570] backdrop-blur gap-1">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="w-10 h-10 text-sm flex justify-center items-center  rounded-full transition-all cursor-pointer"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
