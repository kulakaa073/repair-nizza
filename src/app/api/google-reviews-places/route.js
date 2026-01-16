import { NextResponse } from "next/server";

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

/**
 * Fetch reviews using Google Places API
 * Note: Limited to 5 reviews maximum - no pagination available
 * Requires: GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID
 */
async function getReviewsFromPlacesAPI() {
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
        throw new Error("Google Places API key or Place ID is not configured");
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== "OK") {
        throw new Error(
            `Google Places API error: ${data.status} - ${
                data.error_message || ""
            }`
        );
    }

    const reviews = data.result?.reviews || [];
    const placeName = data.result?.name || "";
    const rating = data.result?.rating || 0;
    const totalRatings = data.result?.user_ratings_total || 0;

    return {
        placeName,
        rating,
        totalRatings,
        reviews: reviews,
        note: `Showing ${reviews.length} of ${totalRatings} total reviews (Places API limit: 5 reviews maximum)`,
    };
}

export async function GET() {
    try {
        if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Google Places API credentials are not configured.",
                    instructions:
                        "Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID environment variables.",
                },
                { status: 500 }
            );
        }

        const result = await getReviewsFromPlacesAPI();
        return NextResponse.json({
            success: true,
            method: "Google Places API",
            ...result,
        });
    } catch (error) {
        console.error("Error fetching Google Places reviews:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to fetch Google Places reviews",
            },
            { status: 500 }
        );
    }
}
