import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export type Extractor = (req: Request) => Record<string, any>;

export const DATA_EXTRACTOR_KEY = 'data_extractor_key';
export const DataExtractor = (extractor: Extractor) =>
  SetMetadata(DATA_EXTRACTOR_KEY, extractor);
