export interface Profile {
  id: string;
  updated_at: Date;
  username: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url?: any;
  bio: string;
  location?: any;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  followed_by_user: boolean;
  downloads: number;
  uploads_remaining: number;
  instagram_username: string;
  email: string;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
  };
}
