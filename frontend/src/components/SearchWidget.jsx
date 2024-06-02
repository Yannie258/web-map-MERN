import Search from '@arcgis/core/widgets/Search.js';
import { useEffect } from 'react';

function SearchWidget({ view, onSelectPlace }) {
  useEffect(() => {
    if (!view || !view.ui) return;
    // console.log('view: ', view);
    const searchWidget = new Search({
      view: view
    });

    view.ui.add(searchWidget, {
      position: 'top-right',
      index: 1
    });

    searchWidget.on('select-result', onSelectPlace);

    return () => {
      view.ui.remove(searchWidget);
    };
  }, [view, onSelectPlace]);
  return <div></div>;
}

export default SearchWidget;
