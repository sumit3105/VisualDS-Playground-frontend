import { motion } from "framer-motion";

const featureData = [
  {
    emoji: "🧠",
    title: "Interactive DSA Visualizations",
    description:
      "Visualize classic and advanced data structures and algorithms like Linked Array, Searching Algorithms, Sorting Algorithms, and more — all in real time with our custom VisualDS library.",
  },
  {
    emoji: "🛠️",
    title: "Create & Share Playgrounds",
    description:
      "Build your own code playgrounds with custom titles and descriptions. Copy impressive playgrounds of others. Write and save your own algorithmic code and visualize its working instantly using the integrated editor.",
  },
  {
    emoji: "🗃️",
    title: "Playground Dashboard",
    description:
      "Manage all your visualizations in one place. The dashboard allows you to Create, View and Update playgrounds intuitively, giving full control over your learning workspace.",
  },
  {
    emoji: "📚",
    title: "Developer-Friendly Docs",
    description:
      "Comprehensive documentation is available to help you integrate and use the VisualDS library effectively in your own projects or extend the platform's capabilities.",
  },
  {
    emoji: "🌐",
    title: "Open Source Library",
    description:
      "VisualDS is open-source and available on GitHub. Contribute to development or explore the source code to learn how visualizations are powered internally.",
  },
  {
    emoji: "🤖",
    title: "AI Powered Algorithm Generation",
    description: "VisualDS-Playground Supports AI Powered algorithm generation for beginner who dive into the visualization without learning documentation for VisualDS library."
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.01 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="text-indigo-600 text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
