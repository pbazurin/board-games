export enum GameType {
  Test,
  Munchkin
}

export const GameTypeNames: { [index: number]: string } = {
  [GameType.Test]: 'Test game',
  [GameType.Munchkin]: 'Munchkin'
};
