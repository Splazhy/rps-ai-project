"use server";

import { dummyUser, User } from "~/data/user";

let users = new Map<number, User>();


export async function createUser(): Promise<number> {
  let userId;
  for (let i = 1; ; i++) {
    if (!users.has(i)) {
      userId = i;
      let user = {
        id: userId,
        name: "",
      };
      users.set(userId, user);
      break;
    }
  }
  return userId;
}

export async function getUser(userId: number) {
  return users.get(userId) || dummyUser;
}

export async function changeUsername(userId: number, username: string) {
  let user = users.get(userId);
  if (user === undefined) {
    return;
  }
  user.name = username;
}

export async function removeUser(userId: number) {
  users.delete(userId);
}
