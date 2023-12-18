import React, { useContext, useState } from 'react';
import { purchasestore } from '../App';
import { productstore } from '../App';
import { useNavigate } from 'react-router-dom';


const Purchase = () => {
  const [value, setValue] = useState(1);
  const [info, setInfo] = useContext(purchasestore);
  const [details, setDetails] = useContext(productstore);
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onSubmit = async (data) => {
    window.alert('food order sent ');
    console.log(data);
    navigate('/myprofile');
  };

  const purchaseData = {
    email: { info },
    hotel: details ? details.hotel : '', // Check if details is not null
    price: value * (details ? details.price : 0), // Check if details is not null
    place: details ? details.place : '', // Check if details is not null
  };

  return (
    <section>
      <div>
        <div className="register">
          <div className="colly1">
            <h2>Purchase</h2>
            <span>Pay for it</span>

            <form id='form' className='flexy flexy-col' onSubmit={onSubmit}>

              {/* form inputs */}
              <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={info} readOnly />
              </div>

              <div className="form-row">
                <label htmlFor="hotel">Hotel:</label>
                <input type="text" id="hotel" value={purchaseData.hotel} readOnly />
              </div>

              <div className="form-row">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="text"
                  id="quantity"
                  value={inputValue}
                  placeholder='enter quantity'
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" value={`${inputValue * purchaseData.price}`} readOnly />
              </div>

              <div className="form-row">
                <label htmlFor="place">Place:</label>
                <input type="text" id="place" value={purchaseData.place} readOnly />
              </div>

              {/* Submit button */}
              <button className='btny' type="submit">Pay</button>

            </form>
          </div>

          <div className="colly2">
            <img src="https://st3.depositphotos.com/1003326/37668/i/450/depositphotos_376685656-stock-photo-happy-woman-cardboard-box-online.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Purchase;
