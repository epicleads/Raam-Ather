import { WhatsNewClient } from './whatsnew-client'

export interface VideoFeature {
  id: string
  title: string
  description: string
  videoPath: string
  category: 'performance' | 'design' | 'technology'
}

export interface SmartFeature {
  id: string
  title: string
  description?: string
  icon: string
  category: 'connectivity' | 'charging' | 'range'
}

export interface WhatsNewData {
  videoFeatures: VideoFeature[]
  smartFeatures: {
    connectivity: SmartFeature[]
    charging: SmartFeature
    range: SmartFeature
  }
}

interface WhatsNewServerProps {
  title?: string
  subtitle?: string
}

export function WhatsNewServer({ 
  title = "What's New in Ather 450",
  subtitle = "Experience the future of electric mobility with cutting-edge features and revolutionary technology"
}: WhatsNewServerProps) {
  
  const whatsNewData: WhatsNewData = {
    videoFeatures: [
      {
        id: 'traction-control',
        title: 'Multi-Mode Traction Control',
        description: 'Peak performance meets unshakeable confidence with 3 modes to glide across all roads - Rain, Road, & Rally.',
        videoPath: '/Ather-Assets/450/whatsnew/twocolors.mp4', // You can update this
        category: 'performance'
      },
      {
        id: 'new-colours',
        title: 'Two New Colours',
        description: 'Stealth Blue & Hyper Sand.',
        videoPath: '/Ather-Assets/450/whatsnew/newcolors.mp4', // You can update this
        category: 'design'
      },
      {
        id: 'magic-twist',
        title: 'Magic Twist™',
        description: 'One throttle to do it all - speed up and slow down. Experience a new twist to braking.',
        videoPath: '/Ather-Assets/450/whatsnew/magictwist.mp4', // You can update this
        category: 'technology'
      }
    ],
    smartFeatures: {
      connectivity: [
        {
          id: 'whatsapp-dash',
          title: 'WhatsApp on Dash',
          icon: 'whatsapp',
          category: 'connectivity'
        },
        {
          id: 'live-location',
          title: 'Share Live Location',
          icon: 'location',
          category: 'connectivity'
        },
        {
          id: 'ping-scooter',
          title: 'Ping My Scooter',
          icon: 'ping',
          category: 'connectivity'
        },
        {
          id: 'alexa-skills',
          title: 'Alexa Skills',
          icon: 'alexa',
          category: 'connectivity'
        },
        {
          id: 'call-decline',
          title: 'Call Decline with Message',
          icon: 'call',
          category: 'connectivity'
        }
      ],
      charging: {
        id: 'faster-charging',
        title: 'Faster Charging',
        description: '80% in 3 hr*',
        icon: 'charging',
        category: 'charging'
      },
      range: {
        id: 'higher-range',
        title: 'Higher Range',
        description: '159 km IDC Range',
        icon: 'range',
        category: 'range'
      }
    }
  }

  return (
    <>
      {/* What's New Section */}
      <section className="bg-black py-20 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 font-[Inter] tracking-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* What's New Content */}
            <WhatsNewClient data={whatsNewData} />
          </div>
        </div>
      </section>
    </>
  )
}

// Convenience export for easy importing
export default WhatsNewServer