import { useEffect, useState } from 'react';
import { getWords } from '../utils/API';
import { WordResponse } from '../types/requests';

export const useWordsPage = (group = 0, page = 0) => {
  const [words, setWords] = useState<WordResponse[]>([]);

  const fetchWords = async () => {
    const wordsResponse = await getWords(group, page);
    setWords(wordsResponse);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return words;
};
