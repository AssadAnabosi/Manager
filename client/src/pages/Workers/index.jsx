import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./WorkersTableRow";

import { fetchWorkers } from "../../features/Workers/workersSlice";
import * as Components from "../../components";
import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
function Workers() {
    document.title = "Manager - Workers";
    const [queries, setQueries] = useState({
        search: ""
    });
    const handleQueriesChange = ({ currentTarget: input }) => {
        setQueries({ ...queries, [input.name]: input.value });
    };
    const [flag, setFlag] = useState(true);
    const dispatch = useDispatch();
    const response = useSelector((state) => state.workers);
    useEffect(() => {
        dispatch(fetchWorkers(queries));
    }, [queries, flag]);
    function createRow(worker) {
        return (<Row
            key={worker._id}
            worker={worker}
            flag={flag}
            setFlag={setFlag}
        />
        );
    }
    return (
        <>
            <Containers.Header title="workers" />
            <Containers.SearchQuery handleQueriesChange={handleQueriesChange}/>
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            <div className="table_container">
                <div className="table_header">
                    <div className="main_column">
                        <p>Worker</p>
                    </div>
                    <div className="tag_column">
                        <p>Access Level</p>
                    </div>
                    <div className="main_column">
                        <p>Contact Details</p>
                    </div>
                </div>
                {!response.loading && response.workers.length ? (
                    response.workers.map(createRow)
                ) : null}
            </div>
        </>
    );
}

export default Workers;