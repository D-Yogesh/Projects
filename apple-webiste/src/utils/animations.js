import gsap from "gsap"

export const animateWithGsapTimeline = (tl, rotationRef, rotationState, firstTarget, secondTarget, animateProps) => {
    tl.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    tl.to(firstTarget,
        { ...animateProps},
        '<')

    tl.to(secondTarget,
        {...animateProps},
        '<')
}

export const animateWithGsap = (target, animateProps, scrollProps) => {
    gsap.to(target, {
        ...animateProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps
        }
    })
}