import {
  CREATE_USER_PARAMS,
  CREAT_POST_PARAMS,
  CREAT_PROFILE_PARAMS,
  UPDATE_USER_PARAMS,
} from './../../../utils/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Posts';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  findUsers() {
    return this.userRepository.find({ relations: ['profile'] });
  }
  createUser(userData: CREATE_USER_PARAMS) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateUserById(id: number, userData: UPDATE_USER_PARAMS) {
    return await this.userRepository
      .update({ id }, { ...userData })
      .then((value) => console.log({ value }));
  }

  deleteUserById(id: number) {
    return this.userRepository.delete({ id });
  }

  async createProfile(profileData: CREAT_PROFILE_PARAMS) {
    const user = await this.userRepository.findOneBy({
      id: profileData.userId,
    });
    if (!user)
      throw new HttpException(
        'User was not found, cannot create profile!',
        HttpStatus.BAD_REQUEST,
      );

    const newProfile = this.profileRepository.create(profileData);
    await this.profileRepository.save(newProfile);
    user.profile = newProfile;
    return await this.userRepository.save(user);
  }

  async createPost(postData: CREAT_POST_PARAMS) {
    const user = await this.userRepository.findOneBy({
      id: postData.userId,
    });
    if (!user)
      throw new HttpException(
        'User was not found, cannot create profile!',
        HttpStatus.BAD_REQUEST,
      );

    const newPost = this.postRepository.create({ ...postData, user });
    return await this.postRepository.save(newPost);
  }
}
