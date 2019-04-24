const Telegraf = require('telegraf')

const { emodji } = require('@/helpers')

const { Markup } = Telegraf

module.exports = (board, isWhite) => {
  const horizontal = 'abcdefgh'.split('')
  const vertical = new Array(8) // eslint-disable-line no-magic-numbers
    .fill(0)
    .reduce((acc) => {
      acc.push(acc.length + 1)
      return acc
    }, [])
    .reverse()

  const boardMarkup = vertical.map((row) => horizontal.map((col) => {
    const square = board
      .find(({ file, rank }) => file === col && rank === row)

    if (square && square.piece) {
      return square.destination
        ? {
          text: `X${emodji[square.piece.side.name][square.piece.type]}`,
          callback_data: `${col}${row}`,
        }
        : {
          text: `${emodji[square.piece.side.name][square.piece.type]}`,
          callback_data: `${col}${row}`,
        }
    }

    return square.destination
      ? { text: 'O', callback_data: `${col}${row}` }
      : { text: unescape('%u0020'), callback_data: `${col}${row}` }
  }))

  return Markup.inlineKeyboard(isWhite
    ? boardMarkup
    : boardMarkup.map((row) => row.reverse()).reverse()).extra()
}
