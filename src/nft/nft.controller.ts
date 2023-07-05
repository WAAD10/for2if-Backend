import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NftDto } from './dto/nft.dto';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @Post('/')
  saveNft(@Body() nftDto: NftDto): Promise<Object> {
    return this.nftService.saveNft(nftDto);
  }

  @Get('/:id')
  getNft(@Param('id') id: number): Promise<Object> {
    return this.nftService.getNft(id);
  }
}
