import { useEffect, useState } from "react";

// Import images
import a from "../../assets/a.jpeg";
import b from "../../assets/b.jpeg";
import c from "../../assets/c.jpeg";
import d from "../../assets/d.jpeg";
import e from "../../assets/e.jpeg";
import f from "../../assets/f.jpeg";
import g from "../../assets/g.jpeg";
import h from "../../assets/h.jpeg";

export default function Slider() {
  const images = [a, b, c, d, e, f, g, h];

  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="border bg-white p-2 sm:p-3 shadow-sm rounded-sm w-full">
      
      {/* SLIDER CONTAINER */}
      <div className="relative w-full overflow-hidden rounded-sm">
        
        {/* Responsive Height / Aspect Ratio */}
        <div className="w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] lg:h-[400px]">
          
          {/* Slides */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative"
              >
                <img
                  src={img}
                  alt={`slide-${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Optional Overlay */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            ))}
          </div>
        </div>

        {/* PREV BUTTON */}
        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full transition"
        >
          ❮
        </button>

        {/* NEXT BUTTON */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % images.length)
          }
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full transition"
        >
          ❯
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center flex-wrap gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-green-700 scale-125"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}