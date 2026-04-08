import CommitteeMembers from "../components/shared/CommitteeMembers";

export default function Town() {
  return (
    <CommitteeMembers
      title="টাউন ক্লাব"
      head={{
        name: "ক্লাব প্রধান",
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