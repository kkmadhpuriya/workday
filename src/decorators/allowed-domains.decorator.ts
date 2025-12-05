import { SetMetadata } from '@nestjs/common';

export const ALLOWED_DOMAINS_METADATA = 'allowedDomains';

/**
 * Decorator to restrict access to specific domains
 * @param domains - Array of allowed domains (e.g., ['zoho.com', 'zoho.in'])
 */
export const AllowedDomains = (...domains: string[]) =>
  SetMetadata(ALLOWED_DOMAINS_METADATA, domains);
