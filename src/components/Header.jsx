import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		document.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [scrolled]);

	return (
		<motion.header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				scrolled ? "bg-white shadow-soft py-3" : "bg-transparent py-5"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="container mx-auto px-4 flex justify-between items-center">
				<motion.a href="#" className="flex items-center" whileHover={{ scale: 1.05 }}>
					<span
						className={`text-2xl font-bold ${
							scrolled ? "text-primary-600" : "text-white"
						}`}
					>
						Sellez
					</span>
					<span
						className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
							scrolled ? "bg-primary-100 text-primary-700" : "bg-white/20 text-white"
						}`}
					>
						Internal Bazaar
					</span>
				</motion.a>

				<nav className="hidden md:flex items-center space-x-8">
					<NavLink href="#features" scrolled={scrolled}>
						Features
					</NavLink>
					<NavLink href="#how-it-works" scrolled={scrolled}>
						How It Works
					</NavLink>
					<NavLink href="#faq" scrolled={scrolled}>
						FAQ
					</NavLink>
					<motion.a
						href="#get-started"
						className="btn-primary"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Get Early Access
					</motion.a>
				</nav>

				<motion.button className="md:hidden text-primary-600" whileTap={{ scale: 0.9 }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</motion.button>
			</div>
		</motion.header>
	);
}

function NavLink({ href, children, scrolled }) {
	return (
		<motion.a
			href={href}
			className={`text-sm font-medium transition-colors ${
				scrolled ? "text-gray-700 hover:text-primary-600" : "text-white/80 hover:text-white"
			}`}
			whileHover={{ y: -2 }}
		>
			{children}
		</motion.a>
	);
}
