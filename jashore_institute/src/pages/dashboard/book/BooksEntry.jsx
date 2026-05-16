import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function BookEntryAdmin() {
  const initialForm = {
    version: "Bangla",
    serial_no: "",
    book_code: "",
    book_addition_number: "",
    book_addition_date: "",
    book_name: "",
    author_name: "",
    editor_name: "",
    translator_name: "",
    book_category: "",
    call_no: "",
    isbn_number: "",
    copy_no: "",
    publisher_name: "",
    place_of_publication: "",
    release_date: "",
    price: "",
    book_page_no: "",
    source: "ক্রয়",
    place: "",
    floor_no: "",
    cupboard: "",
    rack_no: "",
    bar_code: "",
    remarks: "",
    is_active: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.version && !editingId) {
      fetchNextSerial(formData.version);
    }
  }, [formData.version]);

  const fetchBooks = async () => {
    try {
      const res = await AxiosInstance.get("admin/book/books/");
      setBooks(res.data);
    } catch (err) {
      console.error("Book fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await AxiosInstance.get("admin/book/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch failed:", err);
    }
  };

  const fetchNextSerial = async (version) => {
    try {
      const res = await AxiosInstance.get(`admin/book/next-serial/?version=${version}`);
      setFormData((prev) => ({
        ...prev,
        serial_no: res.data.serial_no,
      }));
    } catch (err) {
      console.error("Serial fetch failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const payload = {
        ...formData,
        book_category: formData.book_category || null,
      };

      if (editingId) {
        await AxiosInstance.put(`admin/book/books/${editingId}/`, payload);
      } else {
        await AxiosInstance.post("admin/book/books/", payload);
      }

      resetForm();
      fetchBooks();
      fetchNextSerial(formData.version);
    } catch (err) {
      console.error("Save failed:", err.response?.data || err);
      alert("Failed to save book.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setFormData({
      ...initialForm,
      ...book,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await AxiosInstance.delete(`admin/book/books/${id}/`);
      fetchBooks();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    fetchNextSerial(initialForm.version);
  };

  const filteredBooks = books.filter((book) =>
    [
      book.book_name,
      book.book_code,
      book.author_name,
      book.bar_code,
      book.serial_no,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? `${category.category_code} - ${category.category_name}` : "-";
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg border border-gray-300 p-4 md:p-8 mt-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Book Entry" : "Add Book Entry"}
        </h1>
        <button
          onClick={resetForm}
          className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Book
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="font-semibold">Version *</label>
          <select name="version" value={formData.version} onChange={handleChange} className="w-full border p-2 rounded mt-1">
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Serial No *</label>
          <input type="text" value={formData.serial_no} readOnly className="w-full border p-2 rounded mt-1 bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Book Code *</label>
          <input type="text" name="book_code" value={formData.book_code} onChange={handleChange} required className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Addition No *</label>
          <input type="text" name="book_addition_number" value={formData.book_addition_number} onChange={handleChange} required className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Addition Date *</label>
          <input type="date" name="book_addition_date" value={formData.book_addition_date} onChange={handleChange} required className="w-full border p-2 rounded mt-1" />
        </div>

        <div className="lg:col-span-2">
          <label className="font-semibold">Book Name *</label>
          <input type="text" name="book_name" value={formData.book_name} onChange={handleChange} required className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Author</label>
          <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Editor</label>
          <input type="text" name="editor_name" value={formData.editor_name} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Translator</label>
          <input type="text" name="translator_name" value={formData.translator_name} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Category *</label>
          <select name="book_category" value={formData.book_category} onChange={handleChange} className="w-full border p-2 rounded mt-1">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_code} - {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Call No *</label>
          <input type="text" name="call_no" value={formData.call_no} onChange={handleChange} required className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">ISBN</label>
          <input type="text" name="isbn_number" value={formData.isbn_number} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Copy No</label>
          <input type="text" name="copy_no" value={formData.copy_no} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Publisher</label>
          <input type="text" name="publisher_name" value={formData.publisher_name} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Publication Place</label>
          <input type="text" name="place_of_publication" value={formData.place_of_publication} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Release Date</label>
          <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Price</label>
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Page No</label>
          <input type="number" name="book_page_no" value={formData.book_page_no} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Source</label>
          <select name="source" value={formData.source} onChange={handleChange} className="w-full border p-2 rounded mt-1">
            <option value="ক্রয়">ক্রয়</option>
            <option value="উপহার">উপহার</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Place</label>
          <input type="text" name="place" value={formData.place} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Floor</label>
          <input type="text" name="floor_no" value={formData.floor_no} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Cupboard</label>
          <input type="text" name="cupboard" value={formData.cupboard} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Rack No</label>
          <input type="text" name="rack_no" value={formData.rack_no} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="font-semibold">Barcode *</label>
          <input type="text" name="bar_code" value={formData.bar_code} onChange={handleChange} required className="w-full border p-2 rounded mt-1" />
        </div>

        <div className="lg:col-span-4">
          <label className="font-semibold">Remarks</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="w-full border p-2 rounded mt-1" />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
          <label className="font-semibold">Active</label>
        </div>

        <div className="lg:col-span-4 flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            {saving ? "Saving..." : editingId ? "Update Book" : "Save Book"}
          </button>
          <button type="button" onClick={resetForm} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Reset
          </button>
        </div>
      </form>

      {/* SEARCH */}
      <div className="mt-10 mb-4">
        <input
          type="text"
          placeholder="Search by book name, code, barcode, author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border p-2 rounded"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse text-sm min-w-[1800px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Version</th>
              <th className="border p-2">Serial</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Book Name</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Call No</th>
              <th className="border p-2">Barcode</th>
              <th className="border p-2">Source</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="10" className="text-center p-6">Loading...</td></tr>
            ) : filteredBooks.length === 0 ? (
              <tr><td colSpan="10" className="text-center p-6">No books found.</td></tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="border p-2">{book.version}</td>
                  <td className="border p-2">{book.serial_no}</td>
                  <td className="border p-2">{book.book_code}</td>
                  <td className="border p-2">{book.book_name}</td>
                  <td className="border p-2">{book.author_name}</td>
                  <td className="border p-2">{getCategoryName(book.book_category)}</td>
                  <td className="border p-2">{book.call_no}</td>
                  <td className="border p-2">{book.bar_code}</td>
                  <td className="border p-2">{book.source}</td>
                  <td className="border p-2 flex gap-2 justify-center">
                    <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(book.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}