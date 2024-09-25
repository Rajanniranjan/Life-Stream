import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

 // donor par click karne par proper record aayege
    // kon kon donor hai
    
const Donar = () => {
  const [data, setData] = useState([]);
  //find donar records
  const getDonars = async () => {
    try {// get-donors route from inventoryRoutes
      const { data } = await API.get("/inventory/get-donars");
      //  console.log(data);
      // data milta hai and success res milta tal setData
      if (data?.success) {
        setData(data?.donars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // call fun 
  useEffect(() => {
    getDonars();
  }, []);
  
// table show 
  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              {/* moment have many fun use for data show */}
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
   
  );
};

export default Donar;
