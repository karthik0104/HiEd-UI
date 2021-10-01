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

const polarChartData2 = {
          
    series: [{
      name: 'New York University',
      data: [[10, 25, 80]]
    },
    {
      name: 'California University',
      data: [[90, 25, 70]]
    },
    {
        name: 'New York University',
        data: [[160, 25, 50]]
    },
    {
        name: 'New York University',
        data: [[210, 25, 50]]
      },
      {
        name: 'California University',
        data: [[260, 25, 70]]
      }
    ],
    options: {
      chart: {
          height: 350,
          type: 'bubble',
      },
      dataLabels: {
          enabled: true
      },
      fill: {
          opacity: 0.8
      },
      xaxis: {
          show: false,
          tickAmount: 12,
          type: 'category',
          min: 0,
          max: 330,
          labels: {
              show: false
          },
      },
      yaxis: {
          show: false,
          max: 30,
          min: 20
      },
      legend: {
        show: true,
        fontSize: '10px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'right',
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
    grid: {
        show: false
    }
    },
};

const polarChartData3 = {
          
    series: [10, 25, 35, 45, 85],
    options: {
      chart: {
          height: 350,
          type: 'polarArea',
      },
      dataLabels: {
          enabled: false
      },
      fill: {
          opacity: 0.8
      },
      xaxis: {
          show: false,
          tickAmount: 12,
          type: 'category',
          labels: {
              show: false
          },
      },
      yaxis: {
          show: false
      },
      legend: {
        show: true,
        fontSize: '12px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'right',
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
            horizontal: 0,
            vertical: 8
        }
    },
    grid: {
        show: false
    },
    labels: ['New York University', 'Chicago University', 'Columbia University', 'Penn State University', 'Illinois University']
    },
};

export default polarChartData;
