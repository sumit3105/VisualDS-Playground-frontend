import React from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CardContent } from "../components/ui/CardContent";
import { Github, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturesSection from "../components/FeatureSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-200 p-6">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-sm">VisualDS-Playground</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    An interactive playground for visualizing data structures and algorithms using our custom library
                    <span className="text-indigo-600 font-semibold"> VisualDS</span>.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <a
                        href="https://github.com/ZalaHarshpalsinh/VisualDS"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="flex items-center gap-2">
                            <Github size={18} />
                        </Button>
                    </a>
                    <a
                        href="https://zalaharshpalsinh.github.io/VisualDS/docs/enduser/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="flex items-center gap-2">
                            <BookOpen size={18} /> Documentation
                        </Button>
                    </a>
                </div>
            </header>

            {/* <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <div className="text-indigo-600 text-3xl mb-4">🧠</div>
                            <h3 className="text-xl font-semibold ml-3 mb-2">Interactive DSA Visualizations</h3>
                            <CardContent>
                                Visualize classic and advanced data structures and algorithms like Linked Lists, Trees, Graphs, Sorting Algorithms, and more — all in real time with our custom VisualDS library.
                            </CardContent>
                        </Card>

                        <Card>
                            <div className="text-indigo-600 text-3xl mb-4">🛠️</div>
                            <h3 className="text-xl font-semibold mb-2">Create & Customize Playgrounds</h3>
                            <CardContent>
                                Build your own code playgrounds with custom titles and descriptions. Write and save your own algorithmic code and visualize its working instantly using the integrated editor.
                            </CardContent>
                        </Card>

                        <Card>
                            <div className="text-indigo-600 text-3xl mb-4">🗃️</div>
                            <h3 className="text-xl font-semibold mb-2">Playground Dashboard with CRUD</h3>
                            <CardContent>
                                Manage all your visualizations in one place. The dashboard allows you to Create, View, Update, and Delete playgrounds intuitively, giving full control over your learning workspace.
                            </CardContent>
                        </Card>

                        <Card>
                            <div className="text-indigo-600 text-3xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-2">Developer-Friendly Docs</h3>
                            <CardContent>
                                Comprehensive documentation is available to help you integrate and use the VisualDS library effectively in your own projects or extend the platform's capabilities.
                            </CardContent>
                        </Card>

                        <Card>
                            <div className="text-indigo-600 text-3xl mb-4">🌐</div>
                            <h3 className="text-xl font-semibold mb-2">Open Source Library</h3>
                            <CardContent>
                                VisualDS is open-source and available on GitHub. Contribute to development or explore the source code to learn how visualizations are powered internally.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section> */}

            <FeaturesSection />
            <div className="mt-12 text-center">
                <Link to="/dashboard">
                    <Button className="text-lg px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
}
