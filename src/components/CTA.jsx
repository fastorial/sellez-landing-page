import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { addToWaitlist } from "../util/Database";
import { toast } from "react-toastify";

export default function CTA({ content }) {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

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
		<section
			id="get-started"
			className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-3xl sm:text-4xl font-bold mb-6"
					>
						{content.title}
					</motion.h2>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
					>
						{content.subtitle}
					</motion.p>
					<form onSubmit={handleFormSubmit}>
						<motion.div
							ref={ref}
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
						>
							<div className="relative flex-grow max-w-md mx-auto sm:mx-0">
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
								className="bg-accent-600 hover:bg-accent-700 text-white font-medium px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 whitespace-nowrap"
							>
								{content.buttonText}
							</motion.button>
						</motion.div>
					</form>

					<motion.div
						initial={{ opacity: 0 }}
						animate={inView ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className="mt-8 text-sm text-white/70 flex items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clipRule="evenodd"
							/>
						</svg>
						Your data is secure and will never be shared
					</motion.div>
				</div>
			</div>
		</section>
	);
}
