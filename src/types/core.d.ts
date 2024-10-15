export type Hand = 'rock' | 'paper' | 'scissors' | 'lizard' | 'trident' | 'gun'

export type RoundResult = 'win' | 'lose' | 'draw'

export type Room = {
  id: string,
  host: User,
  joined: User[],
  capacity: number,
  vacant: boolean,
  playing: boolean,
};

export type RoomJoinResult = (
  "invalid-user-id" |
  "invalid-room-id" |
  "full" |
  "success" |
  "existing-host" |
  "existing-member"
);

export type User = {
  uuid: string,
  name: string,
  roomId: string | undefined,
};

export type Match = {
  roomId: string,
  rounds: Round[],
  settings: MatchSettings,
  scoreboard: Record<string, number>,
};

export type Round = {
  handA: { userId: string , hand: Hand | "waiting"},
  handB: { userId: string , hand: Hand | "waiting"},
}

export type MatchSettings = {
  round: number, // first to N
  advanced: boolean, // +trident +lizard +gun
  use_camera: boolean, // if false, use buttons instead
};
