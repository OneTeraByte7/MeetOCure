
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerhos from './Header-hos';
import HospitalCard from './HospitalCard-hos';
// import { FilterType, Hospital, SortCriteria, SortOrder } from './types';
import { SearchIcon, SortIcon } from './Icons';
import { allDoctorsData } from './DoctorsData';



const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0c4d6b]"></div>
    </div>
);

const App = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortCriteria, setSortCriteria] = useState('Default');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const sortDropdownRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setDoctors(allDoctorsData);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentFilterOptions = ['All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Orthopedic', 'Psychiatrist', 'Gynecologist', 'Urologist', 'Endocrinologist', 'Oncologist', 'Dentist', 'Ophthalmologist', 'ENT Specialist', 'Pulmonologist', 'Rheumatologist', 'Gastroenterologist', 'Hematologist', 'Nephrologist'];

    const sortedAndFilteredData = useMemo(() => {
        let processedData = [...doctors];

        if (activeFilter !== 'All') {
            processedData = processedData.filter(item => item.type === activeFilter);
        }
        if (searchTerm) {
            processedData = processedData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (sortCriteria === 'Liked') {
            return processedData.filter(item => item.isFavorite);
        }
        switch (sortCriteria) {
            case 'Distance':
                processedData.sort((a, b) => sortOrder === 'asc' ? a.distance - b.distance : b.distance - a.distance);
                break;
            case 'Review':
                processedData.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
                break;
            case 'Default':
            default:
                processedData.sort((a, b) => a.id - b.id);
                break;
        }

        return processedData;
    }, [doctors, searchTerm, activeFilter, sortCriteria, sortOrder]);

    const handleToggleFavorite = (id) => {
        setDoctors(prev => prev.map(d => d.id === id ? { ...d, isFavorite: !d.isFavorite } : d));
    };

    const handleSortCriteriaChange = (criteria) => {
        setSortCriteria(criteria);
        setIsSortDropdownOpen(false);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        setIsSortDropdownOpen(false);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto w-full sm:p-2">
            <Headerhos title="All Doctors" />

            <div className="my-6 w-full space-y-4">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#697080] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c4d6b] text-gray-900"
                    />
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {currentFilterOptions.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeFilter === filter
                                    ? 'bg-[#0c4d6b] text-white shadow-md'
                                    : 'bg-white text-[#0c4d6b] border border-[#0c4d6b]'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 flex-shrink-0 w-full md:w-auto">
                        <p className="font-semibold text-sm text-gray-500">{sortedAndFilteredData.length} found</p>
                        <div className="relative" ref={sortDropdownRef}>
                            <button onClick={() => setIsSortDropdownOpen(prev => !prev)} className="flex items-center space-x-1 font-semibold text-gray-600">
                                <span>{sortCriteria}</span>
                                <SortIcon className="w-4 h-4" />
                            </button>
                            {isSortDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                    <div className="py-1">
                                        {(['Default', 'Distance', 'Review', 'Liked']).map(c => (
                                            <button key={c} onClick={() => handleSortCriteriaChange(c)} className={`w-full text-left px-4 py-2 text-sm ${sortCriteria === c ? 'bg-blue-100 text-[#0c4d6b]' : 'text-gray-700'} hover:bg-gray-100`}>{c}</button>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-200"></div>
                                    <div className="py-1">
                                        <button onClick={() => handleSortOrderChange('asc')} className={`w-full text-left px-4 py-2 text-sm ${sortOrder === 'asc' ? 'bg-blue-100 text-[#0c4d6b]' : 'text-gray-700'} hover:bg-gray-100`}>Ascending</button>
                                        <button onClick={() => handleSortOrderChange('desc')} className={`w-full text-left px-4 py-2 text-sm ${sortOrder === 'desc' ? 'bg-blue-100 text-[#0c4d6b]' : 'text-gray-700'} hover:bg-gray-100`}>Descending</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedAndFilteredData.length > 0 ? (
                    sortedAndFilteredData.map(item => (
                        <div key={item.id} className="cursor-pointer h-full" onClick={() => navigate(`/details/${item.id}`)}>
                            <HospitalCard hospital={item} onToggleFavorite={handleToggleFavorite} />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 text-gray-500 col-span-full">
                        <p className="font-semibold text-lg">No results found.</p>
                        <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
