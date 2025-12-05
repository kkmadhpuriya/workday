import { SetMetadata } from '@nestjs/common';

export const WEBHOOK_KEY_METADATA = 'webhookKey';

export const WebhookKey = (key?: string) =>
  SetMetadata(WEBHOOK_KEY_METADATA, key || true);
