import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle } from 'lucide-react';

interface FeedbackData {
  name: string;
  message: string;
  rating: number;
  timestamp: string;
}

const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message || formData.rating === 0) {
      alert('Please fill in all fields and provide a rating.');
      return;
    }

    setIsSubmitting(true);

    // Mock submission - log to console (replace with actual backend call)
    const feedbackData: FeedbackData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    console.log('Feedback submitted:', feedbackData);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', message: '', rating: 0 });
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h2>
          <p className="text-green-700">
            Your feedback has been successfully submitted. We appreciate your input 
            and will use it to improve our service.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-4xl font-bold text-gray-900">Feedback</h1>
        </div>
        <p className="text-xl text-gray-600">
          We value your opinion! Share your thoughts and help us improve Scan & Pay.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors duration-200 ${
                      star <= (hoverRating || formData.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-3 text-sm text-gray-600">
                  {formData.rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Share your thoughts, suggestions, or report any issues you've experienced..."
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
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-50 rounded-lg p-6">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Rate Your Experience</h3>
          <p className="text-sm text-gray-600">Help us understand how we're doing</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Share Your Thoughts</h3>
          <p className="text-sm text-gray-600">Tell us what you love or what needs work</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6">
          <Send className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Make an Impact</h3>
          <p className="text-sm text-gray-600">Your feedback shapes our future updates</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;