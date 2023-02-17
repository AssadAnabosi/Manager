import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCheques } from "../../features/Cheques/chequesSlice";

import { useTranslation } from "react-i18next";
import { currencyFormatter } from "../../formatters";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "../../utils/date.util";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import Row from "./ChequesTableRow";

function Cheques() {
    const { t } = useTranslation();
    document.title = "Manager - Cheques";
    const dispatch = useDispatch();
    const [queries, setQueries] = useState({
        since: `${getFirstDayOfCurrentMonth()}`,
        till: `${getLastDayOfCurrentMonth()}`,
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
    let titles = [`${t("total")}`, "-", "-"];
    let values = [`${currencyFormatter(response.cheques.sum)}`, "-", "-"];
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
                        <p>{t("serial")}</p>
                    </div>
                    <div className="main_column">
                        <p>{t("chequeDetails")}</p>
                    </div>
                    <div className="number_column">
                        <p>{t("value")}</p>
                    </div>
                    <div className="notes_column">
                        <p>{t("description")}</p>
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