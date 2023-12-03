import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const [penjualan, setPenjualan] = useState([]);

  useEffect(() => {
    getTransaksiDetails();
  }, []);

  const getTransaksiDetails = async () => {
    const response = await axios.get("http://localhost:5000/details");
    setPenjualan(response.data);
  };

  const menuStats = penjualan.reduce((acc, item) => {
    const { menuId, menu, qty, subTotal } = item;
    const { name } = menu;
    console.log("id nya " + name);
  
    if (!acc[menuId]) {
      acc[menuId] = { name, totalQty: 0, totalRevenue: 0 };
    }
  
    acc[menuId].totalQty += qty;
    acc[menuId].totalRevenue += parseFloat(subTotal);
  
    return acc;
  }, {});

  return (
    <Layout>
      <Welcome />
      <div className="container mt-6 ml-2 .container.is-widescreen">
        <div className="is-flex flex-wrap is-flex-direction-row is-justify-content-space-around">
          <div
            className="box is-flex"
            style={{
              width: "350px",
              height: "140px",
              backgroundColor: "orange",
              color: "white",
            }}
          >
            <div className="is-flex is-flex-direction-column">
              <p className="is-size-5 has-text-weight-semibold">
                Pendapatan Kotor
              </p>
              <p className="is-size-3 is-align-self-center">Rp. 1,500,000</p>
            </div>
          </div>
          <div
            className="box is-flex"
            style={{
              width: "350px",
              height: "140px",
              backgroundColor: "rebeccapurple",
              color: "white",
            }}
          >
            <div className="is-flex is-flex-direction-column">
              <p className="is-size-5 has-text-weight-semibold">
                Pending Order
              </p>
              <p className="is-size-3 ">26</p>
            </div>
          </div>
          <div
            className="box is-flex"
            style={{
              width: "350px",
              height: "140px",
              backgroundColor: "dodgerblue",
              color: "white",
            }}
          >
            <div className="is-flex is-flex-direction-column">
              <p className="is-size-5 has-text-weight-semibold">
                Complete Order
              </p>
              <p className="is-size-3">147</p>
            </div>
          </div>
        </div>
        <div>
          <p className="is-size-4 ml-5 mt-5 has-text-weight-bold">
            {" "}
            Ringkasan Penjualan
          </p>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr style={{ backgroundColor:"orange", color: "white" }}>
                <th>No</th>
                <th>Menu</th>
                <th>Menu Terjual</th>
                <th>Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(menuStats).map((menuId, index) => {
                const menu = menuStats[menuId];
                return (
                  <tr key={menuId}>
                    <td>{index + 1}</td>
                    <td>{menu.name}</td>
                    <td>{menu.totalQty}</td>
                    <td>{menu.totalRevenue.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
