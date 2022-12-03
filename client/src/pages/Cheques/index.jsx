import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./ChequesTableRow";
import { fetchCheques } from "../../features/Cheques/chequesSlice";
import * as Containers from "../../containers";
import Loading from "../../components/Loading";
function Cheques() {
    document.title = "Manager - Cheques";
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
        dispatch(fetchCheques(queries));
    }, [flag])

    const response = useSelector((state) => state.cheques);

    function createRow(cheque) {
        return (<Row
            key={cheque._id}
            cheque={cheque}
            flag={flag}
            setFlag={setFlag}
            name={cheque.payee[0]?.name || "Deleted Payee"}
        />
        );
    }
    let titles = ["Total:", "-", "-"];
    let values = [`₪${response.cheques.sum}`, "-", "-"];
    console.log(response.cheques.cheques)
    return (
        <>
            <Containers.Header title="cheques" />
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
                    <div className="number_column">
                        <p>Serial</p>
                    </div>
                    <div className="main_column">
                        <p>Cheque Details</p>
                    </div>
                    <div className="number_column">
                        <p>Value</p>
                    </div>
                    <div className="notes_column">
                        <p>Description</p>
                    </div>
                </div>
                {!response.loading && response.cheques.cheques && response.cheques.cheques.length ? (
                    <>
                        {response.cheques.cheques.map(createRow)}
                    </>
                ) : null}
            </div>
        </>
    );
}

export default Cheques;