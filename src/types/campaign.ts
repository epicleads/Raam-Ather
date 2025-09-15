export type CampaignLocation = 'chennai' | 'hyderabad';
export type MediaType = 'image' | 'video';

export interface Campaign {
  id: string;
  slug: string;
  desktop_banner_url?: string;
  mobile_banner_url?: string;
  creative_url: string;
  media_type: MediaType;
  cta_text: string;
  cta_link: string;
  end_date: string;
  location: CampaignLocation;
  created_at: string;
  updated_at?: string;
}

export interface CreateCampaignData {
  cta_text: string;
  cta_link: string;
  end_date: string;
  slug: string;
  location: CampaignLocation;
}

export interface UpdateCampaignData extends CreateCampaignData {
  id: string;
}

export interface CampaignFormData {
  campaign_name: string;
  slug: string;
  cta_text: string;
  cta_link: string;
  end_date: string;
  location: CampaignLocation;
  media_type: MediaType;
  desktop_creative?: File;
  mobile_creative?: File;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CampaignStats {
  views: number;
  clicks: number;
  ctr: number;
  leads: number;
}