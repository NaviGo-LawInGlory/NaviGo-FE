'use client'

type FeatureCardProps = {
    src: string;
    title: string;
    subtitle: string;
};

const FeatureCard = ({ src, title, subtitle }: FeatureCardProps) => {
    return (
        <>
            <div className="outline outline-1 outline-[#E250CE] bg-[#FCF2FF] rounded-xl px-6 py-8 mx-1 w-64">
                <div className="flex flex-col items-start gap-4">
                    <div className="flex flex-row items-center">
                        <img src={`/FeatureSection/${src}`} alt={title} className="w-12 h-12 mr-3" />
                        <h3 className="text-[#61008D] font-bold">{title}</h3>
                    </div>
                    <p className="text-black text-sm font-medium">{subtitle}</p>
                </div>
            </div>
        </>
    );
};

const features = [
    {
        src: 'document.png',
        title: 'Legal Document Generator',
        subtitle: 'Create legal document easily for you based on your specification',
    },
    {
        src: 'search.png',
        title: 'MOU Document Analyzer',
        subtitle: 'Analyze MOU documents with clarity and precision',
    },
    {
        src: 'AI.png',
        title: 'AI Law Chatbot',
        subtitle: 'Ask legal questions and get AI-powered answers instantly',
    },
    {
        src: 'lawyer.png',
        title: 'Find Lawyer',
        subtitle: 'Connect with certified lawyers tailored to your needs',
    },
];

const FeatureSection = () => {
    return (
        <>
            <section className="bg-[#FCF2FF] pt-20 flex flex-col justify-center items-center">
                <h1 className="text-[#61008D] font-bold text-2xl text-center">Our Feature</h1>
                <h1 className="text-[#3D3F40] font-bold text-center text-4xl mt-5">Empowering Your Legal Needs, <br />Faster Than Ever</h1>
                <div className="flex flex-wrap justify-center items-center w-full gap-6 px-8 py-16">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            src={feature.src}
                            title={feature.title}
                            subtitle={feature.subtitle}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default FeatureSection;
