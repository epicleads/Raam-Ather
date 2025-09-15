export interface LeadSubmissionData {
  name: string;
  phone: string;
  enquiry_type: string;
  description: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message?: string;
}

/**
 * Submit lead to epicleads.in API with URL tracking
 */
export async function submitLead(data: Omit<LeadSubmissionData, 'description'> & { 
  description?: string;
  additionalInfo?: Record<string, string | number | boolean>;
}): Promise<LeadSubmissionResponse> {
  console.log('🚨 OLD submitLead function called - redirecting to internal API');
  console.log('📋 Data received:', data);
  
  // REDIRECT ALL CALLS TO INTERNAL API ROUTE
  try {
    // Format phone number with +91 prefix
    const formattedPhone = data.phone.startsWith('+91') 
      ? data.phone 
      : `+91${data.phone}`;
    
    // Build description with additional info
    let fullDescription = data.description || 'General enquiry';
    
    // Add additional info if provided
    if (data.additionalInfo) {
      const additionalInfoString = Object.entries(data.additionalInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      
      if (fullDescription && fullDescription !== 'General enquiry') {
        fullDescription += `, ${additionalInfoString}`;
      } else {
        fullDescription = additionalInfoString;
      }
    }
    
    // Add source URL
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (currentUrl) {
      fullDescription += `, Source URL: ${currentUrl}`;
    }
    
    // Use our internal API route
    const payload = {
      customer_name: data.name.trim(),
      customer_mobile_number: formattedPhone,
      source: 'GOOGLE',
      sub_source: 'WEB',
      model_interested: 'General Lead',
      enquiry_type: data.enquiry_type,
      description: fullDescription.trim()
    };
    
    console.log('📋 Redirecting to internal API with payload:', payload);
    
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Internal API failed:', errorText);
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Internal API response:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Error in redirected submitLead:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
}

/**
 * Utility for test ride submissions to CRM based on location
 */
export async function submitTestRideLead(data: {
  name: string;
  mobileNumber: string;
  location: string;
  modelInterested: string;
}): Promise<LeadSubmissionResponse> {
  console.log('🚀 submitTestRideLead called with data:', data);
  
  try {
    // Format phone number with +91 prefix
    const formattedPhone = data.mobileNumber.startsWith('+91') 
      ? data.mobileNumber 
      : `+91${data.mobileNumber}`;
    
    // Use our internal API route to avoid CORS issues
    const payload = {
      customer_name: data.name.trim(),
      customer_mobile_number: formattedPhone,
      source: 'GOOGLE',
      sub_source: 'WEB',
      model_interested: data.modelInterested.toLowerCase(),
      location: data.location
    };
    
    console.log('📋 Payload for internal API:', payload);
    console.log('🔗 Calling internal API route...');
    
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📡 Internal API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Internal API failed:', errorText);
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Internal API response:', result);
    
    if (result.success) {
      console.log('🎉 Test ride lead submitted successfully via internal API');
      return {
        success: true,
        message: result.message || 'Lead submitted successfully'
      };
    } else {
      console.error('❌ Internal API returned success: false:', result.message);
      return {
        success: false,
        message: result.message || 'Failed to submit lead'
      };
    }
    
  } catch (error) {
    console.error('❌ Network or parsing error in submitTestRideLead:', error);
    
    // Type-safe error handling
    const errorDetails = {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
    
    console.error('🔍 Error details:', errorDetails);
    
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
}

/**
 * Utility for contact form submissions
 */
export async function submitContactLead(data: {
  name: string;
  phone: string;
  service: string;
  location: string;
  message?: string;
}): Promise<LeadSubmissionResponse> {
  console.log('🚀 submitContactLead called with data:', data);
  
  try {
    // Format phone number with +91 prefix
    const formattedPhone = data.phone.startsWith('+91') 
      ? data.phone 
      : `+91${data.phone}`;
    
    // Use our internal API route for contact leads too
    const payload = {
      customer_name: data.name.trim(),
      customer_mobile_number: formattedPhone,
      source: 'GOOGLE',
      sub_source: 'WEB',
      model_interested: data.service || 'General Enquiry', // Send service as model_interested per CRM requirements
      location: data.location, // Include location for CRM routing
      enquiry_type: data.service || 'General Enquiry',
      description: data.message || 'Contact form submission'
    };
    
    console.log('📋 Contact lead payload for internal API:', payload);
    console.log('🔗 Calling internal API route...');
    
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📡 Internal API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Internal API failed:', errorText);
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Internal API response:', result);
    
    if (result.success) {
      console.log('🎉 Contact lead submitted successfully via internal API');
      return {
        success: true,
        message: result.message || 'Contact request submitted successfully'
      };
    } else {
      console.error('❌ Internal API returned success: false:', result.message);
      return {
        success: false,
        message: result.message || 'Failed to submit contact request'
      };
    }
    
  } catch (error) {
    console.error('❌ Network or parsing error in submitContactLead:', error);
    
    // Type-safe error handling
    const errorDetails = {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
    
    console.error('🔍 Error details:', errorDetails);
    
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
}