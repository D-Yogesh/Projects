import logo from '../assets/logo.avif'

const Header = () => {
    return (
        <nav className='navbar bg-light mb-4'>
            <a className='navbar-brand' href='/'>
                <div className="container d-flex">
                    <img src={logo} alt='logo' width='32px' height='32px' ></img>
                    <div>Project Management</div>
                </div>
            </a>
        </nav>
    )
}

export default Header;