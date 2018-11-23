import { adjectives } from './dictionaries/adjectives';
import { animals } from './dictionaries/animals';

export const generateRandomName = (separator = '_') => {
  const uniqueNamesGenerator = new UniqueNamesGenerator(adjectives, animals);

  return uniqueNamesGenerator.generate(separator);
};

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
