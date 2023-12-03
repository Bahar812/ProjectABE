import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {IoAdd, IoPencil } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { update } from "../features/transaksiSlice";



const OrderList = () => {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { pesanan, total } = useSelector(
      (state) => state.transaction
    );

    useEffect(() => {
      const resetUpdate = async() =>{
        await dispatch(update({ deliveryOption: "", totalfix: 0}));
      }
      resetUpdate();
      console.log(pesanan, total)
      getOrders();
    }, []);

    const createTransaction = async () => {
      try {
        await axios.post('http://localhost:5000/transactions', {
          statusPembayaran : "pending",
          tipePesanan: "Take Away",
          total: 0.00,
          tokenPembayaran: "bfcyuwvfyhuwhuajhefhbwe",
          tipePembayaran : "Cash",
          userType: "cashier",
          receivedAmount : 0,
          changeAmount : 0
        });
        console.log('Transaction created successfully');
      } catch (error) {
        console.error('Error creating transaction:', error.message);
      }
    };

    const handleClick = () =>{
      createTransaction();
      navigate("/orders/add");
    }
      
    
    const getOrders = async () => {
      const response = await axios.get("http://localhost:5000/transactions");
      setOrder(response.data);
    };
  return (
    <div>
       <h1 className="title">Order</h1>
      <h2 className="subtitle">Order List</h2>
      <div className="container is-flex is-justify-content-end">
      <button to="/orders/add" className="button is-primary mb-3 mr-4 " onClick={handleClick}> <IoAdd className="mr-3"/>Add New</button>
      </div>
      
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr style={{ backgroundColor:"orange", color: "white" }}>
            <th>No</th>
            <th>Tanggal & Waktu</th>
            <th>Order ID</th>
            <th>Pesanan</th>
            <th>Pembayaran</th>
            <th>Status</th>
            <th>Total</th>
            <th>User Type</th>
            <th>Email</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order, index) => (
            <tr key={order.uuid}>
              <td>{index + 1}</td>
              <td>{order.tanggal.toLocaleString()}</td>
              <td>{order.uuid}</td>
              <td>{order.tipePesanan}</td>
              <td>{order.tipePembayaran}</td>
              <td>{order.statusPembayaran}</td>
              <td>Rp.{order.total}</td>
              <td>{order.userType}</td>
              <td>{order.user.email}</td>
              <td>
                <Link to={`/orders/edit/${order.uuid}`} className="button is-small is-info"><IoPencil className="mr-2"/> Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList;
