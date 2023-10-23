enum Gender {
  male = 'male',
  female = 'female',
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: Gender;
  _id?: string;
}
