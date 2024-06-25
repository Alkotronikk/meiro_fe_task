import {Link, NavLink} from "react-router-dom";

export default function Header() {
  const navLinkClassName = "px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75";

  return (
    <nav
      className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-br from-primary to-secondary">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            to="/"
          >
            <img className="w-auto h-6 sm:h-10 filter grayscale brightness-200"
                 src="https://www.meiro.io/Meiro-2022.svg" alt="Meiro Logo"/>
          </Link>
        </div>
        <div className="lg:flex flex-grow items-center flex">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <NavLink
                to="/attributes"
                // className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                className={({isActive, isPending, isTransitioning}) =>
                  [
                    isPending ? `${navLinkClassName} pending` : navLinkClassName,
                    isActive ? `${navLinkClassName} underline` : navLinkClassName,
                    isTransitioning ? `${navLinkClassName} transitioning` : navLinkClassName,
                  ].join(" ")
                }
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span
                className="ml-2">Attributes</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}