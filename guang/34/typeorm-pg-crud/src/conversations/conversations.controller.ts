import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { SemanticSearchDto } from './dto/semantic-search.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  /** GET /conversations/users/:userId — 用户的会话列表 */
  @Get('users/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.conversationsService.findConversationsByUserId(userId);
  }

  /** GET /conversations/:id/messages — 会话的消息列表 */
  @Get(':id/messages')
  findMessages(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.findMessagesByConversationId(id);
  }

  /** POST /conversations/:id/search — 会话内语义检索 */
  @Post(':id/search')
  search(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SemanticSearchDto,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) queryLimit?: number,
  ) {
    const limit = dto.limit ?? queryLimit ?? 5;
    return this.conversationsService.searchSimilarMessages(
      id,
      dto.query,
      limit,
    );
  }
}
