import { useEffect, useState } from 'react'
import axios from 'axios';
import '../Components/css/admin/estadisticas.css'
import '../Components/css/admin/inicio.css'
import { Admin } from './admin';
import Chart from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Estadisticas = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const token = localStorage.getItem("token")
  const fechaInicial = new Date();
  fechaInicial.setFullYear(2023);
  const fecha = new Date()
  const year = fecha.getFullYear()
  useEffect(() => {
    obtener()
  }, [])
  const obtener = async () => {
    try {
      const respuesta = await axios.post("http://localhost:8000/admin/ventaMes", { year: year }, {
        headers: {
          Authorization: token
        }
      })
      const diagrama = document.getElementById('diagrama')
      if (diagrama) {
        // Verificar si ya hay un gráfico asociado con el lienzo
        if (diagrama.chart) {
          // Destruir el gráfico existente si lo hay
          diagrama.chart.destroy();
        }
        // Crear un nuevo gráfico
        const newChart = new Chart(diagrama, {
          type: 'bar', // Tipo de gráfico de barras
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
              label: `Ventas por mes en el año ${year}`,
              data: respuesta.data.countMonth,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Guardar una referencia al nuevo gráfico en el elemento canvas
        diagrama.chart = newChart;
      }
    } catch (error) {
      if (error.response) {
        alert(error.message)
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        alert(error.message)
      }
    }
  };
  const cambiarYear = async (date) => {
    let year
    if (date){
      year=date.getFullYear()
    }
    try {
      const respuesta = await axios.post("http://localhost:8000/admin/ventaMes", { year: year }, {
        headers: {
          Authorization: token
        }
      })
      const diagrama = document.getElementById('diagrama')
      if (diagrama) {
        // Verificar si ya hay un gráfico asociado con el lienzo
        if (diagrama.chart) {
          // Destruir el gráfico existente si lo hay
          diagrama.chart.destroy();
        }
        // Crear un nuevo gráfico
        const newChart = new Chart(diagrama, {
          type: 'bar', // Tipo de gráfico de barras
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
              label: `Ventas por mes en el año ${year}`,
              data: respuesta.data.countMonth,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Guardar una referencia al nuevo gráfico en el elemento canvas
        diagrama.chart = newChart;
      }
    } catch (error) {
      if (error.response) {
        alert(error.message)
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        alert(error.message)
      }
    }
  }
  const copiarAño = (date) => {
    if (date) {
      setSelectedYear(date);
      cambiarYear(date)
    }
  };
  return (
    <div className='main-inicio'>
      <Admin />
      <div className='saludo-container'>
        <div className='saludo'>
          <div className='contenedor-año'>
            <label htmlFor="yearInput" className='mensage-año'>Elige el año:</label>
            <DatePicker
              id="yearInput"
              selected={selectedYear}
              onChange={(date) => {copiarAño(date)}}
              onSelect={(date) => {cambiarYear(date)}}
              dateFormat="yyyy"
              showYearPicker
              placeholderText="Selecciona un año"
              minDate={fechaInicial} // Establecer el año mínimo
              className="custom-datepicker"
            />
          </div>
          <div className='container-diagrama'>
            <canvas id='diagrama' className='barras'></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Estadisticas