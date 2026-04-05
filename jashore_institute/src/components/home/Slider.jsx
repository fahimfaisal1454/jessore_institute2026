export default function Slider() {
  return (
    <div className="border bg-white p-2">

      <img
        src="/slider.jpg"
        alt="slider"
        className="w-full h-[300px] object-cover"
      />

      {/* Dots (fake slider indicator) */}
      <div className="flex justify-center gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className="w-2 h-2 bg-gray-400 rounded-full"
          ></span>
        ))}
      </div>

    </div>
  );
}