import React from "react";

const Footer2 = () => {
  return (
    <footer className="bg-black text-white text-sm pt-8 pb-4">
      {/* Match width with Footer1 */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Links Section */}
        <div className="pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Check Pricing - Left aligned */}
            <div>
              <p className="font-semibold">Check Pricing</p>
              <p className="text-gray-400">
                <a href="/chennai" className="hover:underline">
                  Electric Scooter Price in Chennai
                </a>{" "}
                |{" "}
                <a href="/hyderabad" className="hover:underline">
                  Electric Scooter Price in Hyderabad
                </a>
              </p>
            </div>

            {/* Locate showrooms - Right aligned on desktop, left aligned on mobile */}
            <div className="text-left md:text-right">
              <p className="font-semibold">Locate showrooms in your city</p>
              <p className="text-gray-400">
                <a href="/StoreLocator" className="hover:underline">
                  Electric Scooter Dealers in Chennai
                </a>{" "}
                |{" "}
                <a href="/StoreLocator" className="hover:underline">
                  Electric Scooter Dealers in Hyderabad
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
