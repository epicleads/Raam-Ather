'use client';
import React from 'react';
import { Shield, Eye, Lock, Users, Settings, Clock, UserCheck, Phone, Mail, MapPin } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 mt-20 md:mt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-light text-slate-900">Privacy Policy</h1>
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
            <Eye className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">Your Privacy Matters</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              At Raam Ather, we believe privacy is a fundamental right. Not a privilege.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              This policy explains how we collect, use, and protect your information when you visit our showrooms in Chennai and Hyderabad or interact with our digital platforms.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We&#39;re committed to transparency. Every word here is written in plain language because you deserve to understand exactly how your data is handled.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">What We Collect</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Information You Share</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  When you express interest in Ather scooters, we collect:
                </p>
                <ul className="text-slate-700 space-y-2 ml-4">
                  <li>• Your name and contact details</li>
                  <li>• Email address and phone number</li>
                  <li>• Test drive preferences and requirements</li>
                  <li>• Service and support requests</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Technical Information</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Our systems automatically collect:
                </p>
                <ul className="text-slate-700 space-y-2 ml-4">
                  <li>• Device and browser information</li>
                  <li>• How you navigate our website</li>
                  <li>• IP address and general location</li>
                  <li>• Cookies for better user experience</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">How We Use Your Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Customer Experience</h3>
              <p className="text-slate-700 leading-relaxed">
                Schedule test drives. Provide product information. Answer your questions. Deliver exceptional service.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Communication</h3>
              <p className="text-slate-700 leading-relaxed">
                Send relevant updates about Ather products. Share service reminders. Inform you about events and offers.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Improvement</h3>
              <p className="text-slate-700 leading-relaxed">
                Understand how our website performs. Improve our digital experience. Optimize our services.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Legal Compliance</h3>
              <p className="text-slate-700 leading-relaxed">
                Meet regulatory requirements. Process warranty claims. Maintain accurate business records.
              </p>
            </div>
          </div>
        </section>

        {/* Sharing and Security */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">Sharing and Security</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">We Never Sell Your Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  Your personal information is not for sale. Period. We don&apos;t trade data for profit or share it with advertisers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Trusted Partners Only</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We share information only when necessary:
                </p>
                <ul className="text-slate-700 space-y-2 ml-4">
                  <li>• With Ather Energy for product delivery and service</li>
                  <li>• With service providers who help us operate (under strict agreements)</li>
                  <li>• When required by law or to protect rights and safety</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Security Measures</h3>
                <p className="text-slate-700 leading-relaxed">
                  We use industry-standard encryption and security protocols. Regular audits ensure your data stays protected. Access is limited to authorized personnel only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Choices */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">Your Choices</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Marketing Communications</h3>
                <p className="text-slate-700 leading-relaxed">
                  Unsubscribe anytime from our emails. Opt out of promotional messages through your account settings or by contacting us directly.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Cookie Preferences</h3>
                <p className="text-slate-700 leading-relaxed">
                  Manage cookie settings through your browser. Essential cookies remain active to ensure our website functions properly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Data Access</h3>
                <p className="text-slate-700 leading-relaxed">
                  Request a copy of your data. Update incorrect information. Ask us to delete your account when you no longer need our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">Data Retention</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <p className="text-slate-700 leading-relaxed mb-4">
              We keep your information only as long as needed to provide our services and comply with legal requirements.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-900 font-medium">Lead Information</span>
                <span className="text-slate-600">3 years or until purchase</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-900 font-medium">Customer Records</span>
                <span className="text-slate-600">7 years (regulatory requirement)</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-900 font-medium">Website Analytics</span>
                <span className="text-slate-600">24 months</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-900 font-medium">Marketing Contacts</span>
                <span className="text-slate-600">Until you unsubscribe</span>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">Your Rights</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <p className="text-slate-700 leading-relaxed mb-6">
              You have complete control over your personal information. Here&#39;s what you can do:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Access Your Data</h4>
                    <p className="text-slate-600 text-sm">Get a copy of all information we have about you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Update Information</h4>
                    <p className="text-slate-600 text-sm">Correct any inaccurate or outdated details</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Delete Your Data</h4>
                    <p className="text-slate-600 text-sm">Request removal of your personal information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Control Communications</h4>
                    <p className="text-slate-600 text-sm">Choose what messages you receive from us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-light text-slate-900">Get In Touch</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chennai */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Chennai Showroom</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">Nungambakkam, Chennai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <a href="tel:+919240013828" className="text-slate-700 hover:text-blue-600 transition-colors">+91 92400 13828</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <a href="mailto:marketing@raamather.com-hyd" className="text-slate-700 hover:text-blue-600 transition-colors">marketing@raamather.com-hyd</a>
                </div>
              </div>
            </div>

            {/* Hyderabad */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Hyderabad Showroom</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">Somajiguda, Hyderabad</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <a href="tel:+919032333833" className="text-slate-700 hover:text-blue-600 transition-colors">+91 9032333833</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <a href="mailto:marketing@raamather.com-hyd" className="text-slate-700 hover:text-blue-600 transition-colors">marketing@raamather.com-hyd</a>
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* Updates Section */}
        <section className="mb-12">
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-light mb-4">Policy Updates</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
  We&apos;ll notify you of any significant changes to this policy. Updates will be posted here with a new effective date.
</p>

            <p className="text-slate-400 text-sm">
              By continuing to use our services, you agree to the updated terms.
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Raam Ather is an authorized dealership of Ather Energy Private Limited
          </p>
          <p className="text-slate-400 text-xs mt-2">
            This policy applies to Raam Ather dealership operations in Chennai and Hyderabad
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;