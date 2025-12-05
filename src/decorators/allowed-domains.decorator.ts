import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { WebhookKeyGuard } from '../guards/webhook-key.guard';
import { DomainRestrictionGuard } from '../guards/domain-restriction.guard';
import { WebhookKey } from './webhook-key.decorator';

export const ALLOWED_DOMAINS_METADATA = 'allowedDomains';

/**
 * Composite decorator that applies webhook key authentication and domain restriction
 * @param domains - Array of allowed domains (e.g., ['zoho.com', 'zoho.in'])
 */
export const AllowedDomains = (...domains: string[]) =>
  applyDecorators(
    WebhookKey(),
    SetMetadata(ALLOWED_DOMAINS_METADATA, domains),
    UseGuards(WebhookKeyGuard, DomainRestrictionGuard),
  );
