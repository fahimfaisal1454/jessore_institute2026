export default function DivisionPage({ title, author, content, image }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white">
      
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#a0522d] text-center mb-3">
        {title}
      </h1>

      {/* AUTHOR */}
      {author && (
        <p className="text-blue-600 text-sm mb-4 text-center">
          ***** {author} *****
        </p>
      )}

      {/* CONTENT */}
      <div className="text-gray-800 leading-7 text-justify space-y-4">
        {content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* IMAGE */}
      {image && (
        <div className="mt-6 flex justify-center">
          <img
            src={image}
            alt="division"
            className="max-w-full md:w-[500px] rounded shadow"
          />
        </div>
      )}

    </div>
  );
}