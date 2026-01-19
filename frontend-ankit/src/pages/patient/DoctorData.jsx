import React from 'react';
import CardList from './CardList';
import { doctorsData, hospitalsData } from './Data';

function Appdoctor() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <CardList title="Nearby Doctors" data={doctorsData} />
        <CardList title="Nearby Hospitals" data={hospitalsData} />
      </div>
    </div>
  );
}

export default Appdoctor; 