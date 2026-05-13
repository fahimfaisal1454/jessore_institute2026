import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // =========================
  // API BASE URL
  // =========================
  const API_BASE =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_BASE_URL_PROD
      : import.meta.env.VITE_API_BASE_URL_LOCAL;

  const BASE_URL = API_BASE.replace(/\/api\/?$/, "/");

  // =========================
  // FETCH HERO SLIDER
  // =========================
  useEffect(() => {
const fetchSlides = async () => {
  try {
    const res = await AxiosInstance.get("aboutus/hero-slider/");
    setSlides(res.data || []);
  } catch (error) {
    console.error("Slider fetch failed:", error);
  } finally {
    setLoading(false);
  }
};

    fetchSlides();
  }, []);

  // =========================
  // AUTO SLIDE
  // =========================
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // =========================
  // IMAGE FIXER
  // =========================
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/fallback.jpg";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BASE_URL}${imagePath.replace(/^\/+/, "")}`;
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="border bg-white p-2 sm:p-3 shadow-sm rounded-sm w-full">
        <div className="w-full aspect-[16/9] flex items-center justify-center">
          <p className="text-gray-500">Loading slider...</p>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY
  // =========================
  if (slides.length === 0) {
    return (
      <div className="border bg-white p-2 sm:p-3 shadow-sm rounded-sm w-full">
        <div className="w-full aspect-[16/9] flex items-center justify-center">
          <p className="text-gray-500">No slider images available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border bg-white p-2 sm:p-3 shadow-sm rounded-sm w-full">

      {/* ========================= */}
      {/* SLIDER CONTAINER */}
      {/* ========================= */}
      <div className="relative w-full overflow-hidden rounded-sm">

        {/* Responsive Height */}
        <div className="w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] lg:h-[400px]">

          {/* SLIDES */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id || index}
                className="w-full h-full flex-shrink-0 relative"
              >
                <img
                  src={getImageUrl(slide.image)}
                  alt={slide.title || `slide-${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/10"></div>

{/* TITLE */}
{slide.title && (
  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/40 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-md max-w-[75%] shadow-md">
    <h2 className="text-sm sm:text-base md:text-lg font-semibold leading-snug tracking-wide">
      {slide.title}
    </h2>
  </div>
)}
              </div>
            ))}
          </div>
        </div>

        {/* PREV BUTTON */}
        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full transition"
        >
          ❮
        </button>

        {/* NEXT BUTTON */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % slides.length)
          }
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full transition"
        >
          ❯
        </button>
      </div>

      {/* ========================= */}
      {/* DOTS */}
      {/* ========================= */}
      <div className="flex justify-center flex-wrap gap-2 mt-3">
        {slides.map((_, index) => (
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