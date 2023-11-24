import useDocumentTitle from "src/hooks/useDocumentTitle";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

function Home(props) {
	useDocumentTitle(props.title);

	return (
		<>
			<div className="container mx-auto px-2 mb-4 mt-20">
				<div className='w-full text-center text-5xl font-bold mb-4'>
					<h1>Kombet Floris</h1>
				</div>
				<div className='md:px-20 lg:px-40'>
					<HomeCarousel />
				</div>
				<div className="text-4xl font-bold text-center mt-20 mb-5">
					Produk Kami
				</div>
				<div className='justify-center justify-items-center grid xl:grid-cols-4 md:grid-cols-2 md:grid-row-2 grid-row-4 gap-3'>
					<Link to={"/papan-bunga"} className='w-full text-center'>
						<div className='rounded-xl h-[300px] w-[300px] bg-red-200 overflow-hidden border-4 border-red-200'>
							<img className="hover:scale-125 transition duration-500 cursor-pointer" src='https://tokobungamurah.com/wp-content/uploads/2020/12/bunga-papan-selamat-berbahagia-atas-pernikahan-ananda-harga-500-ribu-akuntansi-universitas-andalas-padang.jpg' />
						</div>
						<div className='font-bold'>
							Papan Bunga
						</div>
					</Link>
					<Link to={"/bouquet"} className='w-full text-center'>
						<div className='rounded-xl h-[300px] w-[300px] bg-red-200 overflow-hidden border-4 border-red-200'>
							<img className="hover:scale-125 transition duration-500 cursor-pointer" src='https://www.800flower.ae/cdn/shop/products/summer-floral-original.jpg?v=1695355385' />
						</div>
						<div className='font-bold'>
							Bouquet
						</div>
					</Link>
					<Link to={"/money-cake"} className='w-full text-center'>
						<div className='rounded-xl h-[300px] w-[300px] bg-red-200 overflow-hidden border-4 border-red-200'>
							<img className="hover:scale-125 transition duration-500 cursor-pointer" src="https://ulasan.co/wp-content/uploads/2022/08/Money-Cake.jpg.webp" />
						</div>
						<div className='font-bold'>
							Money Cake
						</div>
					</Link>
					<Link to={"/snack-tower"} className='w-full text-center'>
						<div className='rounded-xl h-[300px] w-[300px] bg-red-200 overflow-hidden border-4 border-red-200'>
							<img className="hover:scale-125 transition duration-500 cursor-pointer" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/10/19/76c70b3b-9790-40bc-a1cb-462f5c8fb187.jpg" />
						</div>
						<div className='font-bold'>
							Snack Tower
						</div>
					</Link>
				</div>
			</div>
			<div className='flex justify-center items-center mt-4 mr-5'>
				<img width={250} height={250} src="data:image/png;base64,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" />
				<div className='w-40 h-40 mr-5'>
					<img src='https://st.depositphotos.com/2398103/3877/v/450/depositphotos_38778467-stock-illustration-secure-payment-label.jpg' />
				</div>
				<div className='w-40 h-40'>
					<img src='https://media.istockphoto.com/id/472372437/id/vektor/ikon-kualitas-terbaik.jpg?s=1024x1024&w=is&k=20&c=KPiYo4v1Xd2M-ZWNuGU_epKD7fUbNBY5ig0WCVc2XoY=' />
				</div>
			</div>
			<div className='bg-red-300 p-10 mt-4'>
				<div className='text-2xl'>
					<h1><b>ABOUT US</b></h1><br/>
					Kombet Floris<br/>
				</div>
				PAPAN BUNGA, BOUQUET, MONEY CAKE, SNACK TOWER BANDAR LAMPUNG <br/>
				📍DIJAMIN HARGA PELAJAR <br/>
				🌹Papan Bunga : Wedding, Graduation, Duka Cita, Opening, dll <br/>
				💐Bouquet : Snack & Money <br/>
				🎂Money Cake <br/>
				   Alamat: JL.Raden Imba Kesuma Ratu, Gang.Sukajadi, Nomor 3 
			</div>
		</>
	);
}

function HomeCarousel() {
	return (
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src="https://cdn.antaranews.com/cache/1200x800/2018/12/B82EB544-CDBC-40C1-8F13-9BA9813F674C.jpeg" />
                </div>
                <div>
                    <img src="https://previews.123rf.com/images/olgaburtseva/olgaburtseva1710/olgaburtseva171000029/89104639-floral-bouquet-for-the-wedding-ceremony-in-transparent-vase-landscape.jpg" />
                </div>
                <div>
                    <img src="https://c4.wallpaperflare.com/wallpaper/1018/445/169/flower-bouquet-wallpaper-preview.jpg" />
                </div>
            </Carousel>
        );
}

export default Home;