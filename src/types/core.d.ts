export type Room = {
  id: string,
  host: User,
  joined: User[],
  capacity: number,
  vacant: boolean,
};

export type User = {
  uuid: string,
  name: string,
  roomId: string | undefined,
};

export type GameSettings = {
  round: number, // first to N
  advanced: boolean, // +trident +lizard +gun
  use_camera: boolean, // if false, use buttons instead
}

