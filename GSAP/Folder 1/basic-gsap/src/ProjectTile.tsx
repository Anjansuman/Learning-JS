
interface ProjectTileProps {
    image?: string;
    title: string;
    percent: number;
    w?: string;
    h1?: string;
    h2?: string;
}

export const ProjectTile = ({ image, title, percent, w, h1, h2 }: ProjectTileProps) => {


    return <div className="h-full">
    <div className="h-[100%] bg-[#653AD847] rounded-3xl mr-2 pt-6 cursor-pointer"
        style={{ width: `${w || '240px'}` }}
    >
        <div className="flex justify-center mb-4">
            <div className="h-36 w-36 bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center"
                style={{ height: `${h1 || '144px'}`, width: `${h1 || '144px'}` }}
            >
                <div className="bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center"
                    style={{ height: `${h2 || '130px'}`, width: `${h2 || '130px'}` }}
                >
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
        <div className="flex justify-center text-center text-[25px] font-bold mb-4"
            style={{ color: "white" }}
        >
            {title}
        </div>
        <div className="flex justify-center">
            <div className="h-3 w-32 rounded-full"
                style={{ backgroundColor: "white" }}
            >
                {/* here, make width length as variable and take input from the project details to show the completion bar */}
                <div className={`h-[100%] bg-[#653AD8] rounded-full `}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    </div>
</div>
}