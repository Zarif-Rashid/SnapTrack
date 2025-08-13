// Function to parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim();
        });
        data.push(row);
    }
    
    return data;
}

// Function to create the chart
function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Extract dates, Z values, and N values
    const dates = data.map(row => row.date);
    const zValues = data.map(row => parseFloat(row.Z));
    const nValues = data.map(row => parseFloat(row.N));
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Z',
                    data: zValues,
                    // Z PLOT COLORS - Change these to modify Z plot appearance
                    borderColor: 'rgb(59, 130, 246)',    // Z line color (currently blue)
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',  // Z fill color (currently light blue)
                    borderWidth: 3,
                    fill: false,
                    tension: 0
                },
                {
                    label: 'N',
                    data: nValues,
                    // N PLOT COLORS - Change these to modify N plot appearance
                    borderColor: 'rgb(236, 72, 153)',    // N line color (currently pink)
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',  // N fill color (currently light pink)
                    borderWidth: 3,
                    fill: false,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Z vs N',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    color: 'white'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        color: 'white'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value',
                        color: 'white'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    return chart;
}

// Function to load and process CSV data
async function loadCSVData() {
    try {
        const response = await fetch('data.csv');
        const csvText = await response.text();
        const data = parseCSV(csvText);
        
        if (data.length > 0) {
            createChart(data);
        } else {
            console.error('No data found in CSV file');
        }
    } catch (error) {
        console.error('Error loading CSV file:', error);
        document.querySelector('.chart-container').innerHTML = 
            '<p style="color: red; font-size: 1.2rem;">Error loading data. Please make sure data.csv is in the same directory.</p>';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', loadCSVData);
