import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, AlertCircle, MessageSquare, Clock, UserCheck, RefreshCw } from 'lucide-react';
import { AppItem } from '../types/app';
import {
  UserRating,
  submitOrUpdateUserRating,
  getCurrentUserRatingForApp,
  calculateRatingStats,
} from '../services/ratingService';

interface AppRatingProps {
  app: AppItem;
  reviews: UserRating[];
  reviewsStatus: 'loading' | 'success' | 'error';
  reviewsError: string | null;
  onRetry?: () => void;
}

export const AppRating: React.FC<AppRatingProps> = ({
  app,
  reviews,
  reviewsStatus,
  reviewsError,
  onRetry,
}) => {
  const isComingSoon = app.isComingSoon || app.downloadSize === 'Coming Soon' || app.downloadSize === 'Soon';

  const [currentUserRating, setCurrentUserRating] = useState<UserRating | null>(null);

  const [ratingInput, setRatingInput] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [reviewInput, setReviewInput] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load existing rating for current anonymous user if available
  useEffect(() => {
    setSubmitSuccessMsg(null);
    setErrorMessage(null);

    if (!isComingSoon) {
      getCurrentUserRatingForApp(app.id)
        .then((existing) => {
          if (existing) {
            setCurrentUserRating(existing);
            setRatingInput(existing.rating);
            if (existing.userName && existing.userName !== 'Anonymous User') {
              setUserNameInput(existing.userName);
            }
            if (existing.review) {
              setReviewInput(existing.review);
            }
          } else {
            setCurrentUserRating(null);
            setRatingInput(5);
            setUserNameInput('');
            setReviewInput('');
          }
        })
        .catch((err) => console.error('Error fetching user rating:', err));
    }
  }, [app.id, isComingSoon]);

  const stats = calculateRatingStats(reviews);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isComingSoon || isSubmitting) return;

    if (ratingInput < 1 || ratingInput > 5) {
      setErrorMessage('Please select a star rating between 1 and 5.');
      return;
    }

    if (reviewInput.trim().length > 500) {
      setErrorMessage('Review text cannot exceed 500 characters.');
      return;
    }

    setErrorMessage(null);
    setSubmitSuccessMsg(null);
    setIsSubmitting(true);

    try {
      const updatedRating = await submitOrUpdateUserRating({
        appId: app.id,
        appName: app.name,
        rating: ratingInput,
        review: reviewInput,
        userName: userNameInput,
      });

      setCurrentUserRating(updatedRating);
      setSubmitSuccessMsg(
        currentUserRating
          ? 'Your rating & experience review have been updated successfully!'
          : 'Thank you! Your rating & experience review have been submitted successfully!'
      );

      // Auto-dismiss success toast after 5s
      setTimeout(() => setSubmitSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Submission failed:', err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('500 characters')) {
        setErrorMessage('Review text cannot exceed 500 characters.');
      } else {
        setErrorMessage('Something went wrong submitting your review. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-8">
      {/* Header with Average Rating Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <span>Ratings & Experiences</span>
          </h2>
          <p className="text-xs text-white/60 mt-1">
            {isComingSoon
              ? `${app.name} is coming soon. Ratings and reviews are currently disabled.`
              : `Real-time user feedback for ${app.name}`}
          </p>
        </div>

        {!isComingSoon && (
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 font-bold text-lg text-amber-400">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>
                {reviewsStatus === 'loading'
                  ? 'Loading...'
                  : reviewsStatus === 'error'
                  ? 'Error'
                  : stats.averageRating}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/15" />
            <span className="text-xs text-white/70 font-medium">
              {reviewsStatus === 'loading'
                ? 'Loading reviews...'
                : reviewsStatus === 'error'
                ? 'Unable to load reviews'
                : stats.displayReviewsCount}
            </span>
          </div>
        )}
      </div>

      {isComingSoon ? (
        <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-white/10 space-y-2">
          <Clock className="w-8 h-8 text-blue-400 mx-auto opacity-80" />
          <h3 className="text-base font-semibold text-white">App Release Pending</h3>
          <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
            {app.name} is currently in active development. User rating and experience submissions will be enabled upon release.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-5 bg-white/[0.03] p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-semibold text-white">
                  {currentUserRating ? 'Update Your Rating' : 'Rate & Review'}
                </h3>
                {currentUserRating && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <UserCheck className="w-3 h-3" />
                    <span>You already rated this</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-white/60 mb-4">
                {currentUserRating
                  ? 'Update your previous star rating or experience review.'
                  : `Share your experience with ${app.name}`}
              </p>

              {/* Feedback Banners */}
              {submitSuccessMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{submitSuccessMsg}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1-5 Star Rating Picker */}
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">
                    App Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating !== null ? hoverRating : ratingInput) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingInput(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                          title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star
                            className={`w-6 h-6 transition-all ${
                              active
                                ? 'fill-amber-400 text-amber-400 scale-105'
                                : 'text-white/30 fill-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-xs font-semibold text-amber-400">
                      {hoverRating !== null ? hoverRating : ratingInput} / 5
                    </span>
                  </div>
                </div>

                {/* Optional Name Input */}
                <div>
                  <label htmlFor="user-name" className="block text-xs font-medium text-white/70 mb-1.5">
                    Your Name <span className="text-white/40 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Optional Experience / Review Textbox */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="review-text" className="block text-xs font-medium text-white/70">
                      Your Experience / Review <span className="text-white/40 font-normal">(Optional)</span>
                    </label>
                    <span
                      className={`text-[10px] ${
                        reviewInput.length > 500 ? 'text-red-400 font-bold' : 'text-white/40'
                      }`}
                    >
                      {reviewInput.length} / 500
                    </span>
                  </div>
                  <textarea
                    id="review-text"
                    rows={3}
                    maxLength={500}
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                    placeholder="Share your experience with this app..."
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Review...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{currentUserRating ? 'Update Rating & Review' : 'Submit Rating & Review'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* User Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                User Experiences ({reviews.length})
              </h3>
              <span className="text-[11px] text-white/50">Newest first</span>
            </div>

            {reviewsStatus === 'loading' ? (
              <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-white/10 space-y-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-white/60">Loading reviews...</p>
              </div>
            ) : reviewsStatus === 'error' ? (
              <div className="p-8 text-center bg-red-500/10 rounded-2xl border border-red-500/20 space-y-3">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Unable to load reviews</h4>
                <p className="text-xs text-red-300 max-w-xs mx-auto">
                  {reviewsError || 'A network error occurred while connecting to the reviews service.'}
                </p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>
            ) : reviews.length === 0 ? (
              <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-white/10 space-y-2">
                <MessageSquare className="w-8 h-8 text-white/30 mx-auto" />
                <p className="text-xs font-medium text-white/70">No reviews yet</p>
                <p className="text-[11px] text-white/40 max-w-xs mx-auto">
                  Be the first user to share your experience with {app.name}!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {reviews.map((rev) => {
                  const initial = (rev.userName || 'A').charAt(0).toUpperCase();
                  const isCurrentUsersReview = currentUserRating && rev.id === currentUserRating.id;

                  return (
                    <div
                      key={rev.id}
                      className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        isCurrentUsersReview
                          ? 'bg-blue-900/10 border-blue-500/30'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-xs">
                            {initial}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                              {rev.userName || 'Anonymous User'}
                              {isCurrentUsersReview && (
                                <span className="text-[10px] text-blue-400 font-normal">(You)</span>
                              )}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] text-white/40">{rev.date}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-white/20 fill-transparent'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                        {rev.review && rev.review.trim().length > 0
                          ? rev.review
                          : `Rated ${rev.rating} out of 5 stars`}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
