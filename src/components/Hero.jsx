import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { addToWaitlist } from "../util/Database";
import { toast } from "react-toastify";

export default function Hero({ content }) {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};

	const [emailInput, setEmailInput] = useState("");

	const handleFormSubmit = async (e) => {
		// Don't refresh the page
		e.preventDefault();

		if (!emailInput) return;

		addToWaitlist(emailInput)
			.then((data) => {
				console.log("Response from backend after adding to waitlist", data);
				toast.success("You have been added to the waitlist!");
				setEmailInput("");
			})
			.catch((error) => {
				console.error("Error adding to waitlist:", error);
				setEmailInput("");
				if (error?.code == "23505") {
					toast.success("You are already on the waitlist!");
				} else {
					toast.error(
						"Something went wrong. Please try again later or contact anushibin007@gmail.com."
					);
				}
			});
	};

	return (
		<section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-primary-700 to-accent-700 text-white overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full opacity-20"></div>
				<div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
			</div>

			<div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						ref={ref}
						variants={containerVariants}
						initial="hidden"
						animate={inView ? "visible" : "hidden"}
						className="text-center lg:text-left max-w-xl mx-auto lg:mx-0"
					>
						<motion.h1
							variants={itemVariants}
							className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
						>
							{content.title}
						</motion.h1>

						<motion.p
							variants={itemVariants}
							className="text-xl text-white/80 mb-8 leading-relaxed"
						>
							{content.subtitle}
						</motion.p>
						<form onSubmit={handleFormSubmit}>
							<motion.div
								variants={itemVariants}
								className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
							>
								<div className="relative flex-grow max-w-md">
									<input
										type="email"
										placeholder={content.emailPlaceholder}
										required
										className="w-full px-5 py-4 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
										value={emailInput}
										onChange={(e) => setEmailInput(e.target.value)}
									/>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="btn-primary bg-accent-600 hover:bg-accent-700 whitespace-nowrap"
								>
									{content.ctaButtonText}
								</motion.button>
							</motion.div>
						</form>

						<motion.p variants={itemVariants} className="mt-4 text-sm text-white/70">
							Join 500+ colleagues already on the waitlist
						</motion.p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="relative mx-auto lg:mx-0 max-w-lg"
					>
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
							<div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
								<div className="text-center">
									<img src="/img/splash.png" alt="Splash Image" />
								</div>
							</div>
						</div>

						{/* Floating elements for visual interest */}
						<div className="absolute -top-6 -right-6 w-24 h-24 rounded-xl bg-accent-500/30 backdrop-blur-md rotate-12"></div>
						<div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-xl bg-secondary-500/30 backdrop-blur-md -rotate-12"></div>
					</motion.div>
				</div>

				{/* Trust indicators */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="mt-16 pt-8 border-t border-white/20 text-center flex flex-wrap justify-center gap-8"
				>
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-white"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-sm">Verified colleagues only</span>
					</div>
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-white"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-sm">No spam listings</span>
					</div>
					<div className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-white"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-sm">Secure transactions</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
