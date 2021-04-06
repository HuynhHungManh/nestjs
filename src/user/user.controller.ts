import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Query,
    ValidationPipe,
} from '@nestjs/common';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';

// import { RoleType } from '../../common/constants/role-type';
import { PageDto } from '../common/dto/PageDto';
// import { AuthUser } from '../../decorators/auth-user.decorator';
// import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { UUIDParam } from '../decorators/http.decorators';
// import { TranslationService } from '../../shared/services/translation.service';
import { UserDto } from './dto/UserDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('/api/users')
// @ApiTags('users')
export class UserController {
    constructor(
        private userService: UserService
        // private readonly translationService: TranslationService,
    ) {}

    // @Get('admin')
    // @Auth(RoleType.USER)
    // @HttpCode(HttpStatus.OK)
    // async admin(@AuthUser() user: UserEntity): Promise<string> {
    //     const translation = await this.translationService.translate(
    //         'keywords.admin',
    //         {
    //             lang: 'en',
    //         },
    //     );
    //     return `${translation} ${user.firstName}`;
    // }

    @Get()
    // @Auth(RoleType.USER)
    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Get users list',
    //     type: PageDto,
    // })
    getUsers(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<PageDto<UserDto>> {
        return this.userService.getUsers(pageOptionsDto);
    }

    @Get(':id')
    // @Auth(RoleType.USER)
    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     description: 'Get users list',
    //     type: UserDto,
    // })
    getUser(@UUIDParam('id') userId: string): Promise<UserDto> {
        return this.userService.getUser(userId);
    }
}