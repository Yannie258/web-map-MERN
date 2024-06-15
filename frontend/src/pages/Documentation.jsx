function Documentation() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Web Map Application!</h1>

      <div className="text-lg text-gray-700 mb-6">
        <section>
          <h1 className="font-bold text-2xl">Introduction</h1>
          <br />
          <p className="mb-3">
            This is a web map application that allows users to register, login, logout, and manage their accounts to
            access additional features. Users can explore a map where places from four categories—school, kindergarten,
            social school, and teenager support school—are marked with different colors.
          </p>
          <a className="hover:underline italic text-primary" href="https://www.arcgis.com/index.html">
            ReferenceAPI is taken from ArcGIS
          </a>
        </section>
        <br />
        <section>
          <h1 className="font-bold text-2xl"> List of datasets</h1>
          <br />
          <ul className="list-disc pl-6 mb-4  italic text-primary">
            <li>
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulen/about"
                className="hover:underline"
              >
                schools (Grundschule, Oberschule, Förderschule, Gymnasium, Berufsbildende Schule, …)
              </a>
            </li>
            <li>
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulen/about"
                className="hover:underline"
              >
                kindergarden (Kindertageseinrichtungen)
              </a>
            </li>

            <li>
              <a
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::schulsozialarbeit/about"
                className="hover:underline"
              >
                social child projects (Schulsozialarbeit)
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                href="https://portal-chemnitz.opendata.arcgis.com/datasets/chemnitz::jugendberufshilfen/about"
              >
                social teenager projects ( Jugendberufshilfe)
              </a>
            </li>
          </ul>
        </section>
        <br />
        <section>
          <h1 className="font-bold text-2xl"> Functionalities</h1>
          <br />
          <p className="mb-3">As a registered user, you can:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Filter one or more categories on the map.</li>
            <li>Set a place as your home location.</li>
            <li>Mark facilities as favorite places.</li>
            <li>
              View details of categories by clicking on Points of Interest (POIs), including names, addresses, and
              contact details displayed in a popup.
            </li>
            <li>Register, login, logout, and edit your account information.</li>
          </ul>
          <p className="mb-3">
            The application ensures that the dataset is clean by removing duplicates, correcting errors, and handling
            missing values. Data formats are standardized for easy integration and analysis.
          </p>
          <p className="mb-3">Non-registered users can still:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>View the map.</li>
            <li>Search for places and view POI details in a popup.</li>
          </ul>
          <p className="mb-3">However, they have limited functionality:</p>
          <ul className="list-disc pl-6">
            <li>Cannot filter facilities.</li>
            <li>Cannot set favorite or home addresses.</li>
            <li>Cannot generate routes between home and facilities.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Documentation;
