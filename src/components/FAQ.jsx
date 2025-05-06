import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FAQ({ content }) {
	const [openIndex, setOpenIndex] = useState(null);
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const toggleQuestion = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

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

	return (
		<section id="faq" className="py-20 bg-gray-50">
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
					className="max-w-3xl mx-auto"
				>
					{content.questions.map((item, index) => (
						<motion.div key={index} variants={itemVariants} className="mb-4">
							<motion.button
								className={`w-full text-left p-6 rounded-lg flex justify-between items-center ${
									openIndex === index
										? "bg-primary-50 text-primary-700"
										: "bg-white hover:bg-gray-100"
								} transition-colors shadow-soft`}
								onClick={() => toggleQuestion(index)}
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.99 }}
							>
								<span className="font-semibold text-lg">{item.question}</span>
								<span
									className={`transform transition-transform ${
										openIndex === index ? "rotate-180" : ""
									}`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</span>
							</motion.button>

							<AnimatePresence>
								{openIndex === index && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<div className="p-6 bg-white border-t border-gray-100 rounded-b-lg">
											<p className="text-gray-600">{item.answer}</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
