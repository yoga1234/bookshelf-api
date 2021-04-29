const { nanoid } = require('nanoid')
const books = require('./books')
const { nameCheck, pageCountCheck } = require('./errorCheck')

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid()
  const finished = (pageCount === readPage) ? true : false
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  // check if name is empty
  if(name === undefined) {
    return nameCheck(h)
  }

  // check if readPage is bigger
  if(readPage > pageCount) {
    return pageCountCheck(h)
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0

  if(isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        "bookId": id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}


const allBookReturn = () => {
  let bookReturn = books.map((book) => {
    return {
      "id": book.id,
      "name": book.name,
      "publisher": book.publisher
    }
  })
  
  return bookReturn
}
const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books: allBookReturn()
  }
})

module.exports = { addBookHandler, getAllBooksHandler }