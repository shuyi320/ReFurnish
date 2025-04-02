import React, { useState } from "react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: ""
  });
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-[#142F38]">Report a Furniture</h1>
            <form className="flex flex-col gap-y-6 mt-6">
                <label htmlFor="title" className="text-lg text-[#142F38
                ]">Title</label>    
                <input type="text" id="title" name="title" className="p-2 border border-gray-300 rounded-md" />
        
                <label htmlFor="description" className="text-lg text-[#142F38
                ]">Description</label>
                <textarea id="description" name="description" className="p-2 border border-gray-300 rounded-md"></textarea>

                <label htmlFor="date" className="text-lg text-[#142F38
        
                ]">Date</label>
                <input type="date" id="date" name="date" className="p-2 border border-gray-300 rounded-md" />

                <label htmlFor="time" className="text-lg text-[#142F38
            
                    ]">Time</label> 
                <input type="time" id="time" name="time" className="p-2 border border-gray-300 rounded-md" />
        
                <button className="bg-[#142E38] text-white text-lg py-2 rounded-md hover:bg-[#27694d] transition">Submit</button>
            </form>
        </div>
    );
}

export default ReportForm;