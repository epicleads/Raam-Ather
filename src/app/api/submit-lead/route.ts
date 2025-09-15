import { NextRequest, NextResponse } from 'next/server';

// SECURITY FIX: Simple rate limiting store (in production, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // Max 10 requests per 15 minutes

  const clientData = rateLimit.get(ip);

  if (!clientData || now > clientData.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (clientData.count >= maxRequests) {
    return false;
  }

  clientData.count++;
  return true;
}

export async function POST(request: NextRequest) {
  console.log('🚀 Lead Submission API: Request received');

  try {
    // SECURITY FIX: Rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // SECURITY FIX: Input validation and sanitization
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Sanitize input strings
    const sanitizeString = (str: unknown): string => {
      if (typeof str !== 'string') return '';
      return str.trim().replace(/[<>]/g, '').substring(0, 200); // Basic XSS prevention
    };

    const sanitizedBody = {
      customer_name: sanitizeString(body.customer_name),
      customer_mobile_number: sanitizeString(body.customer_mobile_number),
      source: sanitizeString(body.source),
      sub_source: sanitizeString(body.sub_source),
      model_interested: sanitizeString(body.model_interested),
      location: sanitizeString(body.location),
      enquiry_type: sanitizeString(body.enquiry_type),
      description: sanitizeString(body.description)
    };

    console.log('📋 Lead data:', { name: sanitizedBody.customer_name, location: sanitizedBody.location, model: sanitizedBody.model_interested });

    // Validate required fields using sanitized data
    const { customer_name, customer_mobile_number, source, sub_source, model_interested, location, enquiry_type, description } = sanitizedBody;
    
    if (!customer_name || !customer_mobile_number || !source || !model_interested) {
      console.error('❌ Missing required fields:', { customer_name, customer_mobile_number, source, model_interested });
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the payload exactly as per requirements
    const payload: Record<string, string> = {
      customer_name: customer_name.trim(),
      customer_mobile_number: customer_mobile_number.startsWith('+91') 
        ? customer_mobile_number 
        : `+91${customer_mobile_number}`,
      source: source,
      sub_source: sub_source || 'WEB',
      subsource: sub_source || 'WEB', // Try both formats in case CRM expects this
      model_interested: model_interested.toLowerCase()
    };

    // Add optional fields for contact forms
    if (enquiry_type) {
      payload.enquiry_type = enquiry_type;
    }
    if (description) {
      payload.description = description;
    }

    console.log('📋 Submitting to CRM:', payload.customer_name, '|', payload.model_interested, '|', location);
    console.log('🔍 Full payload being sent to CRM:', JSON.stringify(payload, null, 2));
    console.log('🚨 IMPORTANT: sub_source in payload is:', payload.sub_source);

    // Determine endpoint based on location
    const baseUrl = location?.toLowerCase() === 'chennai' 
      ? 'https://chennai.epicleads.in'
      : 'https://epicleads.in';
    
    const primaryEndpoint = `${baseUrl}/api/submit_lead`;
    const fallbackEndpoint = `${baseUrl}/api/submit_enquiry`;
    
    console.log('🎯 CRM endpoint:', primaryEndpoint);
    
    try {
      const response = await fetch(primaryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Raam-Ather-Website/1.0'
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 CRM Response:', response.status);

      if (response.ok) {
        try {
          const result = await response.json();
          console.log('✅ Lead submitted successfully. ID:', result.lead_id || 'Generated');
          console.log('🔍 CRM Response details:', JSON.stringify(result, null, 2));
          console.log('🚨 CHECKING: Does CRM response contain sub_source?', result.sub_source || 'NOT PRESENT');
          console.log('🚨 CHECKING: Original payload sub_source was:', payload.sub_source);
          
          return NextResponse.json({
            success: true,
            message: result.message || 'Test ride booking confirmed! We will contact you soon.'
          });
        } catch {
          console.log('✅ Lead submitted successfully (non-JSON response)');
          
          return NextResponse.json({
            success: true,
            message: 'Test ride booking confirmed! We will contact you soon.'
          });
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Primary endpoint failed:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
      }
    } catch (primaryError) {
      console.error('💥 Primary endpoint network error:', primaryError);
    }

    // Try fallback endpoint
    console.log('🔄 Attempting fallback endpoint...');
    
    try {
      const fallbackResponse = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Raam-Ather-Website/1.0'
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 Fallback CRM Response status:', fallbackResponse.status);
      console.log('📡 Fallback CRM Response headers:', Object.fromEntries(fallbackResponse.headers.entries()));

      if (fallbackResponse.ok) {
        try {
          const fallbackResult = await fallbackResponse.json();
          console.log('✅ Fallback submission successful:', fallbackResult);
          
          return NextResponse.json({
            success: true,
            message: fallbackResult.message || 'Lead submitted successfully via fallback endpoint'
          });
        } catch {
          console.log('⚠️ Fallback endpoint succeeded but response is not JSON, trying to read as text');
          const textResult = await fallbackResponse.text();
          console.log('📄 Fallback endpoint text response:', textResult);
          
          return NextResponse.json({
            success: true,
            message: 'Lead submitted successfully via fallback endpoint'
          });
        }
      } else {
        const errorText = await fallbackResponse.text();
        console.error('❌ Fallback endpoint also failed:', {
          status: fallbackResponse.status,
          statusText: fallbackResponse.statusText,
          body: errorText
        });
      }
    } catch (fallbackError) {
      console.error('💥 Fallback endpoint network error:', fallbackError);
    }

    // If both endpoints fail, return error
    console.error('❌ Both primary and fallback endpoints failed');
    return NextResponse.json(
      { success: false, message: 'Failed to submit lead to CRM - both endpoints failed' },
      { status: 500 }
    );

  } catch (error) {
    console.error('💥 API Route critical error:', error);
    console.error('🔍 Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
    
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// SECURITY FIX: Handle preflight CORS requests with restricted origins
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'https://raamather.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
    },
  });
}