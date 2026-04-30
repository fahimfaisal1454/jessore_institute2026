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
          গত ২৪ এপ্রিল ২০২৬, শুক্রবার, যশোর ইনস্টিটিউটে আগত সকল সম্মানিত সদস্য ও ভোটারদের প্রতি জানাই আন্তরিক ধন্যবাদ ও গভীর কৃতজ্ঞতা।
        </marquee>

      </div>
    </div>
  );
}