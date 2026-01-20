import Image from "next/image";

export default function ReviewCard({ review }) {
    // Google My Business / Places API style review structure
    const reviewerName =
        review.reviewer?.displayName ||
        review.authorName ||
        review.name ||
        "Anonymous";

    const profilePhoto =
        review.reviewer?.profilePhotoUrl || review.profilePhotoUrl || null;

    const rating =
        review.rating ||
        (review.starRating === "FIVE"
            ? 5
            : review.starRating === "FOUR"
            ? 4
            : review.starRating === "THREE"
            ? 3
            : review.starRating === "TWO"
            ? 2
            : review.starRating === "ONE"
            ? 1
            : 5);

    const comment = review.comment || review.text || review.reviewText || "";

    return (
        <div className="relative rounded-[8px] p-px w-full h-full">
            <div
                className="absolute z-10 inset-0 rounded-[8px] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, var(--color-black), var(--color-brown))",
                    padding: "1px",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />
            <div className="w-full h-full rounded-[8px] p-5 flex flex-col">
                <div className="flex gap-[15px] mb-8">
                    {profilePhoto ? (
                        <Image
                            src={profilePhoto}
                            alt={reviewerName}
                            width={52}
                            height={52}
                            className="rounded-full size-[52px] shrink-0 object-cover"
                        />
                    ) : (
                        <div className="rounded-full size-[52px] shrink-0 bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-lg font-semibold">
                                {reviewerName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div>
                        <p className="text-[16px] md:text-[18px] leading-[125%] md:leading-[111%] mb-2">
                            {reviewerName}
                        </p>
                        <div className="flex items-center">
                            {Array.from({ length: rating }).map((_, index) => (
                                <div
                                    key={index}
                                    className="size-[26px] flex items-center justify-center"
                                >
                                    <Image
                                        src="/images/SVG/review-star.svg"
                                        alt="Star"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-full flex items-center">
                    <p className="text-[12px] leading-[167%] font-light whitespace-pre-line">
                        {comment}
                    </p>
                </div>
            </div>
        </div>
    );
}
