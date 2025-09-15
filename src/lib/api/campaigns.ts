import { Campaign, CreateCampaignData, UpdateCampaignData, CampaignLocation, ApiResponse } from '@/types/campaign';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_ENDPOINTS = {
  campaigns: {
    create: '/api/campaigns/create',
    getAll: '/api/campaigns/all',
    getBySlug: (slug: string) => `/api/campaigns/${slug}`,
    update: (id: string) => `/api/campaigns/update/${id}`,
    delete: (id: string) => `/api/campaigns/delete/${id}`,
  }
};

class CampaignApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'CampaignApiError';
  }
}

class CampaignApi {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new CampaignApiError(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof CampaignApiError) {
        throw error;
      }
      throw new CampaignApiError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  private async makeFormDataRequest<T>(
    url: string,
    formData: FormData
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new CampaignApiError(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof CampaignApiError) {
        throw error;
      }
      throw new CampaignApiError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  async createCampaign(
    campaignData: CreateCampaignData,
    creativeFile: File
  ): Promise<ApiResponse<Campaign>> {
    const formData = new FormData();
    formData.append('creative', creativeFile);
    formData.append('cta_text', campaignData.cta_text);
    formData.append('cta_link', campaignData.cta_link);
    formData.append('end_date', campaignData.end_date);
    formData.append('slug', campaignData.slug);
    formData.append('location', campaignData.location);

    const response = await this.makeFormDataRequest<{
      success: boolean;
      campaign: Campaign;
    }>(API_ENDPOINTS.campaigns.create, formData);

    return {
      success: response.success,
      data: response.campaign,
    };
  }

  async getAllCampaigns(location?: CampaignLocation): Promise<ApiResponse<Campaign[]>> {
    const queryParams = location ? `?location=${location}` : '';
    const response = await this.makeRequest<{
      campaigns: Campaign[];
    }>(`${API_ENDPOINTS.campaigns.getAll}${queryParams}`);

    return {
      success: true,
      data: response.campaigns,
    };
  }

  async getCampaignBySlug(
    slug: string,
    location?: CampaignLocation
  ): Promise<ApiResponse<Campaign>> {
    const queryParams = location ? `?location=${location}` : '';
    const response = await this.makeRequest<{
      campaign: Campaign;
    }>(`${API_ENDPOINTS.campaigns.getBySlug(slug)}${queryParams}`);

    return {
      success: true,
      data: response.campaign,
    };
  }

  async updateCampaign(
    campaignData: UpdateCampaignData,
    creativeFile?: File
  ): Promise<ApiResponse<Campaign>> {
    const formData = new FormData();
    
    if (creativeFile) {
      formData.append('creative', creativeFile);
    }
    
    formData.append('cta_text', campaignData.cta_text);
    formData.append('cta_link', campaignData.cta_link);
    formData.append('end_date', campaignData.end_date);
    formData.append('slug', campaignData.slug);
    formData.append('location', campaignData.location);

    const response = await this.makeFormDataRequest<{
      success: boolean;
      campaign: Campaign;
    }>(API_ENDPOINTS.campaigns.update(campaignData.id), formData);

    return {
      success: response.success,
      data: response.campaign,
    };
  }

  async deleteCampaign(id: string): Promise<ApiResponse<void>> {
    const response = await this.makeRequest<{
      success: boolean;
      message: string;
    }>(API_ENDPOINTS.campaigns.delete(id), {
      method: 'DELETE',
    });

    return {
      success: response.success,
      message: response.message,
    };
  }

  // Helper method for checking active campaigns per location
  async getActiveCampaignByLocation(location: CampaignLocation): Promise<Campaign | null> {
    try {
      const response = await this.getAllCampaigns(location);
      const campaigns = response.data || [];
      
      // Filter active campaigns (not expired)
      const activeCampaigns = campaigns.filter(campaign => {
        const endDate = new Date(campaign.end_date);
        const now = new Date();
        return endDate > now;
      });

      return activeCampaigns.length > 0 ? activeCampaigns[0] : null;
    } catch (error) {
      console.error('Error checking active campaign:', error);
      return null;
    }
  }
}

export const campaignApi = new CampaignApi();
export { CampaignApiError };