import './Home.css'
import { AiOutlineLike, AiOutlineProduct } from 'react-icons/ai'
import { FaChartLine, FaChartPie, FaStar, FaUser } from 'react-icons/fa'
import { TiUserAdd } from 'react-icons/ti'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { FcSalesPerformance } from 'react-icons/fc'




export default function Home() {
        const [connectNulls, setConnectNulls] = React.useState(true);
        
  return (
    <>
      <div className="container-fluid">

        <div className="row justify-content-around p-2">

        <div className="card text-light A CD-H mb-3 col-md-2" >
  <div className="card-header fs-4">Users</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <FaUser size={50}/>
              <h1>30</h1>
  </div>
          </div>
          <div className="card text-light B CD-H mb-3 col-md-2">
  <div className="card-header fs-4">Charts</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <FaChartPie size={50}/>
              <h1>10</h1>
  </div>
          </div>
          
          <div className="card text-light C CD-H mb-3 col-md-2" >
  <div className="card-header fs-4">Likes</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <AiOutlineLike size={50}/>
              <h1>42K</h1>
  </div>
          </div>

          <div className="card text-light D CD-H mb-3 col-md-2" >
  <div className="card-header fs-4">New Users</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <TiUserAdd size={50}/>
              <h1>17</h1>
  </div>
          </div>

          <div className="card text-light E CD-H mb-3 col-md-2" >
  <div className="card-header fs-4">Rate</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <FaStar size={50}/>
              <h1>5.0</h1>
  </div>
          </div>

        </div>

        <div className="row justify-content-around p-2 mb-5">

        <div className="card text-light F CD-H mb-3 col-md-3" >
  <div className="card-header fs-4">Products</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <AiOutlineProduct  size={50}/>
              <h1>42K</h1>
  </div>
          </div>

          <div className="card text-light G CD-H mb-3 col-md-3" >
  <div className="card-header fs-4">Sales</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <FcSalesPerformance size={50}/>
              <h1>55+</h1>
  </div>
          </div>

          <div className="card text-light H CD-H mb-3 col-md-3" >
  <div className="card-header fs-4">Profits</div>
  <div className="card-body d-flex justify-content-around align-items-center">
              <FaChartLine size={50}/>
              <h1>77K</h1>
  </div>
          </div>

          

        </div>


                          
        <div className='row my-5'>
        <Stack sx={{ width: '100%' }}>
      <FormControlLabel
        checked={connectNulls}
        control={
          <Checkbox onChange={(event) => setConnectNulls(event.target.checked)} />
        }
        label="connectNulls"
        labelPlacement="end"
      />
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20] }]}
        series={[
          {
            data: [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8],
          },
          {
            data: [null, null, 5.5, 2, null, null, 8.5, 1.5, 5],
            connectNulls,
            area: true,
          },
        ]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
        skipAnimation
      />
    </Stack>
                          </div>

                          <div className='row justify-content-around mt-5'>
                          <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, color:'DarkOrange', label: 'series A' },
            { id: 1, value: 15, color:'Crimson', label: 'series B' },
            { id: 2, value: 20, color:'CadetBlue', label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
                                  />
                                  
                                  <PieChart
      series={[
        {
          data: [
            { id: 0, value: 12, color:'ForestGreen', label: 'series A' },
            { id: 1, value: 15, color:'DarkSalmon', label: 'series B' },
            { id: 2, value: 18, color:'LightSkyBlue', label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
                                  />
                                  
                                  <PieChart
      series={[
        {
          data: [
            { id: 0, value: 9, color:'Gainsboro', label: 'series A' },
            { id: 1, value: 20, color:'MediumOrchid', label: 'series B' },
            { id: 2, value: 25, color:'MediumSlateBlue', label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
                          </div>
        
        </div>
      
    </>
  )
}
