import React, { useState } from "react";
import "../styles/personal.css";
import { Button, Col, Input, Row } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployees,
  deleteEmployees,
  editEmployees,
} from "../redux/crudSlice";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const PersonalInfo = ({ OnChangeHandler }) => {
  const [updateId, setUpdateId] = useState(null);
  const [switchUpdateData, setSwitchUpadteData] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.emp);

  // Add Employees or Update Employees
  const handleSubmitPersonal = () => {
    if (!name) {
      toast.error("Name is required");
    } else if (!contact) {
      toast.error("Contact is required");
    } else if (!address) {
      toast.error("Address is required");
    } else if (!pincode) {
      toast.error("Pincode is required");
    } else if (!country) {
      toast.error("Country is required");
    } else {
      if (switchUpdateData) {
        dispatch(
          editEmployees({
            id: updateId,
            name,
            address,
            contact,
            pincode,
            country,
          }),
          setSwitchUpadteData(false),
          setName(""),
          setAddress(""),
          setContact(""),
          setPincode(""),
          setCountry("")
        );
      } else {
        dispatch(
          addEmployees({
            id: v4(),
            name,
            contact,
            address,
            pincode,
            country,
          }),
          setName(""),
          setAddress(""),
          setContact(""),
          setPincode(""),
          setCountry("")
        );
      }
    }
  };

  const handleEdit = (id) => {
    setSwitchUpadteData(true);
    const res = data.find((item) => item.id === id);
    setName(res.name);
    setAddress(res.address);
    setContact(res.contact);
    setPincode(res.pincode);
    setCountry(res.country);
    setUpdateId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployees(id));
  };

  return (
    <div className="personal-main-container">
      <Row className="main-row" >
        <Col span={8}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                value={name}
              />
            </Col>
            <Col span={12}>
              <Input
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                placeholder="Contact"
              />
            </Col>
            <Col span={24}>
              <Input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Address"
                required="s"
              />
            </Col>
            <Col span={12}>
              <Input
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
                placeholder="Pin"
              />
            </Col>
            <Col span={12}>
              <Input
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder="Country"
              />
            </Col>
            <Col span={24}>
              {switchUpdateData ? (
                <Button type="primary" onClick={handleSubmitPersonal}>
                  Upadte Personal Details
                </Button>
              ) : (
                <>
                  <Button type="primary" onClick={handleSubmitPersonal}>
                    Add Personal Details
                  </Button>
                  <Button
                    type="dashed"
                    style={{ marginLeft: "5px" }}
                    onClick={() => OnChangeHandler("Work experience")}
                    icon={<ArrowRightOutlined />}
                    disabled={data.length > 0 ? false : true}
                  >
                    Next
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Col>

        <Col span={8} offset={8}>
          {data.length > 0 ? (
            <>
              {data.map((item, i) => (
                <div className="emp-list" key={item.id}>
                  {item.name}
                  <span>
                    <EditOutlined
                      className="icon-style"
                      onClick={() => handleEdit(item.id)}
                    />
                    <DeleteOutlined
                      className="icon-style"
                      onClick={() => handleDelete(item.id)}
                    />
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="emp-list">No Info available</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfo;
