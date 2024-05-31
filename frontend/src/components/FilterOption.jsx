import { Button } from '@material-tailwind/react';
import React, { useContext } from 'react'
import { UserContext } from '../helpers/UserContext';

// function FilterOption({ categories, selectedCategories, handleCategoryChange }) {
function FilterOption({handleCategoryChange}) {
  // @ts-ignore
  const { categoriesColor } = useContext(UserContext);
  console.log('categories from parent', categoriesColor);
  // Assuming categoriesColor is an object mapping category names to color values
  // Check if categoriesColor is undefined or null
  if (!categoriesColor) {
    // Render loading state or return null
    return <div>Loading...</div>; // Or any loading state component
  }
  // Generate buttons based on categoriesColor
  const categoryButtons = Object.entries(categoriesColor).map(([category, color]) => (
    <Button
      key={category}
      size="sm"
      className="capitalize"
          style={{ backgroundColor: color, color: '#FFFFFF' }}
          onClick={() => handleCategoryChange(category)}
    >
      {category}
      </Button>
      
  ));

    return (
      <div className="flex justify-around space-x-2 ">
        {categoryButtons}
        <Button
          size="sm"
          className="capitalize"
          style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
          onClick={() => handleCategoryChange(null)}
        >
          All
        </Button>
      </div>
    );
}

export default FilterOption
