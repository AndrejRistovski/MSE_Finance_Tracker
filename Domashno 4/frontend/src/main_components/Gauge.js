'use client';
import React, { useState } from "react";
import GaugeComponent from "react-gauge-component";
import './Gauge.css';

export default function StyledRadialGauge({ gaugeValue, setGaugeValue }) {
    const updateGaugeValue = (newValue) => {
        if (newValue >= 0 && newValue <= 100) {
         const parsedValue = Number(newValue);
            setGaugeValue(parsedValue);
        } else {
            console.error("Gauge value must be between 0 and 100.");
            console.log(newValue)
        }
    };

    React.useEffect(() => {
        console.log("Updated gauge value TEST :", gaugeValue);
        updateGaugeValue(gaugeValue);
    }, [gaugeValue]);

    return (
        <div className="gauge-container">
            <GaugeComponent
                type="radial"
                value={gaugeValue}
                minValue={0}
                maxValue={100}
                style={{ width: '100%', height: '100%' }}
                marginInPercent={{ top: 0.05, bottom: 0.05, left: 0.05, right: 0.05 }}
                arc={{
                    cornerRadius: 10,
                    padding: 0.05,
                    width: 0.3,
                }}
                subArcs={[
                    { limit: 20, color: '#ff3300' },
                    { limit: 40, color: '#ff9900' },
                    { limit: 60, color: '#ffcc00' },
                    { limit: 80, color: '#99ff33' },
                    { limit: 100, color: '#00cc00' },
                ]}
                pointer={{
                    type: 'needle',
                    width: 4,
                    color: '#ffffff',
                    length: 0.8,
                    baseColor: '#444',
                    elastic: true,
                    animationDelay: 0,
                }}
                labels={{
                    valueLabel: {
                        matchColorWithArc: true,
                        style: {
                            fontSize: '35px',
                            fill: '#ffffff',
                            textShadow: '0px 0px 10px black',
                        },
                    },
                }}
                tickLabels={{
                    type: 'inner',
                    hideMinMax: false,
                    ticks: [
                        { value: 0, valueConfig: { formatTextValue: () => 'Strong Sell' } },
                        { value: 20, valueConfig: { formatTextValue: () => 'Sell' } },
                        { value: 40, valueConfig: { formatTextValue: () => 'Neutral' } },
                        { value: 60, valueConfig: { formatTextValue: () => 'Buy' } },
                        { value: 80, valueConfig: { formatTextValue: () => 'Strong Buy' } },
                        { value: 100, valueConfig: { formatTextValue: () => '100%' } },
                    ],
                }}
            />
            <div style={{ marginTop: '20px', textAlign: 'center', color: '#ffffff', fontSize: '20px' }}>
                <strong>{getLabel(gaugeValue)}</strong>
            </div>
        </div>
    );
}

const getLabel = (value) => {
    if (value <= 20) return 'Strong Sell';
    if (value <= 40) return 'Sell';
    if (value <= 60) return 'Neutral';
    if (value <= 80) return 'Buy';
    return 'Strong Buy';
};