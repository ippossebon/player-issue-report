import moment from 'moment'

moment.locale('pt-br');
moment.updateLocale('pt-br', {
  relativeTime: {
    future: 'em %s',
    past: '%s atrás',
    s: '%d seg',
    m: '%d min',
    mm: '%d min',
    h: '1 h',
    hh: '%d h',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
})

export default moment
