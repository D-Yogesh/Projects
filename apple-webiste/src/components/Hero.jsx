import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useState } from "react"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect } from "react"

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

    const handleWindowResize = () => {
        setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    useGSAP(() => {
        gsap.to('.hero-title', {opacity: 1, delay: 1.5})
        gsap.to('#cta', {opacity: 1, y: -50, delay: 2.5})
    }, [])
    return (
        <section className="w-full nav-height relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p className="hero-title">iPhone 15 Pro</p>
                <div className="md:w-10/12 w-9/12">
                    <video className="pointer-events-none" autoPlay muted key={videoSrc}>
                        <source src={videoSrc} type="video/mp4"/>
                    </video>
                </div>
            </div>
            <div id="cta" className="flex flex-col items-center translate-y-20 opacity-0">
                <a href="#highlights" className="btn">Buy</a>
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>
        </section>
    )
}
export default Hero