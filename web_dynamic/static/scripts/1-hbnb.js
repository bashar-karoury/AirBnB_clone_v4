/* global $ */
const checkedAmenities = {};
console.log('Script execuitng');
$(document).ready(function () {
  $('.amenities input').on('change', function () {
    if ($(this).is(':checked')) {
      // add amenity_id to array checkedAmenities
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');
      checkedAmenities[amenityId] = amenityName;
      // console.log(checkedAmenities);
    } else {
      // remove amenityId from array checkedAmenities
      const amenityId = $(this).data('id');
      delete checkedAmenities[amenityId];
      // console.log(checkedAmenities);
    }
    // update checkedAmenities
    // Iterate through the object and get all values
    const values = Object.values(checkedAmenities);

    // Join values into a string with a separator (e.g., comma)
    const text = values.join(', ');
    $('.amenities h4').text(text);
  });
});
