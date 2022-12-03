import React from "react"
import "./Cards.scss";

const Cards = (props) => {
    const titles = props.titles || ["-", "-", "-"]
    const values = props.values || ["-", "-", "-"]
    return (
        <>
            <section className="cards_container">
                {titles[0] !== "-" &&
                    <div className="card">
                        <p className="title">
                            {titles[0]}
                        </p>
                        <p className="value">
                            {values[0]}
                        </p>
                    </div>
                }
                {titles[1] !== "-" &&
                    <div className="card">
                        <p className="title">
                            {titles[1]}
                        </p>
                        <p className="value">
                            {values[1]}
                        </p>
                    </div>
                }
                {titles[2] !== "-" &&
                    <div className="card">
                        <p className="title">
                            {titles[2]}
                        </p>
                        <p className="value">
                            {values[2]}
                        </p>
                    </div>
                }
            </section>
        </>
    )
}

export default Cards;
