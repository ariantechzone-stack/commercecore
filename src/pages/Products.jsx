import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function Products() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("commerceProducts")
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Wireless Headphones", price: 99, stock: 12 },
          { id: 2, name: "Smart Watch", price: 149, stock: 8 },
        ]
  })

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  })

  const [editingId, setEditingId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("default")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    localStorage.setItem("commerceProducts", JSON.stringify(products))
  }, [products])

  // Filtering
  let processedProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "inStock"
        ? product.stock > 0
        : product.stock === 0

    return matchesSearch && matchesFilter
  })

  // Sorting
  if (sort === "low") {
    processedProducts.sort((a, b) => a.price - b.price)
  } else if (sort === "high") {
    processedProducts.sort((a, b) => b.price - a.price)
  }

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = processedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const openAddModal = () => {
    setEditingId(null)
    setNewProduct({ name: "", price: "", stock: "" })
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
    })
    setEditingId(product.id)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newProduct.name || !newProduct.price || !newProduct.stock) return

    if (editingId) {
      setProducts(
        products.map((product) =>
          product.id === editingId
            ? {
                ...product,
                name: newProduct.name,
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
              }
            : product
        )
      )
    } else {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      }

      setProducts([...products, product])
    }

    setIsModalOpen(false)
  }

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Products ({processedProducts.length})
            </h1>

            <button
              onClick={openAddModal}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + Add Product
            </button>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="p-2 rounded bg-gray-700"
            />

            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="p-2 rounded bg-gray-700"
            >
              <option value="all">All</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 rounded bg-gray-700"
            >
              <option value="default">Sort</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="border-t border-gray-700">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.stock}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedProducts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-400">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal (same as before) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
              />

              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
