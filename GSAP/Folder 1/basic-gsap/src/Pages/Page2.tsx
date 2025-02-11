import { useEffect, useRef } from "react"
import { ProjectTile } from "../ProjectTile"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Page2 = () => {

    const containerRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(profileRef.current, {
                x: 700,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: "body",
                    markers: true,
                    scrub: true
                }
            })
        }, containerRef)

        return () => ctx.revert();
    }, [])

    return <div ref={containerRef} className="page2 h-screen bg-red-200">
        <div ref={profileRef} className="profile h-[600px] flex justify-end">
            <ProjectTile title={"eject"} percent={60} w={'590px'} h1="300px" h2="286px" />
        </div>
    </div>
}