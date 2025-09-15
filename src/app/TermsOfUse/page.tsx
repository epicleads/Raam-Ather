'use client';
import React from 'react';
import { FileText, Globe, Shield, BookOpen, Copyright, AlertTriangle, Users, RefreshCw, Scale, Phone, Mail, MapPin } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-light text-slate-900">Terms of Use</h1>
          </div>
          <p className="text-slate-600 text-lg font-light">
            Raam Ather • Official Ather Energy Dealership
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Effective: January 1, 2025 • Last Updated: August 30, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Welcome</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <p className="text-slate-700 leading-relaxed mb-4">
              These Terms of Use govern your experience with Raam Ather&apos;s website and services. Simple, fair, and transparent.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              By using our website, booking test drives, or visiting our showrooms in Chennai and Hyderabad, you agree to these terms.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We&apos;ve written these terms in plain language. No legal maze. Just clear expectations for everyone.
            </p>
          </div>
        </section>

        {/* Use of Website & Services */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Using Our Services</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">What You Can Do</h3>
                <ul className="text-slate-700 space-y-2 ml-4">
                  <li>• Browse Ather scooter information and pricing</li>
                  <li>• Book test drives at our Chennai and Hyderabad locations</li>
                  <li>• Submit inquiries through our contact forms</li>
                  <li>• Access service and support information</li>
                  <li>• Subscribe to updates about Ather products</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Access Requirements</h3>
                <p className="text-slate-700 leading-relaxed">
                  You must be 18 or older to book test drives or make purchase inquiries. For service requests, you must be the vehicle owner or authorized representative.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Account Security</h3>
                <p className="text-slate-700 leading-relaxed">
                  Keep your contact information current. Protect any login credentials. Notify us immediately if you suspect unauthorized access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accuracy of Information */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Information Accuracy</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Our Commitment</h3>
                <p className="text-slate-700 leading-relaxed">
                  We work hard to keep all product information, pricing, and availability current. Our team regularly updates content to reflect the latest from Ather Energy.
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-medium text-amber-900 mb-3">Important Notice</h3>
                <p className="text-amber-800 leading-relaxed mb-3">
                  Product specifications, pricing, and availability may change without notice. Always confirm details with our team before making decisions.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Final pricing and specifications will be confirmed during your visit or purchase process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Forms & Bookings */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Bookings and Inquiries</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Your Responsibilities</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  When submitting forms or booking test drives:
                </p>
                <ul className="text-slate-700 space-y-2 ml-4">
                  <li>• Provide accurate and complete information</li>
                  <li>• Use your real contact details</li>
                  <li>• Arrive on time for scheduled appointments</li>
                  <li>• Bring valid identification for test drives</li>
                  <li>• Notify us if you need to reschedule</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Test Drive Terms</h3>
                <p className="text-slate-700 leading-relaxed">
                  Valid driving license required. Age restrictions apply. Insurance coverage during test rides provided by Raam Ather. Safety briefing mandatory before any test drive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Copyright className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Intellectual Property</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Our Content</h3>
                <p className="text-slate-700 leading-relaxed">
                  All website content, designs, and materials belong to Raam Ather or our partners. This includes text, images, videos, logos, and user interface elements.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Ather Energy Trademarks</h3>
                <p className="text-slate-700 leading-relaxed">
                  Ather, Ather Energy, and related trademarks belong to Ather Energy Private Limited. We use them under authorized dealership agreement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Usage Guidelines</h3>
                <p className="text-slate-700 leading-relaxed">
                  You may view and interact with our content for personal use. Commercial use, reproduction, or distribution requires written permission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations of Liability */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Service Limitations</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Website Availability</h3>
                <p className="text-slate-700 leading-relaxed">
                  We strive for 24/7 availability but cannot guarantee uninterrupted service. Maintenance, updates, or technical issues may cause temporary downtime.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Third-Party Links</h3>
                <p className="text-slate-700 leading-relaxed">
                  Our website may link to external sites or services. We&apos;re not responsible for their content, privacy practices, or availability.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-3">Important Disclaimer</h3>
                <p className="text-slate-700 leading-relaxed">
                  Our services are provided &quot;as is.&quot; While we work to ensure quality and accuracy, we cannot be liable for indirect damages, lost profits, or consequential losses arising from website use or service interruptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Conduct */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Expected Conduct</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Prohibited Activities</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To maintain a positive experience for everyone, please don&apos;t:
                </p>
                <ul className="text-slate-700 space-y-2 ml-4">
                  <li>• Submit false information or fraudulent bookings</li>
                  <li>• Attempt to disrupt our website or services</li>
                  <li>• Use our platforms for spam or unauthorized marketing</li>
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Interfere with other users&apos; experience</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Fair Use</h3>
                <p className="text-slate-700 leading-relaxed">
                  Use our services reasonably. Multiple fake bookings, excessive inquiries, or misuse of contact forms may result in service restrictions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Changes to Terms */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Updates and Changes</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">When We Update</h3>
                <p className="text-slate-700 leading-relaxed">
                  We may update these terms to reflect new features, legal requirements, or business changes. Updates will be posted here with a new effective date.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">How You&apos;ll Know</h3>
                <p className="text-slate-700 leading-relaxed">
                  Significant changes will be communicated through email or website notifications. Continued use of our services means you accept the updated terms.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <p className="text-blue-800 leading-relaxed">
                  <strong>Tip:</strong> Bookmark this page and check back occasionally for updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Legal Framework</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Governing Law</h3>
                <p className="text-slate-700 leading-relaxed">
                  These terms are governed by the laws of India. Any disputes will be resolved in the appropriate courts of Chennai or Hyderabad, based on your nearest dealership location.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Dispute Resolution</h3>
                <p className="text-slate-700 leading-relaxed">
                  We prefer to resolve issues through direct communication. Contact our team first. If formal resolution is needed, we&apos;ll work through established legal channels.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Severability</h3>
                <p className="text-slate-700 leading-relaxed">
                  If any part of these terms becomes unenforceable, the rest remains in full effect. We&apos;ll update or remove problematic sections as needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-light text-slate-900">Questions or Support</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chennai */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Chennai Team</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">Anna Nagar, Chennai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">+91 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">chennai@raamather.com</span>
                </div>
              </div>
            </div>

            {/* Hyderabad */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Hyderabad Team</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">Banjara Hills, Hyderabad</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">+91 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">hyderabad@raamather.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <p className="text-blue-800 leading-relaxed">
              <strong>Legal Questions?</strong> Contact our team at <strong>legal@raamather.com</strong> for terms-related inquiries.
            </p>
          </div>
        </section>

        {/* Key Terms Summary */}
        <section className="mb-12">
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-light mb-6">Terms Summary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Fair Use</h4>
                <p className="text-slate-300 text-sm">Use our services honestly and responsibly</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Your Data</h4>
                <p className="text-slate-300 text-sm">We protect your information and respect your privacy</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Our Commitment</h4>
                <p className="text-slate-300 text-sm">Deliver excellent service while protecting our business</p>
              </div>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Agreement</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              By using Raam Ather&apos;s website and services, you acknowledge that you have read, understood, and agree to these Terms of Use.
            </p>
            <p className="text-slate-500 text-sm">
              These terms work alongside our Privacy Policy to govern your experience with us.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Raam Ather • Authorized Ather Energy Dealership
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Chennai • Hyderabad • Serving South India
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;