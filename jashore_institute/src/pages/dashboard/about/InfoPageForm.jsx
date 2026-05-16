import React, { useEffect, useState, useRef } from "react";
import axios from "../../../api/AxiosInstance";
import FormWrapper from "../../../components/admin/FormWrapper";

const InfoPageForm = () => {
  const editorRef = useRef(null);

  const [form, setForm] = useState({
    page_type: "open_liberty_stage",
    title: "",
    content: "",
  });

  const [pages, setPages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH ALL PAGES
  // =========================
  const fetchPages = async () => {
    try {
      const res = await axios.get("/admin/infopages/");
      setPages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CONTENT CHANGE
  // =========================
  const handleContentChange = () => {
    setForm((prev) => ({
      ...prev,
      content: editorRef.current.innerHTML,
    }));
  };

  // =========================
  // TEXT FORMATTER
  // =========================
  const formatText = (command, value = null) => {
    editorRef.current.focus();

    if (command === "fontSizeCustom") {
      document.execCommand("fontSize", false, "7");

      const fonts =
        editorRef.current.getElementsByTagName(
          "font"
        );

      for (
        let i = 0;
        i < fonts.length;
        i++
      ) {
        if (fonts[i].size === "7") {
          fonts[i].removeAttribute(
            "size"
          );

          fonts[i].style.fontSize =
            value;
        }
      }

    } else if (
      command ===
      "insertUnorderedList"
    ) {
      document.execCommand(
        "styleWithCSS",
        false,
        true
      );

      document.execCommand(
        "insertUnorderedList",
        false,
        null
      );

    } else {
      document.execCommand(
        command,
        false,
        value
      );
    }

    handleContentChange();
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      page_type:
        "open_liberty_stage",
      title: "",
      content: "",
    });

    setEditingId(null);

    if (editorRef.current) {
      editorRef.current.innerHTML =
        "";
    }
  };

 // =========================
// FIX HANDLE SUBMIT
// =========================
const handleSubmit = async (e) => {
  e.preventDefault();

  // CLEAN EMPTY LIST ITEMS
  let cleanedContent = form.content
    .replace(/<li><\/li>/g, "")
    .replace(/<li><br><\/li>/g, "")
    .replace(/<ul>\s*<\/ul>/g, "");

  const payload = {
    page_type: form.page_type,
    title: form.title,
    content: cleanedContent,
  };

  console.log("Submitting:", payload);

  try {
    if (editingId) {
      await axios.put(
        `/admin/infopages/${editingId}/`,
        payload
      );
    } else {
      await axios.post(
        "/admin/infopages/",
        payload
      );
    }

    resetForm();
    fetchPages();

  } catch (err) {
    console.error(
      "API ERROR:",
      err.response?.data
    );
  }
};
  // =========================
  // EDIT
  // =========================
  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      page_type: item.page_type,
      title: item.title,
      content: item.content,
    });

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML =
          item.content || "";
      }

      const formSection =
        document.getElementById(
          "info-page-form"
        );

      if (formSection) {
        formSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (
    id
  ) => {
    try {
      await axios.delete(
        `/admin/infopages/${id}/`
      );

      fetchPages();

      if (editingId === id) {
        resetForm();
      }

    } catch (err) {
      console.error(err);
    }
  };

// =========================
// ADD THIS FUNCTION
// =========================
const insertBulletList = () => {
  editorRef.current.focus();

  const selection = window.getSelection();

  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  // CREATE BULLET LIST
  const ul = document.createElement("ul");
  ul.style.listStyleType = "disc";
  ul.style.paddingLeft = "30px";
  ul.style.margin = "10px 0";

  const li = document.createElement("li");
  li.innerHTML = "";

  ul.appendChild(li);

  range.deleteContents();
  range.insertNode(ul);

  // CURSOR INSIDE LIST ITEM
  const newRange = document.createRange();
  newRange.selectNodeContents(li);
  newRange.collapse(false);

  selection.removeAllRanges();
  selection.addRange(newRange);

  handleContentChange();
};

  return (
    <FormWrapper title="Info Pages">

      {/* FORM */}
      <form
        id="info-page-form"
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded shadow space-y-4"
      >

        {/* PAGE TYPE */}
        <select
          name="page_type"
          value={form.page_type}
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        >
          <option value="open_liberty_stage">
            Open Liberty Stage
          </option>

          <option value="primary_school">
            Primary School
          </option>
        </select>

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={
            handleChange
          }
          placeholder="Title"
          className="w-full border p-3 rounded"
        />

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2 border p-3 rounded bg-gray-50">

          <button
            type="button"
            onClick={() =>
              formatText("bold")
            }
            className="px-3 py-1 bg-gray-200 rounded font-bold"
          >
            B
          </button>

          <button
            type="button"
            onClick={() =>
              formatText("italic")
            }
            className="px-3 py-1 bg-gray-200 rounded italic"
          >
            I
          </button>

          <button
            type="button"
            onClick={() =>
              formatText(
                "underline"
              )
            }
            className="px-3 py-1 bg-gray-200 rounded underline"
          >
            U
          </button>

          <button
            type="button"
            onClick={() =>
              formatText(
                "foreColor",
                "red"
              )
            }
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Red
          </button>

          <button
            type="button"
            onClick={() =>
              formatText(
                "foreColor",
                "blue"
              )
            }
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Blue
          </button>

          {/* FONT SIZE */}
          <button
            type="button"
            onClick={() =>
              formatText(
                "fontSizeCustom",
                "16px"
              )
            }
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Small
          </button>

          <button
            type="button"
            onClick={() =>
              formatText(
                "fontSizeCustom",
                "24px"
              )
            }
            className="px-3 py-1 bg-indigo-500 text-white rounded"
          >
            Medium
          </button>

          <button
            type="button"
            onClick={() =>
              formatText(
                "fontSizeCustom",
                "32px"
              )
            }
            className="px-3 py-1 bg-purple-500 text-white rounded"
          >
            Large
          </button>

          {/* BULLET LIST */}
<button
  type="button"
  onClick={insertBulletList}
  className="px-3 py-1 bg-pink-500 text-white rounded"
>
  • List
</button>
        </div>

        {/* CONTENT EDITOR */}
        <div
          ref={editorRef}
          contentEditable
          onInput={
            handleContentChange
          }
          className="w-full border p-4 rounded min-h-[300px] bg-white focus:outline-none overflow-auto"
          suppressContentEditableWarning={
            true
          }
        />

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto">
            {editingId
              ? "Update Page"
              : "Save Page"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={
                resetForm
              }
              className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* LIVE PREVIEW */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded shadow">
        <h3 className="mb-4 font-semibold">
          Live Preview
        </h3>

        <div
          className="border rounded p-4 min-h-[150px]"
          dangerouslySetInnerHTML={{
            __html:
              form.content,
          }}
        />
      </div>

      {/* EXISTING PAGES */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded shadow">
        <h3 className="mb-4 font-semibold">
          Existing Pages
        </h3>

        {pages.length ===
          0 && (
          <p className="text-gray-500">
            No pages found
          </p>
        )}

        <div className="space-y-3">
          {pages.map(
            (item) => (
              <div
                key={item.id}
                className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
              >
                <div>
                  <p className="font-bold break-words">
                    {
                      item.title
                    }
                  </p>

                  <p className="text-sm text-gray-500 break-words">
                    {
                      item.page_type
                    }
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

                  <button
                    onClick={() =>
                      handleEdit(
                        item
                      )
                    }
                    className="bg-yellow-500 text-white px-3 py-2 rounded w-full sm:w-auto"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        item.id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto"
                  >
                    Delete
                  </button>

                </div>
              </div>
            )
          )}
        </div>
      </div>

    </FormWrapper>
  );
};

export default InfoPageForm;