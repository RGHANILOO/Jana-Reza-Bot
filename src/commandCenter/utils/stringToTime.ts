import * as chrono from 'chrono-node'

export const stringToTime = (input: string, created: Date): Date => {
    const time = chrono.parseDate(
        input,
        { instant: created },
        { forwardDate: true }
    )
    if (time === null) {
        throw new Error('couldnt parse')
    }
    return time
}
