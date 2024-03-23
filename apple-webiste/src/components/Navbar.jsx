import { navLists } from "../constants"
import { appleImg, bagImg, searchImg } from "../utils"

const Navbar = () => {
    return (
        <header className="w-full py-5 sm:px-10 px-5">
            <nav className="flex w-full screen-max-width justify-between">
                <img src={appleImg} alt="apple icon" width={14} height={18}/>
                <div className="flex flex-1 justify-center max-sm:hidden items-center">
                    {navLists.map(nav => (
                        <div key={nav} className="px-5 text-sm text-gray cursor-pointer hover:text-white transition-all">
                            {nav}
                        </div>
                    ))}
                </div>
                <div className="flex gap-7 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} alt="search" width={18} height={18}/>
                    <img src={bagImg} alt="bag" width={18} height={18}/>
                </div>
            </nav>
        </header>
    )
}
export default Navbar