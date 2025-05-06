import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const ReportForm = () => {
    const [add, setAdd] = useState('')
    const [address, setAddress] = useState('')
    const {user}= useUser();
    const [formData, setFormData] = useState({
        title: " ",
        description: " ",
        condition: " ",
    });
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setImage(file);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        let imageUrl = null;
        if (image) {
            const imgForm = new FormData();
            imgForm.append('image', image);

            try {
                const imgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
                method: 'POST',
                body: imgForm,
                });
                const imgData = await imgRes.json();
                imageUrl = imgData.imageUrl;
            } catch (err) {
                console.error('Error uploading image:', err);
                return;
            }
        }

        if (imageUrl) {
            try {
                console.log(address)
                console.log(imageUrl)
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/furnitures/report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        imageUrl: imageUrl,
                        condition: formData.condition,
                        address: address,
                        zipcode: add.postcode,
                        borough: add.borough,
                        reportedBy: user.id,
                    }),
                })
                setSubmitting(true);
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            }catch (err) {
                console.error(err)
            } finally {
                setSubmitting(false);
                reset();
            }
        }
    }

    const reset = () => {
        setFormData({
            title: " ",
            description: " ",
            condition: " ",
        });
        setImage(null);
    }

    //get the current location of the user
    // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            console.log(latitude,longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url).then(res => res.json()).then(data => {
                setAdd(data.address)
                setAddress(`${data.address.house_number} ${data.address.road} ${data.address.borough}, ${data.address.city}`);
            })
        })
    }, [])
    
    
    return (
        <div className="flex flex-col mx-20">
            <h1 className="text-3xl font-bold text-[#142F38]">Report a Furniture</h1>
            <form className="flex flex-col gap-y-6 mt-6" onSubmit={handleSubmit}>
                <label htmlFor="title" className="text-lg text-[#142F38]">Title</label>    
                <input type="text" id="title" name="title" className="p-2 border border-gray-300 rounded-md" value={formData.title } onChange={handleChange}/>
        
                <label htmlFor="description" className="text-lg text-[#142F38]">Description</label>
                <textarea id="description" name="description" className="p-2 border border-gray-300 rounded-md" value={formData.description} onChange={handleChange}></textarea>

                <label htmlFor="image" className="text-lg text-[#142F38]">Image</label>
                <input type="file" id="image" name="image" accept="image/*" className="p-2 border border-gray-300 rounded-md"  onChange={handleImageChange} />
                {image && <img src={URL.createObjectURL(image)} alt="Preview" className="object-cover mt-2 shadow-md"  />}

                <label htmlFor="condition" className="text-lg text-[#142F38]">Condition</label>
                <select id="condition" name="condition" className="p-2 border border-gray-300 rounded-md" value={formData.condition} onChange={handleChange}>
                    <option value="good">Excellent</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Needs Repair</option>
                </select>

                <label htmlFor="Address" className="text-lg text-[#142F38]">Address: {address}</label>
                

                <button type="button" onClick={reset} className="bg-red-300 cursor-pointer text-white text-lg py-2 rounded-md hover:bg-red-600 transition mt-4">Reset</button>
                <button className="bg-[#27694d] cursor-pointer text-white text-lg py-2 rounded-md transition">Submit</button>
            </form>
            <button className="bg-[#142E38]  text-white text-lg py-2 rounded-md transition mt-4">
                <Link to={'/FurniturePage'}>Back to Furniture Page</Link>
            </button>

            {/* Popup Notification */}
            {showPopup && (
                <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md">
                    Report submitted successfully!
                </div>
            )}

            {submitting && (<div className="fixed top-4 right-4 bg-yellow-500 text-white p-4 rounded-md shadow-md">
                    Submitting your report...
                </div>
            )}
        </div>
    );
}

export default ReportForm;