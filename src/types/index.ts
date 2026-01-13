export interface JobPost {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  deadline: string;
  apply_url: string;
  description: string;
  is_urgent: boolean;
  created_at: string;
  updated_at: string;
}

export interface TechReview {
  id: string;
  product_name: string;
  review_summary: string;
  verdict_score: number;
  affiliate_link: string;
  pros_list: string[];
  cons_list: string[];
  specs: Record<string, string>;
  product_image_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsLink {
  id: string;
  headline: string;
  source_name: string;
  external_url: string;
  published_date: string;
  curator_take: string | null;
  icon_name: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}
