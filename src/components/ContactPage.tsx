import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    console.log('Contact form submitted:', {
      ...formData,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      detail: '+91 98765 43210',
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'support@scanpay.com',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      detail: '123 Tech Street, Innovation Hub, Bangalore 560001',
      color: 'text-orange-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      detail: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
      color: 'text-purple-600'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h2>
          <p className="text-green-700">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Phone className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or need support? We're here to help! Get in touch with our team 
          for any assistance with Scan & Pay.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg bg-gray-50 ${info.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{info.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{info.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Quick Support</h3>
              <p className="text-blue-700 text-sm mb-3">
                Need immediate help? Check out our FAQ section or contact us directly.
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
                View FAQ →
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="bug-report">Bug Report</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="partnership">Partnership Opportunities</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Please describe your inquiry or issue in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Additional Support Options */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
          <Phone className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Call Support</h3>
          <p className="text-blue-100 text-sm mb-3">Speak directly with our support team</p>
          <a href="tel:+919876543210" className="text-blue-200 hover:text-white underline text-sm">
            +91 98765 43210
          </a>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center">
          <Mail className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-green-100 text-sm mb-3">Send us an email anytime</p>
          <a href="mailto:support@scanpay.com" className="text-green-200 hover:text-white underline text-sm">
            support@scanpay.com
          </a>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-orange-100 text-sm mb-3">Chat with us in real-time</p>
          <button className="text-orange-200 hover:text-white underline text-sm">
            Start Chat →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;