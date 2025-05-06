import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HowItWorks({ content }) {
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
		<section id="how-it-works" className="py-20 bg-white">
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
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
				>
					{content.steps.map((step, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="relative"
							whileHover={{ y: -5, transition: { duration: 0.2 } }}
						>
							<div className="bg-white rounded-lg p-8 shadow-soft border border-gray-100 h-full">
								<div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-soft">
									{step.number}
								</div>
								<div className="pt-6 pb-2">
									<h3 className="text-xl font-semibold mb-4 text-gray-900">
										{step.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{step.description}
									</p>
								</div>

								{/* Connector line between steps (except the last one) */}
								{index < content.steps.length - 1 && (
									<div className="hidden md:block absolute top-1/2 right-0 w-1/2 h-1 bg-gradient-to-r from-primary-400 to-transparent z-0"></div>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
