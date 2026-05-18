import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";

export default function BookListAdmin() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    version: "",
    book_name: "",
    author_name: "",
    editor_name: "",
    translator_name: "",
    isbn_number: "",
    call_no: "",
    source: "",
    from_date: "",
    to_date: "",
  });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      version: "",
      book_name: "",
      author_name: "",
      editor_name: "",
      translator_name: "",
      isbn_number: "",
      call_no: "",
      source: "",
      from_date: "",
      to_date: "",
    });
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

  const exportCSV = () => {
    const headers = [
      "Version","Serial","Book Code","Book Name","Author","Category","Call No","ISBN","Barcode","Source"
    ];

    const rows = filteredBooks.map((book) => [
      book.version,
      book.serial_no,
      book.book_code,
      book.book_name,
      book.author_name,
      getCategoryName(book.book_category),
      book.call_no,
      book.isbn_number,
      book.bar_code,
      book.source,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((e) => e.map((x) => `"${x || ""}"`).join(","))
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "books_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? `${category.category_code} - ${category.category_name}` : "-";
  };

  const filteredBooks = books.filter((book) => {
    const matchesVersion = filters.version ? book.version === filters.version : true;
    const matchesBookName = filters.book_name ? book.book_name?.toLowerCase().includes(filters.book_name.toLowerCase()) : true;
    const matchesAuthor = filters.author_name ? book.author_name?.toLowerCase().includes(filters.author_name.toLowerCase()) : true;
    const matchesEditor = filters.editor_name ? book.editor_name?.toLowerCase().includes(filters.editor_name.toLowerCase()) : true;
    const matchesTranslator = filters.translator_name ? book.translator_name?.toLowerCase().includes(filters.translator_name.toLowerCase()) : true;
    const matchesISBN = filters.isbn_number ? book.isbn_number?.toLowerCase().includes(filters.isbn_number.toLowerCase()) : true;
    const matchesCall = filters.call_no ? book.call_no?.toLowerCase().includes(filters.call_no.toLowerCase()) : true;
    const matchesSource = filters.source ? book.source === filters.source : true;

    const bookDate = book.book_addition_date ? new Date(book.book_addition_date) : null;
    const fromDate = filters.from_date ? new Date(filters.from_date) : null;
    const toDate = filters.to_date ? new Date(filters.to_date) : null;

    const matchesDate =
      (!fromDate || (bookDate && bookDate >= fromDate)) &&
      (!toDate || (bookDate && bookDate <= toDate));

    return (
      matchesVersion &&
      matchesBookName &&
      matchesAuthor &&
      matchesEditor &&
      matchesTranslator &&
      matchesISBN &&
      matchesCall &&
      matchesSource &&
      matchesDate
    );
  });

  return (
    <div className="max-w-full mx-auto bg-white shadow-lg border border-gray-300 p-4 md:p-6 mt-4">
      <h1 className="text-2xl font-bold border-b pb-4 mb-6">বইয়ের তালিকা</h1>

      {/* FILTER PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <select name="version" value={filters.version} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">বইয়ের শ্রেণী</option>
          <option value="Bangla">Bangla</option>
          <option value="English">English</option>
        </select>

        <input type="text" name="book_name" placeholder="বইয়ের নাম" value={filters.book_name} onChange={handleFilterChange} className="border p-2 rounded" />
        <input type="text" name="author_name" placeholder="লেখকের নাম" value={filters.author_name} onChange={handleFilterChange} className="border p-2 rounded" />
        <input type="text" name="editor_name" placeholder="সম্পাদকের নাম" value={filters.editor_name} onChange={handleFilterChange} className="border p-2 rounded" />
        <input type="text" name="translator_name" placeholder="অনুবাদকের নাম" value={filters.translator_name} onChange={handleFilterChange} className="border p-2 rounded" />
        <input type="text" name="isbn_number" placeholder="সংযোজন সংখ্যা" value={filters.isbn_number} onChange={handleFilterChange} className="border p-2 rounded" />

        <input type="text" name="call_no" placeholder="কল নম্বর" value={filters.call_no} onChange={handleFilterChange} className="border p-2 rounded" />

        <select name="source" value={filters.source} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">বইয়ের মাধ্যম</option>
          <option value="ক্রয়">ক্রয়</option>
          <option value="উপহার">উপহার</option>
        </select>

        <input type="date" name="from_date" value={filters.from_date} onChange={handleFilterChange} className="border p-2 rounded" />
        <input type="date" name="to_date" value={filters.to_date} onChange={handleFilterChange} className="border p-2 rounded" />

        <button onClick={fetchBooks} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
        <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Excel</button>
        <button onClick={resetFilters} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Reset</button>
      </div>

      {/* BOOK COUNT */}
      <div className="mb-4 font-semibold text-gray-700">
        মোট বইয়ের সংখ্যা: {filteredBooks.length}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full min-w-[3200px] border-collapse text-xs">
          <thead className="bg-blue-900 text-white">
            <tr>
              {[
                "ক্রমিক","BarCode","বইয়ের নাম","লেখকের নাম","সম্পাদকের নাম","অনুবাদকের নাম","প্রকাশকের নাম","প্রকাশ স্থান","প্রকাশের তারিখ","বইয়ের শ্রেণী","সংযোজন সংখ্যা","বইয়ের পৃষ্ঠা","বইয়ের মূল্য","বইয়ের মাধ্যম","কত তলা","র‍্যাক","বিল্ডিং","আলমারি","বারকোড","মন্তব্য","Created By","Create Date","Edit","Delete"
              ].map((head, idx) => (
                <th key={idx} className="border p-2 whitespace-nowrap">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="24" className="text-center p-6">Loading...</td></tr>
            ) : filteredBooks.length === 0 ? (
              <tr><td colSpan="24" className="text-center p-6">No books found.</td></tr>
            ) : (
              filteredBooks.map((book, index) => (
                <tr key={book.id} className="hover:bg-gray-100">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2 font-mono">||||||||</td>
                  <td className="border p-2">{book.book_name}</td>
                  <td className="border p-2">{book.author_name}</td>
                  <td className="border p-2">{book.editor_name}</td>
                  <td className="border p-2">{book.translator_name}</td>
                  <td className="border p-2">{book.publisher_name}</td>
                  <td className="border p-2">{book.place_of_publication}</td>
                  <td className="border p-2">{book.release_date}</td>
                  <td className="border p-2">{getCategoryName(book.book_category)}</td>
                  <td className="border p-2">{book.book_addition_number}</td>
                  <td className="border p-2">{book.book_page_no}</td>
                  <td className="border p-2">{book.price}</td>
                  <td className="border p-2">{book.source}</td>
                  <td className="border p-2">{book.floor_no}</td>
                  <td className="border p-2">{book.rack_no}</td>
                  <td className="border p-2">{book.place}</td>
                  <td className="border p-2">{book.cupboard}</td>
                  <td className="border p-2">{book.bar_code}</td>
                  <td className="border p-2">{book.remarks}</td>
                  <td className="border p-2">Admin</td>
                  <td className="border p-2">{book.created_at?.slice(0,10)}</td>
                  <td className="border p-2 text-yellow-500 cursor-pointer">✏️</td>
                  <td className="border p-2 text-red-500 cursor-pointer" onClick={() => handleDelete(book.id)}>❌</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}