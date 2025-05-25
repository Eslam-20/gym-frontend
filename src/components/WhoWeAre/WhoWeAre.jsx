import { useEffect, useState } from "react";
import img3 from "../../images/about-page/main.webp";
import SecondaryHeading from "../headings/SecondaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";

function WhoWeAre() {
  const [isClient, setIsClient] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setIsClient(true);
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <section className="bg-white py-20 text-center px-6" id="who-we-are">
      <SecondaryHeading>Who We Are</SecondaryHeading>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <img
            src={img3}
            alt="Team working out"
            className="rounded-2xl w-96 shadow-lg"
          />
        </div>

        
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-900 text-lg mb-4">
            We are a passionate team of fitness professionals, nutritionists, and wellness experts.
            Our mission is to empower you with the tools, knowledge, and motivation to transform your health and reach your goals.
          </p>
          <p className="text-gray-900 text-lg">
            Whether you&apos;re a beginner or a pro, we offer customized workout plans,
            expert advice, and a supportive community to guide you every step of the way.
          </p>

          
          {isClient && role !== "admin" && (
            <div className="mt-8">
              <PrimaryButton to="/user-details" borderColor="white">
                User Details
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
