"use client";
import "swiper/css";
import "swiper/css/navigation";

import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const buttonsPositionClass = {
  right: "sm:justify-end sm:ml-auto",
  center: "sm:justify-center",
  onSlides: "w-full justify-between",
};

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
  buttonsPosition = "right",
  uniqueKey,
  additionalModules = [],
  additionalOptions = {},
  showNavigation = true,
  buttonsClassName,
  centeredSlides = false,
  onSwiper,
  onSlideChange,
  buttonVariant = "default",
  customPrevIcon,
  customNextIcon,
  buttonsVisibilityClass,
}) {
  const swiperInstanceRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    onSlideChange?.(swiper);
  };

  return (
    <>
      <Swiper
        key={`${uniqueKey}-swiper`}
        onSwiper={(swiper) => {
          swiperInstanceRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          onSwiper?.(swiper);
        }}
        onSlideChange={handleSlideChange}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        navigation={false}
        loop={loop}
        speed={1000}
        modules={
          showNavigation
            ? [Navigation, ...additionalModules]
            : additionalModules
        }
        className={swiperClassName}
        {...additionalOptions}
      >
        {children}
      </Swiper>
      {showNavigation && (
        <div
          key={`${uniqueKey}-buttons`}
          className={twMerge(buttonsClassName)}
        >
          <div
            className={twMerge(
              `flex items-center pointer-events-none ${buttonsPositionClass[buttonsPosition]}`,
              buttonsPosition === "onSlides" ? "justify-between" : buttonsPosition === "center" ? "justify-center gap-6 md:gap-10" : "justify-between sm:gap-3",
              // For dark-theme (and any future always-visible variants), ignore visibility class
              buttonVariant === "dark-theme" ? "" : buttonsVisibilityClass
            )}
          >
            {buttonVariant === "portfolio" ? (
              <>
                <button
                  disabled={isBeginning && !loop}
                  onClick={() => {
                    if (swiperInstanceRef.current) {
                      swiperInstanceRef.current.slidePrev();
                    }
                  }}
                  className="border border-primary-white rounded-full w-[54px] h-[54px] flex items-center justify-center hover:bg-primary-white group transition-all duration-300 cursor-pointer pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-transparent border border-primary-white rounded-full w-[27px] h-[27px] flex items-center justify-center group-hover:border-primary-black transition-all duration-300">
                    {customPrevIcon ? (
                      <>
                        <Image
                          src={customPrevIcon.white}
                          alt="arrow button"
                          className="block group-hover:hidden"
                        />
                        <Image
                          src={customPrevIcon.black}
                          alt="arrow button"
                          className="rotate-180 hidden group-hover:block"
                        />
                      </>
                    ) : (
                      <span className="text-primary-white group-hover:text-primary-black">←</span>
                    )}
                  </div>
                </button>
                <button
                  disabled={isEnd && !loop}
                  onClick={() => {
                    if (swiperInstanceRef.current) {
                      swiperInstanceRef.current.slideNext();
                    }
                  }}
                  className="border border-primary-white rounded-full w-[54px] h-[54px] flex items-center justify-center hover:bg-primary-white group transition-all duration-300 cursor-pointer pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-transparent border border-primary-white rounded-full w-[27px] h-[27px] flex items-center justify-center group-hover:border-primary-black transition-all duration-300">
                    {customNextIcon ? (
                      <>
                        <Image
                          src={customNextIcon.white}
                          alt="arrow button"
                          className="rotate-180 block group-hover:hidden"
                        />
                        <Image
                          src={customNextIcon.black}
                          alt="arrow button"
                          className="hidden group-hover:block"
                        />
                      </>
                    ) : (
                      <span className="text-primary-white group-hover:text-primary-black">→</span>
                    )}
                  </div>
                </button>
              </>
            ) : buttonVariant === "dark-theme" ? (
              <>
                <button
                  disabled={isBeginning && !loop}
                  onClick={() => {
                    if (swiperInstanceRef.current) {
                      swiperInstanceRef.current.slidePrev();
                    }
                  }}
                  className="border border-primary-black rounded-full w-[54px] h-[54px] flex items-center justify-center hover:bg-primary-black group transition-all duration-300 cursor-pointer pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-transparent border border-primary-black rounded-full w-[27px] h-[27px] flex items-center justify-center group-hover:border-primary-white transition-all duration-300">
                    {customPrevIcon ? (
                      <>
                        <Image
                          src={customPrevIcon.black || customPrevIcon.white}
                          alt="arrow button"
                          className="block group-hover:hidden transition-transform duration-300 rotate-180"
                        />
                        <Image
                          src={customPrevIcon.white || customPrevIcon.black}
                          alt="arrow button"
                          className="hidden group-hover:block transition-transform duration-300"
                        />
                      </>
                    ) : (
                      <span className="text-primary-black group-hover:text-primary-white">←</span>
                    )}
                  </div>
                </button>
                <button
                  disabled={isEnd && !loop}
                  onClick={() => {
                    if (swiperInstanceRef.current) {
                      swiperInstanceRef.current.slideNext();
                    }
                  }}
                  className="border border-primary-black rounded-full w-[54px] h-[54px] flex items-center justify-center hover:bg-primary-black group transition-all duration-300 cursor-pointer pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-transparent border border-primary-black rounded-full w-[27px] h-[27px] flex items-center justify-center group-hover:border-primary-white transition-all duration-300">
                    {customNextIcon ? (
                      <>
                        <Image
                          src={customNextIcon.black || customNextIcon.white}
                          alt="arrow button"
                          className="block group-hover:hidden transition-transform duration-300"
                        />
                        <Image
                          src={customNextIcon.white || customNextIcon.black}
                          alt="arrow button"
                          className="hidden group-hover:block transition-transform duration-300 rotate-180"
                        />
                      </>
                    ) : (
                      <span className="text-primary-black group-hover:text-primary-white">→</span>
                    )}
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  disabled={isBeginning && !loop}
                  onClick={() => {
                    if (swiperInstanceRef.current) {
                      swiperInstanceRef.current.slidePrev();
                    }
                  }}
                  className={`relative z-100 group enabled:cursor-pointer size-[54px] bg-white border border-white rounded-full flex items-center justify-center pointer-events-auto
             transition duration-300 xl:enabled:hover:opacity-70 disabled:bg-transparent`}
                >
                  <span className="relative z-100 -rotate-90 group-enabled:text-black group-disabled:text-white mr-1 pointer-events-auto">←</span>
                </button>
                <button
                  disabled={isEnd && !loop}
                  onClick={() => {
                    if (swiperInstanceRef.current) {
                      swiperInstanceRef.current.slideNext();
                    }
                  }}
                  className={`group enabled:cursor-pointer size-[54px] bg-white border border-white rounded-full flex items-center justify-center pointer-events-auto transition 
          duration-300 xl:enabled:hover:opacity-85 disabled:bg-transparent`}
                >
                  <span className="rotate-90 group-enabled:text-black group-disabled:text-white ml-1 pointer-events-auto">→</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
