export default function HistoryList({ type, title, date }: { type: string; title: string; date: string }) {
  const imageSrc = type === "analyzer" ? "/FeatureSection/search.png" : "/FeatureSection/document.png";

  return (
    <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6 transition-all hover:shadow-lg">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-row items-center">
          <img src={imageSrc} alt={type} className="h-12 md:h-16 mr-4" />
          <div className="flex flex-col">
            <h3 className="font-bold text-lg md:text-xl text-gray-800">{type === "analyzer" ? "MOU Document Analyzer" : "Legal Document Generator"}</h3>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm md:text-base">{date}</p>
      </div>
    </div>
  );
}
