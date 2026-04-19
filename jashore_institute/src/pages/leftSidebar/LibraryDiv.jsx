import DivisionPage from "../../components/shared/DivisionPage";
// import libraryImg from "../../assets/library.jpg";

export default function LibraryDiv() {
  return (
    <DivisionPage
      title="যশোর ইনস্টিটিউট লাইব্রেরি বিভাগের ইতিহাস"
      author="রিপন রায়"
      // image={libraryImg}
      content={[
        "লাইব্রেরি যশোর ইনস্টিটিউটের একটি গুরুত্বপূর্ণ অংশ...",
        "এখানে হাজার হাজার বই সংরক্ষিত আছে...",
      ]}
    />
  );
}