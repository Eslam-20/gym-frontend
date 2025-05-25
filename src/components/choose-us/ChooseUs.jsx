import Image from "./Image";
import Features from "./Features";
import Title from "./Title";

function ChooseUs() {
  return (
    <section className="relative z-[1] overflow-x-clip bg-[url('./images/choose-us/bg.webp')] bg-cover bg-no-repeat px-6 py-20">
      <div className="container mx-auto grid gap-16 md:grid-cols-2 items-center">
        
        <Image />

        {/* Right Side Content */}
        <div className="text-white">
          <Title text="Why Choose Us?" />
          <p className="mt-4 mb-6 text-lg leading-relaxed">
            We stand out by offering personalized workout plans, professional
            coaching, and an encouraging community. Our facilities and guidance
            help you achieve real, lasting results.
          </p>
          <Features />
        </div>
      </div>
    </section>
  );
}

export default ChooseUs;
