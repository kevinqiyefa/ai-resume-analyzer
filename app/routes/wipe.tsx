import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) return <div className="text-center text-lg mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">
                Authenticated as <span className="text-blue-600">{auth.user?.username}</span>
            </h1>

            <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Existing Files</h2>
                {files.length > 0 ? (
                    <div className="grid gap-3">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                            >
                                <p className="text-gray-800 font-medium">{file.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No files found.</p>
                )}
            </div>

            <div className="text-right">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                    onClick={handleDelete}
                >
                    Wipe App Data
                </button>
            </div>
        </div>
    );
};

export default WipeApp;