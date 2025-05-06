import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Legal({ content }) {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3, ease: "easeOut" },
		},
	};

	return (
		<section className="py-12 bg-gray-50 border-t border-gray-200">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					className="max-w-4xl mx-auto text-sm text-gray-500"
				>
					<motion.div variants={itemVariants} className="mb-4">
						<h3 className="font-semibold text-gray-700 mb-2">Disclaimer</h3>
						<p>{content.disclaimer}</p>
					</motion.div>

					<motion.div variants={itemVariants} className="mb-4">
						<h3 className="font-semibold text-gray-700 mb-2">Terms of Use</h3>
						<p>{content.terms}</p>
					</motion.div>

					<motion.div variants={itemVariants} className="mb-4">
						<h3 className="font-semibold text-gray-700 mb-2">Privacy Notice</h3>
						<p>{content.privacy}</p>
					</motion.div>

					<motion.div variants={itemVariants} className="mb-4">
						<h3 className="font-semibold text-gray-700 mb-2">Content Moderation</h3>
						<p>{content.moderation}</p>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="mt-8 p-4 bg-white rounded-lg shadow-soft"
					>
						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0 mt-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-primary-500"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<p className="text-gray-600">
									We use cookies to improve your experience. By continuing to use
									our site, you consent to our use of cookies in accordance with
									our privacy policy.
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
