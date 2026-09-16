import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 4.3, showScore = true, reviewsCount = null, size = 'w-4 h-4' }) {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return null;
  }
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-[#D4AF37]">
        {[...Array(5)].map((_, i) => {
          const filled = i < fullStars;
          const isHalf = !filled && i === fullStars && hasHalfStar;

          return (
            <span key={i} className="relative inline-block">
              <Star
                className={`${size} ${
                  filled ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#E0D5C7]'
                }`}
              />
              {isHalf && (
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${size} fill-[#D4AF37] text-[#D4AF37]`} />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-[#2D1B16] tracking-tight">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== null && (
        <span className="text-xs text-[#8D7B68]">({reviewsCount})</span>
      )}
    </div>
  );
}
