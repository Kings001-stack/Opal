export interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  featured_image_url?: string;
  client_name: string;
  results?: string;
  technologies?: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string;
  company_name?: string;
  content: string;
  rating: number;
  image_url?: string;
  order_index: number;
  created_at: string;
}

export interface Booking {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  project_type: string;
  project_description: string;
  budget?: string;
  timeline?: string;
  additional_notes?: string;
  status: "pending" | "contacted" | "in-progress" | "completed";
  whatsapp_sent: boolean;
  email_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role?: string;
  bio?: string;
  image_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}
