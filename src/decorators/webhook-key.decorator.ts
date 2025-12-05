import { SetMetadata } from '@nestjs/common';

export const WEBHOOK_KEY_METADATA = 'webhookKey';

/**
 * Decorator to mark endpoints that require webhook key authentication
 * @param key - The webhook key to validate against
 */
export const WebhookKey = (key?: string) =>
  SetMetadata(WEBHOOK_KEY_METADATA, key || true);
