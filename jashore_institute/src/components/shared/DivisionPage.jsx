export default function DivisionPage({ title, author, content, image }) {

  // 🔥 normalize content
  let paragraphs = [];

  if (Array.isArray(content)) {
    paragraphs = content;
  } else if (typeof content === "string") {
    paragraphs = content.split("\n"); // split by line
  }

  return (
  <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-white">

    {/* TITLE */}
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#a0522d] text-center mb-3 break-words">
      {title}
    </h1>

    {/* AUTHOR */}
    {author && (
      <p className="text-blue-600 text-xs sm:text-sm mb-4 text-center break-words">
        ***** {author} *****
      </p>
    )}

    {/* CONTENT */}
    <div className="text-gray-800 text-sm sm:text-base leading-7 text-justify space-y-4">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className="break-words whitespace-pre-line"
        >
          {para}
        </p>
      ))}
    </div>

    {/* IMAGE */}
    {image && (
      <div className="mt-6 flex justify-center">
        <img
          src={image}
          alt="division"
          className="w-full max-w-full sm:max-w-[500px] rounded shadow object-cover"
        />
      </div>
    )}

  </div>
);
}