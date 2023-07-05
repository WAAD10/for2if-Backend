import { Injectable } from '@nestjs/common';
import { NftDto } from './dto/nft.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nft } from './nft.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(Nft)
    private readonly userRepository: Repository<Nft>,
  ) {}

  async saveNft(nftDto: NftDto): Promise<Object> {
    const { name, image, desc } = nftDto;
    const nft = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(Nft)
      .values([
        {
          name: name,
          image: image,
          desc: desc,
        },
      ])
      .execute();

    return { url: nft.raw[0].id };
  }

  async getNft(id: number): Promise<Object> {
    const nft = await this.userRepository.findOne({
      where: { id: id },
    });

    return nft;
  }
}
