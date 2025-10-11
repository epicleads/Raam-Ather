# Google Analytics 4 Conversion Tracking - Raam Ather

## Overview
Google Analytics (G-C6RZDEXVMD) is now configured to track **Book Test Ride** conversions for the marketing team.

---

## What Gets Tracked

### Event Name: `test_ride_booked`

**Triggered When:** User successfully submits the "Book Test Ride" form

**Event Parameters:**
```javascript
{
  event_category: 'Lead Generation',
  event_label: 'Rizta - Hyderabad',  // Example: Model - Location
  model: 'Rizta',                     // Selected scooter model
  location: 'Hyderabad',              // Selected location
  phone_number: '98XXXXXXXX',         // Customer phone number
  value: 1,                           // Conversion value
  currency: 'INR'                     // Currency
}
```

### Additional GTM Data Layer Event: `test_ride_conversion`

```javascript
{
  event: 'test_ride_conversion',
  lead_type: 'test_ride',
  model: 'Rizta',
  location: 'Hyderabad',
  phone_number: '98XXXXXXXX',
  timestamp: '2025-10-11T10:30:00.000Z'
}
```

---

## How to Verify Tracking is Working

### Method 1: Real-Time Events in GA4

1. Go to **Google Analytics Dashboard**
2. Navigate to: **Reports** → **Realtime**
3. On your website, submit a test ride form
4. Within seconds, you should see:
   - Event name: `test_ride_booked`
   - Event parameters showing model, location, etc.

### Method 2: Browser Console

1. Open your website
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Submit the test ride form
5. Look for this log:
```
✅ GA4 Conversion Tracked: {
  event: 'test_ride_booked',
  model: 'Rizta',
  location: 'Hyderabad'
}
```

### Method 3: Google Tag Assistant (Chrome Extension)

1. Install **Tag Assistant Legacy** Chrome extension
2. Open your website
3. Click the extension icon → Enable
4. Submit test ride form
5. Check if GA4 tags fire correctly

---

## Where Test Ride Form is Used

The Book Test Ride form appears in multiple places on the website:

1. **Homepage Hero Section** - "Book Test Ride" button
2. **Header (Desktop & Mobile)** - "Book Test Ride" button
3. **Sticky Action Bars** - Various pages
4. **Model Pages** - CTA buttons
5. **Any other page** - Global modal

All instances use the **same form component** (`TestRideFormModal.client.tsx`), so tracking works everywhere automatically! ✅

---

## What Data Marketing Team Can See in GA4

### Available Reports:

1. **Conversions Report**
   - Path: Reports → Engagement → Conversions
   - See total `test_ride_booked` events

2. **Custom Report by Model**
   - Create custom report filtering by `model` parameter
   - See which scooter models get most test ride requests

3. **Custom Report by Location**
   - Filter by `location` parameter
   - See Hyderabad vs Chennai performance

4. **Conversion Path**
   - See user journey before booking test ride
   - Identify which pages drive most conversions

---

## Setting Up Conversion Goals in GA4

### Step 1: Mark Event as Conversion

1. Go to **Admin** → **Events** (under Data Display)
2. Find event: `test_ride_booked`
3. Toggle **Mark as conversion** to ON
4. Save changes

### Step 2: Create Custom Audiences

Create audiences for retargeting:
- Users who triggered `test_ride_booked` event
- Segment by model or location
- Use for Google Ads campaigns

### Step 3: Set Up Conversion Value (Optional)

If you want to assign monetary value to each test ride:
1. Edit the conversion
2. Set default value (currently set to 1 INR in code)
3. Or modify in code if needed

---

## Technical Implementation Details

### Files Modified:

1. **`src/app/layout.tsx`**
   - Added GA4 script with ID: `G-C6RZDEXVMD`
   - Primary property for marketing conversion tracking
   - Secondary property: `G-KGK8PQ2QS3` (existing)

2. **`src/app/Components/test-ride-form/TestRideFormModal.client.tsx`**
   - Added `gtag` type declaration
   - Added conversion event on successful form submission
   - Added GTM Data Layer event
   - Added console logging for debugging

### Event Flow:

```
User fills form → Clicks "Book Test Ride" → 
Form validates → Submits to backend → 
Success response → 
  ├─ Meta Pixel event fires (existing)
  ├─ GA4 event fires: 'test_ride_booked' ✅ NEW
  └─ GTM Data Layer event fires ✅ NEW
```

---

## Troubleshooting

### Issue: Events not showing in GA4

**Solution:**
1. Check browser console for `✅ GA4 Conversion Tracked` log
2. Verify GA4 property ID is correct: `G-C6RZDEXVMD`
3. Clear browser cache and cookies
4. Wait up to 24-48 hours for data to appear in standard reports (Realtime should be instant)

### Issue: Events showing but no parameters

**Solution:**
1. Check console log shows all parameters
2. Verify GTM is not blocking custom parameters
3. Check if ad blockers are enabled (disable for testing)

### Issue: Want to change conversion value

**Solution:**
Edit line 165 in `TestRideFormModal.client.tsx`:
```javascript
value: 1,  // Change this number
```

---

## Contact for Support

- **Technical Issues**: Check console logs
- **GA4 Dashboard**: Contact marketing team admin
- **Custom Reports**: Request from analytics team

---

**Last Updated:** October 11, 2025  
**GA4 Property:** G-C6RZDEXVMD  
**Event Name:** test_ride_booked  
**Status:** ✅ Active and Tracking

---

## Quick Verification Checklist

- [ ] GA4 script loads on page (check Network tab)
- [ ] Test ride form submits successfully
- [ ] Console shows "✅ GA4 Conversion Tracked"
- [ ] Event appears in GA4 Realtime reports
- [ ] Event is marked as conversion in GA4
- [ ] Custom reports created for model/location analysis

