const directionOffset = 600

export const slider = {
    enter: (direction: any) => ({
        x: direction < 0 ? -directionOffset : directionOffset,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: any) => ({
        zIndex: 0,
        x: direction < 0 ? -directionOffset : directionOffset,
        opacity: 0
    })
}

