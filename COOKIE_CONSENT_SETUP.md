# Cookie Consent & Meta Pixel Setup Guide

This guide explains how to complete the setup of the cookie consent system and Meta Pixel integration for retargeting.

## 🚀 Features Implemented

### ✅ Cookie Consent System
- **Auto-popup after 10 seconds** - Appears on left side (desktop) and bottom (mobile)
- **Muted color design** - Slate/gray theme with professional appearance
- **Granular controls** - Essential, Analytics, and Marketing cookie categories
- **Local storage persistence** - Remembers user preferences
- **GDPR compliant** - Proper consent management

### ✅ Meta Pixel Integration
- **Facebook/Instagram retargeting** - Track website visitors for ad targeting
- **Custom events tracking** - Test rides, calculator usage, contact forms
- **Consent-based loading** - Only loads when user accepts marketing cookies
- **Custom audiences** - Build audiences of interested customers

### ✅ Event Tracking
- **Test Ride Requests** - Track leads with model and location data
- **EMI Calculator Usage** - Track high-intent user behavior
- **Contact Form Submissions** - Track general inquiries
- **High-Intent Actions** - Track premium user engagement

## 🔧 Required Configuration

### 1. Facebook Pixel Setup

1. **Get your Facebook Pixel ID:**
   - Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
   - Create or find your Pixel ID (format: 1234567890123456)

2. **Add to environment variables:**
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_FB_PIXEL_ID=YOUR_ACTUAL_PIXEL_ID_HERE
   ```

3. **Update the pixel ID in MetaPixel.tsx:**
   ```typescript
   // Replace in src/app/Components/CookieConsent/MetaPixel.tsx
   const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "YOUR_PIXEL_ID_HERE";
   ```

### 2. Custom Events Configuration

The following events are automatically tracked:

#### Test Ride Events
```typescript
// Tracked when user submits test ride form
trackAtherEvents.testRideRequest(model, location, phone)
```

#### Calculator Events  
```typescript
// Tracked when user uses EMI calculator (debounced)
trackAtherEvents.calculatorUsage(vehiclePrice, estimatedModel)
```

#### Contact Events
```typescript
// Tracked when user submits contact form
trackAtherEvents.contactForm(inquiryType)
```

### 3. Cookie Banner Configuration

The cookie consent appears:
- **Desktop:** Left side of screen, center-aligned
- **Mobile:** Bottom of screen, full width
- **Timing:** 10 seconds after page load
- **Persistence:** Remembers choice for 180 days

## 📱 Facebook Ads Manager Setup

### 1. Create Custom Audiences

1. **Website Visitors:**
   - Go to Ads Manager > Audiences > Create Audience > Custom Audience
   - Select "Website" as source
   - Choose "All website visitors" for broad retargeting

2. **Test Ride Interested:**
   - Create audience with custom event: "TestRideRequest"
   - Use this for high-intent retargeting campaigns

3. **Calculator Users:**
   - Create audience with custom event: "EMICalculatorUsed"  
   - Target these users with financing offers

### 2. Create Lookalike Audiences

1. **Based on Test Ride Leads:**
   - Use "TestRideRequest" custom audience as source
   - Create 1% lookalike in India (or your target regions)

2. **Based on Website Visitors:**
   - Use website visitors audience as source
   - Create broader lookalike for awareness campaigns

### 3. Campaign Suggestions

#### Campaign 1: Retargeting Website Visitors
- **Objective:** Traffic or Conversions
- **Audience:** Website visitors (last 30 days)
- **Ad Content:** Highlight Ather benefits, test ride CTA
- **Placements:** Facebook Feed, Instagram Feed/Stories

#### Campaign 2: Test Ride Retargeting  
- **Objective:** Conversions
- **Audience:** Users who started but didn't complete test ride booking
- **Ad Content:** Special offers, limited-time promotions
- **Placements:** Facebook/Instagram Feed (high-intent users)

#### Campaign 3: Lookalike Prospecting
- **Objective:** Traffic or Lead Generation
- **Audience:** Lookalike of test ride leads (1-2%)
- **Ad Content:** Educational content about electric mobility
- **Placements:** All available placements

## 🎯 Tracking Events Reference

### Available Tracking Functions

```typescript
import { trackAtherEvents } from './Components/CookieConsent/MetaPixel';

// Test ride tracking
trackAtherEvents.testRideRequest('450X', 'Hyderabad', '9876543210');

// Calculator usage
trackAtherEvents.calculatorUsage(120000, '450X');

// Contact form
trackAtherEvents.contactForm('service_inquiry');

// Product views
trackAtherEvents.productView('450X', 'Electric Scooter');

// High-intent actions
trackAtherEvents.highIntentAction('view_pricing', '450X');

// Service interest
trackAtherEvents.serviceInterest('annual_maintenance');
```

## 🔍 Testing & Verification

### 1. Test Cookie Consent
1. Clear browser storage for your site
2. Visit the website
3. Wait 10 seconds - banner should appear
4. Test Accept/Decline functionality
5. Check browser localStorage for consent preferences

### 2. Test Meta Pixel
1. Install Facebook Pixel Helper browser extension
2. Accept marketing cookies on your site
3. Check if pixel fires correctly
4. Submit test ride form - verify "Lead" event fires
5. Use EMI calculator - verify "ViewContent" event fires

### 3. Verify in Events Manager
1. Go to Facebook Events Manager
2. Check your Pixel ID is receiving events
3. Look for custom events: "TestRideRequest", "EMICalculatorUsed"
4. Verify event parameters are correct

## 📊 Expected Results

### Immediate Benefits:
- **Visitor Tracking:** All website visitors become retargetable
- **Lead Quality:** Better lead scoring with event data
- **Custom Audiences:** Build audiences based on actual behavior

### Long-term Benefits:
- **Lower CPA:** Retargeting typically has 2-3x better conversion rates
- **Better ROAS:** Lookalike audiences based on actual customers
- **Customer Journey:** Full funnel tracking from awareness to purchase

## 🔒 Privacy & Compliance

### GDPR Compliance:
- ✅ Clear consent mechanism
- ✅ Granular cookie controls  
- ✅ Opt-out functionality
- ✅ Data retention policies explained
- ✅ Cookie policy documentation

### Data Security:
- No PII stored in cookies without consent
- All tracking respects user preferences
- Data retention follows platform standards

## 🛠️ Troubleshooting

### Common Issues:

1. **Pixel not firing:**
   - Check environment variable is set
   - Verify user has accepted marketing cookies
   - Check browser console for errors

2. **Events not appearing:**
   - Wait up to 20 minutes for Events Manager
   - Check event parameters are correct
   - Verify pixel is active and not in learning mode

3. **Cookie banner not showing:**
   - Clear browser localStorage
   - Check JavaScript console for errors
   - Verify component is properly imported

## 📞 Support

For technical support with this implementation:
- Check Facebook Pixel Helper extension
- Review Events Manager diagnostics
- Test in incognito mode for fresh state

---

**Next Steps:**
1. Add your Facebook Pixel ID to environment variables
2. Test the complete flow in incognito mode
3. Set up Facebook Ads campaigns using the custom audiences
4. Monitor performance and optimize based on data

This implementation provides enterprise-level tracking and retargeting capabilities while maintaining full privacy compliance.