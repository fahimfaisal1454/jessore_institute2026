import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(null);
  const [subOpen, setSubOpen] = useState(null);
  const [childOpen, setChildOpen] = useState(null);

  const menu = [
    { name: "হোম", path: "/" },

    {
      name: "আমাদের সম্পর্কে",
      dropdown: [
        { name: "পরিচিতি/ইতিহাস", path: "/history" },
        { name: "লক্ষ্য ও উদ্দেশ্য", path: "/mission" },
        {
          name: "প্রাক্তন সভাপতি-সাধারণ সম্পাদক",
          children: [
            { name: "সভাপতি গণের তালিকা", path: "/president-list" },
            { name: "সাধারণ সম্পাদক তালিকা.", path: "/secretary-list" },
          ],
        },
        {
          name: "প্রাক্তন বিভাগীয় সম্পাদক",
          children: [
            { name: "সম্পাদক, লাইব্রেরি বিভাগ", path: "/library" },
            { name: "সম্পাদক, ক্রীড়া সংসদ", path: "/sports" },
            { name: "সম্পাদক, নাট্যকলা সংসদ", path: "/drama" },
            { name: "সম্পাদক, টাউন ক্লাব", path: "/townclub" },
            { name: "সম্পাদক, শিশু চিত্রাঙ্কন কেন্দ্র", path: "/kids" },
          ],
        },
      ],
    },

    {
  name: "কমিটিসমূহ",
  dropdown: [
    {
      name: "পরিচালনা পরিষদ",
      path: "/committee",
    },
    {
      name: "পরিচালনা পরিষদ (প্রাক্তন)",
      path: "/committee-old",
    },
    {
  name: "উপকমিটির তালিকা",
  children: [
    {
      name: "লাইব্রেরি বিভাগ",
      children: [
        { name: "লাইব্রেরি বিভাগ", path: "/library" },
        { name: "লাইব্রেরি বিভাগ – প্রাক্তন", path: "/lib-old" },
      ],
    },
    {
      name: "ক্রীড়া বিভাগ",
      children: [
        { name: "ক্রীড়া বিভাগ", path: "/sports" },
        { name: "ক্রীড়া বিভাগ – প্রাক্তন", path: "/sports-old" },
      ],
    },
    {
      name: "নাট্যকলা সংসদ",
      children: [
        { name: "নাট্যকলা সংসদ", path: "/drama" },
        { name: "নাট্যকলা সংসদ – প্রাক্তন", path: "/drama-old" },
      ],
    },
    {
      name: "টাউন ক্লাব",
      children: [
        { name: "টাউন ক্লাব", path: "/town" },
        { name: "টাউন ক্লাব – প্রাক্তন", path: "/town-old" },
      ],
    },
    {
      name: "ইয়ুথ বিভাগ (সি.আর.সি)",
      children: [
        { name: "ইয়ুথ বিভাগ (সি.আর.সি)", path: "/youth" },
        { name: "ইয়ুথ বিভাগ (সি.আর.সি) – প্রাক্তন", path: "/youth-old" },
      ],
    },
  ],
}
  ],
},

    { name: "যশোরের মধুমালার", path: "/madhumala" },

    {
      name: "গ্যালারি",
      dropdown: [
        { name: "ছবিঘর", path: "/photos" },
        { name: "ভিডিওঘর", path: "/videos" },
      ],
    },

    {
      name: "ফরম",
      dropdown: [
        { name: "সদস্য আবেদন ফরম", path: "/apply" },
        { name: "ছাড়পত্র আবেদন ফরম", path: "/leave" },
      ],
    },

    { name: "নোটিশ", path: "/notice" },
  ];

  return (
    <nav className="bg-[#efefef] border-y">
      <div className="max-w-[1100px] mx-auto flex">

        {menu.map((item, i) => (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => {
              setOpen(null);
              setSubOpen(null);
              setChildOpen(null);
            }}
          >
            {/* Main Menu */}
            {item.path ? (
              <Link
                to={item.path}
                className={`px-5 py-3 block font-medium ${
                  open === i ? "text-green-600" : "text-gray-700"
                } hover:text-green-600`}
              >
                {item.name}
              </Link>
            ) : (
              <div className="px-5 py-3 flex items-center gap-1 cursor-pointer text-gray-700 hover:text-green-600">
                {item.name} <span>▾</span>
              </div>
            )}

            {/* Level 1 */}
            {item.dropdown && open === i && (
              <div className="absolute left-0 top-full bg-white shadow min-w-[240px] z-50">

                {item.dropdown.map((sub, j) => (
                  <div
                    key={j}
                    className="relative"
                    onMouseEnter={() => setSubOpen(j)}
                    onMouseLeave={() => {
                      setSubOpen(null);
                      setChildOpen(null);
                    }}
                  >
                    {sub.path ? (
                      <Link
                        to={sub.path}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {sub.name}
                      </Link>
                    ) : (
                      <div className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {sub.name} <span>›</span>
                      </div>
                    )}

                    {/* Level 2 */}
                    {sub.children && subOpen === j && (
                      <div className="absolute left-full top-0 bg-white shadow min-w-[240px]">

                        {sub.children.map((child, k) => (
                          <div
                            key={k}
                            className="relative"
                            onMouseEnter={() => setChildOpen(k)}
                            onMouseLeave={() => setChildOpen(null)}
                          >
                            {child.path ? (
                              <Link
                                to={child.path}
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {child.name}
                              </Link>
                            ) : (
                              <div className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {child.name} <span>›</span>
                              </div>
                            )}

                            {/* Level 3 */}
                            {child.children && childOpen === k && (
                              <div className="absolute left-full top-0 bg-white shadow min-w-[240px]">
                                {child.children.map((last, x) => (
                                  <Link
                                    key={x}
                                    to={last.path}
                                    className="block px-4 py-2 hover:bg-gray-100"
                                  >
                                    {last.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                      </div>
                    )}
                  </div>
                ))}

              </div>
            )}
          </div>
        ))}

      </div>
    </nav>
  );
}