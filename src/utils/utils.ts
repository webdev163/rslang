import { API_URL } from './constants';

export const playSound = (
  audio: string | undefined,
  audioExample: string | null,
  audioMeaning: string | null,
): void => {
  const audioElem = new Audio();
  audioElem.src = `${API_URL}/${audio}`;
  audioElem.play();
  if (!audioExample) return;
  audioElem.addEventListener(
    'ended',
    () => {
      audioElem.src = `${API_URL}/${audioExample}`;
      audioElem.load();
      audioElem.play();
      audioElem.addEventListener(
        'ended',
        () => {
          audioElem.src = `${API_URL}/${audioMeaning}`;
          audioElem.load();
          audioElem.play();
        },
        { once: true },
      );
    },
    { once: true },
  );
};

export const getColor = (group: number): string | undefined => {
  switch (group) {
    case 0:
      return '#78ff56';
    case 1:
      return '#d2ff07';
    case 2:
      return '#fdee45';
    case 3:
      return '#ffb64f';
    case 4:
      return '#fd8d42';
    case 5:
      return '#fa2b2b';
    default:
      break;
  }
};
