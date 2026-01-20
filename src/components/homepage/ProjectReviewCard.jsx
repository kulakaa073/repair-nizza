import Image from "next/image";
import { useLocale } from "next-intl";

// Card specifically for localized project testimonials from Sanity
export default function ProjectReviewCard({ review }) {
    const locale = useLocale();

    const resolveLocalizedValue = value => {
        if (!value) return "";
        if (typeof value === "string") return value;

        if (typeof value === "object") {
            const localized =
                value[locale] || value.en || value.ru || value.fr || "";

            // Sanity localizedBlockContent: array of blocks with children
            if (Array.isArray(localized)) {
                return localized
                    .map(block => {
                        if (typeof block === "string") return block;
                        if (block?.children && Array.isArray(block.children)) {
                            return block.children
                                .map(child => child.text || "")
                                .join("");
                        }
                        return "";
                    })
                    .filter(Boolean)
                    .join("\n\n");
            }

            if (typeof localized === "string") return localized;
            return "";
        }

        return String(value);
    };

    const rawName =
        review.reviewer?.displayName || review.authorName || review.name;
    const reviewerName =
        resolveLocalizedValue(rawName) ||
        review.reviewer?.profilePhotoUrl ||
        "Anonymous";

    const profilePhoto =
        review.reviewer?.profilePhotoUrl || review.profilePhotoUrl || null;

    // Project testimonials don't have starRating by default; fallback to 5
    const starRating = review.starRating || review.rating || 5;
    const rating =
        starRating === "FIVE" || starRating === 5
            ? 5
            : starRating === "FOUR" || starRating === 4
            ? 4
            : starRating === "THREE" || starRating === 3
            ? 3
            : starRating === "TWO" || starRating === 2
            ? 2
            : starRating === "ONE" || starRating === 1
            ? 1
            : 5;

    const rawComment = review.comment || review.text || review.reviewText;
    const comment = resolveLocalizedValue(rawComment);

    return (
        <div className="relative w-full h-full rounded-[20px] lg:rounded-[12px] overflow-hidden">
            {review.roomPhotoUrl && (
                <Image
                    src={review.roomPhotoUrl}
                    alt={reviewerName}
                    fill
                    className="object-cover object-bottom"
                    sizes="(max-width: 768px) 310px, (max-width: 1024px) 400px, 1200px"
                />
            )}

            <div className="absolute bottom-0 left-0 right-0 py-6 pl-[25px] pr-[40px] h-[205px] md:w-[350px] lg:w-[501px] lg:py-[40px] lg:pl-[50px] lg:pr-[56px] md:h-full backdrop-blur-[26px] shadow-[inset_0_4px_13px_0_rgba(255,255,255,0.25)] bg-[rgba(18,18,18,0.26)]">
                <div className="flex flex-col justify-center h-full">
                    <div className="flex items-center gap-4 mb-3 md:mb-5 lg:gap-6 lg:mb-[28px]">
                        {profilePhoto ? (
                            <div className="relative w-[40px] h-[40px] lg:w-[68px] lg:h-[68px] rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={profilePhoto}
                                    alt={reviewerName}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                        ) : (
                            <div className="rounded-full w-[40px] h-[40px] lg:w-[68px] lg:h-[68px] shrink-0 bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-600 text-lg font-semibold">
                                    {reviewerName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <p className="font-arsenal font-normal text-base lg:text-[24px] leading-[19px] lg:leading-[28px] text-primary-white uppercase">
                                {reviewerName}
                            </p>
                            <div className="flex items-center mt-1">
                                {Array.from({ length: rating }).map(
                                    (_, index) => (
                                        <div
                                            key={index}
                                            className="size-[20px] flex items-center justify-center"
                                        >
                                            <Image
                                                src="/images/SVG/review-star.svg"
                                                alt="Star"
                                                width={16}
                                                height={16}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="font-montserrat font-light text-xs md:text-sm text-primary-white leading-[150%]">
                        {comment}
                    </p>
                </div>
            </div>
        </div>
    );
}

