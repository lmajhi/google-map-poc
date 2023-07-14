export const calculatePolyGonQuad = (lat, lng, radius = 5) => {
  const R = 6371; // Earth's radius in kilometers
  const coordinates = [];

  // Convert radius from km to meters
  radius *= 1;

  const angles = [0, 90, 180, 270]; // Angles at 0, 90, 180, and 270 degrees

  angles.forEach((angle) => {
    // Convert angle to radians
    const theta = angle * (Math.PI / 180);

    // Calculate coordinates
    const dx = radius * Math.cos(theta);
    const dy = radius * Math.sin(theta);

    // Convert delta coordinates to decimal degrees
    const deltaLng = dx / (R * Math.cos(lat * (Math.PI / 180)));
    const deltaLat = dy / R;

    // Calculate new coordinates
    const newLng = lng + deltaLng * (180 / Math.PI);
    const newLat = lat + deltaLat * (180 / Math.PI);

    // Append coordinate object to the array
    coordinates.push({ lat: newLat, lng: newLng });
  });

  return coordinates;
};
