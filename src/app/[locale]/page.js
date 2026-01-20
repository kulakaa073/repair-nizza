import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutUs from "@/components/homepage/AboutUs";
import DreamRepair from "@/components/homepage/DreamRepair";
import Hero from "@/components/homepage/Hero";
import OurService from "@/components/homepage/OurService";
import OurApproach from "@/components/homepage/OurApproach";
import PortfolioSection from "@/components/homepage/PortfolioSection";
import StepToDream from "@/components/homepage/StepToDream";
import WeWorkWith from "@/components/homepage/WeWorkWith";
import BottomCTA from "@/components/shared/bottomCTA/BottomCTA";
import { client } from "@/sanityClient";
// import { getGoogleReviews, getGoogleReviewsPlaces } from "@/lib/api";
import {
    heroBlurCardQuery,
    portfolioProjectsQuery,
    projectReviewsQuery,
} from "@/lib/queries";
import Reviews from "@/components/homepage/Reviews";
import ProjectReviews from "@/components/homepage/ProjectReviews";

export async function generateMetadata({ params }) {
    const { locale } = params;

    return {
        title: {
            ru: "Ремонт под ключ | Solide Renovation",
            en: "Turnkey Renovation | Solide Renovation",
            fr: "Rénovation clé en main | Solide Renovation",
        }[locale],
        description: {
            ru: "Профессиональный ремонт и дизайн интерьера. От косметического ремонта до полной реконструкции. Создаем пространства, в которых хочется жить.",
            en: "Professional renovation and interior design. From cosmetic repairs to complete reconstruction. Creating spaces you want to live in.",
            fr: "Rénovation professionnelle et design d'intérieur. De la rénovation cosmétique à la reconstruction complète. Créer des espaces où vous voulez vivre.",
        }[locale],
    };
}

export default async function Home() {
    const heroBlurCardData = await client.fetch(heroBlurCardQuery);
    const portfolioData = await client.fetch(portfolioProjectsQuery);
    //const googleReviews = await getGoogleReviews();
    //const googleReviews = await getGoogleReviewsPlaces();
    //console.log(googleReviews);
    //const googleReviews = [];
    const projectReviews = await client.fetch(projectReviewsQuery);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow overflow-x-hidden">
                <Hero heroBlurCardData={heroBlurCardData} />
                <OurService />
                <PortfolioSection portfolioData={portfolioData} />
                <WeWorkWith />
                <DreamRepair />
                <AboutUs />
                <OurApproach />
                <ProjectReviews reviews={projectReviews} />
                <StepToDream />
            </main>
            <BottomCTA />
            <Footer />
        </div>
    );
}
