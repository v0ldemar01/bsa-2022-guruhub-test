import {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userServ } from '~/services/services';
import { ValidationMessage } from '~/common/enums/validation/validation-message.enum';
import { BadCredentials } from '~/exceptions/exceptions';

type Constructor = {
  userService: typeof userServ;
};

class Auth {
  #userService: typeof userServ;

  constructor({ userService }: Constructor) {
    this.#userService = userService;
  }

  signUp(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#userService.create(userRequestDto);
  }

  async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.#userService.verifySignIn(userRequestDto);

    if (!user) {
      throw new BadCredentials(ValidationMessage.BAD_CREDENTIALS);
    }

    return user;
  }
}

export { Auth };
