import axios from 'axios';


export const createPopupContent = (category, user) => {
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `
    <ul>
      <li><b>Category:</b> ${category.name}</li>
      <li><b>Name:</b> ${category.properties.BEZEICHNUNG ? category.properties.BEZEICHNUNG : '-'}</li>
      <li><b>Carrier:</b> ${category.properties.TRAEGER}</li>
      <li><b>Address:</b> ${category.properties.STRASSE}</li>
      <li><span>${category.properties.PLZ} ${category.properties.ORT}</span></li>
      <li><b>Contact:</b> ${category.properties.TELEFON ? category.properties.TELEFON : '-'}</li>
      <li><b>Web:</b> ${category.properties.WWW ? category.properties.WWW : '-'}</li>
      <li><b>Email:</b> ${category.properties.EMAIL ? category.properties.EMAIL : '-'}</li>
      <li><b>Longitude:</b> ${category.geometry.coordinates[0]}</li>
      <li><b>Latitude:</b> ${category.geometry.coordinates[1]}</li>
    </ul>
    <div id='configPOIPopup'>
      <button id='add-favourite-button'>Add to Favourite</button>
      <button id='more-info'>More about this place</button>
    </div>  
    <div id="additional-info"></div>
  `;

  // Add event listener for the button
  const addButton = popupContent.querySelector('#add-favourite-button');
  addButton.addEventListener('click', async () => {
    try {
      const res = await axios.put(`/users/${user._id}`, {
        favourite: {
          category: category.name,
          address: `${category.properties.STRASSE} ${category.properties.PLZ} ${category.properties.ORT}`,
          favouriteLongitude: category.geometry.coordinates[0],
          favouriteLatitude: category.geometry.coordinates[1]
        }
      });
      
      window.location.href = '/';
    } catch (error) {
      alert('Can not add to favourites successfully');
      console.error(error);
    }
  });

  const getMoreInfos = popupContent.querySelector('#more-info');
  getMoreInfos.addEventListener('click', async () => {
    try {
      const res = await axios.post('/location-info-more', {
        lat: category.geometry.coordinates[1],
        lon: category.geometry.coordinates[0]
      });


      const additionalInfo = popupContent.querySelector('#additional-info');
      if (res.data.extratags) {
        additionalInfo.innerHTML = `
          <h3 id="more_header">Additional Information:</h3>
          <br/>
          <ul>
            <li><b>Type:</b> ${res.data.type}</li>
            <li><b>Display Name:</b> ${res.data.display_name}</li>
            <li><b>Email:</b> ${res.data.extratags.email ? res.data.extratags.email : '-'}</li>
            <li><b>Tel:</b> ${res.data.extratags.phone ? res.data.extratags.phone : '-'}</li>      
            <li><b>Licence:</b> ${res.data.licence ? res.data.licence : '-'}</li> 
          </ul>     
        `;
      } else {
        additionalInfo.innerHTML = '<p>No additional data available.</p>';
      }
    } catch (error) {
      console.log(error);
    }
  });

  return popupContent;
};
