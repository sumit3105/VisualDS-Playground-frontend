import React from "react";
import { Button } from "../components/ui/Button";
import { Github, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturesSection from "../components/FeatureSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-200 p-6">
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-bold text-indigo-700 drop-shadow-sm mb-4">
                    VisualDS-Playground
                </h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    A modern, interactive platform to visualize <span className="text-indigo-600 font-semibold">data structures</span> and <span className="text-indigo-600 font-semibold">algorithms</span> for better understanding and learning.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <a
                        href="https://github.com/ZalaHarshpalsinh/VisualDS"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="flex items-center gap-2">
                            <Github size={18} />
                            GitHub
                        </Button>
                    </a>
                    <a
                        href="https://zalaharshpalsinh.github.io/VisualDS/docs/enduser/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="flex items-center gap-2">
                            <BookOpen size={18} />
                            Documentation
                        </Button>
                    </a>
                </div>
            </header>

            <section className="text-center mb-16">
                <h2 className="text-3xl font-semibold text-indigo-700 mb-4">📌 Project Purpose</h2>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                    We've developed <span className="font-medium text-indigo-600">VisualDS-Playground</span> as an educational platform to help users understand how core <span className="font-semibold text-indigo-600">data structures</span> and <span className="font-semibold text-indigo-600">algorithms</span> work — through dynamic, real-time visualizations.
                </p>
                <p className="text-md text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
                    Currently, the platform supports visualization of structures like <span className="font-semibold text-indigo-600">Arrays</span> and algorithms like <span className="font-semibold text-indigo-600">Searching</span> and <span className="font-semibold text-indigo-600">Sorting</span>, with many more coming soon!
                    All visualizations are powered by our custom-built <span className="font-semibold text-indigo-700">VisualDS library</span>, designed to offer step-by-step animated insights.
                </p>
                <p className="text-md text-gray-600 mt-4 max-w-3xl mx-auto">
                    Whether you're a <span className="font-medium text-indigo-600">student</span> learning DSA, a <span className="font-medium text-indigo-600">teacher</span> explaining concepts visually, or a <span className="font-medium text-indigo-600">competitive programmer</span> refining your logic — this platform is built for you.
                </p>

                <div className="mt-10">
                    <Link to="/dashboard">
                        <Button className="text-lg px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all">
                            Launch Playground 🚀
                        </Button>
                    </Link>
                </div>
            </section>

            <FeaturesSection />
        </div>
    );
}
