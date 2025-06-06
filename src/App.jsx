import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import USPSection from "./components/USPSection";
import FeatureSection from "./components/FeatureSection";
import ComparisonSection from "./components/ComparisonSection";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Legal from "./components/Legal";
import Footer from "./components/Footer";
import content from "./content.json";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<div
			className={`min-h-screen ${
				isLoaded ? "opacity-100" : "opacity-0"
			} transition-opacity duration-500`}
		>
			<Header />
			<main>
				<Hero content={content.hero} />
				<FeatureSection content={content.features} />
				<USPSection content={content.uspSection} />
				<ComparisonSection content={content.comparison} />
				<HowItWorks content={content.howItWorks} />
				<FAQ content={content.faq} />
				<CTA content={content.cta} />
				<Legal content={content.legal} />
			</main>
			<Footer content={content.footer} />
			<ScrollToTop />
			<ToastContainer
				position="top-center"
				autoClose={false}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				theme="light"
			/>
		</div>
	);
}

export default App;
