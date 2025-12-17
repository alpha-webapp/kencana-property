import HeroSearch from "@/components/home/HeroSearch";
import CategorySection from "@/components/home/CategorySection";
import PopularLocations from "@/components/home/PopularLocations";
import FeaturedListings from "@/components/home/FeaturedListings";
import SellerCTA from "@/components/home/SellerCTA";
import { getFeaturedProperties } from "@/lib/data";

export default async function Home() {
  // Fetch featured properties server-side
  const properties = await getFeaturedProperties(8);

  return (
    <>
      {/* Hero with Search */}
      <HeroSearch />

      {/* Property Categories */}
      <CategorySection />

      {/* Popular Locations in Yogyakarta */}
      <PopularLocations />

      {/* Featured Properties with Filter */}
      <FeaturedListings 
        title="Properti Pilihan" 
        showFilter={true} 
        properties={properties}
      />

      {/* Seller CTA Banner */}
      <SellerCTA />
    </>
  );
}
