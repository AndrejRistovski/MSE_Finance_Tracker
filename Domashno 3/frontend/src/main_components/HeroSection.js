import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { SymbolsData } from "../stock_info/Symbols";
import hero from "../images/images_svg/hero.svg";
import "./HeroSection.css";
import DailyStats from "./DailyStats";
import DevSection from "./DevSection";
import BlogCard from "./BlogCard";
import BlogSection from "./BlogSection";
import Gauge from "./Gauge";
import StyledRadialGauge from './Gauge';

async function fnd(option1, option2) {
    let val;
    await fetch(`api/price/${option1}/${option2}`)
        .then((res) => res.text())
        .then((text) => {
            val = JSON.parse(text);
        });
    return val;
}

async function gagueUpdate(option1, option2) {
    let val;
    await fetch(`api/technical_analysis/${option1}/${option2}`)
        .then((res) => res.text())
        .then((text) => {
            val = JSON.parse(text);
        });
    return val;
}

const HeroSection = () => {
    const [key, setKey] = useState(0);
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("1 Year");
    const [gagueValue, setGaugeValue] = useState(0);
    const [state, setState] = useState({
        options: {
            chart: {
                id: "crypto-area",
                animations: {
                    enabled: true,
                    easing: "easeinout",
                    speed: 800,
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                    },
                },
                zoom: {
                    enabled: true,
                },
            },
            colors: ["#00d4ff"],
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#1e90ff"],
                    inverseColors: false,
                    opacityFrom: 0.8,
                    opacityTo: 0.2,
                    stops: [0, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        colors: "#A0A0A0",
                        fontSize: "0.9rem",
                    },
                },
                axisBorder: {
                    color: "#333354",
                },
                axisTicks: {
                    color: "#333354",
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#A0A0A0",
                        fontSize: "0.9rem",
                    },
                },
                axisBorder: {
                    color: "#333354",
                },
                axisTicks: {
                    color: "#333354",
                },
            },
            grid: {
                borderColor: "#333354",
                strokeDashArray: 5,
                padding: {
                    left: 10,
                    right: 10,
                },
            },
            tooltip: {
                theme: "dark",
                style: {
                    fontSize: '0.9rem',
                },
                y: {
                    formatter: (value) => `$${value}`,
                },
                x: {
                    formatter: (value) => `Date: ${value}`,
                },
            },
        },
        series: [
            {
                name: "Price",
                data: [],
            },
        ],
    });

    const updateState = (CryptoDataVal) => {
        const newState = { ...state };

        const validData = CryptoDataVal.filter(obj => obj.close !== undefined && obj.close !== null && !isNaN(obj.close) && obj.time !== undefined);

        if (validData.length === 0) {
            console.error("No valid data available for chart.");
            return; // Early return if no valid data
        }


        newState.series[0].data = validData.map((obj) => parseFloat(obj.close));


        const formattedDates = validData.map((obj) => {
            const dateObject = new Date(obj.time * 1000); // Convert timestamp to milliseconds
            return dateObject.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        });

        newState.options.xaxis.categories = validData.map((obj) => obj.time);
        newState.options.tooltip.x.formatter = (value, { dataPointIndex }) => {
            return `Date: ${formattedDates[dataPointIndex]}`;
        };

        setState(newState);
    };


    useEffect(() => {
        const randomCrypto = SymbolsData[Math.floor(Math.random() * SymbolsData.length)];
        setSelectedOption1(randomCrypto);

        const fetchData = async () => {
            const data = await fnd(randomCrypto, "y");
            updateState(data);

            const gague = await gagueUpdate(randomCrypto, "y");
            const roundedRsi = Math.round(gague[0].rsi);
            setGaugeValue(roundedRsi); // Update the gauge value

            setKey((key) => key + 1);
        };

        fetchData();
    }, []);

    const handleOption1Change = (event) => {
        setSelectedOption1(event.target.value);
    };

    const handleOption2Change = (event) => {
        setSelectedOption2(event.target.value);
    };

    const handleSaveClick = async () => {
        const prom = await fnd(selectedOption1, selectedOption2);
        const gague = await gagueUpdate(selectedOption1, selectedOption2);
        const roundedRsi = Math.round(gague[0].rsi);
        setGaugeValue(roundedRsi);

        updateState(prom);
        setKey((key) => key + 1);
    };

    const chartGaugeRef = useRef(null);
    const handleScrollToChartGauge = () => {
        chartGaugeRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="home">
            <div className="hero-section-container">
                <div className="hero-info-wrapper">
                    <div className="hero-info-text">
                        <h1 className="main-heading">Добредојдовте на Finance-Tracker Македонија</h1>
                        <h2 className="main-heading-1">Иднината на акциите и криптовалутите</h2>
                        <div className="features-section-container">
                            <h2 className="features-heading">Клучни Карактеристики:</h2>
                            <ul className="features-list">
                                <li><strong>Реални Временски Податоци:</strong> Останете информирани со
                                    најновите цени на акции и криптовалути за да ги искористите сите можности.
                                </li>
                                <li><strong>Напредни Аналитики:</strong> Искористете ги најсовремените графикони, тренд
                                    анализи и индикатори за да ги предвидите пазарните движења.
                                </li>
                                <li><strong>Фокус на Македонскиот Пазар:</strong> Пристапете до ексклузивни информации и
                                    извештаи прилагодени за инвеститорите на Македонската берза.
                                </li>
                                <li><strong>Брз и Лесен Пристап:</strong> Безпрекорно истражувајте ги пазарните трендови
                                    на десктоп или мобилен уред.
                                </li>
                                <li><strong>Персонализирани Табли:</strong> Прилагодете го вашето искуство со алатки кои
                                    ви овозможуваат да ги следите само најважните информации.
                                </li>
                                <li><strong>Интеграција на Најнови Вести:</strong> Бидете во тек со курирани вести и
                                    ажурирања директно од доверливи финансиски извори.
                                </li>
                            </ul>
                            <button className="get-started-btn" onClick={handleScrollToChartGauge}>Започнете Сега</button>
                        </div>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img className="hero-image" src={hero} alt="blockchain" />
                </div>
            </div>
            <div ref={chartGaugeRef} className="chart-gauge-container">
                <div className="chart_container">
                    <div className="chart_header">
                        <select
                            className="crypto_dropdown"
                            value={selectedOption1}
                            onChange={handleOption1Change}
                        >
                            <option value="">Изберете тикер</option>
                            {SymbolsData.map((crypto_sym) => (
                                <option key={crypto_sym} value={crypto_sym}>
                                    {crypto_sym}
                                </option>
                            ))}
                        </select>
                        <select
                            className="crypto_dropdown"
                            value={selectedOption2}
                            onChange={handleOption2Change}
                        >
                            <option value="at">All time</option>
                            <option value="y">1 Year</option>
                            <option value="m">1 Month</option>
                            <option value="w">1 Week</option>
                        </select>
                        <button className="crypto_button" onClick={handleSaveClick}>
                            Save
                        </button>
                    </div>
                    <Chart
                        key={key}
                        options={state.options}
                        series={state.series}
                        type="area"
                        width="100%"
                        height="350"
                    />
                </div>

                <StyledRadialGauge
                    gaugeValue={gagueValue}
                    setGaugeValue={setGaugeValue}
                />
            </div>
            <BlogSection />
            <DailyStats />
            <DevSection />
        </div>
    );
};

export default HeroSection;

