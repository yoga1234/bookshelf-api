const nameCheck = (h) => {
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku'
  })
  response.code(400)
  return response
}

const editNameCheck = (h) => {
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Mohon isi nama buku'
  })
  response.code(400)
  return response
}

const pageCountCheck = (h) => {
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
  })
  response.code(400)
  return response
}

const editPageCountCheck = (h) => {
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
  })
  response.code(400)
  return response
}

const getBookWithIdCheck = (h) => {
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { nameCheck, pageCountCheck, getBookWithIdCheck, editNameCheck, editPageCountCheck }