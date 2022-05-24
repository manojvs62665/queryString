import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import qs from "qs";

export default function App() {
    const history = useHistory();
    const carList = [
        {
            name: "BMW M6",
            url:
                "https://mediapool.bmwgroup.com/cache/P9/201411/P90169551/P90169551-the-new-bmw-m6-coup-exterior-12-2014-600px.jpg",
            release_year: 2020
        },
        {
            name: "VW Polo",
            url:
                "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
            release_year: 2018
        },
        {
            name: "Audi S6",
            url:
                "https://www.motortrend.com/uploads/sites/5/2020/03/6-2020-audi-s6.jpg?fit=around%7C875:492.1875",
            release_year: 2020
        },
        {
            name: "BMW M2",
            url:
                "https://imgd.aeplcdn.com/0x0/cw/ec/37092/BMW-M2-Exterior-141054.jpg?wm=0",
            release_year: 2019
        },
        {
            name: "Audi A3",
            url: "https://cdn.motor1.com/images/mgl/BEooZ/s3/2021-audi-s3.jpg",
            release_year: 2019
        }
    ];
    const [filteredList, setFilteredList] = useState(carList);
    const [selectedBrand, setSelectedBrand] = useState(queryString.parse(history.location.search).brand);
    const [selectedYear, setSelectedYear] = useState(queryString.parse(history.location.search).year);

    const filterByBrand = (filteredData) => {
        if (!selectedBrand) {
            return filteredData;
        }

        const filteredCars = filteredData.filter(
            (car) => car.name.split(" ").indexOf(selectedBrand) !== -1
        );
        return filteredCars;
    };
    const filterByYear = (filteredData) => {
        if (!selectedYear) {
            return filteredData;
        }

        const filteredCars = filteredData.filter(
            (car) => car.release_year.toString() === selectedYear
        );
        return filteredCars;
    };

    const handleYearChange = (event) => {
        console.log("event", event.target.id)
        if (event.target.id === "brand-input") {
            setSelectedBrand(event.target.value);
        } else {
            setSelectedYear(event.target.value);
        }
    };

    useEffect(() => {
        var filteredData = filterByBrand(carList);
        filteredData = filterByYear(filteredData);
        setFilteredList(filteredData);
        const x = {
            brand: selectedBrand === "All" ? "" : selectedBrand, 
            year: selectedYear === "All" ? "" : selectedYear
        }
        let params = new URLSearchParams(x);
        if(x.brand === undefined || x.brand === ""){
            params.delete('brand')
        }
        if(x.year === undefined || x.year === ""){
            params.delete('year')
        }
        history.push({
            search: "?" + params.toString(),
            state: { filteredList, selectedBrand, selectedYear }
        });
    }, [selectedBrand, selectedYear]);

    return (
        <div className="App">
            <div className="brand-filter">
                <div>Filter by Brand :</div>
                <select
                    id="brand-input"
                    value={selectedBrand}
                    onChange={handleYearChange}
                >
                    <option value="">All</option>
                    <option value="BMW">BMW</option>
                    <option value="VW">VW</option>
                    <option value="Audi">Audi</option>
                </select>
            </div>
            <div>Filter by Year</div>
            <select
                id="year-options"
                value={selectedYear}
                onChange={handleYearChange}
            >
                <option value="">All</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
            </select>
            <div id="car-list">
                {filteredList.map((item, index) => (
                    <div className="car-item" key={index}>
                        <div className="car-name">{`Name: ${item.name}`}</div>
                        <div className="car-year">{`Year: ${item.release_year}`}</div>
                        <img className="car-image" src={item.url} alt="car-img" />
                    </div>
                ))}
            </div>
        </div>
    );
}