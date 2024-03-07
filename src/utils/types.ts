export type CREATE_USER_PARAMS = {
  username: string;
  password: string;
};

export type UPDATE_USER_PARAMS = {
  username: string;
  password: string;
};

export type CREAT_PROFILE_PARAMS = {
  userId: number;
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CREAT_POST_PARAMS = {
  userId: number;
  title: string;
  description: string;
};