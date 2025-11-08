export interface Post {
  id: string;
  content: string;
  platform: Platform[];
  status: PostStatus;
  scheduledFor?: Date;
  createdAt: Date;
  imageUrl?: string;
  hashtags: string[];
  engagement?: Engagement;
}

export interface Engagement {
  likes: number;
  comments: number;
  shares: number;
  reach: number;
}

export type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  suggestedHashtags: string[];
}

export type ContentCategory =
  | 'health-tips'
  | 'product-showcase'
  | 'patient-testimonial'
  | 'health-awareness'
  | 'company-news'
  | 'wellness-guide';

export interface Campaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  platforms: Platform[];
  posts: Post[];
  status: 'active' | 'completed' | 'upcoming';
}

export interface Analytics {
  totalPosts: number;
  totalEngagement: number;
  averageEngagementRate: number;
  topPerformingPost?: Post;
  platformBreakdown: {
    platform: Platform;
    posts: number;
    engagement: number;
  }[];
}
