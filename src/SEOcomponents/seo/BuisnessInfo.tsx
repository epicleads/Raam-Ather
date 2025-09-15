// Centralized NAP (Name, Address, Phone) data for consistency across all pages
export const BUSINESS_INFO = {
  name: {
    primary: 'Raam Ather',
    full: 'Raam Ather Electric Scooter Dealership',
    legal: 'Raam Group Ather Dealership'
  },
  phone: {
    primary: '+91 90323 33833',
    formatted: '+91 903 233 3833',
    display: '090323 33833',
    whatsapp: '+919032333833'
  },
  locations: {
    hyderabad: {
      city: 'Hyderabad',
      state: 'Telangana',
      stateCode: 'TG',
      country: 'India',
      countryCode: 'IN',
      showrooms: [
        {
          id: 'hyderabad-somajiguda',
          name: 'Raam Ather Electric Scooter Showroom, Somajiguda',
          address: '6-3-885/7/B, G-2, Ground, Amit Plaza, Durga Nagar Colony, Somajiguda, Hyderabad, Telangana 500082',
          phone: '092400 13781',
          coordinates: { lat: 17.4306, lng: 78.4617 },
          hours: 'Mon-Sun: 9:00 AM - 8:30 PM',
          areas: ['Somajiguda', 'Ameerpet', 'Punjagutta']
        },
        {
          id: 'hyderabad-begumpet',
          name: 'Raam Ather Space - Electric Scooter Experience Center Begumpet',
          address: '1-10-7 & VISHRANTHI NILAYAM, Prakash Nagar, Begumpet, Secunderabad, Hyderabad, Telangana 500016',
          phone: '090323 33833',
          coordinates: { lat: 17.4443, lng: 78.4685 },
          hours: 'Mon-Sun: 9:00 AM - 7:00 PM',
          areas: ['Begumpet', 'Secunderabad', 'Paradise Circle']
        },
        {
          id: 'hyderabad-srinagar',
          name: 'Raam Ather Space - Electric Scooter Experience Center Sri Nagar Colony',
          address: 'Plot no: 311 & 312, Phase 3, Sri Nagar Colony, Kamalapuri Colony, Banjara Hills, Hyderabad, Telangana 500073',
          phone: '090323 33833',
          coordinates: { lat: 17.4200, lng: 78.4478 },
          hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
          areas: ['Banjara Hills', 'Jubilee Hills', 'Road No. 12']
        },
        {
          id: 'hyderabad-shaikpet',
          name: 'Raam Ather - Authorised Dealer of Raam Electric Two wheelers Shaikpet',
          address: 'Shaikpet, Toli Chowki, Hyderabad, Telangana 500008',
          phone: '090323 33833',
          coordinates: { lat: 17.3700, lng: 78.4200 },
          hours: 'Mon-Sun: 9:00 AM - 7:00 PM',
          areas: ['Shaikpet', 'Toli Chowki', 'Golconda']
        },
        {
          id: 'hyderabad-kompally',
          name: 'Raam Ather Electric Scooter Showroom, Kompally',
          address: 'ATHARV PRIDE, Plot No:5 S.Y No:160 Pillar No:12 Kompally, Malkajgiri, Mandal, Telangana 500014',
          phone: '090323 33833',
          coordinates: { lat: 17.5425, lng: 78.4911 },
          hours: 'Mon-Sun: 9:00 AM - 8:30 PM',
          areas: ['Kompally', 'Quthbullapur', 'Alwal']
        }
      ],
      serviceAreas: [
        'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Kondapur',
        'Kukatpally', 'Secunderabad', 'Begumpet', 'Somajiguda', 'Madhapur',
        'Uppal', 'LB Nagar', 'Kompally', 'Miyapur', 'Ameerpet', 'SR Nagar',
        'Punjagutta', 'Nizampet', 'Bachupally', 'Manikonda'
      ]
    },
    chennai: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      stateCode: 'TN',
      country: 'India',
      countryCode: 'IN',
      showrooms: [
        {
          id: 'chennai-tnagar',
          name: 'Raam Ather T. Nagar Experience Center',
          address: 'Ranganathan Street, T. Nagar, Chennai - 600017',
          phone: '090323 33833',
          coordinates: { lat: 13.0418, lng: 80.2341 },
          hours: 'Mon-Sun: 9:00 AM - 8:30 PM',
          areas: ['T. Nagar', 'Pondy Bazaar', 'Mambalam']
        },
        {
          id: 'chennai-annanagar',
          name: 'Raam Ather Anna Nagar Experience Center',
          address: '2nd Avenue, Anna Nagar, Chennai - 600040',
          phone: '090323 33833',
          coordinates: { lat: 13.0878, lng: 80.2088 },
          hours: 'Mon-Sun: 9:00 AM - 8:00 PM',
          areas: ['Anna Nagar', 'Kilpauk', 'Aminjikarai']
        }
      ],
      serviceAreas: [
        'T. Nagar', 'Anna Nagar', 'Velachery', 'OMR', 'Porur', 'Tambaram',
        'Chromepet', 'Adyar', 'Sholinganallur', 'Thoraipakkam', 'Perungudi',
        'Guindy', 'Nungambakkam', 'Mylapore', 'Alwarpet', 'Kodambakkam'
      ]
    }
  },
  social: {
    facebook: 'https://www.facebook.com/raamather',
    instagram: 'https://www.instagram.com/raamather',
    youtube: 'https://www.youtube.com/@raamather',
    linkedin: 'https://www.linkedin.com/company/raamather',
    twitter: 'https://www.twitter.com/raamather'
  },
  website: 'https://raamather.com',
  email: 'info@raamather.com',
  established: '2020'
}

// NAP Component for consistent display
interface NAPProps {
  location?: 'hyderabad' | 'chennai'
  showroom?: string
  variant?: 'full' | 'minimal' | 'contact'
  className?: string
}

export default function NAP({ location, showroom, variant = 'full', className = '' }: NAPProps) {
  const info = BUSINESS_INFO

  if (variant === 'minimal') {
    return (
      <div className={`text-center ${className}`}>
        <div className="font-bold text-lg">{info.name.primary}</div>
        <div className="text-blue-600 font-semibold">{info.phone.display}</div>
      </div>
    )
  }

  if (variant === 'contact') {
    return (
      <div className={className}>
        <h3 className="font-bold text-xl mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold">Phone:</span>
            <a href={`tel:${info.phone.primary}`} className="text-blue-600 hover:underline">
              {info.phone.display}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">Email:</span>
            <a href={`mailto:${info.email}`} className="text-blue-600 hover:underline">
              {info.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">Website:</span>
            <a href={info.website} className="text-blue-600 hover:underline">
              {info.website}
            </a>
          </div>
        </div>
      </div>
    )
  }

  const locationInfo = location ? info.locations[location] : null
  const showroomInfo = locationInfo && showroom ? 
    locationInfo.showrooms.find(s => s.id === showroom) : null

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {info.name.full}
        </h3>
        {locationInfo && (
          <p className="text-lg text-gray-600">
            {locationInfo.city}, {locationInfo.state}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {showroomInfo ? (
          <>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
              <p className="text-gray-600">{showroomInfo.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <a href={`tel:${showroomInfo.phone}`} className="text-blue-600 hover:underline">
                {showroomInfo.phone}
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
              <p className="text-gray-600">{showroomInfo.hours}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <a href={`tel:${info.phone.primary}`} className="text-blue-600 hover:underline text-lg">
                {info.phone.display}
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <a href={`mailto:${info.email}`} className="text-blue-600 hover:underline">
                {info.email}
              </a>
            </div>
            {locationInfo && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {locationInfo.serviceAreas.slice(0, 10).map((area) => (
                    <span key={area} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                  {locationInfo.serviceAreas.length > 10 && (
                    <span className="text-gray-500 text-sm">
                      +{locationInfo.serviceAreas.length - 10} more areas
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
        <div className="flex gap-4">
          {Object.entries(info.social).map(([platform, url]) => (
            <a key={platform} href={url} 
               className="text-gray-400 hover:text-gray-600 transition-colors"
               target="_blank" rel="noopener noreferrer">
              <span className="capitalize">{platform}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}