import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine, Bar, BarChart } from 'recharts';
import { SdCardAlertTwoTone } from "@mui/icons-material";
 
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}


const AllowedCriminalYearCriterion = (props) => {

  const [modeConv, setModeConv] = useState("conviction_felony_year");

  let data;

  if (modeConv === "conviction_felony_year") {

    data = _.map(_.filter(props.screeningDocuments, sd => {
      return !_.isNull(sd.criminal_conviction_felony_year)
    }), sd => {
      return sd.criminal_conviction_felony_year;
    })

  } else if (modeConv === "conviction_misdemeanor_year") {
    data = _.map(_.filter(props.screeningDocuments, sd => {
      return !_.isNull(sd.criminal_conviction_misdeam_year)
    }), sd => {
      return sd.criminal_conviction_misdeam_year;
    })
  }
  


  const bandwidth = 2; // Bandwidth for KDE
  const thresholds = d3.ticks(...d3.nice(...d3.extent(data), 5), 60)
  const densityData = kde(epanechnikov(bandwidth), thresholds, data)
  

  const densityDataConv = _.map(densityData, d => {
    return {x: d[0], "Years": d[1]};
  });
    
  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, sd => { return sd.criminal_years_accepted == true; }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Allowed Criminal Record Year
      </div>

      <div className="text-right">
        <div className="text-sm">
          Acceptance Rate<sup>*</sup>
        </div>
        <div className="text-4xl font-bold text-sat-blue">
          {acceptanceRate.toFixed(1)}%
        </div>
      </div>
      
      <div className="flex gap-2 pt-2 pb-2">
        <button className={`inline text-sm ${modeConv === "conviction_felony_year" ? "font-bold" : ""}`} onClick={(e) => setModeConv("conviction_felony_year") }>
          Convicted Felony Years
        </button>
        <div>|</div>
        <button className={`inline text-sm ${modeConv === "conviction_misdemeanor_year" ? "font-bold" : ""}`} onClick={(e) => setModeConv("conviction_misdemeanor_year")}>
          Convicted Misdemanor Years
        </button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          margin={{
            top: 0,
            right:0,
            left: 0,
            bottom: 0
          }}

        >
          <XAxis data={densityDataConv} dataKey="x" type="number"  />
          <YAxis />
          <Area data={densityDataConv} type="monotone" dataKey="Years" stroke="none" fill="#607EE3" stroke="#5855e4" />
          {
            (props.criteria.criminal_history_convicted_misdemeanor === "yes" && 
            props.criteria.most_recent_criminal > 0 && 
            modeConv === "conviction_misdemeanor_year") ?
            <ReferenceLine x={props.criteria.most_recent_criminal} label={{
              value: 'You',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          {
            (props.criteria.criminal_history_convicted_felony === "yes" && 
            props.criteria.most_recent_criminal > 0 && 
            modeConv === "conviction_felony_year") ?
            <ReferenceLine x={props.criteria.most_recent_criminal} label={{
              value: 'You',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify allowed criminal records years, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default AllowedCriminalYearCriterion;


