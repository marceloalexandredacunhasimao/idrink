import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

function CheckoutAddress({ totalPrice, arrayOfProducts }) {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState({});
  const history = useHistory();

  useEffect(() => {
    const initialUsers = async () => {
      const data = JSON.parse(localStorage.getItem('user'));
      const url = 'http://localhost:3001/user';
      const fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: data.token,
        },
      };
      const response = await fetch(url, fetchOptions);
      const users = await response.json();

      const onlySellers = users.filter(({ role }) => role === 'seller');
      setSellers(onlySellers);
    };
    initialUsers();
  }, []);

  const finishOrder = async () => {
    const data = JSON.parse(localStorage.getItem('user'));
    try {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: data.token,
        },
        body: JSON.stringify({
          sellerId: seller.value,
          totalPrice: Number(totalPrice.replace(',', '.')),
          deliveryAddress: address,
          deliveryNumber: number,
          saleDate: new Date(),
          status: 'Pendente',
          products:
            arrayOfProducts,
        }),
      };
      const response = await fetch('http://localhost:3001/checkout', requestOptions);
      const { id } = await response.json();
      history.push(`/customer/orders/${id}`);
    } catch (err) {
      console.log('error ', err);
    }
  };

  const isNotValidAdress = () => address.length === 0 || number.length === 0;

  return (
    <>
      <h1 className="checkout-title">Detalhes e Endereço para a Entrega</h1>

      <div className="checkout_address-input-btn">
        <div className="checkout_address">
          <label htmlFor="seller" className="label-form">
            P. Vendedor Responsável

            <select
              id="seller"
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => setSeller(target.value) }
            >
              { sellers.map(({ id, name }) => (
                <option value={ id } key={ `sellers-${id}` }>{ name }</option>
              )) }
            </select>
          </label>

          <label htmlFor="address" className="label-form">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              type="text"
              id="address"
              onChange={ ({ target }) => setAddress(target.value) }
            />
          </label>

          <label htmlFor="number" className="label-form">
            Número
            <input
              data-testid="customer_checkout__input-address-number"
              type="number"
              id="number"
              onChange={ ({ target }) => setNumber(target.value) }
            />
          </label>
        </div>

        <Button
          dataTestid="customer_checkout__button-submit-order"
          onClick={ finishOrder }
          className="btn red_button"
          disabled={ isNotValidAdress() }
        >
          Finalizar Pedido
        </Button>
      </div>
    </>
  );
}

CheckoutAddress.propTypes = {
  totalPrice: PropTypes.string.isRequired,
  arrayOfProducts: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
  })).isRequired,
};

export default CheckoutAddress;
