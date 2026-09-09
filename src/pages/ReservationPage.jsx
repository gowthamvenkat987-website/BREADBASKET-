import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  Utensils, 
  MessageCircle, 
  X 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

const SEATING_ZONES = [
  { id: 'window', name: 'Bakery Window Side', desc: 'Sunny, street view of Panta Kaluva Road' },
  { id: 'corner', name: 'Cozy Corner Lounge', desc: 'Quiet, plush armchairs for conversations' },
  { id: 'family', name: 'Family Booth', desc: 'Spacious table suitable for groups & birthdays' },
  { id: 'patio', name: 'Al-Fresco Verandah', desc: 'Breezy outdoor cafe tables' },
];

const OCCASIONS = [
  'Casual Coffee & Treats',
  'Birthday Celebration',
  'Anniversary',
  'Family Gathering',
  'Business / Work Catchup',
];

export default function ReservationPage() {
  const { addReservation } = useAdmin();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:30');
  const [zone, setZone] = useState(SEATING_ZONES[0].name);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [specialRequest, setSpecialRequest] = useState('');

  // Confirmation modal
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !date) {
      showToast('Please fill in your name, contact phone, and reservation date.', 'error');
      return;
    }

    const payload = {
      customerName,
      phone,
      email: email || 'N/A',
      guests: Number(guests),
      date,
      time,
      zone,
      occasion,
      specialRequest,
    };

    const newRes = addReservation(payload);
    setConfirmedBooking(newRes);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    showToast('Table reserved successfully! We look forward to hosting you.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4ED] border border-[#DECBC0] text-[#5C381E] text-xs font-bold uppercase tracking-wider">
          <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> The Bread Basket Cafe Lounge
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1B16]">
          Reserve Your Table
        </h1>
        <p className="text-sm sm:text-base text-[#7A6A5D]">
          Enjoy fresh oven bakes, savory pizzas, and artisanal coffees in our welcoming cafe ambience on Panta Kaluva Road, Vijayawada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Reservation Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DCD3] shadow-xs space-y-6"
          >
            <h2 className="font-serif text-xl font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-3">
              1. Guest & Time Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="079954 35555"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Number of Guests *</label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Reservation Date *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none cursor-pointer"
                  >
                    <option value="09:00">9:00 AM (Breakfast & Coffee)</option>
                    <option value="11:30">11:30 AM (Brunch)</option>
                    <option value="13:30">1:30 PM (Lunch)</option>
                    <option value="16:00">4:00 PM (High Tea & Pastries)</option>
                    <option value="17:30">5:30 PM (Evening Sunset)</option>
                    <option value="19:30">7:30 PM (Dinner & Sourdough Pizza)</option>
                    <option value="21:00">9:00 PM (Late Dessert)</option>
                  </select>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-xl font-bold text-[#2D1B16] border-t border-[#F2E8DF] pt-5 pb-1">
              2. Ambiance & Occasion
            </h2>

            {/* Zone Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#2D1B16]">Preferred Seating Zone</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SEATING_ZONES.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setZone(z.name)}
                    className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                      zone === z.name
                        ? 'bg-[#2D1B16] text-white border-[#2D1B16]'
                        : 'bg-[#FAF6F0] text-[#5C4A3E] border-[#E7DCD3] hover:bg-[#F2E8DF]'
                    }`}
                  >
                    <p className="font-bold">{z.name}</p>
                    <p className={`text-[11px] ${zone === z.name ? 'text-white/80' : 'text-[#8D7B68]'}`}>
                      {z.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-[#2D1B16]">Celebrating an Occasion?</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none cursor-pointer"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Request */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-[#2D1B16]">Special Requests (Optional)</label>
              <textarea
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. Birthday candle arrangement, quiet booth, high chair for toddler..."
                className="w-full p-3 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/30 cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#D4AF37]" />
              <span>Reserve Table Now</span>
            </button>
          </form>
        </div>

        {/* Right: Bakery Cafe Highlights & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#FAF6F0]">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="The Bread Basket Vijayawada Cafe Seating"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#2D1B16]">
              Warm Hospitality Awaits
            </h3>
            <p className="text-xs text-[#7A6A5D] leading-relaxed">
              We hold your table for up to 15 minutes past your reserved time slot. For parties larger than 12 guests, please call us directly for special banquet arrangements.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#F2E8DF] text-xs text-[#5C4A3E]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Panta Kaluva Road, New P&T Colony, Vijayawada</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Open Everyday: 8:00 AM – 10:30 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Host Helpline: <strong>079954 35555</strong></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl animate-scale-up border border-[#E7DCD3] relative">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="absolute top-4 right-4 p-2 text-[#8D7B68] hover:text-[#2D1B16] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-black text-[#2D1B16]">
              Table Reserved!
            </h3>

            <p className="text-xs sm:text-sm text-[#7A6A5D]">
              We look forward to welcoming you, <strong>{confirmedBooking.customerName}</strong>! Your reservation is confirmed at The Bread Basket Vijayawada.
            </p>

            <div className="bg-[#FAF4ED] p-4 rounded-xl text-left text-xs space-y-1.5 border border-[#DECBC0]">
              <p><strong>Booking ID:</strong> #{confirmedBooking.id}</p>
              <p><strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}</p>
              <p><strong>Guests:</strong> {confirmedBooking.guests} Person(s)</p>
              <p><strong>Seating Zone:</strong> {confirmedBooking.zone}</p>
              <p><strong>Occasion:</strong> {confirmedBooking.occasion}</p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/917995435555?text=Hi%20The%20Bread%20Basket,%20I%20have%20table%20reservation%20%23${confirmedBooking.id}%20for%20${confirmedBooking.guests}%20guests%20on%20${confirmedBooking.date}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Confirmation on WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-2.5 rounded-xl bg-[#FAF6F0] text-[#2D1B16] font-semibold text-xs hover:bg-[#EAE0D5] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
