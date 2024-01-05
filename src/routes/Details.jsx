import { useEffect, useState } from 'react';
import '../assets/details.css';
import { useLocation } from 'react-router-dom';

function Details({ location }) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flowerBoardFormat, setFlowerBoardFormat] = useState('');
  const { state } = useLocation();
  const { nama, deskripsi, gambar, harga, ukuran } = state;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFormatChange = (e) => {
    setFlowerBoardFormat(e.target.value);
  };

  return (
    <>
      <div className="Body">
        <h1>{state.nama}</h1>

        <div className="wrap">
          <div className="left-wrap">
            <img src={state.gambar} alt="" srcset="" />
            <p className="py-4">{state.deskripsi}</p>
          </div>
          <div className="right-wrap">
            <p>
              Ukuran : <span> {state.ukuran}</span>
            </p>

            <div className="customer-details">
              <div className="detail-form">
                <label htmlFor="customerName">Nama Pemesan :</label>
                <input type="text" id="customerName" value={customerName} onChange={handleNameChange} />
              </div>

              <div className="detail-form">
                <label htmlFor="phoneNumber">No Telpon :</label>
                <input type="tel" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
              </div>

              <div className="detail-form">
                <label htmlFor="flowerBoardFormat">Format Papan Bunga :</label>
                <input type="text" id="flowerBoardFormat" value={flowerBoardFormat} onChange={handleFormatChange} />
              </div>
            </div>

            <div className="quantity-section">
              <button className="quantity-button" onClick={handleDecrement}>
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button className="quantity-button" onClick={handleIncrement}>
                +
              </button>
            </div>

            <div className="bottom">
              <h2>Rp. {state.harga}</h2>
              <button className="hover:bg-red-500 bg-red-400 text-white rounded-md px-4 py-2 mt-4 font-semibold">Pesan Sekarang</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
