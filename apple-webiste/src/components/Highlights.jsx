import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"

const Highlights = () => {
    useGSAP(() => {
        gsap.to('#title', {opacity: 1, y: 0})
        gsap.to(".link", {opacity: 1, y: 0, duration: 1, stagger: 0.25})
    }, [])
    return (
        <section className="common-padding bg-zinc">
            <div className="md:flex justify-between">
                <h1 id="title" className="section-heading">Get the highlights</h1>
                <div className="flex gap-5">
                    <p className="link">
                        watch the film
                        <img src={watchImg} alt="watch" className="ml-2"/>
                    </p>
                    <p className="link">
                        watch the event
                        <img src={rightImg} alt="right" className="ml-2"/>
                    </p>
                </div>
            </div>
            <VideoCarousel/>
        </section>
    )
}
export default Highlights