import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchBills, deleteManyBills } from "../../features/Bills/billsSlice";

import { useTranslation } from "react-i18next";
import { currencyFormatter } from "../../formatters";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "../../utils/date.util";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import Row from "./BillsTableRow";

function Bills() {
    const { t } = useTranslation();
    document.title = "Manager - Bills";
    const [queries, setQueries] = useState({
        since: `${getFirstDayOfCurrentMonth()}`,
        till: `${getLastDayOfCurrentMonth()}`,
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

    let titles = [`${t("sumRange")}`, `${t("sumAllTime")}`, "-"];
    let values = [`${currencyFormatter(response.bills.sum)}`, `${currencyFormatter(response.bills.sumAllTime)}`, "-"];
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
                        <p>{t("date")}</p>
                    </div>
                    <div className="number_column">
                        <p>{t("value")}</p>
                    </div>
                    <div className="notes_column">
                        <p>{t("description")}</p>
                    </div>
                    <div className="notes_column">
                        <p>{t("extraNotes")}</p>
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