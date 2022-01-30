import { API_URL } from "../constants";
import { RequestPaths, WordResponse } from "../types/requests";

const getWords = async (group = 0, page = 0): Promise<WordResponse[]> => {

  const resp = await fetch(
    `${API_URL}${RequestPaths.WORDS}?group=${group}&page=${page}`,
    {headers: {
      'Content-Type': 'application/json'
    }}
  );
  const words = await resp.json();
  return words;
};

const getWord = async (id: string): Promise<WordResponse> =>{

  const resp = await fetch(
    `${API_URL}${RequestPaths.WORDS}/${id}`,
    {headers: {
      'Content-Type': 'application/json'
    }}
  );
  const word = await resp.json();
  return word;
}

export {getWords, getWord}
