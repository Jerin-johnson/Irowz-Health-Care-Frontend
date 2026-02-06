// pages/Blog.tsx   or   components/BlogPage.tsx
import React from "react";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";

const BlogPage: React.FC = () => {
  // You can later replace this with real data / props
  const featuredArticle = {
    title: "How Telemedicine is Transforming Rural Healthcare in India",
    excerpt:
      "Discover how our platform is bridging the gap between patients in remote areas and top specialists — with real case studies and 40% faster diagnosis times.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    date: "February 1, 2026",
    readTime: "8 min read",
    category: "Telemedicine",
    slug: "/blog/telemedicine-rural-india",
  };

  const articles = [
    {
      title: "AI-Powered Symptom Checker: Accuracy & Safety Explained",
      excerpt:
        "How we trained our model on 2.5M+ anonymized cases and achieved 94% alignment with top physicians.",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      date: "January 28, 2026",
      readTime: "6 min read",
      category: "AI in Healthcare",
      slug: "/blog/ai-symptom-checker",
    },
    {
      title: "The Future of Digital Prescriptions in India",
      excerpt:
        "Understanding ABHA integration, e-prescription laws, and how our platform ensures 100% compliance.",
      image:
        "https://images.unsplash.com/photo-1586776976039-3d7e0c471d7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      date: "January 15, 2026",
      readTime: "5 min read",
      category: "Regulations",
      slug: "/blog/digital-prescriptions-india",
    },
    {
      title: "5 Ways Our Platform Reduces No-Show Appointments",
      excerpt:
        "Automated reminders, easy rescheduling, patient education — real results from 120+ partnered hospitals.",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      date: "December 20, 2025",
      readTime: "4 min read",
      category: "Patient Experience",
      slug: "/blog/reduce-no-shows",
    },
    {
      title: "Mental Health Support: What Our Platform Offers in 2026",
      excerpt:
        "Anonymous chat, guided sessions, psychiatrist matching — breaking stigma one conversation at a time.",
      image:
        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      date: "December 10, 2025",
      readTime: "7 min read",
      category: "Mental Health",
      slug: "/blog/mental-health-2026",
    },
  ];

  const categories = [
    "All",
    "Telemedicine",
    "AI in Healthcare",
    "Patient Experience",
    "Regulations",
    "Mental Health",
    "Hospital Management",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            Health Insights & Updates
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
            Latest Healthcare
            <span className="text-blue-600 dark:text-blue-400"> Knowledge</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert articles, case studies, product updates and trends shaping
            the future of digital healthcare in India
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-x-auto">
          <div className="flex gap-3 md:gap-4 flex-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  cat === "All"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Tag size={16} />
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Featured Article */}
        <div className="mb-16 lg:mb-20">
          <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="md:flex">
              <div className="md:w-3/5 lg:w-2/5 h-64 md:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    {featuredArticle.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {featuredArticle.readTime}
                  </div>
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    {featuredArticle.category}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Read Article{" "}
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 lg:p-7">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {article.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Read more{" "}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more / Pagination placeholder */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Load More Articles →
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
