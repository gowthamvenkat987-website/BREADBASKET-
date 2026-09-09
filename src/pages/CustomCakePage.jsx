import React, { useState } from 'react';
import { 
  Cake, 
  Sparkles, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle2, 
  Heart, 
  FileText, 
  Phone, 
  User, 
  Mail, 
  Check, 
  X,
  MessageCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

const FLAVORS = [
  { id: 'belgian-dark', name: 'Royal Belgian Dark Chocolate Ganache', pricePerKg: 1000, color: '#3E2723' },
  { id: 'red-velvet', name: 'Classic Red Velvet with Cream Cheese', pricePerKg: 950, color: '#9B111E' },
  { id: 'fresh-fruit', name: 'Fresh Seasonal Fruit & Vanilla Cream', pricePerKg: 850, color: '#FFF8E1' },
  { id: 'butterscotch', name: 'Butterscotch Caramel Praline Crunch', pricePerKg: 800, color: '#D4AF37' },
  { id: 'blueberry-cheese', name: 'Blueberry Swirl Baked Cheesecake', pricePerKg: 1100, color: '#303F9F' },
  { id: 'pineapple-cream', name: 'Classic Pineapple Delight', pricePerKg: 750, color: '#FFF59D' },
];

const WEIGHTS = [
  { id: '0.5kg', label: '0.5 kg (Small Party)', multiplier: 0.55 },
  { id: '1kg', label: '1.0 kg (6-8 Guests)', multiplier: 1.0 },
  { id: '1.5kg', label: '1.5 kg (10-12 Guests)', multiplier: 1.5 },
  { id: '2kg', label: '2.0 kg (15-18 Guests)', multiplier: 2.0 },
  { id: '3kg', label: '3.0 kg (2-Tier Party)', multiplier: 3.1 },
];

const SHAPES = [
  { id: 'round', label: 'Classic Round', icon: '⚪' },
  { id: 'heart', label: 'Romantic Heart', icon: '❤️' },
  { id: 'square', label: 'Modern Square', icon: '⬛' },
  { id: 'tier', label: 'Grand 2-Tier', icon: '🎂' },
];

const COLOR_THEMES = [
  { id: 'blush-pink', name: 'Blush Pink & Rose', bg: '#F8BBD0', text: '#880E4F' },
  { id: 'dark-chocolate', name: 'Belgian Truffle Brown', bg: '#4E342E', text: '#FAF6F0' },
  { id: 'ivory-gold', name: 'Ivory & Gold Dust', bg: '#FFFDF9', text: '#8D6E63', border: '#D4AF37' },
  { id: 'crimson-red', name: 'Velvet Crimson', bg: '#B71C1C', text: '#FFFFFF' },
  { id: 'pastel-blue', name: 'Sky Pastel Blue', bg: '#BBDEFB', text: '#0D47A1' },
];

const TOPPINGS = [
  'Fresh Strawberries & Berries',
  'Parisian Macarons (Assorted)',
  '24K Edible Gold Leaf Accents',
  'Dark Chocolate Curls & Drizzle',
  'Roasted Hazelnut Praline',
  'Edible Floral Rosettes',
];

export default function CustomCakePage() {
  const { addCustomCake } = useAdmin();
  const { showToast } = useToast();

  // Form selections
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [weight, setWeight] = useState(WEIGHTS[1]); // 1kg
  const [shape, setShape] = useState(SHAPES[0]);
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0]);
  const [selectedToppings, setSelectedToppings] = useState([TOPPINGS[0], TOPPINGS[2]]);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday Ananya!');
  const [isEggless, setIsEggless] = useState(true);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('18:00');
  const [instructions, setInstructions] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);

  // Modal confirmation state
  const [confirmedRequest, setConfirmedRequest] = useState(null);

  // Calculate estimated price
  const baseFlavPrice = flavor.pricePerKg * weight.multiplier;
  const toppingsPrice = selectedToppings.length * 80;
  const estimatedPrice = Math.round(baseFlavPrice + toppingsPrice + (shape.id === 'tier' ? 300 : 0));

  const toggleTopping = (top) => {
    if (selectedToppings.includes(top)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== top));
    } else {
      setSelectedToppings([...selectedToppings, top]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result);
        showToast('Reference design uploaded!', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !preferredDate) {
      showToast('Please fill in your name, contact number, and event date.', 'error');
      return;
    }

    const cakePayload = {
      customerName,
      phone,
      email,
      flavor: flavor.name,
      weight: weight.label,
      shape: shape.label,
      icingColor: colorTheme.name,
      toppings: selectedToppings,
      message: cakeMessage,
      preferredDate,
      preferredTime,
      isEggless,
      estimatedPrice,
      instructions,
      hasReferenceImage: Boolean(referenceImage),
    };

    const newRequest = addCustomCake(cakePayload);
    setConfirmedRequest(newRequest);

    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    showToast('Custom cake request submitted! Our chef will contact you.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE4EC] border border-[#F48FB1]/50 text-[#C2185B] text-xs font-bold uppercase tracking-wider">
          <Cake className="w-3.5 h-3.5" /> Interactive Cake Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1B16]">
          Design Your Dream Cake
        </h1>
        <p className="text-sm sm:text-base text-[#7A6A5D]">
          Customize every layer, color theme, flavor, and piping inscription. See the live visualizer update as you build!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Live Visualizer Preview Area (Sticky on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DCD3] shadow-lg text-center space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#F2E8DF] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9C7A5B] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Live Interactive Visualizer
              </span>
              <span className="text-xs font-extrabold text-[#D81B60] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full">
                {isEggless ? '100% Eggless' : 'Regular'}
              </span>
            </div>

            {/* Dynamic Cake Canvas */}
            <div className="relative h-64 sm:h-72 w-full bg-[#FAF6F0] rounded-2xl flex items-center justify-center p-6 overflow-hidden border border-[#EBE1D7] shadow-inner">
              {/* Background Plate */}
              <div className="absolute w-56 h-56 rounded-full border-4 border-dashed border-[#D4AF37]/30 animate-spin-slow pointer-events-none" />

              {/* Dynamic Cake Body */}
              <div
                style={{
                  backgroundColor: colorTheme.bg,
                  color: colorTheme.text,
                  border: colorTheme.border ? `3px solid ${colorTheme.border}` : 'none',
                }}
                className={`relative shadow-2xl transition-all duration-500 flex flex-col items-center justify-center p-4 text-center ${
                  shape.id === 'round'
                    ? 'w-44 h-44 rounded-full'
                    : shape.id === 'heart'
                    ? 'w-44 h-44 rounded-[40px] transform rotate-45'
                    : shape.id === 'square'
                    ? 'w-44 h-44 rounded-2xl'
                    : 'w-40 h-48 rounded-2xl flex flex-col justify-between py-3'
                }`}
              >
                {/* For 2-Tier shape representation */}
                {shape.id === 'tier' && (
                  <div
                    style={{ backgroundColor: colorTheme.bg }}
                    className="w-28 h-20 rounded-xl shadow-md mx-auto border-b-2 border-black/10 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold opacity-80">Top Tier</span>
                  </div>
                )}

                {/* Toppings visual markers */}
                <div
                  className={`flex flex-wrap items-center justify-center gap-1 max-w-[140px] ${
                    shape.id === 'heart' ? 'transform -rotate-45' : ''
                  }`}
                >
                  {selectedToppings.map((top, idx) => (
                    <span
                      key={idx}
                      className="text-xs"
                      title={top}
                    >
                      {top.includes('Berries') ? '🍓' : top.includes('Macaron') ? '🍪' : top.includes('Gold') ? '✨' : top.includes('Chocolate') ? '🍫' : '🌸'}
                    </span>
                  ))}
                </div>

                {/* Message on Cake */}
                <div className={`mt-2 ${shape.id === 'heart' ? 'transform -rotate-45' : ''}`}>
                  <p
                    className="font-serif italic text-xs font-bold px-2 py-0.5 rounded leading-tight drop-shadow-sm max-w-[130px] line-clamp-2"
                    style={{ color: colorTheme.text }}
                  >
                    "{cakeMessage || 'Your Message Here'}"
                  </p>
                </div>
              </div>
            </div>

            {/* Cake Summary Card */}
            <div className="bg-[#FAF4ED] rounded-2xl p-4 text-left space-y-2 text-xs border border-[#E7DCD3]">
              <div className="flex justify-between items-center text-[#2D1B16] font-bold">
                <span>{flavor.name}</span>
                <span className="text-[#D81B60]">{weight.label}</span>
              </div>
              <p className="text-[#7A6A5D]">
                Theme: <strong>{colorTheme.name}</strong> • Shape: <strong>{shape.label}</strong>
              </p>
              {selectedToppings.length > 0 && (
                <p className="text-[#7A6A5D] truncate">
                  Toppings: {selectedToppings.join(', ')}
                </p>
              )}
              <div className="pt-2 border-t border-[#DECBC0] flex items-center justify-between font-extrabold text-sm text-[#2D1B16]">
                <span>Estimated Price:</span>
                <span className="text-xl text-[#2D1B16]">₹{estimatedPrice}*</span>
              </div>
              <p className="text-[10px] text-[#8D7B68] text-right">
                *Final price confirmed after chef review
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DCD3] shadow-xs space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-3">
              1. Choose Flavors & Architecture
            </h2>

            {/* Flavor Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                Select Cake Flavor
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlavor(f)}
                    className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      flavor.id === f.id
                        ? 'bg-[#2D1B16] text-white border-[#2D1B16] shadow-sm'
                        : 'bg-[#FAF6F0] text-[#4A3B32] border-[#E7DCD3] hover:bg-[#F2E8DF]'
                    }`}
                  >
                    <span>{f.name}</span>
                    {flavor.id === f.id && <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape & Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shape */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                  Cake Shape
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setShape(s)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        shape.id === s.id
                          ? 'bg-[#2D1B16] text-white border-[#2D1B16]'
                          : 'bg-[#FAF6F0] text-[#5C4A3E] border-[#E7DCD3] hover:bg-[#F2E8DF]'
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                  Weight & Portions
                </label>
                <select
                  value={weight.id}
                  onChange={(e) => setWeight(WEIGHTS.find((w) => w.id === e.target.value) || WEIGHTS[1])}
                  className="w-full p-2.5 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-xs font-bold text-[#2D1B16] focus:outline-none cursor-pointer"
                >
                  {WEIGHTS.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Color Palette Theme */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                Icing & Decoration Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setColorTheme(theme)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                      colorTheme.id === theme.id
                        ? 'border-[#2D1B16] ring-2 ring-[#2D1B16]/20 bg-white'
                        : 'border-[#E7DCD3] bg-[#FAF6F0] hover:bg-[#F2E8DF]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shadow-inner"
                      style={{ backgroundColor: theme.bg }}
                    />
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                Gourmet Toppings (Select Any)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOPPINGS.map((top) => {
                  const isSelected = selectedToppings.includes(top);
                  return (
                    <button
                      key={top}
                      type="button"
                      onClick={() => toggleTopping(top)}
                      className={`p-2 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FAF4ED] text-[#2D1B16] border-[#D4AF37]'
                          : 'bg-white text-[#7A6A5D] border-[#E7DCD3]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-[#D4AF37]' : 'text-transparent'
                          }`}
                        />
                        {top}
                      </span>
                      <span className="text-[10px] text-[#8D7B68]">+₹80</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dietary Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E7DCD3]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span className="text-xs font-bold text-[#2D1B16]">Make 100% Eggless</span>
              </div>
              <input
                type="checkbox"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="w-4 h-4 accent-[#2D1B16] cursor-pointer"
              />
            </div>

            <h2 className="font-serif text-xl font-bold text-[#2D1B16] border-t border-[#F2E8DF] pt-5 pb-1">
              2. Personalized Message & Notes
            </h2>

            {/* Message on Cake */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                Message on Cake (Rendered in Calligraphy)
              </label>
              <input
                type="text"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                maxLength={45}
                placeholder="e.g., Happy 25th Anniversary Mom & Dad"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-sm text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
              />
              <span className="text-[10px] text-[#8D7B68]">Max 45 characters.</span>
            </div>

            {/* Reference Image Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                Reference Design (Optional)
              </label>
              <div className="border-2 border-dashed border-[#D8C7B9] rounded-2xl p-4 text-center bg-[#FAF6F0] hover:bg-[#F5EFEB] transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-6 h-6 text-[#8D7B68] mx-auto mb-1.5" />
                <p className="text-xs font-bold text-[#2D1B16]">
                  Click or drag photo here to upload reference design
                </p>
                <p className="text-[11px] text-[#7A6A5D]">Supports JPG, PNG (Max 5MB)</p>
                {referenceImage && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 py-1 px-3 rounded-lg w-max mx-auto">
                    <Check className="w-3.5 h-3.5" /> Reference design uploaded
                  </div>
                )}
              </div>
            </div>

            <h2 className="font-serif text-xl font-bold text-[#2D1B16] border-t border-[#F2E8DF] pt-5 pb-1">
              3. Event Timing & Contact Details
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
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-sm text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
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
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-sm text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Preferred Date *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-sm text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-sm text-[#2D1B16] focus:outline-none focus:border-[#2D1B16] cursor-pointer"
                  >
                    <option value="11:00">Morning (11:00 AM - 1:00 PM)</option>
                    <option value="15:00">Afternoon (3:00 PM - 5:00 PM)</option>
                    <option value="18:00">Evening Party (6:00 PM - 8:00 PM)</option>
                    <option value="21:00">Night Celebration (9:00 PM - 10:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-[#2D1B16]">
                Theme or Special Instructions
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Teddy bear topper, less sugar in cream, provide sparkle candles..."
                className="w-full p-3 rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-sm text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF37]/40"
            >
              <Cake className="w-5 h-5 text-[#D4AF37]" />
              <span>Submit Custom Cake Request (₹{estimatedPrice})</span>
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl animate-scale-up border border-[#E7DCD3] relative">
            <button
              onClick={() => setConfirmedRequest(null)}
              className="absolute top-4 right-4 p-2 text-[#8D7B68] hover:text-[#2D1B16] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-black text-[#2D1B16]">
              Custom Cake Request Received!
            </h3>

            <p className="text-xs sm:text-sm text-[#7A6A5D]">
              Thank you, <strong>{confirmedRequest.customerName}</strong>! Our head pastry chef at The Bread Basket Vijayawada has received your inquiry for <strong>{confirmedRequest.flavor}</strong>.
            </p>

            <div className="bg-[#FAF4ED] p-3.5 rounded-xl text-left text-xs space-y-1 border border-[#E7DCD3]">
              <p><strong>Reference ID:</strong> #{confirmedRequest.id}</p>
              <p><strong>Date Needed:</strong> {confirmedRequest.preferredDate} ({confirmedRequest.preferredTime})</p>
              <p><strong>Estimated Total:</strong> ₹{confirmedRequest.estimatedPrice}</p>
              <p><strong>Status:</strong> <span className="text-amber-700 font-bold">Under Review by Chef</span></p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/917995435555?text=Hi%20The%20Bread%20Basket,%20I%20just%20submitted%20Custom%20Cake%20Request%20%23${confirmedRequest.id}%20for%20${encodeURIComponent(confirmedRequest.customerName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmedRequest(null)}
                className="w-full py-2.5 rounded-xl bg-[#FAF6F0] text-[#2D1B16] font-semibold text-xs hover:bg-[#EAE0D5] transition-colors"
              >
                Back to Customizer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
