/* global $ */
const checkedAmenities = {};
const checkedStates = {};
const checkedCities = {};
$(document).ready(function () {
  // update status indicator
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/', // The URL to fetch data from
    method: 'GET', // The HTTP method to use (GET, POST, etc.)
    dataType: 'json', // Expected data type of the response
    success: function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error('Error occurred:', status, error);
    }
  });

  // get checked amenities on change
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
    console.log(values);

    // Join values into a string with a separator (e.g., comma)
    const text = values.join(', ');
    $('.amenities h4').text(text);
  });


  // get checked states on chanage
  $('.locations h2 input').on('change', function () {
    if ($(this).is(':checked')) {

      const stateId = $(this).data('id');
      const stateName = $(this).data('name');
      checkedStates[stateId] = stateName;

    } else {
      // remove amenityId from array checkedAmenities
      const stateId = $(this).data('id');
      delete checkedStates[stateId];
    }
    // Iterate through the object and get all values
    const values = Object.values(checkedStates);

    // Join values into a string with a separator (e.g., comma)
    const text = values.join(', ');
    $('.locations h4').text(text);
  });


  // get checked cities on chanage
  $('.locations li ul li input').on('change', function () {
    if ($(this).is(':checked')) {

      const cityId = $(this).data('id');
      const cityName = $(this).data('name');
      checkedCities[cityId] = cityName;

    } else {
      // remove cityId from array checkedAmenities
      const cityId = $(this).data('id');
      delete checkedCities[cityId];
    }
  });




  // fetch places when button is clicked

  $('button').on('click', function () {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/', // The URL to fetch data from
      method: 'POST', // The HTTP method to use (GET, POST, etc.)
      contentType: 'application/json', // Explicitly set Content-Type to application/json
      dataType: 'json', // Expected data type of the response
      data: JSON.stringify({ amenities: checkedAmenities, cities: checkedCities, states: checkedStates }),
      success: function (places) {
        console.log('places fetched successfully');
        for (const place of places) {
          const newArticle = $('<article>').html(`<div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>`);

          // Append the new item to the list
          $('.places').append(newArticle);
        }
      },
      error: function (xhr, status, error) {
        // Handle errors here
        console.error('Error occurred:', status, error);
      }
    });
  });
});
