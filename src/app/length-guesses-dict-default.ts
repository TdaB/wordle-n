import { LengthGuessesDict } from './length-guesses-dict';

/*
    There are 427 2-letter words
    There are 2130 3-letter words
    There are 7186 4-letter words
    There are 15918 5-letter words
    There are 29874 6-letter words
    There are 41998 7-letter words
    There are 51627 8-letter words
    There are 53402 9-letter words
    There are 45872 10-letter words
    There are 37540 11-letter words
    There are 29124 12-letter words
    There are 20944 13-letter words    
    There are 14149 14-letter words
    There are 8846 15-letter words
    There are 5182 16-letter words
    There are 2967 17-letter words
    There are 1471 18-letter words
*/
export const LENGTH_GUESSES_DICT_DEFAULT: LengthGuessesDict = {
    2: 4,
    3: 5,
    4: 6,
    5: 7,
    6: 8,
    7: 9,
    8: 10,
    9: 11,
    10: 12,
    11: 13,
    12: 14,
    13: 15,
    14: 14,
    15: 13,
    16: 12,
    17: 11,
    18: 10,
  }