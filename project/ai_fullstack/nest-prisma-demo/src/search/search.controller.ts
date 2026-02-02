import {
    Controller,
    Get,
    Query,
} from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query() dto: SearchDto) {
    // GET /search?keyword=%E4%BD%A0%E5%A5%BD
    // URL 中的中文或特殊字符在传输时会被自动编码，后端收到的是“乱码形式”的编码字符串，
    // 必须解码才能还原成原始可读内容
    // 你好%E4%BD%A0%E5%A5%BD
    let { keyword } = dto;
    let decoded = decodeURIComponent(keyword);
    
    return this.searchService.search(decoded);
  }
}
