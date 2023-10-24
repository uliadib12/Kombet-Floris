import { Link, useLocation } from 'react-router-dom';
import { RiAccountBoxLine } from 'react-icons/ri';

function Topbar() {
	const location = useLocation();

	return (
		<div className="bg-red-200 border-b-2 border-red-800 fixed top-0 w-full z-50">
			<div className="container px-4 py-3 sm:mx-auto flex">
				<Link to={'/'}>
					Logo
				</Link>
				<div className="flex justify-center grow gap-3 lg:gap-12 hidden md:flex">
					<Link to={'/'} className={location.pathname === '/' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						Home
					</Link>
					<Link to={'/papan-bunga'} className={location.pathname === '/papan-bunga' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						Papan Bunga
					</Link>
					<Link to={'/bouquet'} className={location.pathname === '/bouquet' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						Bouquet
					</Link>
					<Link to={'/money-cake'} className={location.pathname === '/money-cake' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						Money Cake
					</Link>
					<Link to={'/snack-tower'} className={location.pathname === '/snack-tower' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						Snack Tower
					</Link>
					<Link to={'/about'} className={location.pathname === '/about' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						About Us
					</Link>
				</div>
				<div className="flex justify-center grow gap-3 md:hidden">
					<div>
						Kategori
					</div>
				</div>
				<Link to={'/auth'} className='flex'>
				   <RiAccountBoxLine size={25} className='hover:text-red-400' />
				</Link>
			</div>
		</div>
	);
}

export default Topbar;