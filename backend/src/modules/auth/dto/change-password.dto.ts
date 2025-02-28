import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'currentPassword123',
    description: 'The current password of the user',
  })
  @IsString()
  @MinLength(6, { message: 'Current password must be at least 6 characters long' })
  oldPassword: string;

  @ApiProperty({
    example: 'newPassword123',
    description: 'The new password for the account',
  })
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}
