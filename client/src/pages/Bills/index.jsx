import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "./BillsTableRow";

import { fetchBills, deleteManyBills } from "../../features/Bills/billsSlice";
import * as Containers from "../../containers";

import Loading from "../../components/Loading";

function Bills() {
    document.title = "Manager - Bills";
    const today = new Date();
    const [queries, setQueries] = useState({
        since: `${today.getFullYear()}-${today.getMonth() + 1}-01`,
        till: `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate()}`,
        search: ""
    });
    const [flag, setFlag] = useState(true);
    const handleQueriesChange = ({ currentTarget: input }) => {
        setQueries({ ...queries, [input.name]: input.value });
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBills(queries));
    }, [flag])

    const response = useSelector((state) => state.bills);

    function createRow(bill) {
        return (<Row
            key={bill._id}
            bill={bill}
            flag={flag}
            setFlag={setFlag}
        />
        );
    }

    const handleDelete = () => {
        dispatch(deleteManyBills(queries));
        setFlag(!flag);
    }

    let titles = ["Sum of Range", "Sum of all Time", "-"];
    let values = [`₪${response.bills.sum}`, `₪${response.bills.sumAllTime}`, "-"];
    return (
        <>
            <Containers.Header title="bills" />
            <Containers.Cards titles={titles} values={values} />
            <Containers.DateQuery
                handleQueriesChange={handleQueriesChange}
                since={queries.since}
                till={queries.till}
                flag={flag}
                setFlag={setFlag}
                handleDelete={handleDelete} />
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            <div className="table_container">
                <div className="table_header">
                    <div className="main_column">
                        <p>Date</p>
                    </div>
                    <div className="number_column">
                        <p>Value</p>
                    </div>
                    <div className="notes_column">
                        <p>Description</p>
                    </div>
                    <div className="notes_column">
                        <p>Extra Notes</p>
                    </div>
                </div>
                {!response.loading && response.bills.bills && response.bills.bills.length ? (
                    <>
                        {response.bills.bills.map(createRow)}
                    </>
                ) : null}
            </div>
        </>
    );
}

export default Bills;