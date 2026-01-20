"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../shared/swiper/SwiperWrapper";
import { motion, useInView } from "framer-motion";
import Container from "../Container";
import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }) {
    const t = useTranslations("reviewsSection");

    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
    const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

    // Handle different review data structures
    const reviewsList = reviews?.reviews || reviews || [];

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
                className="h-[300px] lg:h-[350px]"
            >
                <SwiperWrapper
                    uniqueKey="reviews-section"
                    swiperClassName="h-full"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1280: {
                            slidesPerView: 3,
                        },
                    }}
                    additionalOptions={{
                        spaceBetween: 20,
                        observer: true,
                        observeParents: true,
                    }}
                    buttonVariant="default"
                    buttonsPosition="center"
                    buttonsVisibilityClass="lg:hidden"
                    buttonsClassName="mt-6"
                >
                    {reviewsList.map((review, index) => (
                        <SwiperSlide
                            key={review.reviewId || review.id || index}
                            className="h-full"
                        >
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </SwiperWrapper>
            </motion.div>
        </Container>
    );
}
