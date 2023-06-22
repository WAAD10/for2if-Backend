import { Injectable } from '@nestjs/common';
import { BoardCategory } from './board_category.entity';
import { BoardImage } from './board_image.entity';
import { BoardTable } from './board_table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardCategoryRepository extends Repository<BoardCategory> {}

@Injectable()
export class BoardImageRepository extends Repository<BoardImage> {}

@Injectable()
export class BoardTableRepository extends Repository<BoardTable> {}
