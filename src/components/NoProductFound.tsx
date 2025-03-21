import React from 'react';
import searchnotfound from '../assets/searchnotfound.png';

const NoProductFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center self-start justify-center w-full col-start-2 col-end-3 text-center'>
        <img className='w-48 lg:w-96 md:w-80' src={searchnotfound} alt="emptycart" />
        <p className='text-3xl font-extrabold'>No results found</p>
        <p className='text-sm lg:text-lg text-grayshade-100'>Please try again.</p>
    </div>
  );
};

export default NoProductFound; 