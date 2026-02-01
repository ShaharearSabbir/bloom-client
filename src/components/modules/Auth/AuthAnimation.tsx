"use client";

import * as animationData from "@/assets/auth.json";
import { useLottie } from "lottie-react";

const AuthAnimation = () => {
  // const data = JSON.parse(JSON.stringify(animationData));

  const data = structuredClone(animationData);

  const defaultOptions = {
    animationData: data,
    autoPlay: true,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="">
        <div className="w-full">{View}</div>
      </div>
    </>
  );
};

export default AuthAnimation;
