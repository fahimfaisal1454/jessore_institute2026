import CommitteeMembers from "../components/shared/CommitteeMembers";

export default function Library() {
  return (
    <CommitteeMembers
      title="লাইব্রেরি বিভাগ"
      head={{
        name: "লাইব্রেরি প্রধান",
        role: "সভাপতি",
        img: "/president.jpg",
      }}
      members={[
        { name: "সদস্য ১", role: "সদস্য", img: "/p1.jpg" },
        { name: "সদস্য ২", role: "সদস্য", img: "/p2.jpg" },
      ]}
    />
  );
}