import { Link, useLocation } from 'react-router-dom';
import { RiAccountBoxLine } from 'react-icons/ri';

function Topbar() {
	const location = useLocation();

	return (
		<div className="bg-red-200 border-b-4 border-red-300">
			<div className="container px-4 py-3 sm:mx-auto flex">
				<Link to={'/'}>
					Logo
				</Link>
				<div className="flex justify-center grow gap-5 hidden md:flex">
					<Link to={'/'} className={location.pathname === '/' ? 'font-bold' : ''}>
						Home
					</Link>
					<Link to={'/papan-bunga'} className={location.pathname === '/papan-bunga' ? 'font-bold' : ''}>
						Papan Bunga
					</Link>
					<Link to={'/bouquet'} className={location.pathname === '/bouquet' ? 'font-bold' : ''}>
						Bouquet
					</Link>
					<Link to={'/money-cake'} className={location.pathname === '/money-cake' ? 'font-bold' : ''}>
						Money Cake
					</Link>
					<Link to={'/snack-tower'} className={location.pathname === '/snack-tower' ? 'font-bold' : ''}>
						Snack Tower
					</Link>
					<Link to={'/about'} className={location.pathname === '/about' ? 'font-bold' : ''}>
						About
					</Link>
				</div>
				<div className="flex justify-center grow gap-3 md:hidden">
					<div>
						Kategori
					</div>
				</div>
				<Link to={'/auth'} className='flex'>
				   <RiAccountBoxLine size={25} />
				</Link>
			</div>
		</div>
	);
}

export default Topbar;