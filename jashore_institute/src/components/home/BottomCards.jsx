import card1 from "../../assets/hotline.png";

export default function BottomCards() {
  return (
    <div className="bg-green-100 p-3 rounded-lg">

      <div className="bg-white rounded-lg shadow p-2">
        <img
          src={card1}
          alt="card"
          className="w-full rounded-md"
        />
      </div>

    </div>
  );
}