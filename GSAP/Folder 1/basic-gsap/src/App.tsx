import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Page1 } from "./Pages/Page1";
// import { Page2 } from "./Pages/Page2";


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
      

      gsap.from(".project1", {
        x: 500,
        duration: 2,
        scrollTrigger: {
          trigger: ".project1",
          scroller: "body",
          markers: true,
          start: "top 0%",
          end: "bottom -150%",
          scrub: 2
        }
      });

    }, containerRef);

    return () => ctx.revert();

  }, [])


  return <div ref={containerRef} className="h-screen w-screen bg-black overflow-x-hidden " >
    <nav className="w-full fixed z-20 box bg-black text-white flex justify-between items-center px-10 py-7 border-b-2 border-b-gray-900 ">
      <h2 className="text-4xl">Pro-eject</h2>
      <div className="flex gap-[50px] ">
        <h4>Work</h4>
        <h4>Notifications</h4>
        <h4>Blog</h4>
        <h4>Me</h4>
      </div>
    </nav>
~
    <Page1 />
    {/* <Page2 /> */}

  </div>
}



export default App
