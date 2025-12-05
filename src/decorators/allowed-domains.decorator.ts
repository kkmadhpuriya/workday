import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { WebhookKeyGuard } from '../guards/webhook-key.guard';
import { DomainRestrictionGuard } from '../guards/domain-restriction.guard';
import { WebhookKey } from './webhook-key.decorator';

export const ALLOWED_DOMAINS_METADATA = 'allowedDomains';

export const AllowedDomains = (...domains: string[]) =>
  applyDecorators(
    WebhookKey(),
    SetMetadata(ALLOWED_DOMAINS_METADATA, domains),
    UseGuards(WebhookKeyGuard, DomainRestrictionGuard),
  );
