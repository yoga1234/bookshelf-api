const { nanoid } = require('nanoid')
const books = require('./books')
const { nameCheck, pageCountCheck, getBookWithIdCheck, editNameCheck, editPageCountCheck } = require('./errorCheck')

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

// return all books
const allBookReturn = (condition) => {
  let bookReturn
  if(condition === 'allBooks') {
    bookReturn = books.map((book) => {
      return {
        "id": book.id,
        "name": book.name,
        "publisher": book.publisher
      }
    })
  }

  // reading true
  if(condition === 'readingTrue') {
    bookReturn = books.map((book) => {
      if(book.reading === true) {
        console.log(book.reading)
        return {
          "id": book.id,
          "name": book.name,
          "publisher": book.publisher
        }
      }
    })
    bookReturn = bookReturn.filter(function(element) {
      return element !== undefined
    })
    console.log(bookReturn)
  }

  // reading false
  if(condition === 'readingFalse') {
    bookReturn = books.map((book) => {
      if(book.reading !== true) {
        console.log(book.reading)
        return {
          "id": book.id,
          "name": book.name,
          "publisher": book.publisher
        }
      }
    })
    bookReturn = bookReturn.filter(function(element) {
      return element !== undefined
    })
    console.log(bookReturn)
  }
  
  return bookReturn
}
const getAllBooksHandler = (request) => {
  const { reading, finished } = request.query
  // reading check
  if(reading === '1') {
    return {
      status: 'success',
      data: {
        books: allBookReturn('readingTrue')
      }
    }
  }
  if(reading === '0') {
    return {
      status: 'success',
      data: {
        books: allBookReturn('readingFalse')
      }
    }
  }

  return {
    status: 'success',
    data: {
      books: allBookReturn('allBooks')
    }
  }
}

// getting a book
const getBookByIdHandler = (request, h) => {
  const { id } = request.params

  const book = books.filter((n) => n.id === id)[0]

  if(book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }

  return getBookWithIdCheck(h)
}

const editBookByIdHandler = (request, h) => {
  const { id } = request.params

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
  const updatedAt = new Date().toISOString()
  const index = books.findIndex((book) => book.id === id)

  // check if name is empty
  if(name === undefined) {
    return editNameCheck(h)
  }
  // check if readPage is bigger
  if(readPage > pageCount) {
    return editPageCountCheck(h)
  }

  if(index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params

  const index = books.findIndex((book) => book.id === id)

  if(index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }