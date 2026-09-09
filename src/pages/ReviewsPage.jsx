import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  PenTool, 
  X, 
  Sparkles, 
  Filter 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import RatingStars from '../components/RatingStars';
import { REVIEWS_SUMMARY } from '../data/reviews';

export default function ReviewsPage() {
  const { reviews, addReview } = useAdmin();
  const { showToast } = useToast();

  const [filterRating, setFilterRating] = useState('all'); // 'all', 5, 4, 3, 2, 1
  const [modalOpen, setModalOpen] = useState(false);

  // Review Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Vijayawada');
  const [rating, setRating] = useState(5);
  const [cakeOrdered, setCakeOrdered] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!name.trim() || !reviewText.trim()) {
      showToast('Please enter your name and review text.', 'error');
      return;
    }

    addReview({
      author: name,
      location,
      rating: Number(rating),
      cakeOrdered: cakeOrdered || 'Bakery Selection',
      review: reviewText,
    });

    setModalOpen(false);
    setName('');
    setReviewText('');
    setCakeOrdered('');
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === Number(filterRating);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7DCD3] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
            Google Ratings & Feedback
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1B16]">
            Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6A5D] mt-1">
            Real experiences shared by over 960+ loyal patrons across Vijayawada.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#D4AF37]/40 hover:-translate-y-0.5"
        >
          <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Ratings Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DCD3] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Big Rating Number */}
        <div className="md:col-span-4 text-center md:border-r md:border-[#F2E8DF] md:pr-6 space-y-2">
          <div className="text-5xl sm:text-6xl font-black text-[#2D1B16] tracking-tight">
            {REVIEWS_SUMMARY.averageRating}
          </div>
          <div className="flex justify-center">
            <RatingStars rating={REVIEWS_SUMMARY.averageRating} showScore={false} size="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-[#8D7B68]">
            Based on <strong>{REVIEWS_SUMMARY.totalReviews}+</strong> verified Google reviews
          </p>
          <span className="inline-block text-[11px] bg-[#FAF4ED] text-[#704828] px-3 py-1 rounded-full border border-[#E0D0C1] font-semibold">
            Price Range: {REVIEWS_SUMMARY.priceRange}
          </span>
        </div>

        {/* Breakdown Bars */}
        <div className="md:col-span-8 space-y-2.5">
          {REVIEWS_SUMMARY.breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-[#2D1B16] flex items-center gap-1 justify-end">
                {row.stars} <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              </span>
              <div className="flex-1 h-3 bg-[#FAF4ED] rounded-full overflow-hidden border border-[#EBE1D7]">
                <div
                  style={{ width: `${row.percentage}%` }}
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] rounded-full"
                />
              </div>
              <span className="w-10 text-right text-[#8D7B68] font-semibold">
                {row.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Star Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-[#8D7B68] flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        <button
          onClick={() => setFilterRating('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filterRating === 'all'
              ? 'bg-[#2D1B16] text-white shadow-xs'
              : 'bg-white text-[#5C4A3E] border border-[#E7DCD3] hover:bg-[#FAF4ED]'
          }`}
        >
          All Reviews ({reviews.length})
        </button>
        {[5, 4, 3, 2, 1].map((s) => (
          <button
            key={s}
            onClick={() => setFilterRating(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              filterRating === s
                ? 'bg-[#2D1B16] text-white shadow-xs'
                : 'bg-white text-[#5C4A3E] border border-[#E7DCD3] hover:bg-[#FAF4ED]'
            }`}
          >
            <span>{s}</span>
            <Star className="w-3 h-3 fill-current" />
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <RatingStars rating={rev.rating} showScore={false} size="w-4 h-4" />
                <span className="text-xs text-[#8D7B68]">{rev.date}</span>
              </div>

              <p className="text-sm text-[#4A3B32] leading-relaxed italic">
                "{rev.review}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2E8DF] space-y-2">
              {rev.cakeOrdered && (
                <div className="text-[11px] text-[#8D7B68]">
                  <span className="font-semibold text-[#5C381E]">Ordered:</span> {rev.cakeOrdered}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2D1B16] flex items-center gap-1">
                    {rev.author}
                    {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Customer" />}
                  </h4>
                  <p className="text-[10px] text-[#8D7B68]">{rev.location}</p>
                </div>

                <button
                  onClick={() => showToast('Thank you for your feedback!', 'info')}
                  className="flex items-center gap-1 text-[11px] text-[#8D7B68] hover:text-[#2D1B16] cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "Write a Review" Interactive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-scale-up border border-[#E7DCD3] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8D7B68] hover:text-[#2D1B16] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Share Your Experience
              </span>
              <h3 className="font-serif text-2xl font-black text-[#2D1B16]">
                Review The Bread Basket
              </h3>
              <p className="text-xs text-[#7A6A5D]">
                Your review helps other Vijayawada food lovers discover freshly baked happiness.
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-[#E0D5C7]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#2D1B16] ml-2">
                    {rating === 5 ? 'Exceptional! (5 Stars)' : `${rating} Stars`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohini Sharma"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#2D1B16]">Area in Vijayawada</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Panta Kaluva Road / Benz Circle"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">What did you order?</label>
                <input
                  type="text"
                  value={cakeOrdered}
                  onChange={(e) => setCakeOrdered(e.target.value)}
                  placeholder="e.g. Royal Belgian Truffle Cake, Butter Croissant"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about the flavor, freshness, presentation, and bakery service..."
                  className="w-full p-3 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer border border-[#D4AF37]/30"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
