import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import FurnitureCard from '../components/FurnitureCard';
import ReportForm from '../components/ReportForm';

const FurniturePage = () => {
    const [furnitures, setFurnitures] = useState([]);
    const [loading, setLoading] = useState(false);
    const data = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/furnitures');
        const data = await response.json();
        setFurnitures(data);
        setLoading(false);
    }
    
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
                        <button className="bg-[#142E38] text-xl text-white px-6 py-3 rounded-md hover:bg-[#27694d] transition mt-6">
                            Go to Home
                        </button>
                    </Link>
                </section>

                {/* Furniture Cards Section */}
                <section className="  px-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Furniture Collection
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-8">
                        {furnitures.length > 0 ? furnitures.map((furniture) => (
                            <FurnitureCard key={furniture.id} furniture={furniture} />
                        )) : (
                            <p className="text-xl text-gray-600 text-center col-span-full">
                                {loading ? "Loading..." : "No furniture available"}
                            </p>
                        )}
                        {/* Add more <FurnitureCard /> components as needed */}
                    </div>
                </section>
                
                <button className="bg-[#142E38] text-xl text-white px-6 py-3 rounded-md hover:bg-[#27694d] transition mt-6">
                    <Link to={'/ReportForm'}>Report a Furniture</Link>
                </button>
            </main>
        </div>
    );
};

export default FurniturePage;