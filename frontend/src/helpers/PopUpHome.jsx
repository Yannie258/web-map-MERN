import axios from 'axios';

export const createPopUpHome = user => {
  console.log(user)
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `
    <ul>
        <li><b>Address:</b> ${user.homeAddress.address}</li>
        <li><b>Longitude:</b> ${user.homeAddress.homeLongitude}</li>
        <li><b>Latitude:</b> ${user.homeAddress.homeLatitude}</li>
    </ul>
    <button id='remove-home-button'>remove</button>
  `;
    // Add event listener for the button
  const removeButton = popupContent.querySelector('#remove-home-button');
    removeButton.addEventListener('click', async () => {
        console.log('remove button clicked');
        try {
            //like update user with empty home address
            //The DELETE method is typically used for deleting entire resources, not for updating or removing specific fields within a resource.

            const res = await axios.put(`/users/${user._id}/removeHome`);
            alert('deleted home successfully')
            window.location.href = '/';
        } catch (error) {
            console.error('Error removing home address:', error.message);
            alert('error deleted home ');
        }
    })

  
    return popupContent;
};


