const directionOffset = 50

export const slider = {
    enter: (direction: any) => ({
        y: direction < 0 ? -directionOffset : directionOffset,
    }),
    center: {
        zIndex: 1,
        y: 0,
    },
    exit: (direction: any) => ({
        zIndex: 0,
        y: direction < 0 ? -directionOffset : directionOffset,
    })
}

