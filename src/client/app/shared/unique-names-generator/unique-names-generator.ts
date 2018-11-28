import { adjectives as adjectivesDictionary } from './dictionaries/adjectives';
import { animals as animalsDictionary } from './dictionaries/animals';

class UniqueNamesGenerator {
  constructor(private adjectives: string[], private animals: string[]) {}

  generate(separator = '-') {
    if (!this.adjectives || !this.animals) {
      return null;
    }

    const adjective = this.adjectives[
      Math.floor(Math.random() * this.adjectives.length)
    ];
    const animal = this.animals[
      Math.floor(Math.random() * this.animals.length)
    ];

    return `${adjective}${separator}${animal}`;
  }
}

export const generateRandomName = (separator = '_') => {
  const uniqueNamesGenerator = new UniqueNamesGenerator(
    adjectivesDictionary,
    animalsDictionary
  );

  return uniqueNamesGenerator.generate(separator);
};
