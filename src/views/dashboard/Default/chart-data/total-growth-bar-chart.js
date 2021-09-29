// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
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
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: ['New York University', 'Syracuse University', 'Michigan University', 'Ohio University', 'University Of Columbia']
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
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
            colors: ['#1565c0', '#E91E63', '#9C27B0']
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
            name: 'Investment',
            data: [5, 5, 10, 25, 35]
        }
    ]
};
export default chartData;
