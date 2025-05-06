import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ComparisonSection({ content }) {
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
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	return (
		<section className="py-20 bg-white">
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
					className="grid grid-cols-1 lg:grid-cols-3 gap-8"
				>
					{content.platforms.map((platform, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className={`rounded-lg p-8 ${
								index === 0
									? "bg-primary-600 text-white shadow-xl"
									: "bg-gray-100 text-gray-800"
							}`}
							whileHover={{ y: -5, transition: { duration: 0.2 } }}
						>
							<h3
								className={`text-xl font-bold mb-6 pb-4 border-b ${
									index === 0 ? "border-white/20" : "border-gray-300"
								}`}
							>
								{platform.name}
							</h3>
							<ul className="space-y-4">
								{platform.features.map((feature, i) => (
									<li
										key={i}
										className={`flex items-start gap-2 ${
											feature.startsWith("✓")
												? index === 0
													? "text-white"
													: "text-green-600"
												: index === 0
												? "text-white/70"
												: "text-gray-500"
										}`}
									>
										<span className="flex-shrink-0">
											{feature.substring(0, 1)}
										</span>
										<span>{feature.substring(2)}</span>
									</li>
								))}
							</ul>
							{index === 0 && (
								<motion.a
									href="#get-started"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="btn-primary mt-8 w-full py-3 px-4 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
								>
									Get Started
								</motion.a>
							)}
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
