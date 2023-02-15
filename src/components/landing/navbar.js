import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image"

export default function Navbar() {
  const navigation = [
    {name: 'Home', link: '/'},
    {name: 'Table', link: '/flowers'},
    {name: 'Map View', link: '/map'}
  ];
  const router = useRouter();

  const isCurrentRoute = (name) => {
    return router.pathname == name;
  };

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-16 lg:p-8 mx-auto lg:justify-between">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                  <Link href="/" className="flex items-center space-x-2 text-2xl font-medium text-emerald-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo.png"
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8"
                      />
                    </span>
                    <span>flow</span>
                  </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                        <a key={index} href={item.link} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-100 dark:focus:bg-gray-800 focus:outline-none dark:focus:bg-trueGray-700">
                          {item.name}
                        </a>
                    ))}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                  <a href={menu.link} className={`inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-100 focus:outline-none dark:focus:bg-gray-800 ${isCurrentRoute(menu.link) ? "active-route" : ""}`}>
                    {menu.name}
                  </a>
              </li>
            ))}
          </ul>
        </div>

      </nav>
    </div>
  );
}
