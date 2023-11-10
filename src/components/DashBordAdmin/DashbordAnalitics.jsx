import React from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import backIcon from "../../utils/images/BasicIcons/backIcon.png"
import { useNavigate} from "react-router-dom";

const raiting = [
  {name: "SonicWave Pro j", rating: 50, weight: 60},
  {name: 'Micrófono StudioPro X1', rating: 15, weight: 70},
  {name: 'UltraView Pro X4', rating: 30, weight: 65},
]

const data = [
    {name: "SonicWave Pro j", ventas: 10, weight: 60},
    {name: 'Micrófono StudioPro X1', ventas: 25, weight: 70},
    {name: 'UltraView Pro X4', ventas: 15, weight: 65},
    {name: 'SonicWave Pro e', ventas: 35, weight: 85},
    {name: 'SonicWave Pro ddedos', ventas: 12, weight: 48},
    {name: 'Micrófono USB SoundCaster', ventas: 30, weight: 69},
    {name: 'Micrófono USB', ventas: 15, weight: 78},
]

const ventasSemanales = [
  {name: "Lunes", ventas: 80, weight: 60},
  {name: 'Martes', ventas: 60, weight: 70},
  {name: 'Miercoles', ventas: 5, weight: 65},
  {name: 'Jueves', ventas: 15, weight: 85},
  {name: 'Viernes', ventas: 2, weight: 48},
  {name: 'Sabado', ventas: 60, weight: 69},
  {name: 'Domingo', ventas: 45, weight: 78},
]



const SimpleBarCharts = () => {
  const goBackHandler = () => {
    navigate(-1);
  };
  
  const navigate = useNavigate();
  return (
    <>
    {/* <img src={backIcon} onClick={goBackHandler} alt="back" className="w-8 h-8 top-28 absolute ml-2"/> */}
    <div class="text-2xl sm:text-5xl font-semibold text-gray-900 mt-6 mb-2">Statistics</div>
   <div class="flex flex-col">


  <div class="flex mb-8 mt-4">
  <div class="flex flex-col">
  <h1 class="text-left pl-2 font-jakarta-sans font-semibold">Total Users</h1>
  <div class="flex">
    <div class="w-1/2">
      <div class="pl-2 pt-12">
        
        <p class="text-left text-lg text-green-500 font-bold font-jakarta-sans">14000+</p>
        <p class="text-left text-gray-400 font-semibold font-jakarta-sans">Users</p>
      </div>
      
    </div>
    <div class="w-1/2 flex flex-col items-end">
      <ResponsiveContainer width={120} height={50}>
        <LineChart width={300} height={100} data={raiting}>
          <Line type="monotone" dataKey="rating" stroke="black" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div class="pr-2 pt-1">
        <h1 class="text-right text-green-500 font-bold font-jakarta-sans">45%</h1>
        <p class="text-right text-gray-400 font-semibold font-jakarta-sans">this month</p>
      </div>
    </div>
  </div>
  </div>
  <div class="flex flex-col">
  <h1 class="text-left pl-4 font-jakarta-sans font-semibold">Total Products</h1>
  <div class="flex">
    <div class="w-1/2">
      <div class="pl-4 pt-12">
        
        <p class="text-left text-lg text-green-500 font-bold font-jakarta-sans">14000+</p>
        <p class="text-left text-gray-400 font-semibold font-jakarta-sans">Products</p>
      </div>
      
    </div>
    <div class="w-1/2 flex flex-col items-end">
      <ResponsiveContainer width={120} height={50}>
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="ventas" stroke="#F4CF0A" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div class="pr-2 pt-1">
        <h1 class="text-right text-green-500 font-bold font-jakarta-sans">45%</h1>
        <p class="text-right text-gray-400 font-semibold font-jakarta-sans">this month</p>
      </div>
    </div>
  </div>
  </div>
  </div>

  <div class="flex flex-col">


  <div class="flex">
  <div class="flex flex-col">
  <h1 class="text-left pl-2 font-jakarta-sans font-semibold">Total Orders</h1>
  <div class="flex">
    <div class="w-1/2">
      <div class="pl-2 pt-12">
        
        <p class="text-left text-lg text-green-500 font-bold font-jakarta-sans">14000+</p>
        <p class="text-left text-gray-400 font-semibold font-jakarta-sans">Orders</p>
      </div>
      
    </div>
    <div class="w-1/2 flex flex-col items-end">
      <ResponsiveContainer width={120} height={50}>
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="ventas" stroke="#0FC8E1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div class="pr-2 pt-1">
        <h1 class="text-right text-green-500 font-bold font-jakarta-sans">45%</h1>
        <p class="text-right text-gray-400 font-semibold font-jakarta-sans">this month</p>
      </div>
    </div>
  </div>
  </div>
  <div class="flex flex-col">
  <h1 class="text-left pl-4 font-jakarta-sans font-semibold">Total Sells</h1>
  <div class="flex">
    <div class="w-1/2">
      <div class="pl-4 pt-12">
        
        <p class="text-left text-lg text-green-500 font-bold font-jakarta-sans">140+</p>
        <p class="text-left text-gray-400 font-semibold font-jakarta-sans">Sells</p>
      </div>
      
    </div>
    <div class="w-1/2 flex flex-col items-end">
      <ResponsiveContainer width={120} height={50}>
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="ventas" stroke="red" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div class="pr-2 pt-1">
        <h1 class="text-right text-red-500 font-bold font-jakarta-sans">-15%</h1>
        <p class="text-right text-gray-400 font-semibold font-jakarta-sans">this month</p>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>





  {/* <div class="w-full h-40 bg-purple-500">Div 5</div> */}
</div>
<div class="text-2xl sm:text-5xl font-semibold text-gray-900 mt-8">Better rating</div>
<div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={raiting}
            margin={{
                top:50,
                right:20,
                left:2,
                bottom:5
            }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="rating" stackId="1" stroke='#8884d8' fill="green" />
        </AreaChart>
      </ResponsiveContainer>
</div>

<div class="text-2xl sm:text-5xl font-semibold text-gray-900 mt-8">Weekly Sales</div>
<div class="mb-4" >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ventasSemanales}
            margin={{
                top:50,
                right:20,
                left:2,
                bottom:5
            }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div class="text-2xl sm:text-5xl font-semibold text-gray-900 mt-8">Bestsellers</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}
            margin={{
                top:50,
                right:20,
                left:2,
                bottom:5
            }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
  )
}

export default SimpleBarCharts