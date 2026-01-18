import type { Doctor } from "../../../types/patient/doctorListing.type";
import { Badge } from "../Badge";

interface AvailabilityBadgeProps {
  availability: Doctor["availability"];
  nextAvailable?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  availability,
  nextAvailable,
}) => {
  if (availability === "available") {
    return <Badge text="Available " variant="success" />;
  }
  if (availability === "not-available") {
    return <Badge text="Not Available" variant="default" />;
  }
  return <Badge text={`Next: ${nextAvailable}`} variant="warning" />;
};
