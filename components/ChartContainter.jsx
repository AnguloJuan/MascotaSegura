"use client"
import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

let espacios, porcentajeEspecie, reportesMunicipio, adopcionMes;

export function Espacios({ data }) {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        if (espacios) {
            espacios.destroy();
        }
        espacios = new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map((especie) => especie.especie),
                datasets: [
                    {
                        label: "Espacio Ocupado",
                        data: data.map((cantidad) => cantidad.cantidad),
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#1F6384",
                            "#36A2EB",
                            "#FECE56",
                            "#8c5dff",
                            "#f33d67",
                            "#00F060",
                        ],
                        borderColor: "#FF6384",
                        borderWidth: 1,
                        stack: 'Stack 0',
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Espacios disponibles en el refugio',
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    },
                },
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

export function PorcentajeEspecie({ data }) {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        if (porcentajeEspecie) {
            porcentajeEspecie.destroy();
        }
        porcentajeEspecie = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: data.map((especie) => especie.especie),
                datasets: [
                    {
                        data: data.map((especie) => especie.porcentaje),
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#1F6384",
                            "#36A2EB",
                            "#FECE56",
                            "#8c5dff",
                            "#f33d67",
                            "#00F060",
                        ],
                    },
                ],
            }, options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Porcentaje de espacio disponible por especie',
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    },
                },
            }
        });
    }, [data]);

    return <canvas ref={chartRef} />;
}

export function ReportesPorMunicipio({ data }) {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        if (reportesMunicipio) {
            reportesMunicipio.destroy();
        }
        reportesMunicipio = new Chart(ctx, {
            type: "pie",
            data: {
                labels: data.map((reporte) => reporte.municipio),
                datasets: [
                    {
                        data: data.map((reporte) => reporte.count),
                        backgroundColor: [
                            "#1F6384",
                            "#36A2EB",
                            "#FECE56",
                            "#8c5dff",
                            "#f33d67",
                            "#00F060",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                        ],
                        hoverBackgroundColor: [
                            "#1F6384",
                            "#36A2EB",
                            "#FECE56",
                            "#8c5dff",
                            "#f33d67",
                            "#00F060",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                        ],
                    },
                ],
            }, options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Cantidad de reportes por municipio',
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    },
                },
            }
        });
    }, [data]);

    return <canvas ref={chartRef} />;
}

/*
export function AdopcionesPorMes({ data }) {
    const chartRef = useRef();

    const labels = data.map((item) => {
        const date = new Date(item.fechaCreada);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    });
    console.log(labels);
    console.log(data.map((item) => item._count.id));

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: 'line',
            labels: ['January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40, 10, 21, 34, 23, 12],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        });
    }, [data]);

    return <canvas ref={chartRef} />;
}
*/

export function AdopcionesPorMes({ adopciones, adoptantes }) {
    const chartRef = useRef();

    const data = []; // Datos de adopciones por mes
    const dataAdoptante = [];

    // Inicializar los contadores de adopciones por mes
    for (let i = 0; i < 12; i++) {
        data[i] = 0;
        dataAdoptante[i] = 0;
    }

    // Contar las adopciones por mes
    adopciones.forEach((adopcion) => {
        const mes = adopcion.fechaCreada.getMonth();
        data[mes]++;
    });
    adoptantes.forEach((adoptante) => {
        const mes = adoptante.fechaRegistro.getMonth();
        dataAdoptante[mes]++;
    });

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        if (adopcionMes) {
            adopcionMes.destroy();
        }
        adopcionMes = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'],
                datasets: [{
                    data: data,
                    label: "Adopciones",
                    borderColor: "#3e95cd",
                    backgroundColor: "#7bb6dd",
                    fill: false,
                }, {
                    data: dataAdoptante,
                    label: "Adoptantes",
                    borderColor: "#3cba9f",
                    backgroundColor: "#71d1bd",
                    fill: false,
                }
                ]
            }, options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Adopciones y Adoptantes registrados por mes',
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    },
                },
            }
        });
    }, [])
    return <canvas ref={chartRef} />;
}