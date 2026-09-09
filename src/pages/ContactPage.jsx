import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageCircle, 
  Navigation, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our Vijayawada team!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4ED] border border-[#DECBC0] text-[#5C381E] text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Visit Our Vijayawada Bakery
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1B16]">
          Get in Touch With Us
        </h1>
        <p className="text-sm sm:text-base text-[#7A6A5D]">
          Have a question about custom wedding cakes, catering, or bulk party orders? We are here to help!
        </p>
      </div>

      {/* Main Grid: Details + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Info & Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DCD3] shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Bakery & Cake Shop
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Now
                </span>
              </div>
              <h2 className="font-serif text-2xl font-black text-[#2D1B16]">
                The Bread Basket Vijayawada
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#8D7B68]">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-bold text-[#2D1B16]">4.3 / 5.0</span>
                <span>(960+ Google Reviews)</span>
                <span>•</span>
                <span className="font-semibold text-[#5C381E]">₹200–₹400</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#5A493D] border-t border-[#F2E8DF] pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D1B16]">Bakery Address</h4>
                  <p className="leading-snug text-[#7A6A5D] mt-0.5">
                    5th, 57-10-1A, New P&T Colony, Lane, Panta Kaluva Road, Vijayawada, Andhra Pradesh 520008
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D1B16]">Phone Number</h4>
                  <a
                    href="tel:07995435555"
                    className="text-sm font-extrabold text-[#2D1B16] hover:text-[#933D20] block mt-0.5"
                  >
                    079954 35555
                  </a>
                  <p className="text-[11px] text-[#8D7B68]">Available for instant orders & queries</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D1B16]">Operating Hours</h4>
                  <p className="text-[#2D1B16] font-semibold mt-0.5">Monday – Sunday</p>
                  <p className="text-[11px] text-[#7A6A5D]">8:00 AM – Approximately 10:30 PM</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                    ✓ Warm sourdough & croissants out of oven at 8:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href="tel:07995435555"
                className="flex-1 py-3 px-4 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/917995435555?text=Hello%20The%20Bread%20Basket%20Vijayawada,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=The+Bread+Basket+Panta+Kaluva+Road+Vijayawada"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#EAE0D5] text-[#2D1B16] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 border border-[#DECBC0] transition-colors"
                title="Get Driving Directions"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DCD3] shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-3">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#FAF4ED] rounded-2xl border border-[#DECBC0]">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#2D1B16]">Thank You!</h4>
                <p className="text-xs text-[#7A6A5D]">
                  We have received your message. Our team will get back to you shortly on {formData.phone || 'your contact'}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-4 py-2 bg-[#2D1B16] text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#2D1B16]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="079954 35555"
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#2D1B16]">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#2D1B16]">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Wedding/Event Cake">Custom Wedding / Event Cake</option>
                      <option value="Bulk Party Catering">Bulk Party Catering</option>
                      <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you today? Let us know the details..."
                    className="w-full p-3 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/30 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Maps Embed Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2D1B16]">
              Find Us on Google Maps
            </h3>
            <p className="text-xs text-[#7A6A5D]">
              Located in New P&T Colony on Panta Kaluva Road, easily accessible from Benz Circle and MG Road.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Panta+Kaluva+Road+Vijayawada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#F2E8DF] text-[#2D1B16] text-xs font-bold border border-[#DECBC0]"
          >
            <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#E7DCD3] h-80 sm:h-96 shadow-inner">
          <iframe
            title="The Bread Basket Location Google Maps"
            src="https://maps.google.com/maps?q=Panta%20Kaluva%20Road,%20New%20P%26T%20Colony,%20Vijayawada,%20Andhra%20Pradesh%20520008&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
