export const getRandomItem = <T>(arr: T[]): T => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
};

export const shuffle = <T>(arr: T[]): T[] => {
  const newArr = [...arr];
  let currentIndex = arr.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]];
  }

  return newArr;
};
