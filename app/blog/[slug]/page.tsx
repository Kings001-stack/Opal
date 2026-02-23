import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation';
import { format } from "date-fns";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { BlogPost } from "@/lib/types";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .neq("slug", slug)
    .eq("published", true)
    .eq("category", post.category)
    .limit(3);

  // Calculate read time (rough estimate)
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-pink-500/15 via-transparent to-transparent blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E91E8C] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4 flex-wrap">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E91E8C]/10 text-[#E91E8C] rounded-full text-xs font-bold uppercase tracking-wider">
                  <Tag size={12} />
                  {post.category}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Calendar size={14} />
                {post.published_at ? format(new Date(post.published_at), 'MMMM dd, yyyy') : 'Draft'}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Clock size={14} />
                {readTime} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Author & Share */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-0.5">
                <img src="/aisha-portrait.jpg" alt="Opal" className="w-full h-full rounded-full object-cover border border-black" />
              </div>
              <div>
                <p className="font-medium text-white">Opal</p>
                <p className="text-gray-500 text-sm">Founder & Creative Director</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm hidden sm:block">Share:</span>
              <div className="flex gap-2">
                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:border-[#E91E8C]/50 transition-all"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image_url && (
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
              <img
                src={post.featured_image_url || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content Section with Sticky Sidebar */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
            {/* Main Content */}
            <div className="space-y-12">
              <article className="prose prose-invert prose-pink max-w-none">
                <div className="text-gray-300 whitespace-pre-line leading-relaxed text-xl space-y-8">
                  {post.content?.split('\n\n').map((paragraph: string, i: number) => {
                    if (i === 0) {
                      return (
                        <p key={i} className="text-gray-200 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-[#E91E8C] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="text-gray-300 leading-relaxed font-light">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>

              {/* Tags and Navigation */}
              <div className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {[post.category, "Design", "Innovation"].filter(Boolean).map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:border-[#E91E8C]/50 transition-all cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">Share this article:</span>
                  <div className="flex gap-2">
                    {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                      <button key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:border-[#E91E8C]/50 transition-all">
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="sticky top-32 space-y-8 hidden lg:block">
              {/* Author Card */}
              <div className="premium-card p-6 bg-white/[0.03]">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#E91E8C] mb-4">About the Author</h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-0.5">
                    <img src="/aisha-portrait.jpg" alt="Opal" className="w-full h-full rounded-full object-cover border-2 border-black" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Opal</h5>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Creative Director</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Design leader focused on building high-impact digital products and memorable brand experiences.
                </p>
                <Link href="/about">
                  <Button variant="outline" size="sm" className="w-full border-white/10 text-gray-400 hover:text-white rounded-full">
                    View Profile
                  </Button>
                </Link>
              </div>

              {/* Newsletter or Info */}
              <div className="premium-card p-6 border-pink-500/20 bg-pink-500/5">
                <h4 className="font-bold text-white mb-2">Want more like this?</h4>
                <p className="text-gray-400 text-sm mb-4">Get the latest design insights delivered to your inbox weekly.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#E91E8C]/50"
                  />
                  <Button className="w-full premium-btn h-11 text-sm rounded-xl">Subscribe</Button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold">Related Articles</h2>
              <Link href="/blog">
                <Button variant="outline" size="sm" className="border-white/10 text-gray-400 hover:text-white">
                  View All
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <article className="premium-card overflow-hidden group cursor-pointer h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.featured_image_url || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {relatedPost.category && (
                          <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-wider">
                            {relatedPost.category}
                          </span>
                        )}
                        <span className="text-gray-600 text-xs">
                          {format(new Date(relatedPost.published_at || relatedPost.created_at), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <h3 className="font-bold group-hover:text-[#E91E8C] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="premium-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E8C]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative">
              <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Work With Us</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Let's collaborate to create exceptional digital experiences together.
              </p>
              <Link href="/contact">
                <Button className="premium-btn text-lg px-10 py-6">
                  Get in Touch
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
