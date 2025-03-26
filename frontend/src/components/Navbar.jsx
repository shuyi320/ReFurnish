const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full flex items-center justify-between bg-transparent py-2 px-8 ">
            {/* Logo Section */}
            <div className="flex items-center">
                <h1 className="text-[#142F38] text-3xl font-mono font-bold">ReFurnish</h1>
            </div>

            {/* Navigation Links */}
            <div>
                <ul className="flex text-2xl space-x-8">
                    <li className="text-[#142F38] hover:scale-125 transition-transform duration-300 cursor-pointer">Home</li>
                    <li className="text-[#142F38] hover:scale-125 transition-transform duration-300 cursor-pointer">Our Mission</li>
                    <li className="text-[#142F38] hover:scale-125 transition-transform duration-300 cursor-pointer">Contact</li>
                </ul>
            </div>

            {/* Login Button */}
            <div>
                <button className="bg-[#142E38] text-2xl text-white px-6 py-2 rounded-md hover:bg-[#27694d] transition">
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;