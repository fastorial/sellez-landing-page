import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function USPSection({ content }) {
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
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const getIcon = (iconName) => {
		switch (iconName) {
			case "shield-check":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				);
			case "no-symbol":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
						/>
					</svg>
				);
			case "lock-closed":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				);
			case "hand-raised":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
						/>
					</svg>
				);
			default:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				);
		}
	};

	return (
		<section id="why-sellez" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="section-title"
					>
						{content.title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="section-subtitle"
					>
						{content.subtitle}
					</motion.p>
				</div>

				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
				>
					{content.usps.map((usp, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="bg-white rounded-lg p-8 shadow-soft hover:shadow-medium transition-shadow duration-300"
							whileHover={{ y: -5, transition: { duration: 0.2 } }}
						>
							<div className="w-12 h-12 bg-primary-100 rounded-lg text-primary-600 flex items-center justify-center mb-6">
								{getIcon(usp.icon)}
							</div>
							<h3 className="text-xl font-semibold mb-3 text-gray-900">
								{usp.title}
							</h3>
							<p className="text-gray-600 leading-relaxed">{usp.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
