import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
 
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}


const RentToIncomeRatioCriterion = (props) => {

  let mcsNotNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.rent_to_income_ratio));
  let rtiData = _.map(mcsNotNullDocuments, sd => sd.rent_to_income_ratio);
  let rtiApplicantData = _.map(mcsNotNullDocuments, sd => sd.calculated_rti);

  const bandwidth = 8; // Bandwidth for KDE
  const thresholds = d3.ticks(...d3.nice(...d3.extent(rtiData), 5), 60)
  const densityRTI = kde(epanechnikov(bandwidth), thresholds, rtiData)
  const densityRTIApplicant = kde(epanechnikov(4), thresholds, rtiApplicantData)


  const densityRTIData = _.map(densityRTI, d => {
    return {x: d[0], "Property RTI": d[1]};
  });
  const densityRTIDataApplicant = _.map(densityRTIApplicant, d => {
    return {x: d[0], "Applicant RTI": d[1]};
  });

  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, { "rti_accepted": true }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Rent-to-income Ratio (RTI) 
      </div>

      <div className="text-right">
        <div className="text-sm">
          Acceptance Rate<sup>*</sup>
        </div>
        <div className="text-4xl font-bold text-sat-blue">
          {Math.round(acceptanceRate)}%
        </div>
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
          <XAxis data={densityRTIData} dataKey="x" type="number" domain={[20, 100]} />
          <Area data={densityRTIData} type="monotone" dataKey="Property RTI" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <Area data={densityRTIDataApplicant} type="monotone" dataKey="Applicant RTI" stroke="none" fill="#DD6D3D" stroke="#DD6D3D" />

          <Legend verticalAlign="top" height={36}/>
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify rent-to-income ratio, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default RentToIncomeRatioCriterion;


