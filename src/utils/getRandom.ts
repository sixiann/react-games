import lodash from "lodash";

const getRandom = (array: string[], n: number):string[] => {
    const shuffled = lodash.shuffle(array);
    return shuffled.slice(0, n);
}

export default getRandom;