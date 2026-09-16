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

  const [filterRating, setFilterRating] = useState('all'); // 'all', 5, 4, 3, 2, 1, 'text-only'
  const [modalOpen, setModalOpen] = useState(false);

  // Review Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Vijayawada');
  const [rating, setRating] = useState('5'); // '5', '4', '3', '2', '1', 'none'
  const [cakeOrdered, setCakeOrdered] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!name.trim() || !reviewText.trim()) {
      showToast('Please enter your name and review text.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const parsedRating = rating === 'none' ? null : Number(rating);

      await addReview({
        author: name.trim(),
        customer_name: name.trim(),
        location: location.trim(),
        rating: parsedRating,
        cakeOrdered: cakeOrdered.trim() || null,
        review: reviewText.trim(),
        review_text: reviewText.trim(),
        review_date: 'Just now',
      });

      setModalOpen(false);
      setName('');
      setReviewText('');
      setCakeOrdered('');
      setRating('5');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    if (filterRating === 'text-only') return r.rating === null || r.rating === undefined;
    return r.rating === Number(filterRating);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7DCD3] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
            Google Ratings & Customer Voice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1B16]">
            Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6A5D] mt-1">
            Authentic customer reviews stored in our database from over 960+ patrons across Vijayawada.
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
        <button
          onClick={() => setFilterRating('text-only')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filterRating === 'text-only'
              ? 'bg-[#2D1B16] text-white shadow-xs'
              : 'bg-white text-[#5C4A3E] border border-[#E7DCD3] hover:bg-[#FAF4ED]'
          }`}
        >
          Feedback Only
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => {
          const customerName = rev.customer_name || rev.author;
          const reviewText = rev.review_text || rev.review;
          const reviewDate = rev.review_date || rev.date;
          const hasRating = rev.rating !== null && rev.rating !== undefined;

          return (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Show rating stars ONLY when actual rating is available */}
                  {hasRating ? (
                    <RatingStars rating={Number(rev.rating)} showScore={false} size="w-4 h-4" />
                  ) : (
                    <span className="text-[11px] font-semibold text-[#8D7B68] bg-[#FAF4ED] px-2.5 py-0.5 rounded-full border border-[#E7DCD3]">
                      Customer Feedback
                    </span>
                  )}
                  <span className="text-xs text-[#8D7B68]">{reviewDate}</span>
                </div>

                {/* Customer Review Text */}
                <p className="text-sm text-[#4A3B32] leading-relaxed italic">
                  "{reviewText}"
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
                    {/* Customer Name */}
                    <h4 className="text-xs font-bold text-[#2D1B16] flex items-center gap-1">
                      {customerName}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Customer Review" />
                    </h4>
                    <p className="text-[10px] text-[#8D7B68]">{rev.location || 'Vijayawada'}</p>
                  </div>

                  <span className="text-[10px] font-semibold bg-[#FAF4ED] text-[#704828] px-2 py-0.5 rounded border border-[#E0D0C1]">
                    {rev.source || 'Customer Review'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
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
                Your review will be stored in our database and helps other Vijayawada food lovers discover freshly baked happiness.
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker with 'No Rating' option */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-[#2D1B16]">Your Rating (Optional)</label>
                  {rating === 'none' && (
                    <span className="text-[11px] text-[#8D7B68] italic">No rating selected (text feedback only)</span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(String(star))}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                      title={`${star} Stars`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          rating !== 'none' && star <= Number(rating)
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-[#E0D5C7]'
                        }`}
                      />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setRating('none')}
                    className={`ml-2 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      rating === 'none'
                        ? 'bg-[#2D1B16] text-white border-[#2D1B16]'
                        : 'bg-[#FAF6F0] text-[#7A6A5D] border-[#DECBC0] hover:bg-[#EAE0D5]'
                    }`}
                  >
                    No Rating
                  </button>
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
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer border border-[#D4AF37]/30 disabled:opacity-50"
              >
                {submitting ? 'Saving Review...' : 'Submit Review to Database'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
