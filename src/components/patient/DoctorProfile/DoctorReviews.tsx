import React, { useState } from "react";
import { Star } from "lucide-react";
import type { Feedback } from "../../../types/patient/DoctorProfile/doctor.profile.types";
import { useAppSelector } from "../../../store/hooks";
import { notify } from "../../../shared/notification/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDoctorReviewAPi,
  postDoctorReviewAPi,
} from "../../../api/apiService/patient/doctorReview";

interface DoctorReviewsProps {
  doctorId: string;
}

const DoctorReviews: React.FC<DoctorReviewsProps> = ({ doctorId }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const auth = useAppSelector((state) => state.auth.isAuthenticated);

  const { data: reviews, isPending } = useQuery({
    queryKey: ["doctor:reviews", doctorId],
    queryFn: async () => await getDoctorReviewAPi(doctorId),
  });

  const [feedbackForm, setFeedbackForm] = useState<Feedback>({
    rating: 5,
    comment: "",
  });

  const postDoctorReviewMutate = useMutation({
    mutationFn: postDoctorReviewAPi,
    onSuccess() {
      notify.success("the review posted successfully");
    },
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postDoctorReviewMutate.mutate({
      rating: feedbackForm.rating,
      doctorId,
      comment: feedbackForm.comment,
    });

    setFeedbackForm({
      rating: 5,
      comment: "",
    });

    setShowFeedbackForm(false);
  };

  if (!auth) {
    notify.error("Please login to continue");
    return;
  }

  if (isPending) {
    return <div>Loading</div>;
  }

  console.log("The reviews are ", reviews);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Patient Reviews</h3>
        <button
          onClick={() => setShowFeedbackForm(!showFeedbackForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Feedback
        </button>
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Submit Your Feedback</h4>

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFeedbackForm({
                        ...feedbackForm,
                        rating: star,
                      })
                    }
                  >
                    <Star
                      size={28}
                      className={
                        star <= feedbackForm.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={feedbackForm.comment}
                onChange={(e) =>
                  setFeedbackForm({
                    ...feedbackForm,
                    comment: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={() => setShowFeedbackForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(
          (review: {
            id: string;
            patientName: string;
            date: Date;
            rating: number;
            comment: string;
          }) => (
            <div
              key={review.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {review.patientName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>

                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-gray-600 mb-2">{review.comment}</p>

              {/* Recommended Badge */}
              {/* {review.recommended && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Recommended
              </div>
            )} */}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default DoctorReviews;
