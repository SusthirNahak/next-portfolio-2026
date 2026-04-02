"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/effects/Reveal";
import { motion } from "framer-motion";

import { ExternalLink } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
};

export default function OpenSource() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/SusthirNahak/repos?sort=updated")
      .then((res) => res.json())
      .then((data) => {
        // filter + limit (optional)
        const filtered = data
          .filter((repo: Repo) => !repo.name.includes("test"))
          .slice(0, 6);

        setRepos(filtered);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-28 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Open <span className="text-cyan-400">Source</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real projects and contributions pulled directly from GitHub.
            </p>
          </div>
        </Reveal>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading repositories...</p>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-white/10 bg-[#0b1220] p-6 hover:border-cyan-400/40 transition duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-cyan-400"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1.01.11-.78.42-1.32.76-1.63-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.5.12-3.13 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.63.24 2.83.12 3.13.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>

                <a href={repo.html_url} target="_blank">
                  <ExternalLink
                    size={18}
                    className="text-gray-400 group-hover:text-white transition"
                  />
                </a>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {repo.name}
              </h3>

              {/* Desc */}
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {repo.description || "No description available."}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {repo.language && (
                  <span className="text-xs px-3 py-1 border border-white/10 rounded-md text-gray-300">
                    {repo.language}
                  </span>
                )}
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between text-sm text-gray-400 border-t border-white/10 pt-4">
                <span>⭐ {repo.stargazers_count}</span>

                <a
                  href={repo.html_url}
                  target="_blank"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  View Code →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/SusthirNahak"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-cyan-400"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1.01.11-.78.42-1.32.76-1.63-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.5.12-3.13 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.63.24 2.83.12 3.13.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
