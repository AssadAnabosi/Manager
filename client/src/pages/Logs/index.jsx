import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../features/Logs/logsSlice";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import Row from "./LogsTableRow";
import "./LogsTable.scss";


const Logs = () => {
    document.title = "Manager - Logs"
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(fetchLogs(queries));
    }, [flag]);

    const response = useSelector((state) => state.logs);

    let titles = ["Days Count:", "Payments Total: ", "OTV Total:"]
    let values = [response.logs.count, response.logs.paymentsSum, response.logs.OTVSum];

    function createRow(log) {
        return (<Row
            key={log._id}
            log={log}
            flag={flag}
            setFlag={setFlag}
            name={log.worker.name}
        />
        );
    }
    
    return (
        <>
            <Containers.Header title="logs" />
            <Containers.Cards titles={titles} values={values} />
            <Containers.Queries
                handleQueriesChange={handleQueriesChange}
                since={queries.since}
                till={queries.till}
                flag={flag}
                setFlag={setFlag} />
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            <div className="table_container">
                <div className="table_header">
                    <div className="main_column">
                        <p>Log</p>
                    </div>
                    <div className="tag_column">
                        <p>Attendance</p>
                    </div>
                    <div className="time_column">
                        <p>Working Time</p>
                    </div>
                    <div className="number_column">
                        <p>Payment</p>
                    </div>
                    <div className="notes_column">
                        <p>Extra Notes</p>
                    </div>
                </div>
                {!response.loading && response.logs.logs && response.logs.logs.length ? (
                    <>
                        {response.logs.logs.map(createRow)}
                    </>
                ) : null}
            </div>
        </>
    );
}

export default Logs;