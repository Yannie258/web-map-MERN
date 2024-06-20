function Documentation() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Web Map Application!</h1>

      <div className="text-lg text-gray-700 mb-6">
        <section>
          <h1 className="font-bold text-2xl">Introduction</h1>
          <p className="mb-3">
            This is a web map application that allows you to register, login, logout, and manage your accounts to access
            additional features. You can explore a map where places from four categories such as school, kindergarten,
            social school, and teenager support school are marked with different colors.
          </p>
          <a className="hover:underline italic text-primary" href="https://www.arcgis.com/index.html">
            Reference API is taken from ArcGIS
          </a>
        </section>

        <section className="mt-6">
          <h1 className="font-bold text-2xl">List of Datasets</h1>
          <br />
          <ul className="list-disc pl-6 mb-4 italic text-primary">
            <li>
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulen/about"
                className="hover:underline"
              >
                Schools (Grundschule, Oberschule, Förderschule, Gymnasium, Berufsbildende Schule, …)
              </a>
            </li>
            <li>
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulen/about"
                className="hover:underline"
              >
                Kindergarten (Kindertageseinrichtungen)
              </a>
            </li>
            <li>
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulsozialarbeit/about"
                className="hover:underline"
              >
                Social Child Projects (Schulsozialarbeit)
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::jugendberufshilfen/about"
              >
                Social Teenager Projects (Jugendberufshilfe)
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-6">
          <h1 className="font-bold text-2xl">Functionalities</h1>
          <br />
          <h3 className="mb-3 text-xl font-bold">As a registered user, you can:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              To manage your account after registering, click on the user icon next to the sign-out button. You can see
              a manage page and work on it. You cannot directly change your favorite and home addresses on this page,
              but you can change them directly from the map view.
            </li>
            <li>
              View details of categories by clicking on POIs, including names, addresses, and contact details displayed
              in a popup.
            </li>
            <li>Filter one or more categories on the map by clicking on the "Filter categories..." dropdown.</li>
            <li>
              Set or remove a place as your home location. Search your address on "Find address or place" and then set
              as home. To remove, just click again on Points of Interest (POI) and click on the trash icon.
            </li>
            <li>
              Mark or remove one of the facilities as favorite places. Click on a category point and set it as favorite.
              To remove, just click again on it and click on the trash icon.
            </li>
            <li>
              After setting home and favourite address you can see a 'show route' button on the left side. You can turn on/off the popup direction between both sides
            </li>
            <li>
              Total distance and total time will be displayed under the direction
            </li>
          </ul>
          <p className="mb-3">
            The application ensures that the dataset is clean by removing duplicates, correcting errors, and handling
            missing values. Data formats are standardized for easy integration and analysis.
          </p>
          <h3 className="mb-3 text-xl font-bold">Non-registered users can:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>View the map.</li>
            <li>Search for places and view POI details in a popup.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Documentation;
