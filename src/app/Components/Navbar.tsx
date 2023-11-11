/* @jsxImportSource react */
'use client';
import React from 'react';
import Dropdown from './Dropdown';
interface NavbarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = React.useState<string>('');

  const handleSearch = () => {
    onSearch(query);
    console.log(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Add a delay (e.g., 300ms) before triggering the search to avoid frequent API calls while typing
    setTimeout(() => onSearch(e.target.value), 300);
  };
   // Add state to manage dropdown visibility
   const [isDropdownVisible, setDropdownVisibility] = React.useState(false);

   // Toggle dropdown visibility
   const toggleDropdown = () => {
     setDropdownVisibility(!isDropdownVisible);
   };
 
   // Handler for profile click
   const handleProfileClick = () => {
     // Implement your profile click logic here
     console.log('Profile clicked');
     // Close the dropdown after handling the click
     setDropdownVisibility(false);
   };
 
   // Handler for favorites click
   const handleFavoritesClick = () => {
     // Implement your favorites click logic here
     console.log('Favorites clicked');
     // Close the dropdown after handling the click
     setDropdownVisibility(false);
   };
 
   // Handler for logout click
   const handleLogoutClick = () => {
     // Implement your logout click logic here
     console.log('Logout clicked');
     // Close the dropdown after handling the click
     setDropdownVisibility(false);
   };
 

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4">
      
      <div className="flex items-center w-full p-3 bg-white rounded-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for GIFs"
          className="w-full p-2 border rounded-full outline-2 border-black"
          style={{ color: 'black', outline: 'none', width: '70%',backgroundColor:'#f6f3f4' }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="p-2 bg-black text-white rounded-full ml-2 hover:bg-gray-800"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {/* Dropdown component */}
      <div className="ml-auto">
        <Dropdown />
      </div>
      </div>
      
    </div>
  );
};

export default Navbar;
