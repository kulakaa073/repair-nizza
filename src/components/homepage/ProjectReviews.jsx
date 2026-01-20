"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../shared/swiper/SwiperWrapper";
import { motion, useInView } from "framer-motion";
import Container from "../Container";
import ProjectReviewCard from "./ProjectReviewCard";
import arrowWhite from "../../../public/images/SVG/arrow-white-portfolio.svg";
import arrowBlack from "../../../public/images/SVG/arrow-black-portfolio.svg";

// Reviews section specifically for project-based testimonials from Sanity
export default function ProjectReviews({ reviews }) {
    const t = useTranslations("reviewsSection");

    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
    const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

    const reviewsList = reviews || [];

    if (!reviewsList || reviewsList.length === 0) {
        return null;
    }

    return (
        <Container className="py-[72px] lg:py-[100px]">
            <motion.h2
                ref={titleRef}
                initial={{ y: 60, opacity: 0 }}
                animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-arsenal font-normal text-4xl text-primary-black text-center mb-12 uppercase lg:text-5xl lg:mb-[68px]"
            >
                {t("title")}
            </motion.h2>
            <motion.div
                ref={cardsRef}
                initial={{ y: 100, opacity: 0 }}
                animate={isCardsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-[402px] md:h-[400px] lg:h-[318px]"
            >
                <SwiperWrapper
                    uniqueKey="project-reviews-section"
                    swiperClassName="h-full"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        1280: {
                            slidesPerView: 1,
                        },
                    }}
                    additionalOptions={{
                        spaceBetween: 20,
                        observer: true,
                        observeParents: true,
                    }}
                    buttonVariant="dark-theme"
                    customPrevIcon={{ white: arrowBlack, black: arrowBlack }}
                    customNextIcon={{ white: arrowBlack, black: arrowBlack }}
                    buttonsPosition="center"
                    buttonsVisibilityClass=""
                    buttonsClassName="mt-6"
                >
                    {reviewsList.map((review, index) => (
                        <SwiperSlide
                            key={review.reviewId || review._id || index}
                            className="h-full"
                        >
                            <ProjectReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </SwiperWrapper>
            </motion.div>
        </Container>
    );
}

