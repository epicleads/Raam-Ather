"use client";

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePolicyModal({ isOpen, onClose }: CookiePolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Cookie Policy</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
              aria-label="Close policy"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] text-slate-700">
          <div className="prose prose-slate max-w-none">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">About This Policy</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                This Cookie Policy explains how Raam Ather (authorized franchise of Ather Energy) uses cookies 
                and similar technologies to recognize you when you visit our website. It explains what these 
                technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">What Are Cookies?</h3>
              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit 
                a website. Cookies are widely used by website owners to make their websites work, or to work 
                more efficiently, as well as to provide reporting information.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Types of Cookies We Use</h3>
              
              {/* Essential Cookies */}
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Essential Cookies (Always Active)
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  These cookies are strictly necessary to provide you with services available through our website.
                </p>
                <ul className="text-xs text-green-600 space-y-1 ml-4">
                  <li>• Website functionality and security</li>
                  <li>• Session management and user preferences</li>
                  <li>• Form submissions and contact requests</li>
                  <li>• Test ride booking functionality</li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Marketing & Advertising Cookies
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  These cookies help us show you relevant ads and measure campaign effectiveness.
                </p>
                <ul className="text-xs text-blue-600 space-y-1 ml-4">
                  <li>• <strong>Facebook Pixel:</strong> Retargeting on Facebook and Instagram</li>
                  <li>• <strong>Custom Audiences:</strong> Show ads to interested users</li>
                  <li>• <strong>Conversion Tracking:</strong> Measure test ride bookings and inquiries</li>
                  <li>• <strong>Similar Audiences:</strong> Reach users similar to our customers</li>
                  <li>• Advertising personalization and optimization</li>
                </ul>
                <div className="mt-3 p-3 bg-blue-100 rounded border-l-4 border-blue-400">
                  <p className="text-xs text-blue-700">
                    <strong>Retargeting Benefits:</strong> When you visit our site, we can show you 
                    Ather energy solutions on Facebook and Instagram, helping you discover the perfect 
                    electric scooter for your needs.
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Analytics Cookies
                </h4>
                <p className="text-sm text-purple-700 mb-3">
                  These cookies help us understand how visitors use our website.
                </p>
                <ul className="text-xs text-purple-600 space-y-1 ml-4">
                  <li>• Website traffic analysis and user behavior</li>
                  <li>• Popular pages and content optimization</li>
                  <li>• EMI calculator usage patterns</li>
                  <li>• User journey mapping and improvements</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Why We Use Marketing Cookies</h3>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-slate-700 mb-3">
                  As an Ather Energy authorized franchise, we use marketing cookies to:
                </p>
                <ul className="text-sm text-slate-600 space-y-2 ml-4">
                  <li>• <strong>Show you relevant electric scooter options</strong> based on your interests</li>
                  <li>• <strong>Remind you about test rides</strong> if you showed interest but didn&apos;t book</li>
                  <li>• <strong>Share updates about new Ather models</strong> and special offers</li>
                  <li>• <strong>Help you complete your purchase journey</strong> with relevant information</li>
                  <li>• <strong>Build custom audiences</strong> of users interested in electric mobility</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Your Choices & Rights</h3>
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  You have the right to decide whether to accept or reject cookies. You can:
                </p>
                <ul className="text-sm text-slate-600 space-y-2 ml-4">
                  <li>• Accept all cookies for the best personalized experience</li>
                  <li>• Decline non-essential cookies (marketing and analytics)</li>
                  <li>• Change your preferences at any time</li>
                  <li>• Clear cookies from your browser settings</li>
                </ul>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700">
                    <strong>Note:</strong> Declining marketing cookies means you won&apos;t see personalized 
                    Ather ads on social media, but you&apos;ll still receive all website functionality.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Data Retention</h3>
              <p className="text-sm text-slate-600 mb-3">
                Cookie data is retained for different periods based on type:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• <strong>Essential cookies:</strong> Session-based or up to 1 year</li>
                <li>• <strong>Marketing cookies:</strong> Up to 180 days (Facebook Pixel standard)</li>
                <li>• <strong>Analytics cookies:</strong> Up to 2 years for usage patterns</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Contact Us</h3>
              <p className="text-sm text-slate-600 mb-3">
                If you have questions about our cookie policy or privacy practices:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border">
                <p className="text-sm text-slate-700">
                  <strong>Raam Ather - Authorized Ather Energy Franchise</strong><br />
                  Email: info@raamother.com<br />
                  Phone: +91-XXXX-XXXXXX
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-500 border-t pt-4">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p className="mt-2">
                This policy is part of our commitment to transparency in how we handle your data 
                to provide you with the best Ather electric mobility experience.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}