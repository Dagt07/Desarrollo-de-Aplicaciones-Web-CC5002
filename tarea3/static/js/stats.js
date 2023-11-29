/* con porcentaje afuera */
Highcharts.chart('container1', {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Artesanos por tipo de artesanía'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> Cantidad: <b>({point.y})</b>'
  },
  subtitle: {
    text:
      'Source: Tarea 3 database'
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: [{
        enabled: true,
        distance: 20
      }, {
        enabled: true,
        distance: -40,
        format: '{point.percentage:.1f}%',
        style: {
          fontSize: '1.2em',
          textOutline: 'none',
          opacity: 0.7
        },
        filter: {
          operator: '>',
          property: 'percentage',
          value: 10
        }
      }]
    }
  },
  series: [{
    name: 'Percentage',
    colorByPoint: true,
    data: [] // Add your data here
  }],
  caption: {
    text: 'El gráfico anterior representa el número total de artesanias por artesanos registrados en la app juegos Panamericanos 2023' 
  }
});

/* con value afuera
Highcharts.chart('container1', {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Egg Yolk Composition'
  },
  tooltip: {
    valueSuffix: '%'
  },
  subtitle: {
    text:
      'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: [{
        enabled: true,
        distance: 20
      }, {
        enabled: true,
        distance: -40,
        format: '{point.y}',
        style: {
          fontSize: '1.2em',
          textOutline: 'none',
          opacity: 0.7
        },
        filter: {
          operator: '>',
          property: 'percentage',
          value: 10
        }
      }]
    }
  },
  series: [{
    name: 'Percentage',
    colorByPoint: true,
    data: [] // Add your data here
  }]
});
*/

Highcharts.chart('container2', {
  chart: {
      type: 'column'
  },
  colors: ['#EE7600', '#00FF00', '#0000FF'], // Colores personalizados
  title: {
      text: 'Hinchas por deporte',
      align: 'left'
  },
  subtitle: {
      text:
          'Source: Tarea 3 database',
      align: 'left'
  },
  xAxis: {
      type: 'category',
      crosshair: true,
      accessibility: {
          description: 'Countries'
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Número de hinchas'
      }
  },
  series: [{
    name: 'Hinchas',
    data: [] // Initially empty, you can add data later
  }],
  caption: {
    text: 'El gráfico anterior representa el número total de deportes que apoyan los hinchas registrados en la app juegos Panamericanos 2023' 
  }
});

/* Observación: Es necesario colocar el puerto correspondiente a la ejecución del servidor de Flask  para el corrrecto funcionamiento de fetch*/

fetch("http://localhost:5000/get-stats-data-artesanos")
  .then((response) => response.json())
  .then((data) => {
    
    let parsedData = data.map((item) => {
      return [
      item.name,
      item.quantity];
    });

    // Get the chart by ID
    const chart = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "container1"
    );

    // Update the chart with new data
    chart.update({
      series: [
        {
          data: parsedData,
        },
      ],
    });

  })
  .catch((error) => console.error("Error:", error));  


fetch("http://localhost:5000/get-stats-data-hinchas")
.then((response) => response.json())
.then((data) => {
  let parsedData = data.map((item) => {
    return [
    item.name,
    item.quantity];
  });
  // Get the chart by ID
  const chart = Highcharts.charts.find(
    (chart) => chart && chart.renderTo.id === "container2"
  );
  // Update the chart with new data
  chart.update({
    series: [
      {
        data: parsedData,
      },
    ],
  });
})
.catch((error) => console.error("Error:", error));  
