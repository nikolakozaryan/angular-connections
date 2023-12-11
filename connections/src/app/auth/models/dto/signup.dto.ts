import { SigninDto } from './login.dto';

export default interface SignupDto extends SigninDto {
  name: string;
}
