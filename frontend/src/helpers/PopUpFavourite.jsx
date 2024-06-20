import axios from 'axios';

export const createPopUpFavourite = user => {

  const popupContent = document.createElement('div');
  popupContent.innerHTML = `
    <ul>
         <li><b>Longitude:</b> ${user.favourite.category}</li>
         <li><b>Latitude:</b> ${user.favourite.address}</li>
         <li><b>Longitude:</b> ${user.favourite.favouriteLongitude}</li>
         <li><b>Latitude:</b> ${user.favourite.favouriteLatitude}</li>
    </ul>
    <button id='remove-favourite-button'><img src='src/assets/trash.svg' alt="trash"/></button>
  `;
  // Add event listener for the button
  const removeButton = popupContent.querySelector('#remove-favourite-button');
  removeButton.addEventListener('click', async () => {
    try {
      //like update user with empty home address
      //The DELETE method is typically used for deleting entire resources, not for updating or removing specific fields within a resource.

      const res = await axios.put(`/users/${user._id}/removeFavourite`);
      window.location.href = '/';
    } catch (error) {
      console.error('Error removing favourite address:', error.message);
      alert('error deleted favourite ');
    }
  });

  return popupContent;
};
