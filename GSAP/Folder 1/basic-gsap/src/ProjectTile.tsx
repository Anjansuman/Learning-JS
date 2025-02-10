
interface ProjectTileProps {
    image?: string;
    title: string;
    percent: number;
}

export const ProjectTile = ({ image, title, percent }: ProjectTileProps) => {


    return <div className="h-full">
    <div className="h-[100%] w-48 bg-[#653AD847] rounded-3xl mr-2 pt-6 cursor-pointer">
        <div className="flex justify-center mb-4">
            <div className="h-24 w-24 bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center">
                <div className="h-[90px] w-[90px] bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center">
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
        <div className="flex justify-center text-center text-[17px] font-bold mb-4"
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