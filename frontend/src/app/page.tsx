import HeroSearch from "@/components/home/HeroSearch";
import CategorySection from "@/components/home/CategorySection";
import PopularLocations from "@/components/home/PopularLocations";
import FeaturedListings from "@/components/home/FeaturedListings";
import SellerCTA from "@/components/home/SellerCTA";

export default function Home() {
  return (
    <>
      {/* Hero with Search */}
      <HeroSearch />

      {/* Property Categories */}
      <CategorySection />

      {/* Popular Locations in Yogyakarta */}
      <PopularLocations />

      {/* Featured Properties with Filter */}
      <FeaturedListings title="Properti Pilihan" showFilter={true} />

      {/* Seller CTA Banner */}
      <SellerCTA />
    </>
  );
}
