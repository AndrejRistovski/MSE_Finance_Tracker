import React from "react";
// import Chart from "react-apexcharts";
// import {SymbolsData} from "../stock_info/Symbols";
import hero from "../images/images_svg/hero.svg";
import "./HeroSection.css";
import DailyStats from "./DailyStats";
import DevSection from "./DevSection";
import BlogSection from "./BlogSection"

// async function fnd(option1, option2) {
//     let val;
//     let adder = "m";
//     if (option2 === "1 Week") {
//         adder = "w";
//     } else if (option2 === "1 Year") {
//         adder = "y";
//     }
//
//     await fetch(`/price/${option1}/${adder}`)
//         .then((res) => res.text())
//         .then((text) => {
//             val = JSON.parse(JSON.parse(text));
//         });
//     console.log("Prices:")
//     console.log(val)
//     return val;
// }

const HeroSection = () => {
    // const [key, setKey] = useState(0);
    // const [selectedOption1, setSelectedOption1] = useState(""); // For crypto selection
    // const [selectedOption2, setSelectedOption2] = useState("1 Year"); // Default to "1 Year"
    // const [state, setState] = useState({
    //     options: {
    //         chart: {
    //             id: "crypto-area",
    //             animations: {
    //                 enabled: true,
    //                 easing: "easeinout",
    //                 speed: 800,
    //             },
    //             toolbar: {
    //                 show: true,
    //                 tools: {
    //                     download: true,
    //                     zoom: true,
    //                     zoomin: true,
    //                     zoomout: true,
    //                     pan: true,
    //                     reset: true,
    //                 },
    //             },
    //             zoom: {
    //                 enabled: true,
    //             },
    //         },
    //         colors: ["#00d4ff"],
    //         fill: {
    //             type: "gradient",
    //             gradient: {
    //                 shade: "dark",
    //                 type: "vertical",
    //                 shadeIntensity: 0.5,
    //                 gradientToColors: ["#1e90ff"],
    //                 inverseColors: false,
    //                 opacityFrom: 0.8,
    //                 opacityTo: 0.2,
    //                 stops: [0, 100],
    //             },
    //         },
    //         dataLabels: {
    //             enabled: false,
    //         },
    //         stroke: {
    //             curve: "smooth",
    //             width: 3,
    //         },
    //         xaxis: {
    //             categories: [],
    //             labels: {
    //                 style: {
    //                     colors: "#A0A0A0",
    //                     fontSize: "0.9rem",
    //                 },
    //             },
    //             axisBorder: {
    //                 color: "#333354",
    //             },
    //             axisTicks: {
    //                 color: "#333354",
    //             },
    //         },
    //         yaxis: {
    //             labels: {
    //                 style: {
    //                     colors: "#A0A0A0",
    //                     fontSize: "0.9rem",
    //                 },
    //             },
    //             axisBorder: {
    //                 color: "#333354",
    //             },
    //             axisTicks: {
    //                 color: "#333354",
    //             },
    //         },
    //         grid: {
    //             borderColor: "#333354",
    //             strokeDashArray: 5,
    //             padding: {
    //                 left: 10,
    //                 right: 10,
    //             },
    //         },
    //         tooltip: {
    //             theme: "dark",
    //             style: {
    //                 fontSize: "0.9rem",
    //             },
    //             y: {
    //                 formatter: (value) => `$${value}`,
    //             },
    //             x: {
    //                 formatter: (value) => `Date: ${value}`, // Customize as needed
    //             },
    //         },
    //     },
    //     series: [
    //         {
    //             name: "Price",
    //             data: [],
    //         },
    //     ],
    // });

    // const updateState = (CryptoDataVal) => {
    //     const newState = {...state};
    //     newState.series[0].data = CryptoDataVal.map((obj) => obj.close.toFixed(5));
    //
    //     // Store date strings for tooltip use
    //     const formattedDates = CryptoDataVal.map((obj) => {
    //         const dateObject = new Date(obj.time);
    //         return dateObject.toLocaleDateString(undefined, {
    //             year: "numeric",
    //             month: "short",
    //             day: "numeric",
    //         });
    //     });
    //
    //     newState.options.xaxis.categories = formattedDates; // Still needed for internal mapping
    //
    //     // Hide x-axis labels
    //     newState.options.xaxis.labels = {
    //         show: false,
    //     };
    //
    //     // Customize tooltip to show formatted date
    //     newState.options.tooltip = {
    //         theme: "dark",
    //         style: {
    //             fontSize: "0.9rem",
    //         },
    //         x: {
    //             formatter: (value, {dataPointIndex}) => {
    //                 return `Date: ${formattedDates[dataPointIndex]}`;
    //             },
    //         },
    //         y: {
    //             formatter: (value) => `$${value}`,
    //         },
    //     };
    //
    //     setState(newState);
    // };
    //
    // // Fetch data for a random coin and 1 Year on page load
    // useEffect(() => {
    //     const randomCrypto = SymbolsData[Math.floor(Math.random() * SymbolsData.length)].sym;
    //     setSelectedOption1(randomCrypto);
    //
    //     // Fetch data
    //     const fetchData = async () => {
    //         const data = await fnd(randomCrypto, "1 Year");
    //         updateState(data);
    //         setKey((key) => key + 1);
    //     };
    //
    //     fetchData();
    // }, []);
    //
    // const handleOption1Change = (event) => {
    //     setSelectedOption1(event.target.value);
    // };
    //
    // const handleOption2Change = (event) => {
    //     setSelectedOption2(event.target.value);
    // };
    //
    // const handleSaveClick = async () => {
    //     const prom = await fnd(selectedOption1, selectedOption2);
    //     updateState(prom);
    //     setKey((key) => key + 1);
    // };

    return (
        <div className="home">
            <div className="animated_box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="hero-section-container">
                <div className="hero-info-wrapper">
                    <div className="hero-info-text">
                        <h1 className="main-heading">Welcome To Finance-Tracker North Macedonia</h1>
                        <h2 className="main-heading-1">The Future of Stock & Crypto</h2>
                        {/*<div className="chart_container">*/}
                        {/*    <div className="chart_header">*/}
                        {/*        <select*/}
                        {/*            className="crypto_dropdown"*/}
                        {/*            value={selectedOption1}*/}
                        {/*            onChange={handleOption1Change}*/}
                        {/*        >*/}
                        {/*            <option value="">Choose a cryptocurrency</option>*/}
                        {/*            {SymbolsData.map((crypto_sym, index) => (*/}
                        {/*                <option key={`${crypto_sym.sym}-${index}`} value={crypto_sym.sym}>*/}
                        {/*                    {crypto_sym.name}*/}
                        {/*                </option>*/}
                        {/*            ))}*/}
                        {/*        </select>*/}
                        {/*        <select*/}
                        {/*            className="crypto_dropdown"*/}
                        {/*            value={selectedOption2}*/}
                        {/*            onChange={handleOption2Change}*/}
                        {/*        >*/}
                        {/*            <option value="1 Year">1 Year</option>*/}
                        {/*            <option value="1 Month">1 Month</option>*/}
                        {/*            <option value="1 Week">1 Week</option>*/}
                        {/*        </select>*/}
                        {/*        <button className="crypto_button" onClick={handleSaveClick}>*/}
                        {/*            Save*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*    <Chart*/}
                        {/*        key={key}*/}
                        {/*        options={state.options}*/}
                        {/*        series={state.series}*/}
                        {/*        type="area"*/}
                        {/*        width="100%"*/}
                        {/*        height="350"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="hero-image-container">
                    <img className="hero-image" src={hero} alt="blockchain"/>
                </div>
            </div>
            <DailyStats/>
            <DevSection/>
            <BlogSection/>
            {/*<Footer/>*/}
        </div>
    );
};

export default HeroSection;



