import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
//github profile finder
const GithubIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
);

const App = () => {
    const [input, setInput] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = input.trim();
        if (!username) return;

        setLoading(true);
        setError(null);
        setProfile(null);

        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`,
            );

            if (response.status === 404) {
                throw new Error(`User "${username}" not found`);
            }
            if (!response.ok) {
                throw new Error("something went wrong, please try again later");
            }
            const data = await response.json();
            setProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center px-4">
            <div
                className="w-full max-w-md rounded-lg border border-white bg-
             p-6 shadow-2xl"
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5"
                >
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-100">
                        <GithubIcon className="h-5 w-5" />
                        GitHub Profile
                    </h2>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter GitHub username"
                        className="flex-1 bg-neutral-800 text-neutral-100 placeholder:text-neutral-600 outline-none text-md pt-4 pb-2 px-3 rounded-md border border-neutral-800 "
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xl text-amber-400 hover:bg-amber-500/20 transition-colors pt-4 pb-4"
                    >
                        {loading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Search className="h-3.5 w-3.5" />
                        )}
                        submit
                    </button>
                </form>

                <div className="mt-5">
                    {error && <p className="text-sm text-red-400">{error}</p>}

                    {profile && (
                        <div>
                            <div className="flex items-center gap-4">
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.login}
                                    className="h-16 w-16 rounded-full border border-neutral-800"
                                />

                                <div>
                                    <p className="text-neutral-100 font-semibold">
                                        {profile.name || profile.login}
                                    </p>
                                    <p className="text-neutral-500 text-sm">
                                        @{profile.login}
                                    </p>
                                </div>
                            </div>

                            {profile.bio && (
                                <p className="text-neutral-400 text-sm mt-3">
                                    {profile.bio}
                                </p>
                            )}

                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center">
                                    <p className="text-neutral-100 font-semibold">
                                        {profile.public_repos}
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        repos
                                    </p>
                                </div>
                                <div className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center">
                                    <p className="text-neutral-100 font-semibold">
                                        {profile.followers}
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        followers
                                    </p>
                                </div>
                                <div className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-center">
                                    <p className="text-neutral-100 font-semibold">
                                        {profile.following}
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        following
                                    </p>
                                </div>
                            </div>
                            {profile.location && (
                                <p className="text-neutral-400 text-sm mt-3">
                                    📍 {profile.location}
                                </p>
                            )}
                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 mt-4 text-amber-400 text-sm hover:underline"
                            >
                                <GithubIcon className="h-4 w-4" />
                                View GitHub Profile
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
