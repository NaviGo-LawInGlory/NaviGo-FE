export default function HistoryList({ type, title, date }: { type: string; title: string; date: string }) {
    const imageSrc = type === "analyzer" ? "/FeatureSection/search.png" : "/FeatureSection/document.png";
  
    return (
      <div className="w-full flex flex-row shadow-[0_4px_10px_rgba(0,0,0,.3)] pr-10 pl-5 py-5 rounded-2xl mb-4">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row items-center">
            <img src={imageSrc} alt={type} className="h-16 mr-4" />
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl text-[#3D3F40]">
                {type === "analyzer" ? "MOU Document Analyzer" : "Legal Document Generator"}
              </h3>
              <p className="text-[#3D3F40]">{title}</p>
            </div>
          </div>
          <p className="text-[#3D3F40]">{date}</p>
        </div>
      </div>
    );
  }
  