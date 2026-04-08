import CommitteeMembers from "../components/shared/CommitteeMembers";

export default function Issue() {
  return (
    <CommitteeMembers
      title="ইস্যু বিভাগ"
      head={{
        name: "ইস্যু বিভাগের প্রধান",
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