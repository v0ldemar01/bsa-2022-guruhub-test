import {
  UsersByEmailResponseDto,
  UsersByIdResponseDto,
  UsersGetAllResponseDto,
  UserSignUpRequestDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { Encrypt } from '~/services/encrypt/encrypt.service';

type Constructor = {
  userRepository: typeof userRep;
  encryptService: Encrypt;
};

class User {
  #userRepository: typeof userRep;
  #encryptService: Encrypt;

  constructor({ userRepository, encryptService }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptService = encryptService;
  }

  async getAll(): Promise<UsersGetAllResponseDto> {
    const users = await this.#userRepository.getAll();

    const items = users.map((user) => ({
      id: user.id,
      email: user.email,
    }));

    return {
      items,
    };
  }

  async create({
    email,
    fullName,
    password,
  }: UserSignUpRequestDto): Promise<UsersByIdResponseDto> {
    const passwordSalt = await this.#encryptService.generateSalt();
    const passwordHash = await this.#encryptService.encrypt(
      password,
      passwordSalt,
    );

    const user = await this.#userRepository.create({
      email,
      fullName,
      passwordSalt,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async getByEmail(email: string): Promise<UsersByEmailResponseDto | null> {
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    };
  }

  async delete(id: string): Promise<void> {
    const user = await this.#userRepository.getById(id);

    if (user) {
      await this.#userRepository.delete(String(user.id));
    }
  }
}

export { User };
