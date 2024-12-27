import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guards';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Body() authPayloadDTO: AuthPayloadDTO) {
        return this.authService.validateUser(authPayloadDTO);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req:Request){ 
        return req.user;
    }

}
