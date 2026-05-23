function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {

  return (
    <div className="pagination">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ←
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        →
      </button>

    </div>
  )
}

export default Pagination