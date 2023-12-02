import { useEffect, useState } from "react";
import useDocumentTitle from "src/hooks/useDocumentTitle";

import { SyncLoader } from "react-spinners";

import { getApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { LuShoppingCart } from "react-icons/lu";

async function getData(produkKategori) {
    const app = getApp();
    const db = getFirestore(app);
    const storage = getStorage(app);

    let data = [{}];

    const kategori = [];

    const kategoriRef = collection(db, produkKategori);
    const kategoriSnap = await getDocs(kategoriRef);
    
    kategoriSnap.forEach((doc) => {
        kategori.push(doc.id);
    });

    // loop through every kategori
    for (let i = 0; i < kategori.length; i++) {
        const kategoriRef = doc(db, produkKategori, kategori[i]);
        const kategoriSnap = await getDoc(kategoriRef);

        if (kategoriSnap.exists()) {
            const produkRefs = kategoriSnap.data().produk;

            const produkPromises = produkRefs.map((produkRef) => {
                return getDoc(produkRef);
            });

            const produkSnap = await Promise.all(produkPromises);
            const produkData = produkSnap.map((produkDoc) => {
                return produkDoc.data();
            });

            data[i] = {
                kategori: kategori[i],
                produk: produkData,
            };
        } else {
            console.log("No such document!");
        }
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].produk.length; j++) {
            const imageRef = ref(storage, data[i].produk[j].gambar);
            const imageUrl = await getDownloadURL(imageRef);
            data[i].produk[j].gambar = imageUrl;
        }
    }

    return data;
}

function ProdukKategori(props){
    useDocumentTitle(props.title);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([]);
        getData(props.path).then((data) => {
            setData(data);
        });
    }, [props.title]);

    return (
    <>
        { data.length === 0 ?
        <div className="w-full h-screen flex justify-center items-center">
                <SyncLoader color="#fecaca" />
        </div>
        :
        <div className="container mt-20 mx-auto ">
            <h1 className="text-center text-4xl font-bold mb-4">
                {props.title}
            </h1>
            {
                data.map((item, index) => 
                    <div id={item.kategori} key={index} className="mb-4">
                        <h2 className="text-2xl font-bold">
                            {item.kategori}
                        </h2>
                        <div className="w-full h-1 bg-gray-300 my-2"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {item.produk.map((produk, index) => 
                                <div key={index} className="border-dashed border-2 border-red-100 rounded-2xl overflow-hidden">
                                    <div className="w-full h-64 bg-gray-300 flex justify-center">
                                        <img src={produk.gambar} alt={produk.nama} className="object-cover h-full"/>
                                    </div>
                                    <div className="p-2">
                                        <div className="text-center text-xl font-bold my-2">
                                            {produk.nama}
                                        </div>
                                        <div className="text-center">
                                            {produk.deskripsi}
                                        </div>
                                        <div className="text-center">
                                            Ukuran: {produk.ukuran}
                                        </div>
                                        <div className="text-center text-xl font-bold my-2">
                                            Rp. {produk.harga}
                                        </div>
                                        <div className="w-full mb-4 flex justify-center">
                                            <button className="hover:bg-red-500 bg-red-400 text-white rounded-md px-4 py-2 mt-4 font-semibold">
                                                <LuShoppingCart className="inline-block mr-2" size={24} /> Pesan
                                            </button>
                                            {/* Keranjang */}
                                            {/* <button className="bg-red-400 text-white rounded-md px-4 py-2 mt-4 ml-2">
                                                Keranjang
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
            
        </div>}
    </>
    )
}

export default ProdukKategori;