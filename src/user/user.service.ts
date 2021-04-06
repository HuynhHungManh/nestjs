import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageDto } from '../common/dto/PageDto';
// import { FileNotImageException } from '../../exceptions/file-not-image.exception';
// import { IFile } from '../../interfaces/IFile';
// import { AwsS3Service } from '../../shared/services/aws-s3.service';
// import { ValidatorService } from '../shared/services/validator.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserDto } from './dto/UserDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository
        // public readonly validatorService: ValidatorService,
        // public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single user
     */
    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }
    async findByUsernameOrEmail(
        options: Partial<{ username: string; email: string }>,
    ): Promise<UserEntity | undefined> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }

        return queryBuilder.getOne();
    }

    async createUser(
        userRegisterDto: UserRegisterDto
        // file: IFile,
    ): Promise<UserEntity> {
        // const bcrypt = require('bcrypt');
        // const saltRounds = 10;
        // let newUserRegisterDto = userRegisterDto;
                // let user = await this.authService.generateHashPassword(newUserRegisterDto);
        // newUserRegisterDto.password = await this.authService.generateHashPassword(newUserRegisterDto);
        let user = this.userRepository.create(userRegisterDto);


        // const abc = await bcrypt.genSalt(saltRounds, (err, salt) => {
        //     bcrypt.hash(user.password, salt, (err, hash) => {
        //         this.hashGenerator(err, hash, user);
        //     });
        // });

        // if (file && !this.validatorService.isImage(file.mimetype)) {
        //     throw new FileNotImageException();
        // }

        // if (file) {
        //     user.avatar = await this.awsS3Service.uploadImage(file);
        // }
        return this.userRepository.save(user);
    }

    async getUsers(
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<PageDto<UserDto>> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        const { items, pageMetaDto } = await queryBuilder.paginate(
            pageOptionsDto,
        );
        const userEntity = await queryBuilder.getOne();
        return items.toPageDto(pageMetaDto);
    }

    async getUser(userId: string) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        queryBuilder.where('user.id = :userId', { userId });

        const userEntity = await queryBuilder.getOne();

        return userEntity.toDto();
    }

    private async hashGenerator(err, hash, user: UserRegisterDto): Promise<UserEntity> {
        return await this.userRepository.save({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: hash
        });
    }
}
