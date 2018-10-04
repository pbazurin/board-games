export class Utils {
  static capitalizeString(value: string) {
    const result = value.split(' ').map(l => l[0].toUpperCase() + l.substr(1)).join(' ');

    return result;
  }
}
