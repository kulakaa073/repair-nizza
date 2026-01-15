"use client";

import { useTranslations } from "next-intl";
import Container from "../Container";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/SVG/logo-svg.svg";
import approachImg1 from "../../../public/images/image/ourApproach/179e6eeed683f444f2de4a7cc1f9f2bc901914bd(8).webp";
import approachImg2 from "../../../public/images/image/ourApproach/480ce55fdc325c00949ed3ba1fa9c0156aa5f21a(1).webp";
import approachImg3 from "../../../public/images/image/ourApproach/cb95b8c813b0d959a6d4ec06c120a64bbdd0cd84(7).webp";

const OurApproach = () => {
    const t = useTranslations("ourApproach");
    const [cards] = useState([
        {
            id: 1,
            className: "top-card",
            image: approachImg1,
        },
        {
            id: 2,
            className: "middle-card",
            image: approachImg2,
        },
        {
            id: 3,
            className: "bottom-card",
            image: approachImg3,
        },
    ]);

    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionTitleRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);
    const logoRef = useRef(null);
    const cardsRef = useRef(null);

    const isTitleInView = useInView(titleRef, { once: true, margin: "0px" });
    const isSubtitleInView = useInView(subtitleRef, {
        once: true,
        margin: "0px",
    });
    const isDescriptionTitleInView = useInView(descriptionTitleRef, {
        once: true,
        margin: "0px",
    });
    const isText1InView = useInView(text1Ref, { once: true, margin: "0px" });
    const isText2InView = useInView(text2Ref, { once: true, margin: "0px" });
    const isText3InView = useInView(text3Ref, { once: true, margin: "0px" });
    const isLogoInView = useInView(logoRef, { once: true, margin: "0px" });
    const isCardsInView = useInView(cardsRef, { once: true, margin: "0px" });

    return (
        <section className="py-[94px] lg:pb-[121px] lg:pt-[71px]">
            <Container className="relative">
                <div className="mb-4 lg:mb-[60px]">
                    <div className="flex gap-[34px] lg:gap-10 mb-6 lg:mb-10">
                        <motion.h2
                            ref={titleRef}
                            initial={{ x: 100, opacity: 0 }}
                            animate={
                                isTitleInView
                                    ? { x: 0, opacity: 1 }
                                    : { x: 100, opacity: 0 }
                            }
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="font-arsenal font-normal text-[32px] text-primary-black uppercase lg:text-[64px]"
                        >
                            {t("title")}
                        </motion.h2>
                        <motion.div
                            ref={logoRef}
                            initial={{ opacity: 0 }}
                            animate={
                                isLogoInView ? { opacity: 1 } : { opacity: 0 }
                            }
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                        >
                            <Image
                                src={logo}
                                alt="logo image"
                                className="w-[46px] h-[72px] lg:w-[52px] lg:h-[80px]"
                            />
                        </motion.div>
                    </div>
                    <motion.p
                        ref={subtitleRef}
                        initial={{ y: 100, opacity: 0 }}
                        animate={
                            isSubtitleInView
                                ? { y: 0, opacity: 1 }
                                : { y: 100, opacity: 0 }
                        }
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="font-montserrat font-light text-base text-primary-black lg:text-xl"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>
                <div className="lg:flex lg:justify-between lg:items-center gap-10">
                    <div className="lg:mr-16 lg:shrink-0">
                        <motion.div
                            ref={cardsRef}
                            initial={{ x: -100, opacity: 0 }}
                            animate={
                                isCardsInView
                                    ? { x: 0, opacity: 1 }
                                    : { x: -100, opacity: 0 }
                            }
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                            }}
                            className="relative w-[310px] h-[207px] mx-auto lg:w-[564px] lg:min-w-[564px] lg:h-[418px] lg:mx-0"
                        >
                            <div className="card-stack">
                                {cards.map(card => (
                                    <div
                                        key={card.id}
                                        className={`card-item ${card.className}`}
                                    >
                                        <Image
                                            src={card.image}
                                            alt="our approach image"
                                            sizes="(max-width: 1024px) 310px, 564px"
                                            width={564}
                                            height={338}
                                            className="w-[310px] h-[167px] object-cover rounded-md lg:w-[564px] lg:h-[338px] lg:rounded-xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    <div className="space-y-8">
                        <motion.h3
                            ref={descriptionTitleRef}
                            initial={{ y: 50, opacity: 0 }}
                            animate={
                                isDescriptionTitleInView
                                    ? { y: 0, opacity: 1 }
                                    : { y: 50, opacity: 0 }
                            }
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="font-arsenal text-base text-primary-black uppercase lg:text-[24px]"
                        >
                            {t("descriptionTitle")}
                        </motion.h3>
                        <motion.p
                            ref={text1Ref}
                            initial={{ y: 50, opacity: 0 }}
                            animate={
                                isText1InView
                                    ? { y: 0, opacity: 1 }
                                    : { y: 50, opacity: 0 }
                            }
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                            className="font-montserrat font-light text-sm text-primary-black md:text-base lg:text-lg"
                        >
                            {t("text1")}
                        </motion.p>
                        <motion.p
                            ref={text2Ref}
                            initial={{ y: 50, opacity: 0 }}
                            animate={
                                isText2InView
                                    ? { y: 0, opacity: 1 }
                                    : { y: 50, opacity: 0 }
                            }
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.2,
                            }}
                            className="font-montserrat font-light text-sm text-primary-black md:text-base lg:text-lg"
                        >
                            {t("text2")}
                        </motion.p>
                        <motion.p
                            ref={text3Ref}
                            initial={{ y: 50, opacity: 0 }}
                            animate={
                                isText3InView
                                    ? { y: 0, opacity: 1 }
                                    : { y: 50, opacity: 0 }
                            }
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                            className="font-montserrat font-light text-sm text-primary-black md:text-base lg:text-lg"
                        >
                            {t("text3")}
                        </motion.p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default OurApproach;
