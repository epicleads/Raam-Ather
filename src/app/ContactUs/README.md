# ContactUs Page

## Overview

The ContactUs page is a comprehensive contact interface for Raam Ather, featuring multiple contact methods, outlet locations, support resources, and interactive elements. All contact interactions are handled through popup modals to provide a seamless user experience without external navigation.

## Page Structure

```
ContactUs/
├── page.tsx                    # Main page with metadata and server component
├── ContactUsServer.tsx         # Server component with structured data
├── ContactUsClient.tsx         # Client component wrapper with PopupProvider
├── README.md                   # This documentation file
└── components/
    ├── ContactHero.tsx         # Hero section with main CTAs
    ├── ContactInfo.tsx         # Contact method cards
    ├── InteractiveOutletsMap.tsx # Outlet locations with filtering
    ├── SupportResourcesCards.tsx # Support and resource links
    ├── TrustCertification.tsx  # Trust badges and certifications
    ├── ContactFAQ.tsx          # Frequently asked questions
    └── FloatingActionButtons.tsx # Fixed floating action buttons
```

## Features

### 🎯 **Contact Methods**
- **Call Us**: Opens call popup for direct phone support
- **Email Us**: Opens contact form popup for email inquiries
- **Book Test Drive**: Opens test drive form popup
- **Visit Us**: Opens contact form for location inquiries

### 🗺️ **Interactive Outlets Map**
- Filter outlets by type (All, Showrooms, Service Centers)
- Expandable outlet cards with detailed information
- "Get Directions" and "Call Now" buttons (both open popups)
- Responsive design for mobile and desktop

### 🔧 **Support Resources**
- FAQ section with search functionality
- Knowledge hub and resource links
- Quick action buttons for emergency support
- Service booking and roadside assistance

### 📱 **Floating Action Buttons**
- Scroll-triggered visibility
- Expandable menu with quick actions
- Call, Email, and Test Drive options
- Scroll to top functionality

## Popup System

All contact interactions use a unified popup system powered by `PopupProvider`:

### Available Popups:
1. **Call Popup** (`openCallPopup()`)
   - Displays phone numbers and call options
   - Used for: "Call Us", "Call Now", "Emergency Call"

2. **Contact Form Popup** (`openFormPopup('contact')`)
   - General contact form
   - Used for: "Email Us", "Get Directions", "Visit Us"

3. **Test Drive Form Popup** (`openFormPopup('testdrive')`)
   - Test drive booking form
   - Used for: "Book Test Drive" buttons

### Popup Implementation:
```tsx
// Import the hook
import { usePopup } from '../../components/popups/PopupProvider';

// Use in component
const { openCallPopup, openFormPopup } = usePopup();

// Trigger popups
openCallPopup();                    // Opens call popup
openFormPopup('contact');           // Opens contact form
openFormPopup('testdrive');         // Opens test drive form
```

## Component Details

### ContactHero.tsx
- **Purpose**: Main hero section with primary CTAs
- **Key Features**:
  - Parallax background effect
  - "Book Test Ride" → Test drive popup
  - "Locate Dealer" → Smooth scroll to outlets map
  - Quick stats display
  - Responsive design

### ContactInfo.tsx
- **Purpose**: Contact method selection cards
- **Key Features**:
  - 4 contact method cards with gradient backgrounds
  - Hover animations and interactive effects
  - All buttons trigger appropriate popups
  - Mobile-friendly grid layout

### InteractiveOutletsMap.tsx
- **Purpose**: Display and filter outlet locations
- **Key Features**:
  - Filter by outlet type (Showrooms, Service Centers)
  - Expandable cards with detailed info
  - Service listings and contact options
  - Separate sections for Hyderabad and Chennai
  - Mobile slider view for small screens

### SupportResourcesCards.tsx
- **Purpose**: Support resources and quick actions
- **Key Features**:
  - Resource cards for FAQ, guides, financing
  - Quick action buttons for emergencies
  - All interactions through popups
  - Responsive grid layout

### FloatingActionButtons.tsx
- **Purpose**: Fixed floating action menu
- **Key Features**:
  - Appears after scrolling 300px
  - Expandable menu with 3 actions
  - Pulse animation on main button
  - Help text tooltip
  - Scroll to top functionality

### ContactFAQ.tsx
- **Purpose**: Frequently asked questions
- **Key Features**:
  - Search functionality
  - Expandable FAQ items
  - Category-based organization
  - Smooth animations

## Structured Data (SEO)

The page includes comprehensive structured data for search engines:

### LocalBusiness Schema:
- Business information (name, description, URLs)
- Contact points (phone, WhatsApp)
- Address information for multiple locations
- Opening hours and service areas
- Social media profiles

### FAQPage Schema:
- Frequently asked questions
- Structured answers for better search visibility
- Category-based organization

## Responsive Design

### Desktop (lg+):
- Multi-column layouts
- Hover effects and animations
- Full-featured interactive elements

### Tablet (md):
- 2-column grids
- Touch-friendly interactions
- Optimized spacing

### Mobile (sm):
- Single column layouts
- Slider interfaces for outlets
- Larger touch targets
- Simplified navigation

## Performance Optimizations

### Code Splitting:
- Lazy loading of heavy components
- Efficient bundle sizes

### Images:
- Optimized image formats
- Responsive image loading
- Proper alt tags for accessibility

### Animations:
- Hardware-accelerated transitions
- Reduced motion support
- Performance-conscious effects

## Accessibility

### ARIA Support:
- Proper ARIA labels
- Keyboard navigation
- Screen reader compatibility

### Visual Design:
- High contrast ratios
- Clear focus indicators
- Consistent typography

## Development Guidelines

### Adding New Contact Methods:
1. Add method to `contactMethods` array in `ContactInfo.tsx`
2. Define appropriate popup action
3. Test responsive behavior
4. Update documentation

### Modifying Popup Behavior:
1. Check `PopupProvider.tsx` for available actions
2. Extend provider if new popup types needed
3. Update component imports and usage
4. Test across all components

### Performance Considerations:
- Use `motion.div` sparingly for animations
- Implement proper loading states
- Optimize image sizes and formats
- Test on various devices and networks

## Testing

### Manual Testing Checklist:
- [ ] All contact buttons open correct popups
- [ ] Outlet filtering works correctly
- [ ] Mobile responsive design functions
- [ ] Floating buttons appear/hide correctly
- [ ] FAQ search functionality works
- [ ] All animations perform smoothly
- [ ] No external links open (all popups)

### Browser Compatibility:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

### Core Dependencies:
- React 18+
- Next.js 15+
- Framer Motion (animations)
- Heroicons (icons)
- TypeScript

### Internal Dependencies:
- `PopupProvider` (popup system)
- `FormContact` (contact form)
- Footer component

## Environment Variables

No specific environment variables required for the ContactUs page.

## Deployment Notes

### Build Verification:
```bash
npm run build
```

### Key Checks:
- All popups function correctly
- No external navigation occurs
- Responsive design works
- SEO structured data is valid
- Performance metrics are acceptable

## Future Enhancements

### Potential Improvements:
1. **Real-time Chat Integration**
2. **Map Integration** (Google Maps/MapBox)
3. **Appointment Booking System**
4. **Live Support Status Indicators**
5. **Multi-language Support**
6. **Advanced Analytics Tracking**

## Support

For technical support or questions about the ContactUs page:
- Check component documentation
- Review popup system implementation
- Test in development environment
- Verify responsive design across devices

---

*Last Updated: December 2024*
*Version: 1.0.0*