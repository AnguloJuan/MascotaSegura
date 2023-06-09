"use client"
import {Chart} from "chart.js/auto";
import { useEffect, useRef } from "react";

export function ChartContainer({ data }) {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map((espacio) => espacio.especie),
                datasets: [
                    {
                        label: "Espacio Ocupado",
                        data: data.map((espacio) => (espacio.espacioTotal - espacio.espacioDisponible)),
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        stack: 'Stack 0',
                    },
                    {
                        label: "Espacio Disponible",
                        data: data.map((espacio) => espacio.espacioDisponible),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        stack: 'Stack 0',
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [data]);

    return <canvas ref={chartRef} />;
}

export function Example( {data} ) {
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    data: [70, 90, 44, 60, 83, 90, 100],
                    label: "Accepted",
                    borderColor: "#3cba9f",
                    backgroundColor: "#71d1bd",
                    borderWidth: 2
                }, {
                    data: [10, 21, 60, 44, 17, 21, 17],
                    label: "Pending",
                    borderColor: "#ffa500",
                    backgroundColor: "#ffc04d",
                    borderWidth: 2
                }, {
                    data: [6, 3, 2, 2, 7, 0, 16],
                    label: "Rejected",
                    borderColor: "#c45850",
                    backgroundColor: "#d78f89",
                    borderWidth: 2
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }],
                }
            },
        });
    }, [data])


    return (
        <>
            {/* Stacked chart */}
            <h2>Stacked-Bar Chart</h2>
            <div>
                <canvas id='myChart'></canvas>
            </div>
        </>
    )
}