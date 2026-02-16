"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Designer",
      bio: "Creative director with 10+ years of experience in digital design",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "UX Specialist",
      bio: "User experience expert focused on research-driven design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Emma Rodriguez",
      role: "UI Designer",
      bio: "Interface designer passionate about accessible and beautiful design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "James Park",
      role: "Design Manager",
      bio: "Project manager ensuring seamless delivery and client satisfaction",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            OPAL
          </Link>
          <div className="flex items-center gap-8 hidden md:flex">
            <Link href="/about" className="text-sm hover:text-primary transition">
              About
            </Link>
            <Link href="/services" className="text-sm hover:text-primary transition">
              Services
            </Link>
            <Link href="/work" className="text-sm hover:text-primary transition">
              Work
            </Link>
            <Link href="/team" className="text-sm hover:text-primary transition font-medium">
              Team
            </Link>
            <Link href="/blog" className="text-sm hover:text-primary transition">
              Blog
            </Link>
            <Link href="/contact">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-widest">Meet The Team</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Talented Designers <span className="text-primary">Working</span> Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our diverse team brings together expertise, creativity, and a passion for creating exceptional digital
            experiences.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <Card
                key={idx}
                className="bg-background border-border overflow-hidden hover:border-primary/50 transition-all group"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-widest">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-widest">Our Culture</p>
          <h2 className="text-4xl font-bold mb-12">What We Believe In</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-3">100%</div>
              <p className="text-muted-foreground">Commitment to Excellence</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-3">∞</div>
              <p className="text-muted-foreground">Continuous Learning & Growth</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-3">♥</div>
              <p className="text-muted-foreground">Passion for What We Do</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-10">
            We're always looking for talented designers to join our team.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-primary font-bold text-lg mb-4">OPAL</h3>
              <p className="text-sm text-muted-foreground">Creating exceptional UI/UX design experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-muted-foreground hover:text-primary transition">
                    Work
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Pages</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/team" className="text-muted-foreground hover:text-primary transition">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Admin</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/admin/login" className="text-muted-foreground hover:text-primary transition">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground text-center">© 2025 Opal Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
