import { useState, useEffect } from "react";
import { User, ArrowLeft, Save, Loader2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateUserProfile } from "../services/userService";
import {
    getPlaygrounds,
    addPlayground,
    updatePlayground,
} from "../services/playgroundService";
import toast from "react-hot-toast";
import PlaygroundCard from "../components/PlaygroundCard";
import Header from "../components/Header";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        imageUrl: "",
        id: null,
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [myPlaygrounds, setMyPlaygrounds] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentPlayground, setCurrentPlayground] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        (async () => {
            const user = await getProfile();
            setProfile(user);

            const data = await getPlaygrounds();
            const sortedData = data.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );

            setMyPlaygrounds(sortedData);
        })();
    }, [profile, setProfile]);

    const handleCreate = async (e) => {
        e.preventDefault();
        const newPlayground = await addPlayground(form.title, form.description, "");
        if (newPlayground)
            navigate("/playground", { state: newPlayground });
        else 
            toast.error("Playground creation failed");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updated = await updatePlayground(
                currentPlayground.codeId,
                form.title,
                form.description,
                currentPlayground.writtenCode
            );

            setMyPlaygrounds(
                myPlaygrounds.map((pg) =>
                    pg.codeId === updated.codeId ? updated : pg
                )
            );

            setShowUpdateModal(false);
            toast.success("Playground updated");
        } catch (error) {
            toast.error(`Update failed: ${error}`);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const openUpdateModal = (playground) => {
        setCurrentPlayground(playground);
        setForm({
            title: playground.codeTitle,
            description: playground.codeDescription,
        });
        setShowUpdateModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) return;

        try {
            setLoading(true);
            const updatedUser = await updateUserProfile(
                selectedImage,
                profile.name
            );
            setProfile(updatedUser);
            setSelectedImage(null);
            setPreviewUrl(null);
            toast.success("Profile image updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile image.");
        } finally {
            setLoading(false);
        }
    };

    const renderProfileImage = () => {
        if (previewUrl) {
            return (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                />
            );
        } else if (profile.imageUrl) {
            return (
                <img
                    src={profile.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            );
        } else {
            return <User size={48} className="text-indigo-600" />;
        }
    };

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-200 rounded-lg shadow">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <div className="flex-1">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-black hover:text-indigo-600 transition"
                        >
                            <ArrowLeft size={20} />
                            <span>Back</span>
                        </button>
                    </div>
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Profile
                        </h1>
                    </div>
                    <div className="flex-1" />
                </div>

                {/* Profile Image and Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center">
                        {renderProfileImage()}
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-2 text-lg text-gray-800 font-semibold">
                            <User size={20} />
                            <span>{profile.name || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Mail size={18} />
                            <span>{profile.email || "N/A"}</span>
                        </div>
                    </div>
                </div>


                {/* Form for Image Upload */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 flex justify-center">
                        <div>
                            <label className="flex justify-center text-md font-medium text-gray-700 mb-1">
                                Update Profile Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>
                    </div>
                    {selectedImage && (
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2
                                            className="animate-spin mr-2"
                                            size={18}
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} className="mr-2" />
                                        Save Image
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>

                {/* My Playgrounds */}
                <div className="max-w-5xl mx-auto space-y-6 mt-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-black text-2xl font-semibold">
                            Your Playgrounds
                        </h2>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                        >
                            + New Playground
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {myPlaygrounds.map((pg) => (
                            <PlaygroundCard
                                key={pg.codeId}
                                playground={pg}
                                onView={() =>
                                    navigate("/playground", { state: pg })
                                }
                                onEdit={() => openUpdateModal(pg)}
                            />
                        ))}
                    </div>
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <form
                            onSubmit={handleCreate}
                            className="bg-white p-6 rounded-lg space-y-4 w-full max-w-md"
                        >
                            <h3 className="text-lg font-bold">
                                Create New Playground
                            </h3>
                            <input
                                name="title"
                                required
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Title"
                            />
                            <input
                                name="description"
                                required
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Description"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-500 hover:text-gray-700 px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Update Modal */}
                {showUpdateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <form
                            onSubmit={handleUpdate}
                            className="bg-white p-6 rounded-lg space-y-4 w-full max-w-md"
                        >
                            <h3 className="text-lg font-bold">
                                Update Playground
                            </h3>
                            <input
                                name="title"
                                required
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Title"
                            />
                            <input
                                name="description"
                                required
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Description"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="text-gray-500 hover:text-gray-700 px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}