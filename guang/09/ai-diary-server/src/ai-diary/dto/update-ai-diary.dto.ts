import { PartialType } from '@nestjs/mapped-types';
import { CreateAiDiaryDto } from './create-ai-diary.dto';

export class UpdateAiDiaryDto extends PartialType(CreateAiDiaryDto) {}