import { createConnection } from 'typeorm';

import { logger } from '@src/shared/helpers/pinoLogger';

createConnection().then(() => {
    logger.info(`database connect\n`);
});
