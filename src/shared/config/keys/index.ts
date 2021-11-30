import development from './development';
import production from './production';

const { NODE_ENV } = process.env;

let env;

switch (NODE_ENV) {
    case 'production':
        env = production;
        break;
    case 'development':
        env = development;
        break;
    default:
        env = development;
        break;
}

export default { ...env };