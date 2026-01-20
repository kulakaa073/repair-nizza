import { NextResponse } from "next/server";

// Google My Business API configuration (OAuth)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_MY_BUSINESS_LOCATION = process.env.GOOGLE_MY_BUSINESS_LOCATION;

/**
 * Get access token for Google My Business API using OAuth2
 */
async function getAccessToken() {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
        throw new Error("Google OAuth credentials are not configured");
    }

    const tokenUrl = "https://oauth2.googleapis.com/token";
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: GOOGLE_REFRESH_TOKEN,
        grant_type: "refresh_token",
    });

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to get access token: ${error}`);
    }

    const data = await response.json();
    return data.access_token;
}

/**
 * Fetch reviews using Google My Business API (OAuth method)
 * Note: Requires verified business ownership and proper OAuth scopes
 */
async function getReviewsFromMyBusinessAPI() {
    if (!GOOGLE_MY_BUSINESS_LOCATION) {
        throw new Error("Google My Business location is not configured");
    }

    const accessToken = await getAccessToken();
    const url = `https://mybusiness.googleapis.com/v4/${GOOGLE_MY_BUSINESS_LOCATION}/reviews`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Google My Business API error: ${error}`);
    }

    const data = await response.json();
    return data.reviews || [];
}

export async function GET() {
    try {
        if (
            !GOOGLE_CLIENT_ID ||
            !GOOGLE_CLIENT_SECRET ||
            !GOOGLE_REFRESH_TOKEN ||
            !GOOGLE_MY_BUSINESS_LOCATION
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Google My Business API credentials are not configured.",
                    instructions:
                        "Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, and GOOGLE_MY_BUSINESS_LOCATION environment variables.",
                },
                { status: 500 }
            );
        }

        const reviews = await getReviewsFromMyBusinessAPI();
        return NextResponse.json({
            success: true,
            method: "Google My Business API",
            totalReviews: reviews.length,
            reviews: reviews,
        });
    } catch (error) {
        console.error("Error fetching Google reviews:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to fetch Google reviews",
            },
            { status: 500 }
        );
    }
}
