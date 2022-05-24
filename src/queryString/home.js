import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
    return(
        <div style={{display: "grid"}}>
        <Link target="_blank" style={{textDecoration: "line-through"}} to="/query-string">
            useSearchParams
        </Link>
        <Link target="_blank" to="/query-string-two">
            URLSearchParams
        </Link>
        <Link target="_blank" to="/query-string-three">
            queryString - library
        </Link>
        <Link target="_blank" to="/query-string-four">
            qs - library
        </Link>
        <a target="_blank" href="https://react-query-filtering-example.vercel.app/">
            React query
        </a>
        </div>
    )
}