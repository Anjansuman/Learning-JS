import { useEffect, useRef } from "react";
import { ProjectTile } from "../ProjectTile";
import { gsap } from "gsap";


export const Page1 = () => {

    const containerRef = useRef(null);


    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl2 = gsap.timeline();

            tl2.from(".eject", {
            x: -250,
            duration: 2,
    
            })
            tl2.from(".pro", {
            // y: -100,
            opacity: 0,
            duration: 2,
    
            })
        }, containerRef)

        return () => ctx.revert();
    }, [])

    return <div ref={containerRef} className="h-screen text-9xl py-40 font-bold flex justify-around items-center mt-20">
        <div className="flex">
            <div className="pro text-black"
                style={{
                filter: "drop-shadow(0 1.2px 1.2px rgba(256, 256, 256, 0.8))"
                }}
            >
                Pro-
            </div>
            <div className="eject text-white"
                style={{
                filter: "drop-shadow(0 1.2px 1.2px rgba(0, 0, 0, 0.8))"
                }}
            >
                eject
            </div>
            </div>
            <div className="project1 h-70">
            <ProjectTile title={"eject"} percent={70} />
        </div>
  </div>
            
}