import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollToTop = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 200);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<motion.button
				className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-300"
				onClick={scrollToTop}
				style={{
					position: "fixed",
					bottom: "40px",
					right: "30px",
					display: visible ? "block" : "none",
				}}
			>
				↑
			</motion.button>
		</>
	);
};

export default ScrollToTop;
