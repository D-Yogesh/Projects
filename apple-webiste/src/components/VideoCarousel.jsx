import { useEffect, useRef } from "react"
import { hightlightsSlides } from "../constants"
import { useState } from "react"
import { pauseImg, playImg, replayImg } from "../utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanParentRef = useRef([])
    const videoSpanRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const [loadedMetaData, setLoadedMetaData] = useState([])

    useGSAP(() => {
        gsap.to('.slider', {
            transform: `translate(${-100 * video.videoId}%)`,
            duration: 2
        })
        gsap.to('.video', {
            scrollTrigger: {
                trigger: '.video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo( prev => ({
                    ...prev,
                    isPlaying: true,
                    startPlay: true
                }))
            }
        })
    }, [video.isEnd, video.videoId])

    useEffect(() => {
        console.log(video.videoId)
        if(loadedMetaData.length > 3){
            if(!video.isPlaying){
                videoRef.current[video.videoId].pause()
            }else {
                videoRef.current[video.videoId].play()
            }
        }
    }, [video.startPlay, video.isPlaying, video.videoId, loadedMetaData])

    useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current
        let spanAnimation = gsap.to(span[video.videoId], {
            onUpdate: () => {
                const progress = Math.ceil(spanAnimation.progress() * 100)
                if(currentProgress != progress){
                    currentProgress = progress

                    gsap.to(videoSpanParentRef.current[video.videoId], {
                        width: window.innerWidth < 1200 ? '10vw': '4vw'
                    })
                    gsap.to(videoSpanRef.current[video.videoId], {
                        width: `${currentProgress}%`,
                        backgroundColor: 'white'
                    })
                }
            },
            onComplete: () => {
                if(video.isPlaying){
                    gsap.to(videoSpanParentRef.current[video.videoId], {
                        width: '12px'
                    })
                    gsap.to(span[video.videoId], {
                        backgroundColor: '#afafaf'
                    })
                }
            }
        })
        const animUpdate = () => {
            spanAnimation.progress(videoRef.current[video.videoId].currentTime / hightlightsSlides[video.videoId].videoDuration)
        }
        if(video.isPlaying){
            gsap.ticker.add(animUpdate)
        }else {
            gsap.ticker.remove(animUpdate)
        }
    }, [video.startPlay, video.isPlaying, video.videoId])

    const handleProcess = (action, index) => {
        switch(action) {
            case 'end':
                setVideo(prev => ({...prev, isEnd: true, videoId: index + 1}))
                break;
            case 'last':
                setVideo(prev => ({...prev, isLastVideo: true}))
                break;
            case 'reset':
                setVideo(prev => ({...prev, isLastVideo: false, videoId: 0}))
                break;
            case 'pause':
            case 'play':
                setVideo(prev => ({...prev, isPlaying: !prev.isPlaying}))
                break;
            default:
                return video
        }
    }
    return (
        <>
            <div className="flex mt-10">
                {hightlightsSlides.map((slide, index) => (
                    <div key={slide.id} className="slider pr-10 sm:pr-20">
                        <div className="video-carousel_container flex-center rounded-3xl overflow-hidden bg-black">
                            <video 
                            className="video"
                            playsInline={true}
                            preload="auto"
                            muted
                            ref={el => (videoRef.current[index] = el)}
                            onEnded={() => {
                                index !== 3 ? handleProcess('end', index) : handleProcess('last', index)
                            }}
                            onPlay={() => {
                                console.log('VIdeo is playing')
                                setVideo((prevVideo) => ({...prevVideo, isPlaying: true}))
                            }}
                            onLoadedMetadata={e => setLoadedMetaData(prev =>[...prev, e])}
                            >
                                <source src={slide.video} type="video/mp4"/>
                            </video>
                            <div className="absolute top-12 left-[5%]">
                                {slide.textLists.map(text => (
                                    <p key={text} className="text-xl md:text-2xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 rounded-full backdrop-blur">
                    {
                        videoRef.current.map((_, index) => (
                            <span
                            key={index}
                            ref={el => (videoSpanParentRef.current[index] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            >
                                <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[index] = el)}
                                />
                            </span>
                        ))
                    }
                </div>
                <button className="control-btn">
                    <img
                    src={ video.isLastVideo ? replayImg :
                        video.isPlaying ? pauseImg : playImg
                    }
                    alt={video.isLastVideo ? 'replay' :
                        video.isPlaying ? 'play' : 'pause'
                    }
                    onClick={() => {
                        handleProcess( video.isLastVideo ? 'reset' :
                            video.isPlaying ? 'pause' : 'play'
                        )
                    }}
                    />
                </button>
            </div>
        </>
    )   
}

export default VideoCarousel