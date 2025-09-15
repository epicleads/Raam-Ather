import React from "react";

const Footer2 = () => {
  return (
    <footer className="bg-black text-white text-sm pt-8 pb-4">
      {/* Match width with Footer1 */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Links Section */}
        <div className="pt-4 space-y-4">
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

          <div>
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

        {/* Footer Menu */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Footer Menu */}
          <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-xs">
            
            <a href="/TermsOfUse" className="hover:underline">Terms</a>
            
            <a href="/PrivacyPolicy" className="hover:underline">Privacy policy</a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
