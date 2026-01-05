import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  votes: number;
  showVotes?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  votes,
  showVotes = true,
}) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
    {showVotes && <span className="text-sm text-gray-600">{votes} Votes</span>}
  </div>
);
