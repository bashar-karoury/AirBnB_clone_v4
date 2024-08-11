/* global $ */
const checkedAmenities = {};
$(document).ready(function () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/', // The URL to fetch data from
    method: 'GET', // The HTTP method to use (GET, POST, etc.)
    dataType: 'json', // Expected data type of the response
    success: function (response) {
      if (response.status === "OK") {
        $('#api_status').addClass('available');
      }
      else {
        $('#api_status').removeClass('available');
      }

    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error('Error occurred:', status, error);
    }
  });

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
