import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import FurnitureCard from '../components/FurnitureCard';

const FurniturePage = () => {
    const [furnitures, setFurnitures] = useState([]);
    const [filteredFurnitures, setFilteredFurnitures] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFurnitures = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/furnitures`); // Replace with your API endpoint
                const data = await response.json();
                console.log('Fetched furnitures:', data);
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setFurnitures(sortedData);
                setFilteredFurnitures(sortedData); // Initialize filtered list
            } catch (error) {
                console.error('Error fetching furnitures:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFurnitures();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter furniture list based on the search term
        const filtered = furnitures.filter((furniture) =>
            furniture.title.toLowerCase().includes(value) ||
            furniture.description.toLowerCase().includes(value) ||
            furniture.address.toLowerCase().includes(value) ||
            furniture.zipcode.toString().includes(value) ||
            furniture.borough.toLowerCase().includes(value) ||
            furniture.condition.toLowerCase().includes(value)
        );
        setFilteredFurnitures(filtered);
    };

    return (
        <div>
            <Navbar />
            <main className=" ">
                {/* Hero Section */}
                <section className=" h-[400px] bg-[url('./assets/Rectangle.png')] bg-cover bg-center flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Furniture Page</h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Explore a collection of furniture and find the perfect fit for your home.
                    </p>
                    <Link to="/">
                        <button className="bg-[#142E38] cursor-pointer text-xl text-white px-6 py-3 rounded-md hover:bg-[#27694d] transition mt-6">
                            Go to Home
                        </button>
                    </Link>
                    <button className="bg-[#142E38] text-xl text-white px-6 py-3 rounded-md hover:bg-[#27694d] transition mt-6">
                        <Link to={'/ReportForm'}>Report a Furniture</Link>
                    </button>
                </section>

                {/* Furniture Cards Section */}
                <section className="px-6">
                    {/* Filter Bar */}
                    <div className="bg-[#394B38] mb-6 text-center py-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-gray-50 text-center rounded-md px-4 py-2"
                        />
                    </div>

                    {/* Furniture Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-8">
                        {filteredFurnitures.length > 0 ? (
                            filteredFurnitures.map((furniture) => (
                                <FurnitureCard key={furniture.id} furniture={furniture} />
                            ))
                        ) : (
                            <p className="text-xl text-gray-600 text-center col-span-full">
                                {loading ? "Loading..." : "No furniture available"}
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FurniturePage;