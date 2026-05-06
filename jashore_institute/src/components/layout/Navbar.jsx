import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";

export default function Navbar() {
  const [desktopOpen, setDesktopOpen] = useState(null);
  const [desktopSubOpen, setDesktopSubOpen] = useState(null);
  const [desktopChildOpen, setDesktopChildOpen] = useState(null);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});
  const [mobileSubOpen, setMobileSubOpen] = useState({});
  const [mobileChildOpen, setMobileChildOpen] = useState({});

  const toggleMobile = (key, setter, state) => {
    setter({
      ...state,
      [key]: !state[key],
    });
  };

  const menu = [
    { name: "হোম", path: "/" },

    {
      name: "আমাদের সম্পর্কে",
      dropdown: [
        { name: "পরিচিতি/ইতিহাস", path: "/history" },
        { name: "লক্ষ্য ও উদ্দেশ্য", path: "/mission" },
      ],
    },

    {
      name: "কমিটিসমূহ",
      dropdown: [
        { name: "পরিচালনা পরিষদ", path: "/committee" },
        { name: "পরিচালনা পরিষদ (প্রাক্তন)", path: "/committee-old" },
        { name: "সভাপতিবৃন্দের তালিকা", path: "/president-list" },
        { name: "সাধারণ সম্পাদকবৃন্দের তালিকা", path: "/secretary-list" },

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
              name: "ইস্যু বিভাগ",
              children: [
                { name: "ইস্যু বিভাগ", path: "/issue" },
                { name: "ইস্যু বিভাগ – প্রাক্তন", path: "/issue-old" },
              ],
            },
          ],
        },

        {
          name: "প্রাক্তন বিভাগীয় সম্পাদক",
          children: [
            { name: "সম্পাদক, লাইব্রেরি বিভাগ", path: "/library-page" },
            { name: "সম্পাদক, ক্রীড়া সংসদ", path: "/sports-page" },
            { name: "সম্পাদক, নাট্যকলা সংসদ", path: "/drama-page" },
            { name: "সম্পাদক, টাউন ক্লাব", path: "/townclub-page" },
            { name: "সম্পাদক, শিশু চিত্রাঙ্কন কেন্দ্র", path: "/kids-page" },
          ],
        },
      ],
    },

    { name: "যদুনাথ মজুমদার", path: "/jadunathmajumdar" },

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
        { name: "মাঠ বরাদ্ধের আবেদন ফরম", path: "/field-application" },
        { name: "ছুটির আবেদন ফরম", path: "/leave-application" },
      ],
    },

    { name: "নোটিশ", path: "/notice" },
    { name: "প্রকাশনা", path: "/publications" },
    { name: "বিভিন্ন অনুষ্ঠান", path: "/events" },
  ];

  return (
    <nav
      className="bg-green-700 border-y w-full relative z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center px-4 py-3">
          <Link
            to="/"
            className="text-white text-2xl hover:text-green-200 transition"
          >
            <FiHome />
          </Link>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-white text-2xl"
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t shadow-md max-h-[80vh] overflow-y-auto">
            {menu.map((item, i) => (
              <div key={i} className="border-b">
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 text-sm font-medium hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        toggleMobile(i, setMobileOpen, mobileOpen)
                      }
                      className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium hover:bg-gray-100"
                    >
                      {item.name}
                      <FiChevronDown
                        className={`transition ${
                          mobileOpen[i] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileOpen[i] &&
                      item.dropdown?.map((sub, j) => (
                        <div key={j} className="bg-gray-50 border-t">
                          {sub.path ? (
                            <Link
                              to={sub.path}
                              onClick={() => setMobileMenu(false)}
                              className="block px-8 py-2 text-sm hover:bg-gray-100"
                            >
                              {sub.name}
                            </Link>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  toggleMobile(
                                    `${i}-${j}`,
                                    setMobileSubOpen,
                                    mobileSubOpen
                                  )
                                }
                                className="w-full flex justify-between px-8 py-2 text-sm hover:bg-gray-100"
                              >
                                {sub.name}
                                <FiChevronRight />
                              </button>

                              {mobileSubOpen[`${i}-${j}`] &&
                                sub.children?.map((child, k) => (
                                  <div key={k} className="bg-gray-100">
                                    {child.path ? (
                                      <Link
                                        to={child.path}
                                        onClick={() => setMobileMenu(false)}
                                        className="block px-12 py-2 text-sm hover:bg-gray-200"
                                      >
                                        {child.name}
                                      </Link>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() =>
                                            toggleMobile(
                                              `${i}-${j}-${k}`,
                                              setMobileChildOpen,
                                              mobileChildOpen
                                            )
                                          }
                                          className="w-full flex justify-between px-12 py-2 text-sm hover:bg-gray-200"
                                        >
                                          {child.name}
                                          <FiChevronRight />
                                        </button>

                                        {mobileChildOpen[
                                          `${i}-${j}-${k}`
                                        ] &&
                                          child.children?.map((last, x) => (
                                            <Link
                                              key={x}
                                              to={last.path}
                                              onClick={() =>
                                                setMobileMenu(false)
                                              }
                                              className="block px-16 py-2 text-sm hover:bg-gray-300"
                                            >
                                              {last.name}
                                            </Link>
                                          ))}
                                      </>
                                    )}
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex flex-wrap text-sm font-semibold">
          {menu.map((item, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setDesktopOpen(i)}
              onMouseLeave={() => {
                setDesktopOpen(null);
                setDesktopSubOpen(null);
                setDesktopChildOpen(null);
              }}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className="px-4 xl:px-5 py-3 block text-white hover:text-green-300 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ) : (
                <div className="px-4 xl:px-5 py-3 flex items-center gap-1 cursor-pointer text-white hover:text-green-300 whitespace-nowrap">
                  {item.name}
                  <FiChevronDown size={14} />
                </div>
              )}

              {item.dropdown && desktopOpen === i && (
                <div className="absolute left-0 top-full bg-white shadow-lg min-w-[260px] z-50">
                  {item.dropdown.map((sub, j) => (
                    <div
                      key={j}
                      className="relative"
                      onMouseEnter={() => setDesktopSubOpen(j)}
                    >
                      {sub.path ? (
                        <Link
                          to={sub.path}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          {sub.name}
                        </Link>
                      ) : (
                        <div className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                          {sub.name}
                          <FiChevronRight />
                        </div>
                      )}

                      {sub.children && desktopSubOpen === j && (
                        <div className="absolute left-full top-0 bg-white shadow-lg min-w-[260px]">
                          {sub.children.map((child, k) => (
                            <div
                              key={k}
                              className="relative"
                              onMouseEnter={() => setDesktopChildOpen(k)}
                            >
                              {child.path ? (
                                <Link
                                  to={child.path}
                                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                  {child.name}
                                </Link>
                              ) : (
                                <div className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                                  {child.name}
                                  <FiChevronRight />
                                </div>
                              )}

                              {child.children &&
                                desktopChildOpen === k && (
                                  <div className="absolute left-full top-0 bg-white shadow-lg min-w-[260px]">
                                    {child.children.map((last, x) => (
                                      <Link
                                        key={x}
                                        to={last.path}
                                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
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
      </div>
    </nav>
  );
}