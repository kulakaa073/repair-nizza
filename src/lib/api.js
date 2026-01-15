/**
 * Fetches Google reviews from the API route
 * @returns {Promise<Object|null>} Reviews data or null if fetch fails
 */
export async function getGoogleReviews() {
    try {
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL ||
            (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000");
        const response = await fetch(`${baseUrl}/api/google-reviews`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            console.error(
                "Failed to fetch Google reviews:",
                response.statusText
            );
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Google reviews:", error);
        return null;
    }
}
