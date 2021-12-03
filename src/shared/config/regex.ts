import IRegexp from '@src/domain/repositories/IRegexRepository';

const regexps: IRegexp = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    capital: /^(?=.*[A-Z])/,
    lowercase: /^(?=.*[a-z])/,
    length: (num) => new RegExp(`.{${num},}`),
    number: /^(?=.*\d)/,
};

export default { ...regexps };
