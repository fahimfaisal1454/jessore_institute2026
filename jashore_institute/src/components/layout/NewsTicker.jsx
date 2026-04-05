export default function NewsTicker() {
  return (
    <div className="bg-gray-200 border-b border-gray-400">
      <div className="max-w-[1100px] mx-auto flex items-center px-3 py-1 text-sm">
        
        {/* Label */}
        <span className="font-semibold mr-2">
          বিজ্ঞপ্তিঃ
        </span>

        {/* Scrolling text */}
        <marquee behavior="scroll" direction="left" scrollamount="4">
          ধন্য থেকে আপনাদের সকল তথ্য যশোর ইনস্টিটিউট ওয়েবসাইট থেকে দেখতে পারবেন। (আপডেট চলমান)
        </marquee>

      </div>
    </div>
  );
}