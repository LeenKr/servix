import HeroSection from "../Components/landing/HeroSection";
import FeaturesSection from "../Components/landing/FeaturesSection";
import Navbar from "../Components/landing/Navbar";
import PricingSection from "../Components/landing/pricingSection";
import ContactSection from "../Components/landing/contactSection";
import Footer from "../Components/landing/footer";
import ScrollToTopButton from "../Components/landing/scrollToTopButton";



const LandingPage = () => (
  <div>
      <Navbar />
    <HeroSection />
    <FeaturesSection />
    <PricingSection/>
    <ContactSection/>
    <Footer/>
    <ScrollToTopButton/>
  </div>
);

export default LandingPage;
