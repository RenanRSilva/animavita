import UserRepository from '../../core/application/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, UserDocument } from '../mongo/schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '../../core/domain/user/user';

export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    const document = await this.userModel.findOne({ email });

    if (!document) return null;

    return User.create({
      id: document.id,
      email: document.email,
      password: document.password,
      name: document.name,
      photoUri: document.photoUri,
      location: {
        longitude: document.location.coordinates[0],
        latitude: document.location.coordinates[1],
      },
    });
  }
}
