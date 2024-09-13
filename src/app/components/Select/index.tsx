import React from 'react';

const Select = () => {
  return (
    <div>
      <select
        name="format"
        className="border border-[#DFDFDF] rounded-lg bg-white px-3 py-1 text-left text-[#9D8F8F] text-sm font-normal"
        defaultValue="Sort By"
        // onChange={(e) => onSortClick(e.target.value)}
        style={{ fontFamily: 'Roboto, sans-serif' }} // Custom font style
      >
        <option value="">Select Status</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="createdAt">CreatedAt</option>
      </select>
    </div>
  );
};

export default Select;
