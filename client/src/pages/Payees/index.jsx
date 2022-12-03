import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./PayeesTableRow";

import { Link } from "react-router-dom";
import * as Components from "../../components";
import * as Containers from "../../containers";
import { fetchPayees } from "../../features/Payees/payeesSlice";
import Loading from "../../components/Loading";
function Payees() {
    document.title = "Manager - Payees";
    const dispatch = useDispatch();
    const [queries, setQueries] = useState({
        search: ""
    });
    const [flag, setFlag] = useState(true);
    const handleQueriesChange = ({ currentTarget: input }) => {
        setQueries({ ...queries, [input.name]: input.value });
    };
    useEffect(() => {
        dispatch(fetchPayees(queries));
    }, [queries, flag])
    const response = useSelector((state) => state.payees);

    function createRow(payee) {
        return (<Row
            key={payee._id}
            payee={payee}
            flag={flag}
            setFlag={setFlag}
        />
        );
    }

    return (
        <>
            <Containers.Header title="payees" />
            <Containers.SearchQuery handleQueriesChange={handleQueriesChange} />
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            <div className="table_container">
                <div className="table_header">
                    <div className="main_column">
                        <p>Payee</p>
                    </div>
                    <div className="main_column">
                        <p>Contact Details</p>
                    </div>
                    <div className="notes_column">
                        <p>Extra Notes</p>
                    </div>
                </div>
                {!response.loading && response.payees.length ? (

                    response.payees && response.payees.map(createRow)

                ) : null}
            </div>
        </>
    );
}

export default Payees;