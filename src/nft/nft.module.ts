import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nft])],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
