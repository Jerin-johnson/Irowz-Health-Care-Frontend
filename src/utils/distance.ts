export const formatDistance = (meters?: number) => {
  if (!meters && meters !== 0) return null;

  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / 1000).toFixed(1)} km`;
};
