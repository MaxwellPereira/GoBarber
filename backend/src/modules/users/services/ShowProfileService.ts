import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRespository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRespository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
