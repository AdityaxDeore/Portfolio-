const framesCount = 47
export const frames = [...new Array(framesCount)].map((_, i) => {
    const length = String(i + 1).length
    const zeros = String(new Array(3 - length).fill(0)).split(',').join('')
    return {
        frame: `/images/startups/frames/rope_${zeros}${i+1}.webp`
    }
})