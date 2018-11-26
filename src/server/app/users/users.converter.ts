import { UserDto } from '@dto/user/user.dto';

import { User } from './user';

export class UsersConverter {
  static toDto(user: User): UserDto {
    const userDto = <UserDto>{
      id: user.id,
      name: user.name,
      language: user.language
    };

    return userDto;
  }
}
