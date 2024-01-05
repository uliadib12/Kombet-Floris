import { useEffect, useState } from 'react';
import useDocumentTitle from 'src/hooks/useDocumentTitle';

import { SyncLoader } from 'react-spinners';

import { getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { LuShoppingCart } from 'react-icons/lu';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useNavigate } from 'react-router-dom';

async function getData(produkKategori) {
  const app = getApp();
  const db = getFirestore(app);
  const storage = getStorage(app);

  let data = [];

  const kategori = [];
  const kategoriRef = collection(db, produkKategori);
  const kategoriSnap = await getDocs(kategoriRef);

  kategoriSnap.forEach((doc) => {
    kategori.push(doc.id);
  });
  const kategoriProdukPromises = kategori.map((kategori) => {
    return getDoc(doc(db, produkKategori, kategori));
  });
  const kategoriProdukSnap = await Promise.all(kategoriProdukPromises);

  let produkPromises = [];
  kategoriProdukSnap.forEach((doc) => {
    const produkRefs = doc.data().produk;
    produkPromises = produkPromises.concat(
      produkRefs.map((produkRef) => {
        return getDoc(produkRef);
      })
    );
  });
  const produkSnap = await Promise.all(produkPromises);

  let produkData = [];

  produkSnap.forEach((produk) => {
    produkData.push({
      id: produk.id,
      ...produk.data(),
    });
  });

  for (let i = 0; i < kategori.length; i++) {
    data[i] = {
      kategori: kategori[i],
      produk: produkData,
    };
  }

  return data;
}

async function getImage(data) {
  const app = getApp();
  const storage = getStorage(app);

  const imagePromises = data.map((item) => {
    return item.produk.map((produk) => {
      const imageRef = ref(storage, produk.gambar);
      return getDownloadURL(imageRef);
    });
  });

  const imageUrls = await Promise.all(imagePromises);
  const imageUrlsPromises = imageUrls.map((item) => {
    return Promise.all(item);
  });

  const imageUrlsData = await Promise.all(imageUrlsPromises);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].produk.length; j++) {
      data[i].produk[j].gambar = imageUrlsData[i][j];
    }
  }

  return data;
}

function ProdukKategori(props) {
  useDocumentTitle(props.title);
  const [data, setData] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setImageLoading(true);
    setData([]);
    let data = getData(props.path);
    data
      .then((data) => {
        setData(data);
        let image = getImage(data);
        image.then((datas) => {
          setData(datas);
          setImageLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.title]);

  return (
    <>
      {data.length === 0 ? (
        <div className="w-full h-screen flex justify-center items-center">
          <SyncLoader color="#fecaca" />
        </div>
      ) : (
        <div className="container mt-20 mx-auto ">
          <h1 className="text-center text-4xl font-bold mb-4">{props.title}</h1>
          {data.map((item, index) => (
            <div id={item.kategori} key={index} className="mb-4">
              {item.kategori === 'null' ? (
                <div className="mb-10"></div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{item.kategori}</h2>
                  <div className="w-full h-1 bg-gray-300 my-2"></div>
                </>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {item.produk.map((produk, index) => (
                  <div id={produk.id} key={index} className="border-dashed border-2 border-red-100 rounded-2xl overflow-hidden">
                    {imageLoading ? (
                      <Skeleton className="w-full h-64" />
                    ) : (
                      <div className="w-full h-64 bg-gray-300 flex justify-center">
                        <img src={produk.gambar} alt={produk.nama} className="object-cover h-full" />
                      </div>
                    )}
                    <div className="p-2">
                      <div className="text-center text-xl font-bold my-2">{produk.nama}</div>
                      {produk.deskripsi && <div className="text-center">{produk.deskripsi}</div>}
                      {produk.ukuran && <div className="text-center">Ukuran: {produk.ukuran}</div>}
                      <div className="text-center text-xl font-bold my-2">Rp. {produk.harga}</div>
                      <div className="w-full mb-4 flex justify-center">
                        {imageLoading == false && (
                          <button
                            onClick={() => {
                              navigate('/details', { state: { nama: produk.nama, harga: produk.harga, deskripsi: produk.deskripsi, ukuran: produk.ukuran, gambar: produk.gambar } });
                            }}
                            className={'hover:bg-red-500 bg-red-400 text-white rounded-md px-4 py-2 mt-4 font-semibold'}
                          >
                            <LuShoppingCart className="inline-block mr-2" size={24} /> Pesan
                          </button>
                        )}
                        {/* Keranjang */}
                        {/* <button className="bg-red-400 text-white rounded-md px-4 py-2 mt-4 ml-2">
                                                Keranjang
                                            </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProdukKategori;
