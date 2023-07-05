import { Injectable } from '@nestjs/common';
import { BoardCategory } from './board_category.entity';
import { BoardImage } from './board_image.entity';
import { BoardTable } from './board_table.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardCategoryRepository extends Repository<BoardCategory> {
  constructor(
    @InjectRepository(BoardCategory)
    private readonly repository: Repository<BoardCategory>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

@Injectable()
export class BoardImageRepository extends Repository<BoardImage> {
  constructor(
    @InjectRepository(BoardImage)
    private readonly repository: Repository<BoardImage>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

@Injectable()
export class BoardTableRepository extends Repository<BoardTable> {
  constructor(
    @InjectRepository(BoardTable)
    private readonly repository: Repository<BoardTable>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
