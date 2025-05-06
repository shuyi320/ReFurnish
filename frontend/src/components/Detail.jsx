import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useUser } from '@clerk/clerk-react';

const Detail = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [furniture, setFurniture] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchFurniture = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/furnitures/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFurniture(data);
            } catch (error) {
                console.error('Error fetching furniture:', error);
            }
        };
        fetchFurniture();
    }, [id]);

    const handleClick = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/furnitures/claim/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    claimedBy: user.id,
                }),
            });
            const data = await response.json();
            console.log('Furniture claimed:', data.message);
            setMessage(data.message);
            setShowPopup(true);
        } catch (error) {
            console.error('Error claiming furniture:', error);
        }
    }
    
    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />
            <main className="flex-grow p-6">
                {furniture ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-20 m-15">
                        <div className="flex gap-4">
                            <img src={furniture.imageUrl} alt={furniture.title} className="w-full h-auto max-w-md object-cover" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-semibold mb-15">
                                {furniture.title}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {furniture.description}
                            </p>

                            <p className="mb-2">
                                <span className="font-semibold">Condition:</span> {furniture.condition}
                            </p>
                            
                            <p className="mb-4">
                                <span className="font-semibold">Location:</span> {furniture.address}
                            </p>

                            <div className="flex gap-4">
                                
                                <button onClick={handleClick} className="border border-black px-6 py-2 rounded flex items-center gap-2 cursor-pointer">
                                ➕ Claim
                                </button>
                                <Link to="/FurniturePage">
                                    <button className="bg-[#142E38] text-white px-6 py-2 rounded hover:bg-[#27694d] transition">
                                        Back to Furnitures
                                    </button>
                                </Link>
                            </div> 
                        </div>
                    </div>
                    ) : (
                        <p>Loading...</p>
                )}   
        </main>
        
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#F9F1E7] bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4">{message}</h2>
                        <button onClick={() => setShowPopup(false)} className="mt-4 bg-[#EFB346] text-white px-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
                
            
        
            <footer className="relative bg-gray-800 text-white py-4 bottom-0 text-center">
                <p>&copy; 2025 ReFurnish. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default Detail;