import { useEffect, useState } from "react";

// Import images from src/assets
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

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="border bg-white p-2">
      {/* Slider Container */}
      <div className="relative w-full h-[300px] overflow-hidden">
        {/* Sliding Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className="w-full h-[300px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-green-700 scale-110"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}