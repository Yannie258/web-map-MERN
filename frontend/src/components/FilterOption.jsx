import React, { useContext } from 'react';
import Select from 'react-select';
import { UserContext } from '../helpers/UserContext';

function FilterOption({ handleCategoryChange }) {
  const { categoriesColor } = useContext(UserContext);

  if (!categoriesColor) {
    return <div>Loading...</div>;
  }

  const dot = color => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10
    }
  });

  const options = Object.entries(categoriesColor).map(([category, color]) => ({
    value: category,
    label: category,
    color: color
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      ...dot(state.data.color),
      padding: 10
    }),
    singleValue: (provided, state) => ({
      ...provided,
      ...dot(state.data.color)
    }),
    control: provided => ({
      ...provided,
      width: 250 // Set the desired width here
    })
  };

  const handleChange = selectedOptions => {
    handleCategoryChange(selectedOptions || []);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Select
        isMulti
        options={options}
        styles={customStyles}
        onChange={handleChange}
        placeholder="Filter categories..."
      />
    </div>
  );
}

export default FilterOption;
