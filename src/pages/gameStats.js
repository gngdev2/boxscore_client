import React, { useEffect, useState } from "react";
import BoxscoreMLB from "../components/boxscoreMLB";
import BoxscoreNBA from "../components/boxscoreNBA";

const GameStats = () => {

    return (
        <div>
            <h1>Box Score</h1>
            <BoxscoreMLB />
            <br />
            <BoxscoreNBA />
        </div>
    );
}

export default GameStats;