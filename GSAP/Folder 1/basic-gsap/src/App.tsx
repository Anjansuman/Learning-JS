import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ProjectTile } from "./ProjectTile";


function App() {

  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline();
      tl.from("h2", {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });

      tl.from("h4", {
        y: -20,
        duration: 1,
        opacity: 0,
        stagger: 0.3
      });
      
      tl.from(".eject", {
        x: -250,
        duration: 2,

      })
      tl.from(".pro", {
        y: -100,
        opacity: 0,
        duration: 2,

      })
      gsap.to(".project1", {
        rotateY: -45,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 1000,
      });
      gsap.to(".project2", {
        rotateY: 45,
        opacity: 100,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 1000,
      })

    }, containerRef);

    return () => ctx.revert();

  }, [])


  return <div ref={containerRef} className="h-screen w-screen bg-black " >
    <nav className="box bg-black text-white flex justify-between items-center px-10 py-7 border-b-2 border-b-gray-900 ">
      <h2 className="text-4xl">Pro-eject</h2>
      <div className="flex gap-[50px] ">
        <h4>Work</h4>
        <h4>Notifications</h4>
        <h4>Blog</h4>
        <h4>Me</h4>
      </div>
    </nav>

    <div className=" text-9xl py-40 font-bold flex justify-around items-center">
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
      <div className="flex">
        <div className="project1 h-50">
          <ProjectTile title={"eject"} percent={40} />
        </div>
        <div className="project2 h-50 opacity-0">
          <ProjectTile title={"eject"} percent={60} />
        </div>
      </div>
    </div>
  </div>
}

export default App
