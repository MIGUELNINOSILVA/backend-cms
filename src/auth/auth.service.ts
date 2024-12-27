import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
    {
        id: 1,
        username: 'anson',
        password: 'password',
    },
    {
        id: 2,
        username: 'jack',
        password: 'password123',
    }
]

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) {

    }

    async validateUser({ username, password }: AuthPayloadDTO): Promise<
        {
            payload: any,
            access_token: string
        }> {

        const findUser = fakeUsers.find((user) => user.username === username);

        if (!findUser || findUser.password !== password) throw new UnauthorizedException();
        if (password === findUser.password) {
            const payload = {
                sub: findUser.id,
                username: findUser.username,
            };
            return {
                payload: payload,
                access_token: await this.jwtService.signAsync(payload)
            }
        }
    }
}
