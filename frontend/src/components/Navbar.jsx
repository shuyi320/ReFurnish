import { useLocation } from "react-router-dom";
import { SignInButton, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";

const Navbar = () => {
    const location = useLocation();
    const { isSignedIn } = useAuth();

    // Check if the current page is one where the navbar should be transparent
    const isTransparent = location.pathname === "/home"; // Example: Transparent on the home page

    return (
        <nav
            className={`top-0 z-50 w-full flex items-center justify-between py-2 px-8 bg-transparent`}
        >
            {/* Logo Section */}
            <div className="flex items-center">
                <h1 className="text-[#142F38] text-3xl font-mono font-bold">ReFurnish</h1>
            </div>

            {/* Navigation Links */}
            <div>
                <ul className="flex text-2xl space-x-20">
                    <li className="text-[#142F38] hover:scale-125 transition-transform duration-300 cursor-pointer">Home</li>
                    <li className="text-[#142F38] hover:scale-125 transition-transform duration-300 cursor-pointer">Our Mission</li>
                    <li className="text-[#142F38] hover:scale-125 transition-transform duration-300 cursor-pointer">Contact</li>
                </ul>
            </div>

            {/* Login Button */}
            {isSignedIn ? (
                <div className="flex items-center">
                    <UserButton className="bg-[#142E38] text-white text-lg px-4 py-2 rounded-md hover:bg-[#27694d] transition">
                    </UserButton>
                </div>
            ) : (
                <SignedOut>
                    <SignInButton >
                        <button className="bg-[#142E38] text-white text-lg px-4 py-2 rounded-md hover:bg-[#27694d] transition">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
            )}
        </nav>
    );
};

export default Navbar;