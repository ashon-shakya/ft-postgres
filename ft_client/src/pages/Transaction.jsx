import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {
  deleteTransactionAPI,
  deleteTransactionsByIdsAPI,
  fetchTransaction,
  postTransaction,
} from "../helpers/axiosHelper";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const Transaction = () => {
  // original transaction data
  const [transactions, setTransactions] = useState([]);
  // display transaction data
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  // search fitler variable
  const [search, setSearch] = useState("");

  // list of ids to delete
  const [idsToDelete, setIdsToDelete] = useState([]);

  //   modal variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // transaction form variable
  const [form, setForm] = useState({
    type: "income",
    title: "",
    tDate: "",
    amount: 0,
  });

  // fetch transaction from api and fill transactions
  const getTransactions = async () => {
    const data = await fetchTransaction();

    if (data.status == "success") {
      setTransactions(data.transactions);
    }
  };

  // update search variable and update filteredtransactions
  const handleOnSearch = (e) => {
    let searchInput = e.target.value;
    setSearch(searchInput);
  };

  // adding new transactions
  // call create transaction api
  // fetch updated transaction
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await postTransaction(form);

    toast[data.status](data.message);

    if (data.status == "success") {
      setShow(false);
      getTransactions();
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // call delete transaction api by id
  const handleOnDelete = async (id) => {
    // call api to delete transaction by id
    const data = await deleteTransactionAPI(id);

    toast[data.status](data.message);

    if (data.status == "success") {
      getTransactions();
    }
  };

  // check and update idstodlete
  const handleOnCheckBox = (e, id) => {
    let updatedIds = [];

    if (e.target.checked) {
      updatedIds = [...idsToDelete, id];
    } else {
      updatedIds = idsToDelete.filter((i) => i != id);
    }

    setIdsToDelete(updatedIds);
  };

  // call bulk delete transaction api
  const handleOnBulkDelete = async () => {
    const data = await deleteTransactionsByIdsAPI(idsToDelete);

    toast[data.status](data.message);

    if (data.status == "success") {
      getTransactions();
      setIdsToDelete([]);
    }
  };

  // fill trasactions by calling api
  useEffect(() => {
    // fetch api call
    getTransactions();
  }, []);

  // fill filteredtransactions when there is change in trasactions and search variable
  useEffect(() => {
    setFilteredTransactions(
      transactions.filter((t) => {
        return t.title.toLowerCase().includes(search);
      })
    );
  }, [transactions, search]);

  return (
    <>
      <div className="wrapper bg-black text-white rounded d-flex justify-content-center flex-column p-4 w-75">
        <div>
          <h2>Transaction</h2>
        </div>
        <hr />
        {/* input */}
        <div className="d-flex gap-4 justify-content-between p-2">
          <span>
            {filteredTransactions.length} no of transactions
            <Form.Check // prettier-ignore
              type="checkbox"
              onClick={(e) => {
                handleOnCheckBox(e, t._id);
              }}
              label="Select All"
            />
            {idsToDelete.length > 0 ? (
              <>
                <Button variant="danger" onClick={handleOnBulkDelete}>
                  <MdDelete />
                  Bulk Delete
                </Button>
              </>
            ) : (
              ""
            )}
          </span>

          <Form.Group className="mb-3" controlId="exampleForm.searchInput">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={handleOnSearch}
              value={search}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleShow}>
            <IoAddCircle />
            Add transaction
          </Button>
        </div>

        {/* table */}
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Title</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        {index + 1}
                        <Form.Check // prettier-ignore
                          type="checkbox"
                          onClick={(e) => {
                            handleOnCheckBox(e, t._id);
                          }}
                          checked={idsToDelete.includes(t._id) ? "checked" : ""}
                        />
                      </td>
                      <td>{t.tDate.split("T")[0]}</td>
                      <td>{t.title}</td>
                      <td className="text-success">
                        {t.type == "income" ? "$" + t.amount : ""}
                      </td>
                      <td className="text-danger">
                        {t.type == "expense" ? "-$" + t.amount : ""}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleOnDelete(t._id);
                          }}
                        >
                          {" "}
                          <MdDelete />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleOnSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transactions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="type"
                value={form.type}
                onChange={handleInputChange}
              >
                <option value="income" selected>
                  Income
                </option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Date"
                name="tDate"
                value={form.tDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                name="amount"
                value={form.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Transaction;
