// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const polarChartData = {
    height: 200,
    type: 'bar',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '50%',
                distributed: true
            }
        },
        xaxis: {
            type: 'category',
            categories: ['New York University', 'Syracuse University', 'Michigan University', 'Ohio University', 'University Of Columbia']
        },
        legend: {
            show: false,
            fontSize: '8px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: true
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid',
            colors: ['#4527a0', '#5e35b1', '#673ab7', '#b39ddb', '#ede7f6']
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Plans',
            data: [35, 25, 10, 5, 5]
        }
    ]
};
export default polarChartData;
