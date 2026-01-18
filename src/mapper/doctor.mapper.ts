import type { DoctorApiItem } from "../types/api/doctor.types";
import type { Doctor } from "../types/patient/doctorListing.type";

export const mapDoctorFromApi = (item: DoctorApiItem): Doctor => {
  let availability: Doctor["availability"] = "not-available";

  if (item.isAvailableToday) {
    availability = "available";
  } else if (item.availableDays.length > 0) {
    availability = "next-available";
  }

  return {
    id: item.id,
    name: item.fullName,
    specialty: item.specialtyName,
    image: item.profileImage,
    rating: item.averageRating,
    votes: item.totalReviews,
    clinic: item.hospitalName,
    availability,
    nextAvailable:
      availability === "next-available" ? item.availableDays[0] : undefined,
    schedule: item.availableDays,
    price: item.consultationFee,
    badges: [item.specialtyName],
    distance: item.distance,
    experienceYears: item.experienceYears,
  };
};
