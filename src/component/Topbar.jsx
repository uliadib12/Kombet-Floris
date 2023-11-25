import { Link, useLocation } from 'react-router-dom';
import { RiAccountBoxLine } from 'react-icons/ri';
import { RiLogoutBoxLine } from 'react-icons/ri';

import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from 'firebase/auth';

function Topbar() {
	const location = useLocation();
	const user = useSelector(state => state.auth.user);
	const navigate = useNavigate();

	const auth = getAuth();

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
					{/* <Link to={'/about'} className={location.pathname === '/about' ? 'hover:text-red-400 font-bold' : 'hover:text-red-400'}>
						About Us
					</Link> */}
				</div>
				{/*
				<div className="flex justify-center grow gap-3 md:hidden">
					<div>
						Kategori
					</div>
				</div>
				 */}
				<div className='grow md:hidden'>
				</div>
				{user ?
				<div className="flex justify-center items-center gap-3">
					<div>
						{user.email}
					</div>
					<div>
						<RiAccountBoxLine size={24}/>
					</div>
					<div>
						<RiLogoutBoxLine className="hover:text-red-500 cursor-pointer" size={24} onClick={()=>{
							signOut(auth).then(() => {
								navigate('/');
							})
						}}/>
					</div>
				</div>
				:
				<div className="flex justify-center items-center gap-3">
					<Link className="hover:text-red-400" to={'/auth'}>
						Login
					</Link>
				</div>
				}
			</div>
		</div>
	);
}

export default Topbar;