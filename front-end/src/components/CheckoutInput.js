import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from './Button';

export default function CheckoutInput() {
//  const history = useHistory();
  const [userData, setUserData] = useState([]);

  function initialData() {
    const data = localStorage.getItem('user');
    setUserData(JSON.parse(data));
  }

  useEffect(() => {
    initialData();
  }, []);

  function removeProduct(index) {
    userData.cart.splice(index, 1);
    setUserData({ ...userData });
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function totalPrice(list) {
    if (list.length === 0) return '0,00';
    return list.reduce((acc, { price, quantity }) => (
      Number(acc) + quantity * Number(price)).toFixed(2), 0)
      .replace(/\./, ',');
  }

  if (userData.length === 0) return '';

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.cart.map(({ name, quantity, price }, index) => (
              <tr key={ `cartIens_${index}` }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { price.replace(/\./, ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { (quantity * price).toFixed(2).replace(/\./, ',') }
                </td>
                <td>
                  <Button
                    onClick={ () => removeProduct(index) }
                    dataTestid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p>
        Total: R$
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { totalPrice(userData.cart) }
        </span>
      </p>
    </>
  );
}