import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const FurniturePage = () => {
    return (
        <div>
            

            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mt-10">Furniture Page</h1>
                
                <button className="bg-[#142E38]  text-xl text-white px-6 py-2 rounded-md hover:bg-[#27694d] transition mt-4">
                    <Link to={'/'}>Home</Link >
                </button>

            </div>
                
        </div>
        
    );
};

export default FurniturePage;