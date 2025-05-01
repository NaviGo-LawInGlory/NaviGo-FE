'use client'

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full bg-[#FCF2FF]">   
            <div className="object-cover p-12 rounded-2xl inset-0 absolute">
                <img 
                    src="HeroSection/hero.svg" 
                    alt="Hero" 
                    className="object-cover w-full h-full rounded-4xl"
                />
            </div>   

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                    Integrated Legal Advice Solution for You
                </h1>
                <button className="mt-6 px-8 py-3 bg-black/30 rounded-md text-white font-semibold outline-1 outline-[#E250CE] flex items-center gap-2 duration-300 hover:bg-black/60">
                    <div className="mr-3">Try Now</div>
                    <span>→</span>
                </button>
            </div>
        </div>
    )
}

export default HeroSection;
