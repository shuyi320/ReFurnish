
import HeroImage from '../assets/Landing.png';
import Interior from '../assets/interior.png';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="flex  items-center justify-center bg-cover w-full h-screen "
            style={{ backgroundImage: `url(${HeroImage})` }}>
            
            <div className="flex items-center justify-between px-25 gap-x-15 ">
                <div className="flex-1   flex-col  ">
                    <h1 className="text-6xl text-[#255849] font-bold">GIVE FURNITURE A SECOND LIFE</h1>
                    <p className="text-xl text-[#142E38] py-5 ">Reduce waste and help your community by claiming or reporting abandoned furniture. Find hidden gems near you and furnish your space sustainably.</p>
                    <button className="bg-[#142E38] text-xl text-white px-6 py-2 rounded-md hover:bg-[#27694d] transition mt-4">
                        <Link to={'/FurniturePage'}>Explore More</Link>
                    </button>
                </div>

                <div className='flex-1   '>
                    <img src={Interior} alt=" Image" className=" rounded-full "/>
                </div>

            </div>
            
        </div>
        
           
    );


    
};
export default Hero;