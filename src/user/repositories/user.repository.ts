import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserEntity } from '../entities/user.entity';

import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user.module';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { JwtStrategy } from '../../auth/jwt.strategy';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
