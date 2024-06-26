import { useState, useEffect } from "react";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { FaCircleArrowRight } from "react-icons/fa6";

import {
    useRive,
    useStateMachineInput,
} from "@rive-app/react-canvas";

export const Banner = () => {
    const subtitles = [ "Web Developer.", "Digital Illustrator.", "UI/UX Designer."];
    const [subtitle, setSubtitle] = useState('');
    const period = 2000;
    const [delta, setDelta] = useState(200 - Math.random() * 100);
    const [loopIteration, setLoopIteration] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const { rive, RiveComponent: HeaderRiveComponent } = useRive({
        src: "/riv/map.riv",
        stateMachines: "stateMachine",
        artboard: "artboard",
        autoplay: true,
    });

    const clickOnHeader = useStateMachineInput(
        rive,
        "stateMachine",
        "click"
      );

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [subtitle])

    const tick = () => {
        let i = loopIteration % subtitles.length;
        let chosenSubtitle = subtitles[i];
        let currText = isDeleting ? chosenSubtitle.substring(0, subtitle.length - 1) : chosenSubtitle.substring(0, subtitle.length + 1);

        setSubtitle(currText);

        {/* make deletion time exponentially reduce */}
        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        {/* if subtitle typing animation reaches full text */}
        if (!isDeleting && currText === chosenSubtitle) {
            setIsDeleting(true);
            setDelta(period);
        {/* if subtitle deleting animation reaches empty text */}
        } else if (isDeleting && currText === '') {
            setIsDeleting(false);
            setLoopIteration(loopIteration + 1);
            {/* pause before next iteration */}
            setDelta(500);
        } else {

        }
    }

    return(
        <section id="home">
            <TrackVisibility partialVisibility>
            {({ isVisible }) =>
                <div className={"font-roboto text-left " + (isVisible ? "animate-in fade-in duration-1000" : "opacity-0")}>
                    <div className="flex flex-col lg:flex-row px-24 py-24">
                        <div className="lg:w-7/12 flex flex-col min-h-96 gap-2">
                            <span>Welcome To My Portfolio</span>
                            <h1 className="text-6xl">{`Hi I'm Aaron,`}<span className="text-wrap"> {subtitle}</span></h1>
                            <p>Hi! I'm Aaron, a final year undergraduate pursuing a Bachelor’s Degree in Computer Science at National University of Singapore (NUS). My experience and interests lie in front-end and mobile development and I'm keen to explore any job opportunities in these fields.</p>
                            <button className="w-fit"><span className="inline-flex flex-row items-center gap-2">Let's Connect <FaCircleArrowRight /></span></button>
                        </div>
                        <div className="lg:w-5/12 flex flex-col">
                            <HeaderRiveComponent/>
                        </div>
                    </div>
                </div>}
            </TrackVisibility>
        </section>
    )
}