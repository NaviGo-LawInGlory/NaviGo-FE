'use client'

const LawSection = () => {
    return (
        <>
            <section className="bg-[#FCF2FF] py-20 flex flex-col justify-center items-center px-4">
                <h1 className="text-[#61008D] font-bold text-2xl text-center">Law</h1>
                <h1 className="text-[#3D3F40] font-bold text-center text-4xl mt-5">
                    Find Out More About the Laws Here!
                </h1>
                <h5 className="text-[#3D3F40] text-center mt-2 mb-6">
                    Discover national laws, rules, and legal codes in one convenient place
                </h5>

                <div className="flex flex-row">
                    <img src="/LawSection/find.png" alt="find" className="h-12 mr-5" />
                    <div className="bg-white flex items-center my-1 rounded-md gap-2 outline-2 outline-[#E250CE] w-72 duration-300 hover:bg-[#E250CE]">
                        <input
                            type="text"
                            placeholder="See Now"
                            className="w-full h-full outline-none text-sm text-black placeholder-[#61008D] bg-transparent text-center hover:placeholder-white duration-300"
                        />
                    </div>
                </div>

            </section>
        </>
    );
};

export default LawSection;
